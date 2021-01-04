import React from 'react';
import {
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
    <View style={{width: '90%'}}>
      <View
        style={[
          GStyles.borderBottom,
          {flexDirection: 'row', paddingBottom: 8},
        ]}>
        <View style={{flex: 1, marginRight: 8}}>
          <Text style={[GStyles.regularText, {fontSize: 13}]}>
            {item.invoice_id}
          </Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
            {item.invoice_username}
          </Text>
          <Text
            style={[
              GStyles.regularText,
              {fontSize: 13, lineHeight: 16, marginTop: 8},
            ]}>
            {item.invoice_date}
          </Text>
        </View>
        <View style={{flex: 1, marginHorizontal: 4}}>
          <Text style={[GStyles.regularText, {fontSize: 13, lineHeight: 16}]}>
            {item.job_title}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
          <Text style={[GStyles.regularText, {fontSize: 13}]}>
            {item.amount_total}
          </Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
            {item.amount_paid}
          </Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
            {item.amount_date}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text
              style={[
                GStyles.regularText,
                {fontSize: 13, color: GStyle.linkColor, marginTop: 8},
              ]}>
              Feedback left
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

class FMorePaymentsInvoicesScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FMorePaymentsInvoicesScreen start');

    this.state = {
      is_visible_feedback_modal: false,
      option_type: '',
      option_status: '',
      item_datas: [
        {
          id: 'id1',
          invoice_id: '32389',
          invoice_username: 'Marian Ramsey',
          invoice_date: 'Sent Sep.20, 2020',
          job_title: 'Need an architectural design of a 4 story building',
          amount_total: 'Amount: 3000',
          amount_paid: 'Paid: 3000',
          amount_date: 'On Sep.30, 2020',
        },
        {
          id: 'id2',
          invoice_id: '32389',
          invoice_username: 'Marian Ramsey',
          invoice_date: 'Sent Sep.20, 2020',
          job_title: 'Need an architectural design of a 4 story building',
          amount_total: 'Amount: 3000',
          amount_paid: 'Paid: 3000',
          amount_date: 'On Sep.30, 2020',
        },
        {
          id: 'id3',
          invoice_id: '32389',
          invoice_username: 'Marian Ramsey',
          invoice_date: 'Sent Sep.20, 2020',
          job_title: 'Need an architectural design of a 4 story building',
          amount_total: 'Amount: 3000',
          amount_paid: 'Paid: 3000',
          amount_date: 'On Sep.30, 2020',
        },
        {
          id: 'id4',
          invoice_id: '32389',
          invoice_username: 'Marian Ramsey',
          invoice_date: 'Sent Sep.20, 2020',
          job_title: 'Need an architectural design of a 4 story building',
          amount_total: 'Amount: 3000',
          amount_paid: 'Paid: 3000',
          amount_date: 'On Sep.30, 2020',
        },
        {
          id: 'id5',
          invoice_id: '32389',
          invoice_username: 'Marian Ramsey',
          invoice_date: 'Sent Sep.20, 2020',
          job_title: 'Need an architectural design of a 4 story building',
          amount_total: 'Amount: 3000',
          amount_paid: 'Paid: 3000',
          amount_date: 'On Sep.30, 2020',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onCreate = () => {
    const navigation = this.context;
    navigation.navigate('f_more_create_invoice_select');
  };

  onFeedback = () => {
    this.setState({is_visible_feedback_modal: true});
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    const {item_datas} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FLeaveFeedbackModal
          modalVisible={this.state.is_visible_feedback_modal}
          onPressCancel={() => {
            this.setState({is_visible_feedback_modal: false});
          }}
        />
        {this._renderOptions()}
        {this._renderListHeader()}
        <FlatList data={item_datas} renderItem={this.renderItem} />
      </SafeAreaView>
    );
  }

  renderItem = ({item}) => {
    return <Item item={item} onPress={this.onFeedback} />;
  };

  _renderOptions = () => {
    let index = 0;
    const date_range_data = [
      {key: index++, section: true, label: 'Type'},
      {key: index++, label: 'Type1'},
      {key: index++, label: 'Type2'},
      {key: index++, label: 'Type3'},
    ];
    index = 0;
    const year_data = [
      {key: index++, section: true, label: 'Status'},
      {key: index++, label: 'Status1'},
      {key: index++, label: 'Status2'},
      {key: index++, label: 'Status3'},
    ];
    const {option_type, option_status} = this.state;
    return (
      <View style={{alignItems: 'center', marginTop: 16}}>
        <View style={{width: '90%'}}>
          <View style={GStyles.rowEndContainer}>
            <View
              style={[
                GStyles.rowContainer,
                {
                  height: 30,
                  borderRadius: 6,
                  backgroundColor: GStyle.grayBackColor,
                },
              ]}>
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
                style={[
                  GStyles.mediumText,
                  {width: 38, fontSize: 11, marginHorizontal: 8},
                ]}
                placeholder="Search"
                value={this.state.locationValue}
              />
            </View>
            <ModalSelector
              data={date_range_data}
              initValue={option_type}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={option => {
                this.setState({option_type: option.label});
              }}
              style={{
                width: 93,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 32}]}>
                <TextInput
                  style={[
                    GStyles.mediumText,
                    {
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      color: GStyle.grayColor,
                    },
                  ]}
                  editable={false}
                  placeholder="Type"
                  value={this.state.option_type}
                />
                <Image
                  source={image_dropdown}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                    marginRight: 8,
                  }}
                />
              </View>
            </ModalSelector>
            <ModalSelector
              data={year_data}
              initValue={option_status}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={option => {
                this.setState({option_status: option.label});
              }}
              style={{
                width: 93,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 32}]}>
                <TextInput
                  style={[
                    GStyles.mediumText,
                    {
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      color: GStyle.grayColor,
                    },
                  ]}
                  editable={false}
                  placeholder="Status"
                  value={this.state.option_status}
                />
                <Image
                  source={image_dropdown}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                    marginRight: 8,
                  }}
                />
              </View>
            </ModalSelector>
            <View
              style={[
                ,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 60,
                  height: 30,
                },
              ]}>
              <TouchableOpacity onPress={this.onCreate}>
                <Text
                  style={[
                    GStyles.mediumText,
                    {fontSize: 13, color: GStyle.linkColor},
                  ]}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderListHeader = () => {
    return (
      <View style={[, {alignItems: 'center', marginTop: 24}]}>
        <View style={[, {width: '90%'}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>INVOICES</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 4}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>FOR JOB</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>
                AMOUNT DUE
              </Text>
            </View>
          </View>
        </View>
      </View>
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

export default FMorePaymentsInvoicesScreen;
