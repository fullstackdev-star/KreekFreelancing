import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutAnimation,
  Linking,
  ListView,
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
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {TextField} from '../../lib/MaterialTextField/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';
import ModalIndicator from '../../components/ModalIndicator';

const ic_google = require('../../assets/images/ic_google.png');
const ic_facebook = require('../../assets/images/ic_facebook.png');
const ic_twitter = require('../../assets/images/ic_twitter.png');
const ic_linkedin = require('../../assets/images/ic_linkedin.png');

class NCSignupStep2Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('NCSignupStep2Screen start');

    this.state = {
      secureTextEntry: global.isDebug ? false : true,
      firstName: global.isDebug ? 'Dick' : '',
      lastName: global.isDebug ? 'Arnold' : '',
      email: global.isDebug ? 'dickarnold221@gmail.com' : '',
      password: global.isDebug ? '123456' : '',
      confirmPassword: global.isDebug ? '123456' : '',
    };

    this.initRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
    this.props.navigation.goBack();
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
            console.error(err);
            return;
          }

          if (json.status === 1 || global.isDebug) {
            global.userToken = global.isDebug
              ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGJhYTFhYTMxZjY4OWM3YjQyYzQ0ZGI1NWY3MzA2YjkwYTlhMzQxZDY1YzdjZWJlMDEyMGY3MTNhOWE4MjI5N2IxOTI2NTIyNjlhNGIzZmMiLCJpYXQiOjE2MDA2OTk5MzYsIm5iZiI6MTYwMDY5OTkzNiwiZXhwIjoxNjMyMjM1OTM2LCJzdWIiOiIzOTMiLCJzY29wZXMiOltdfQ.QVYJ2NBPaS4Nob4RzzR9TYKTBvAdXqu0NJY9QOTAlkV4ji2H3njHcCtnpaL4wEJM1ryZdsuNdNBlvEuibex7I89NY88-iB-1JcjZGGjKh0EPR_gCNnkSTTLqDL9esj1YtecHklzj1HLdwbRSFY43LWepznX8ZSp3I9BfASEvAbPxTFEGXV4D-nTP7gJg3v7ikCULOqb2poyvdsG2IlaHH5RlXQ9edb5rGFa1U4eIqak7lI_gDTYpyTmCn3g-rJiodMvmNsAG7qfbRPqTUWcPjw8WP29O5eQJAb0UvbEKNc4_d2QsOtWJIWOxMh095bEzOiesI4j6G86roMXM588pQFpSvBrUwMwS80CZOw8q4MjTW9ueN4MJ00TnPwW2yr-B7g0ItHDQEb9d1gj0psMsFpcrW1kTO4r_lBrfS8y3CKHRgdSVh2RJEbkDp7rAk5k7AUxO1QE3qc_CiUvg9EGcicwUfiXPXL8CadjGKiuNb6KZH5MjTLtLUP7pYRCLS-xoHtFHg_y48PBw5GAHWDL_lCYYJXiuJexlYhfU_WgI4V0k9BBzhtbkOkS3h_nRk332zKtiJSTLoA_S70te6Q__qx7G6XD_nP0ECBJ5obbMq6ux_rY0MAApOUP2IOcffpwrb8OF5CN9m_chxZGpIB-lEVnGeYWSNi4zW77Ajv79UI8'
              : json.token;
            global.me = json.data;

            this.props.navigation.navigate('fc_verify_email');
          } else {
            Alert.alert(
              Constants.errorTitle,
              'Failed to signup, please try again.',
            );
          }
        },
      );
    }
  };

  onGoogle = () => {
    Alert.alert('Google Login is clicked.');
  };

  onFacebook = () => {
    Alert.alert('Facebook Login is clicked.');
  };

  onTwitter = () => {
    Alert.alert('Twitter Login is clicked.');
  };

  onLinkedin = () => {
    Alert.alert('Linkedin Login is clicked.');
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
    let index = 0;
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderTitle()}
            {this._renderInputs()}
            {this._renderButton()}
            {this._renderSocial()}
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
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 1 of 2</Text>
        <Text style={GStyles.titleText}>Your Information</Text>
        <Text style={GStyles.titleDescription}>
          Create a free account to see professionals who meet you needs.
        </Text>
      </>
    );
  };

  _renderInputs = () => {
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
      <View style={{marginTop: 32, marginBottom: 40}}>
        <Text
          style={[
            GStyles.regularText,
            {fontSize: 14, color: GStyle.grayColor, marginVertical: 10},
          ]}>
          Or Sign in with
        </Text>
        <View style={[GStyles.rowContainer, {marginTop: 20}]}>
          <TouchableOpacity onPress={this.onGoogle}>
            <Image source={ic_google} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}} onPress={this.onFacebook}>
            <Image source={ic_facebook} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}} onPress={this.onTwitter}>
            <Image source={ic_twitter} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}} onPress={this.onLinkedin}>
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

export default NCSignupStep2Screen;
