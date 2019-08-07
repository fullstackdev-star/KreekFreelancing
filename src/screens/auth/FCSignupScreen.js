import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
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
  Linking,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {TextField} from '../../lib/MaterialTextField/index';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';
import ModalIndicator from '../../components/ModalIndicator';

const ic_google = require('../../assets/images/ic_google.png');
const ic_facebook = require('../../assets/images/ic_facebook.png');
const ic_twitter = require('../../assets/images/ic_twitter.png');
const ic_linkedin = require('../../assets/images/ic_linkedin.png');

class FCSignupScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCSignupScreen start');

    this.state = {
      secureTextEntry: global.isDebug ? false : true,
      firstName: global.isDebug ? 'Dick' : '',
      lastName: global.isDebug ? 'Arnold' : '',
      email: global.isDebug
        ? global.roleId == 1
          ? 'crn221@163.com'
          : 'dickarnold221@gmail.com'
        : '',
      password: global.isDebug ? '123456' : '',
      confirmPassword: global.isDebug ? '123456' : '',
    };

    this.initRef();
  }

  componentWillUnmount() {}

  componentDidMount() {}

  initRef = () => {
    this.firstNameRef = (ref) => {
      this.firstName = ref;
    };
    this.lastNameRef = (ref) => {
      this.lastName = ref;
    };
    this.emailRef = (ref) => {
      this.email = ref;
    };
    this.passwordRef = (ref) => {
      this.password = ref;
    };
    this.confirmPasswordRef = (ref) => {
      this.confirmPassword = ref;
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
    ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitFirstName = () => {
    this.lastName.focus();
  };

  onSubmitLastName = () => {
    this.email.focus();
  };

  onSubmitEmail = () => {
    this.password.focus();
  };

  onSubmitPassword = () => {
    this.confirmPassword.focus();
  };

  onSubmitConfirmPassword = () => {
    this.confirmPassword.blur();
  };

  onAccessoryPress = () => {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  };

  renderPasswordAccessory = () => {
    let {secureTextEntry} = this.state;

    let name = secureTextEntry ? 'visibility' : 'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  };

  onBack = () => {
    this.props.navigation.navigate('fc_signin');
  };

  onSignup = () => {
    let errors = {};

    ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].forEach(
      (name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = 'Should not be empty';
        } else {
          if ('email' === name) {
            const isValidEmail = Helper.validateEmail(value);
            if (!isValidEmail) {
              errors[name] = 'Email is invalid';
            }
          }
          if (
            ('password' === name || 'confirmPassword' === name) &&
            value.length < 6
          ) {
            errors[name] = 'Too short';
          }
        }
      },
    );

    let {password, confirmPassword} = this.state;
    if (password !== confirmPassword) {
      errors['confirmPassword'] = 'Not match with password';
    }

    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      const {email, password, firstName, lastName} = this.state;
      const role = global.roleId === 1 ? 'freelancer' : 'client';

      showPageLoader(true);
      RestAPI.signup(
        email,
        password,
        firstName,
        lastName,
        role,
        (json, err) => {
          showPageLoader(false);

          if (err !== null) {
            Alert.alert(
              Constants.errorTitle,
              'Failed to signup, please try again.',
            );
          } else {
            if (json.status === 1 || global.isDebug) {
              global.userToken = global.isDebug
                ? global.roleId == 1
                  ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGUyYTg0YjNjYzNhNTdiMzYxNzg4ZjA0MzZjZWJkN2JiM2JlZjlhYzcwMDMzN2UzOWYyNzYzNDVkNDgwMGUyMGI5ZjE0YzNlYWY4YTIyNmMiLCJpYXQiOjE2MDA4MjI2MDMsIm5iZiI6MTYwMDgyMjYwMywiZXhwIjoxNjMyMzU4NjAzLCJzdWIiOiIzNzciLCJzY29wZXMiOltdfQ.fsQtGm3erJZ-PlDMopFE6Uk6OytVN0FfalrYZp9yXz1H5EjTfT3epcVeTtjGy9Ov2JaUHgKCgl7hnHhO6H67oGCKNGlEeu-raXAmvKY392g7BX9Nhw7k567JhLEwMq9gRP-PI7VQtgypNRo88oE51OXFi805ZjBdFKYrYZ_0CH3XLbp27ZCm9wBRAI1DKNftoF8f97qxJvTUID_a7z8FI15-UurJUYsGw3A5tG-d_xgYN_pGptLX2af6kES6oGwSFPTVEHMi-71bmZpAYex408PEQtkQi-gNtv-B4jdbHSMlhaFIb3J0O7y1ltBzAutJ6NlY2KOk7O6OLdAplSvLRlf1GM6a_yIuKNcmTkRggVLjrasHNmckPKtMlbej0UNuQjpC5uJAy8MtgI2CK7SD2MgNHKfajuemL1SI8MbRO1WW6V90q6WILaVt2dyp6MibRuHwLSOn7SPHeS0jJG_KhXuqiQgO_OYe7DGaVYvg_jcdXnLP6zhOsA91RRhSvtKtWBXAWzLPZMCJaYBuL4YA2wst6bp8dhEWMTN1hj2wrfQg4mNr-CQrAetzf4TOYq-CbIWcr0o3NfXmZuIEi6w0cSIoF2uEMzxyZ7VIJBj9fGqNuRxDrC7GCqBQvBXcg1k2YPVPUjsQejsIV5VHZMLcX0he-iis8JKfBu5_QvSirvY'
                  : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODE3MWM5MTIzYTM3MDA2MmFmM2M2YWNmMDhiYTE5NTllNWJkN2UwYmQ0NThhOTczOGFmMGQxNWUxZTE2ZDY2MzIwY2ZhZWU3NWFmYzFhMmEiLCJpYXQiOjE2MDA4MjI3MDEsIm5iZiI6MTYwMDgyMjcwMSwiZXhwIjoxNjMyMzU4NzAxLCJzdWIiOiIzOTMiLCJzY29wZXMiOltdfQ.WknG5XP_chY4BRUJaPxLSU3ObFuzmagR9rlPRFu59W1J5PjZqTDgo7KXEDPOdVjRKwgl2fi9ivPwHnfJ58BfqXEOWt_1DzLDMEg0f-4wT_C5a0TlvksGzwzZ60Lylloi_x3qjUC2dg_etVdflmzTypLjiUzYTL2aG7oJc55A0rADqUTfEf78WRoRQ1d2MA4pTEdzSoDMrk2F1YKdINDGOdnmmrVwMdNi2EnwroDwDx-y8uN5P6m5qtOkdm9n7UKy6_0Dnq54kPt0TIhwIFoySh17GB4D2ujsOC-1OV7YB9Mv9yhfgW_-MvrJrbdxgxSXKbj_-tiXmBUMcL_3LylFYSNgDzaJZNOg_vEWvd1kLWYHF2FlvtQj1faCVlV8xmo6Z3VKGO6GW2N6nnC11dk9Fj5sAzGVAn5E-PqKhAqMdQ4hDpYF1iGYTF_T1dXyG8_-ETwNg9W2GvjzuUow6oLOsNvPxx-ZFZFnFjJ1-txhybq9DlhFIH2CSg95tXB_0c9iZo7Wu3ex4V-taJDnc1I7lVTnS6DnRDQZh5Mhk7iaN0OvWVq21jvym9XQ6BwAi8lmFrQybxKlY1U5iUBVNMt-c9DBdFqLxglbjkofvZyaCQy1N7mrIvxra3PiQDMdn3IuKaAumW0PY0A1FrzcJoDi2kMBoIkqEX4QG8llOvIVJuE'
                : json.token;
              global.me = json.data;

              this.props.navigation.navigate('fc_verify_email');
            } else {
              Alert.alert(
                Constants.errorTitle,
                'Failed to signup, please try again.',
              );
            }
          }
        },
      );
    }
  };

  onTerm = () => {
    const url = 'https://kreekafrica.com/term';
    Linking.openURL(url);
  };

  onPrivacy = () => {
    const url = 'https://kreekafrica.com/privacy';
    Linking.openURL(url);
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderTitle()}
            {this._renderInput()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
          {this._renderBottom()}
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
    return (
      <>
        <Text style={GStyles.titleText}>Hi, create your account</Text>
        <View style={[GStyles.titleDescription, GStyles.rowContainer]}>
          <Text style={GStyles.regularText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('fc_signin');
            }}>
            <Text
              style={[
                GStyles.regularText,
                {color: GStyle.linkColor, paddingLeft: 5},
              ]}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  _renderInput = () => {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      errors = {},
      secureTextEntry,
    } = this.state;

    return (
      <>
        <TextField
          ref={this.firstNameRef}
          autoCorrect={false}
          autoCapitalize="words"
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitFirstName}
          returnKeyType="next"
          label="First Name"
          value={firstName}
          error={errors.firstName}
          containerStyle={{marginTop: 24}}
        />
        <TextField
          ref={this.lastNameRef}
          autoCapitalize="words"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitLastName}
          returnKeyType="next"
          label="Last Name"
          value={lastName}
          error={errors.lastName}
          containerStyle={{marginTop: 8}}
        />
        <TextField
          ref={this.emailRef}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEmail}
          returnKeyType="next"
          label="Email"
          value={email}
          error={errors.email}
          containerStyle={{marginTop: 8}}
        />
        <TextField
          ref={this.passwordRef}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitPassword}
          returnKeyType="next"
          label="Password"
          value={password}
          error={errors.password}
          renderRightAccessory={this.renderPasswordAccessory}
          containerStyle={{marginTop: 8}}
        />
        <TextField
          ref={this.confirmPasswordRef}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitConfirmPassword}
          returnKeyType="done"
          label="Confirm Password"
          value={confirmPassword}
          error={errors.confirmPassword}
          containerStyle={{marginTop: 8}}
        />
      </>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity onPress={this.onSignup}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderSocial = () => {
    return (
      <View style={{marginTop: 32}}>
        <Text
          style={[
            GStyles.regularText,
            {fontSize: 14, color: GStyle.grayColor, marginVertical: 10},
          ]}>
          Or Sign in with
        </Text>
        <View style={[GStyles.rowContainer, {marginTop: 20}]}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Google Login is clicked.');
            }}>
            <Image source={ic_google} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              Alert.alert('Facebook Login is clicked.');
            }}>
            <Image source={ic_facebook} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              Alert.alert('Twitter Login is clicked.');
            }}>
            <Image source={ic_twitter} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              Alert.alert('Linkedin Login is clicked.');
            }}>
            <Image source={ic_linkedin} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderBottom = () => {
    return (
      <View style={{height: 50}}>
        <Text
          style={{
            fontFamily: 'GothamPro',
            fontSize: 13,
            lineHeight: 22,
            color: GStyle.grayColor,
          }}>
          By signing up, you agree to KreekAfrica`s
        </Text>
        <View style={GStyles.rowCenterContainer}>
          <TouchableOpacity onPress={this.onTerm}>
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 13,
                lineHeight: 22,
                color: GStyle.linkColor,
                paddingLeft: 5,
              }}>
              Term of Service
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              lineHeight: 22,
              color: GStyle.grayColor,
              paddingLeft: 5,
            }}>
            and
          </Text>
          <TouchableOpacity onPress={this.onPrivacy}>
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 13,
                lineHeight: 22,
                color: GStyle.linkColor,
                paddingLeft: 5,
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default FCSignupScreen;
