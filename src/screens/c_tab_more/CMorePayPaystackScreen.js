import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BallIndicator,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import RNPaystack from 'react-native-paystack';

import {TextField} from '../../lib/MaterialTextField/index';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const image_calendar = require('../../assets/images/ic_calendar.png');
const image_more = require('../../assets/images/ic_more.png');
const ic_mini_card = require('../../assets/images/ic_card_master.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

class CMorePayPaystackScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CMorePayPaystackScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      invoiceAmount: global._invoiceAmount,
      accessCode: global.isDebug ? 'utszi81c5s82bv5' : global._accessCode,
      cardNumber: global.isDebug
        ? '4084084084084081'
        : global._cardInfo.card_number,
      name: global.isDebug ? 'Dick Arnold' : global._cardInfo.name_on_card,
      cardDate: global.isDebug
        ? '09/21'
        : global._cardInfo.expire_month.toString() +
          '/' +
          global._cardInfo.expire_year.toString(),
      cvv: global.isDebug ? '408' : global.cvv,
      zipCode: global.isDebug ? '110000' : global.zip_code,
      isSaveCard: false,
    };

    this.initRef();
  };

  onRefresh = () => {};

  initRef = () => {
    this.cardNumberRef = (ref) => {
      this.cardNumber = ref;
    };
    this.nameRef = (ref) => {
      this.name = ref;
    };
    this.zipCodeRef = (ref) => {
      this.zipCode = ref;
    };
  };

  onFocus = () => {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  onChangeText = (text) => {
    ['cardNumber', 'name', 'zipCode']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitCardNumber = () => {
    this.name.focus();
  };

  onSubmitName = () => {};

  onSubmitZipCode = () => {
    this.zipCode.blur();
  };

  renderCardNumberAccessory = () => {
    return (
      <Image
        source={ic_mini_card}
        style={{width: 22, height: 22, resizeMode: 'contain'}}
      />
    );
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onChangeCardDate = (value) => {
    this.setState({cardDate: value});
  };

  onChangeCvv = (value) => {
    this.setState({cvv: value});
  };

  onChangeZipCode = (value) => {
    this.setState({zipCode: value});
  };

  onSubmit = () => {
    const {accessCode, cardNumber, name, cardDate, cvv, zipCode} = this.state;
    let errors = {};

    ['cardNumber', 'name', 'zipCode'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      showPageLoader(true);

      const expireMonth = Helper.getMonth4DateString(cardDate);
      const expireYear = Helper.getYear4DateString(cardDate);
      const cardParams = {
        cardNumber: cardNumber,
        expiryMonth: expireMonth,
        expiryYear: expireYear,
        cvc: cvv,
        accessCode: accessCode,
      };
      RNPaystack.chargeCardWithAccessCode(cardParams)
        .then((response) => {
          console.log('success:', response); // do stuff with the token

          const params = {
            invoice_id: global._invoiceId,
            payment_method:
              paymentMethod == 'PayStack' ? 'paystack' : 'balance',
            card_number: cardNumber,
            name_on_card: name,
            expire_year: expireYear,
            expire_month: expireMonth,
            cvv: cvv,
            zip_code: zipCode,
          };
          RestAPI.pay_invoice(params, (json, err) => {
            showPageLoader(false);

            if (err !== null) {
              Alert.alert(Constants.errorTitle, 'Failed to update.');
            } else {
              if (json.status === 1) {
                global._membershipPlan = json.data.package_name;
                this.props.navigation.navigate('fc_payment_success');
              } else {
                Alert.alert(Constants.errorTitle, 'Failed to update.');
              }
            }
          });
        })
        .catch((error) => {
          console.log('error:', error); // error is a javascript Error object
          console.log('error.message:', error.message);
          console.log('error.code:', error.code);
          showPageLoader(false);
          Alert.alert(Constants.errorTitle, 'Failed to pay.');
        });
    }
  };

  toggleSwitch = (value) => {
    this.setState({isSaveCard: value});
  };

  render() {
    let {errors = {}} = this.state;
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderTitle()}
            {this._renderPurchase()}
            {this._renderCardDetails()}
            {this._renderCardInfo()}
            {this._renderZipCode()}
            {this._renderOption()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle=""
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTitle = () => {
    return <Text style={GStyles.titleText}>Confirm Payment</Text>;
  };

  _renderPurchase = () => {
    const {invoiceAmount} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 48}]}>
          Purchase Details
        </Text>
        <View style={[GStyles.rowEndContainer, {marginTop: 30}]}>
          <Text style={GStyles.regularText}>Sending Amount</Text>
          <Text style={GStyles.regularText}>${invoiceAmount}</Text>
        </View>
        <View
          style={[
            GStyles.rowEndContainer,
            GStyles.borderBottom,
            {height: 60, marginTop: 32},
          ]}>
          <Text style={GStyles.mediumText}>Total</Text>
          <Text style={GStyles.mediumText}>
            ${Math.round(invoiceAmount * 101) / 100}
          </Text>
        </View>
      </>
    );
  };

  _renderCardDetails = () => {
    const {cardNumber, name, errors = {}} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 48}]}>
          Card Details
        </Text>
        <TextField
          ref={this.cardNumberRef}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitCardNumber}
          returnKeyType="next"
          label="Card number"
          value={cardNumber}
          error={errors.cardNumber}
          renderRightAccessory={this.renderCardNumberAccessory}
          containerStyle={{marginTop: 16}}
        />
        <TextField
          ref={this.nameRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitName}
          returnKeyType="next"
          label="Name on Card"
          value={name}
          error={errors.name}
          containerStyle={{marginTop: 8}}
        />
      </>
    );
  };

  _renderCardInfo = () => {
    const {cardDate, cvv} = this.state;

    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 24}]}>
        <View
          style={[
            GStyles.borderBottom,
            {
              width: '45%',
              height: 58,
              justifyContent: 'center',
            },
          ]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            MM/YY
          </Text>
          <View style={[GStyles.rowContainer, {marginTop: 8}]}>
            <Image
              source={image_calendar}
              style={[GStyles.image, {width: 22, tintColor: GStyle.grayColor}]}
            />
            <TextInput
              placeholder="Date"
              value={cardDate}
              onChangeText={this.onChangeCardDate}
              style={[GStyles.mediumText, {width: '75%', marginLeft: 12}]}
            />
          </View>
        </View>
        <View
          style={[
            GStyles.borderBottom,
            {width: '45%', height: 58, justifyContent: 'center'},
          ]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            CVV
          </Text>
          <View style={[GStyles.rowContainer, {marginTop: 8}]}>
            <Image
              source={image_more}
              style={[GStyles.image, {width: 22, tintColor: GStyle.grayColor}]}
            />
            <TextInput
              placeholder="Password"
              value={cvv}
              onChangeText={this.onChangeCvv}
              style={[GStyles.mediumText, {width: '75%', marginLeft: 12}]}
            />
          </View>
        </View>
      </View>
    );
  };

  _renderZipCode = () => {
    let {zipCode, errors = {}} = this.state;

    return (
      <TextField
        ref={this.zipCodeRef}
        keyboardType="number-pad"
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        onFocus={this.onFocus}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitZipCode}
        returnKeyType="done"
        label="Zip Code"
        value={zipCode}
        onChangeText={this.onChangeZipCode}
        error={errors.zipCode}
        containerStyle={{marginTop: 12}}
      />
    );
  };

  _renderOption = () => {
    const {isSaveCard} = this.state;

    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 32}]}>
        <Text style={GStyles.regularText}>Save card information</Text>
        <Switch onValueChange={this.toggleSwitch} value={isSaveCard} />
      </View>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSubmit} style={{marginVertical: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Next</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default CMorePayPaystackScreen;
