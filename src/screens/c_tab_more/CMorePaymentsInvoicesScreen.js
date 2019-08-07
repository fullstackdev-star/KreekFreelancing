import React from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';

import FLeaveFeedbackModal from '../modal/FLeaveFeedbackModal';

const image_search = require('../../assets/images/ic_search.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={{width: '88%'}}>
      <View
        style={{
          ...GStyles.borderBottom,
          flexDirection: 'row',
          paddingBottom: 8,
        }}>
        <View style={{flex: 1, marginRight: 8}}>
          <Text style={{...GStyles.regularText, fontSize: 13}}>{item.id}</Text>
          <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 8}}>
            {item.professional_name}
          </Text>
          <Text
            style={[
              GStyles.regularText,
              {fontSize: 13, lineHeight: 16, marginTop: 8},
            ]}>
            {Helper.getDateString4Server(item.create_date)}
          </Text>
        </View>
        <View style={{flex: 1, marginHorizontal: 4}}>
          <Text style={[GStyles.regularText, {fontSize: 13, lineHeight: 16}]}>
            {item.project_name}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
          <Text style={[GStyles.regularText, {fontSize: 13}]}>
            Amount: ${item.amount}
          </Text>
          {item.status == 'paid' && (
            <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 8}}>
              Paid: ${item.amount}
            </Text>
          )}
          {item.status == 'paid' && (
            <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 8}}>
              On {Helper.getDateString4Server(item.create_date)}
            </Text>
          )}
          {item.status == 'unpaid' && (
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 13,
                  color: GStyle.linkColor,
                  marginTop: 12,
                }}>
                Pay Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  </View>
);

class CMorePaymentsInvoicesScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CMorePaymentsInvoicesScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh('init');
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isVisiblePayModal: false,

      isFetching: false,
      totalCount: 0,
      curPage: 1,

      keyword: '',
      typeFilterValue: '',
      statusFilterValue: '',
      itemDatas: [],
    };
  };

  onRefresh = (type) => {
    let {
      isFetching,
      totalCount,
      curPage,
      itemDatas,
      keyword,
      typeFilterValue,
      statusFilterValue,
    } = this.state;

    if (isFetching) {
      return;
    }

    if (type == 'more') {
      curPage += 1;
      const maxPage =
        (totalCount + Constants.COUNT_PER_PAGE - 1) / Constants.COUNT_PER_PAGE;
      if (curPage > maxPage) {
        return;
      }
    } else {
      curPage = 1;
    }
    this.setState({curPage});

    if (type == 'init') {
      showPageLoader(true);
    } else {
      this.setState({isFetching: true});
    }
    let params = {
      page_number: type == 'more' ? curPage : '1',
      count_per_page: Constants.COUNT_PER_PAGE,
      keyword: keyword.toLowerCase(),
      status: statusFilterValue.toLowerCase(),
    };
    RestAPI.get_filtered_invoice_list(params, (json, err) => {
      if (type == 'init') {
        showPageLoader(false);
      } else {
        this.setState({isFetching: false});
      }

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({totalCount: json.data.total_count});
          if (type == 'more') {
            let data = itemDatas.concat(json.data.invoice_list);
            this.setState({itemDatas: data});
          } else {
            this.setState({itemDatas: json.data.invoice_list});
          }
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onChangeKeyword = (value) => {
    this.setState({keyword: value});
  };

  onSubmitKeyword = () => {
    this.onRefresh('init');
  };

  onSelectType = (value) => {
    this.setState({typeFilterValue: value.label}, () => {
      this.onRefresh('init');
    });
  };

  onSelectStatus = (value) => {
    this.setState({statusFilterValue: value.label}, () => {
      this.onRefresh('init');
    });
  };

  onPayNow = (value) => {
    global._professionalId = value.id;
    global._professionalName = value.professional_name;
    global._professionalPhoto = value.professional_photo;
    global._projectName = value.project_name;
    global._invoiceId = value.id;
    global._invoiceAmount = value.amount;

    this.context.navigate('c_more_pay_invoice');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderOptions()}
        {this._renderListHeader()}
        {this._renderList()}
      </SafeAreaView>
    );
  }

  _renderOptions = () => {
    const {keyword, typeFilterValue, statusFilterValue} = this.state;
    let index = 0;
    const typeFilter = [
      {key: index++, section: true, label: 'Type'},
      {key: index++, label: 'Type1'},
      {key: index++, label: 'Type2'},
      {key: index++, label: 'Type3'},
    ];
    index = 0;
    const statusFilter = [
      {key: index++, section: true, label: 'Status'},
      {key: index++, label: 'All'},
      {key: index++, label: 'Paid'},
      {key: index++, label: 'Unpaid'},
    ];

    return (
      <View style={{alignItems: 'center', marginTop: 16}}>
        <View style={{width: '88%'}}>
          <View style={GStyles.rowEndContainer}>
            <View
              style={{
                ...GStyles.rowContainer,
                height: 30,
                borderRadius: 6,
                backgroundColor: GStyle.grayBackColor,
              }}>
              <Image
                source={image_search}
                style={{
                  width: 10,
                  height: 10,
                  marginLeft: 8,
                  marginBottom: 2,
                  resizeMode: 'contain',
                }}
              />
              <TextInput
                style={{
                  ...GStyles.mediumText,
                  width: 68,
                  fontSize: 11,
                  marginHorizontal: 8,
                }}
                returnKeyType="search"
                placeholder="Search"
                value={keyword}
                onChangeText={this.onChangeKeyword}
                onSubmitEditing={this.onSubmitKeyword}
              />
            </View>
            <ModalSelector
              data={typeFilter}
              initValue={typeFilterValue}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={this.onSelectType}
              style={{
                width: 93,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 32}]}>
                <TextInput
                  style={{
                    ...GStyles.mediumText,
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 11,
                    color: GStyle.grayColor,
                  }}
                  editable={false}
                  placeholder="Type"
                  value={typeFilterValue}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
            <ModalSelector
              data={statusFilter}
              initValue={statusFilterValue}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={this.onSelectStatus}
              style={{
                width: 93,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={{...GStyles.rowEndContainer, height: 32}}>
                <TextInput
                  style={{
                    ...GStyles.mediumText,
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 11,
                    color: GStyle.grayColor,
                  }}
                  editable={false}
                  placeholder="Status"
                  value={statusFilterValue}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 30,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  _renderListHeader = () => {
    return (
      <View style={{alignItems: 'center', marginTop: 24}}>
        <View style={{width: '88%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={{...GStyles.mediumText, fontSize: 13}}>
                INVOICES
              </Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 4}}>
              <Text style={{...GStyles.mediumText, fontSize: 13}}>FOR JOB</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
              <Text style={{...GStyles.mediumText, fontSize: 13}}>
                AMOUNT DUE
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderList = () => {
    const {isFetching, itemDatas} = this.state;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          this.onRefresh('pull');
        }}
        refreshing={isFetching}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          this.onRefresh('more');
        }}
        data={itemDatas}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  _renderFooter = () => {
    const {isFetching} = this.state;

    if (!isFetching) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  _renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          this.onPayNow(item);
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default CMorePaymentsInvoicesScreen;
