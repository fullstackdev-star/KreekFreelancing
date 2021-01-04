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
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';
import Avatar from '../../components/elements/Avatar';

import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';

const ic_notification = require('../../assets/images/ic_notification.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_mini_multi = require('../../assets/images/ic_mini_multi.png');
const ic_mini_minus = require('../../assets/images/ic_mini_minus.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');

class CMorePayInoviceScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CMorePayInoviceScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      invoiceAmount: global._invoiceAmount,
      paymentMethod: 'Pay with balance',
      coverPhoto: global._professionalPhoto,
      freelancerName: global._professionalName,
      projectName: global._projectName,
    };
  };

  onRefresh = () => {};

  onClose = () => {
    this.props.navigation.goBack();
  };

  onChangePaymentMethod = (value) => {
    this.setState({paymentMethod: value.label});
  };

  onSubmit = () => {
    const {paymentMethod} = this.state;

    if (paymentMethod == 'PayStack') {
      this.props.navigation.navigate('c_more_pay_paystack');
      return;
    }

    const params = {
      invoice_id: global._invoiceId,
      payment_method: paymentMethod == 'PayStack' ? 'paystack' : 'balance',
      card_number: '',
      name_on_card: '',
      expire_year: '',
      expire_month: '',
      cvv: '',
      zip_code: '',
    };
    showPageLoader(true);
    RestAPI.pay_invoice(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.onSubmit();
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          <GHeaderBar
            headerTitle="Pay invoice"
            leftType="close"
            onPressLeftButton={this.onClose}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, width: '88%'}}>
            {this._renderTitle()}
            {this._renderClient()}
            {this._renderAmount()}
            {this._renderPaymentMethod()}
            {this._renderTotal()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderTitle = () => {
    return <Text style={GStyles.titleText}>Bill to:</Text>;
  };

  _renderClient = () => {
    const {coverPhoto, freelancerName, projectName} = this.state;

    return (
      <View style={{marginTop: 24}}>
        <View style={GStyles.rowEndContainer}>
          <View style={GStyles.rowContainer}>
            <Avatar image={{uri: coverPhoto}} style={GStyles.image} />
            <View style={{marginLeft: 10}}>
              <Text style={{...GStyles.mediumText}}>{freelancerName}</Text>
              <Text
                style={[GStyles.mediumText, {lineHeight: 18, marginTop: 8}]}>
                {projectName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderAmount = () => {
    const {invoiceAmount = 0} = this.state;

    return (
      <View style={{...GStyles.borderBottom, height: 58, marginTop: 40}}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Sending Amount
        </Text>
        <View style={[GStyles.rowContainer, {marginTop: 12}]}>
          <Image
            source={ic_dollar}
            style={[GStyles.image, {width: 24, tintColor: GStyle.grayColor}]}
          />
          <TextInput
            keyboardType="numeric"
            editable={false}
            placeholder=""
            value={invoiceAmount.toString()}
            style={{...GStyles.mediumText, flex: 1, marginLeft: 12}}
          />
        </View>
      </View>
    );
  };

  _renderPaymentMethod = () => {
    const {paymentMethod} = this.state;

    let index = 0;
    const paymentTypeData = [
      {key: index++, section: true, label: 'Payment System'},
      {key: index++, label: 'Pay with balance'},
      {key: index++, label: 'PayStack'},
    ];

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 40},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Payment System
        </Text>
        <ModalSelector
          data={paymentTypeData}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangePaymentMethod}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={paymentMethod}
            />
            <Image
              source={ic_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderTotal = () => {
    const {invoiceAmount} = this.state;

    return (
      <View style={{alignItems: 'flex-end'}}>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={{...GStyles.regularText}}>Fee</Text>
          <Text style={{...GStyles.regularText, fontSize: 13}}>
            ${Math.round(invoiceAmount * 1) / 100}
          </Text>
        </View>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={{...GStyles.mediumText}}>Invoice Total</Text>
          <Text style={{...GStyles.mediumText, fontSize: 13}}>
            ${Math.round(invoiceAmount * 101) / 100}
          </Text>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Make payment</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CMorePayInoviceScreen;
