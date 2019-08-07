import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import ModalSelector from '../../lib/ModalSelector/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import {TextField} from '../../lib/MaterialTextField/index';
import DismissKeyboard from '../../components/DismissKeyboard';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');
const ic_mini_minus = require('../../assets/images/ic_mini_minus.png');

export default class NCMorePayInvoiceModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    value: PropTypes.number,
  };

  constructor(props) {
    super(props);

    console.log('NCMorePayInvoiceModal start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      paymentMethod: 'Pay with balance',
    };
  };

  onRefresh = () => {};

  onCancel = () => {
    this.props.onCancel();
  };

  onChangePaymentMethod = (value) => {
    this.setState({paymentMethod: value.label});
  };

  onSubmit = () => {
    const {paymentMethod} = this.state;

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
          this.props.onSubmit();
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <DismissKeyboard>
          <View
            style={{
              flex: 1,
              backgroundColor: GStyle.modalBackColor,
            }}>
            <View style={{...styles.centeredView}}>
              <KeyboardAvoidingView
                style={{...styles.modalView}}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View>
                  {this._renderTitle()}
                  {this._renderAmount()}
                  {this._renderPaymentMethod()}
                  {this._renderTotal()}
                  {this._renderButton()}
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </DismissKeyboard>
      </Modal>
    );
  }

  _renderTitle = () => {
    return (
      <View style={GStyles.rowEndContainer}>
        <Text
          style={[
            GStyles.mediumText,
            {fontSize: 17, lineHeight: 25, marginTop: 10},
          ]}>
          Details
        </Text>
        <TouchableOpacity onPress={this.onCancel}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 14,
              color: GStyle.linkColor,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderAmount = () => {
    const {invoiceAmount = 0} = this.props.value;

    return (
      <View style={{...GStyles.borderBottom, height: 58, marginTop: 24}}>
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
          {width: '100%', height: 58, marginTop: 24},
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
    const {invoiceAmount} = this.props.value;

    return (
      <View style={{alignItems: 'flex-end'}}>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={{...GStyles.regularText}}>Fee</Text>
          <Text style={{...GStyles.regularText, fontSize: 13}}>
            ${Math.round(invoiceAmount * 9) / 100}
          </Text>
        </View>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={{...GStyles.mediumText}}>Invoice Total</Text>
          <Text style={{...GStyles.mediumText, fontSize: 13}}>
            ${invoiceAmount - Math.round(invoiceAmount * 9) / 100}
          </Text>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{alignItems: 'flex-end', marginVertical: 32}}>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Pay now</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: '88%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 150,
    height: 36,
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
