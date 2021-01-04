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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';

const ic_mini_call = require('../../assets/images/ic_mini_call.png');
const ic_mini_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_mini_chat = require('../../assets/images/ic_mini_chat.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const image_search = require('../../assets/images/ic_search.png');
const image_check_active = require('../../assets/images/ic_radio_active.png');
const image_check_inactive = require('../../assets/images/ic_radio_inactive.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={{width: '88%'}}>
      <View style={GStyles.borderBottom}>
        <CheckBox
          customLabel={<ItemLabel item={item} />}
          labelBefore={true}
          checkedImage={image_check_active}
          uncheckedImage={image_check_inactive}
          containerStyle={{
            width: '100%',
            justifyContent: 'space-between',
          }}
          checkboxStyle={{width: 20, height: 20}}
          labelStyle={{marginLeft: 0}}
        />
      </View>
    </View>
  </View>
);

const ItemLabel = ({item}) => (
  <View
    style={{
      flex: 1,
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <Text style={[GStyles.mediumText, {lineHeight: 20}]}>
          {item.invoice_title}
        </Text>
        <View style={[GStyles.rowContainer, {marginTop: 8}]}>
          <Text style={[GStyles.regularText, {fontSize: 13}]}>
            {item.invoice_username}
          </Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginLeft: 16}]}>
            {item.invoice_type}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

class FMoreCreateInvoiceSelectScreen extends React.Component {
  handleTextChange = newText => this.setState({value: newText});

  constructor(props) {
    super(props);

    console.log('FMoreCreateInvoiceSelectScreen start');

    this.state = {
      sort_by: '',
      posted_by: '',
      item_datas: [
        {
          id: 'id1',
          invoice_title: 'Need an architectural design of a 4 story building',
          invoice_username: 'Marian Ramsey',
          invoice_type: 'Milestone agreement',
        },
        {
          id: 'id2',
          invoice_title: 'Need an architectural design of a 4 story building',
          invoice_username: 'Marian Ramsey',
          invoice_type: 'Hourly agreement',
        },
        {
          id: 'id3',
          invoice_title: 'Need an architectural design of a 4 story building',
          invoice_username: 'Marian Ramsey',
          invoice_type: 'Milestone agreement',
        },
        {
          id: 'id4',
          invoice_title: 'Need an architectural design of a 4 story building',
          invoice_username: 'Marian Ramsey',
          invoice_type: 'Milestone agreement',
        },
        {
          id: 'id5',
          invoice_title: 'Need an architectural design of a 4 story building',
          invoice_username: 'Marian Ramsey',
          invoice_type: 'Hourly agreement',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onClose = () => {
    this.props.navigation.goBack();
  };

  onCreate = () => {
    this.props.navigation.navigate('f_more_create_invoice_send');
  };

  onPressed = () => {};

  render() {
    const {item_datas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={styles.container}>
          <GHeaderBar
            headerTitle="Create Invoice"
            leftType="close"
            onPressLeftButton={this.onClose}
          />
          {this._renderListHeader()}
          {this._renderOptions()}
          <FlatList
            data={item_datas}
            renderItem={this._renderItem}
            style={{marginTop: 20}}
          />
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderListHeader = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%', marginTop: 24}}>
          <Text style={GStyles.bigText}>
            Select the job you want to be paid for
          </Text>
        </View>
      </View>
    );
  };

  _renderOptions = () => {
    let index = 0;
    const sort_by_data = [
      {key: index++, section: true, label: 'Sort by'},
      {key: index++, label: 'Sort1'},
      {key: index++, label: 'Sort2'},
      {key: index++, label: 'Sort3'},
    ];
    index = 0;
    const posted_by_data = [
      {key: index++, section: true, label: 'Posted by'},
      {key: index++, label: 'Posted1'},
      {key: index++, label: 'Posted2'},
      {key: index++, label: 'Posted3'},
    ];
    const {sort_by, posted_by} = this.state;
    return (
      <View style={{alignItems: 'center', marginTop: 16}}>
        <View style={{width: '88%'}}>
          <View style={GStyles.rowEndContainer}>
            <View
              style={[
                GStyles.rowContainer,
                {
                  width: 100,
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
                  {flex: 1, fontSize: 11, marginHorizontal: 8},
                ]}
                placeholder="Search"
                value={this.state.locationValue}
              />
            </View>
            <ModalSelector
              data={sort_by_data}
              initValue={sort_by}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                this.setState({sort_by: option.label});
              }}
              style={{
                width: 100,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 30}]}>
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
                  placeholder="Sort by"
                  value={this.state.sort_by}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
            <ModalSelector
              data={posted_by_data}
              initValue={posted_by}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                this.setState({posted_by: option.label});
              }}
              style={{
                width: 100,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 30}]}>
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
                  placeholder="Posted by"
                  value={this.state.posted_by}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
          </View>
        </View>
      </View>
    );
  };

  _renderItem = ({item}) => {
    return <Item item={item} onPress={this.onPressed} />;
  };

  _renderButton = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity onPress={this.onCreate}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Create</Text>
          </View>
        </TouchableOpacity>
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

export default FMoreCreateInvoiceSelectScreen;
