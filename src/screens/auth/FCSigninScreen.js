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
  View,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {TextField} from '../../lib/MaterialTextField/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const image_logo = require('../../assets/images/ic_logo.png');
const image_google = require('../../assets/images/ic_google.png');
const image_facebook = require('../../assets/images/ic_facebook.png');
const image_twitter = require('../../assets/images/ic_twitter.png');

class FCSigninScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCSigninScreen start');

    this.init();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  init = () => {
    this.state = {
      secureTextEntry: global.isDebug ? false : true,
      email: global.isDebug
        ? global.roleId == 1
          ? 'crn221@163.com'
          : 'dickarnold221@gmail.com'
        : '',
      password: global.isDebug ? '123456' : '',
    };

    this.initRef();
  };

  initRef = () => {
    this.emailRef = (ref) => {
      this.email = ref;
    };
    this.passwordRef = (ref) => {
      this.password = ref;
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
    ['email', 'password']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitEmail = () => {
    this.password.focus();
  };

  onSubmitPassword = () => {
    this.password.blur();
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

  onForgetPassword = () => {
    this.props.navigation.navigate('fc_forget_password');
  };

  onSubmit = () => {
    let {errors = {}} = this.state;

    ['email', 'password'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if ('email' === name) {
          const isValidEmail = Helper.validateEmail(value);
          if (!isValidEmail) {
            errors[name] = 'Email is invalid';
          }
        } else if ('password' === name && value.length < 6) {
          errors[name] = 'Too short';
        }
      }
    });

    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      const {email, password} = this.state;

      const params = {
        email: email,
        password: password,
        role: global.roleId == 1 ? 'freelancer' : 'client',
      };
      showPageLoader(true);
      RestAPI.login(params, (json, err) => {
        showPageLoader(false);

        if (err !== null) {
          Alert.alert(Constants.errorTitle, 'Failed to login.');
        } else {
          if (json.status === 1) {
            global.userToken = json.token;
            global.me = json.data;

            if (global.roleId == 1) {
              this.props.navigation.navigate('f_main_tab_navigator');
            } else if (global.roleId == 2) {
              this.props.navigation.navigate('c_main_tab_navigator');
            }
          } else {
            Alert.alert(Constants.errorTitle, 'Failed to login.');
          }
        }
      });
    }
  };

  onSignup = () => {
    this.props.navigation.navigate('fc_signup');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.container}>
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

  _renderTitle = () => {
    return (
      <>
        <Image
          source={image_logo}
          style={[GStyles.image, {width: 54, marginTop: 40}]}
        />
        <Text style={[GStyles.titleText, {fontSize: 30, lineHeight: 36}]}>
          Welcome back!
        </Text>
        <Text style={{...GStyles.titleDescription}}>
          Login to manage your account
        </Text>
      </>
    );
  };

  _renderInput = () => {
    let {email, password, errors = {}, secureTextEntry} = this.state;

    return (
      <>
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
          containerStyle={{marginTop: 24}}
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
          returnKeyType="done"
          label="Password"
          value={password}
          error={errors.password}
          renderRightAccessory={this.renderPasswordAccessory}
          containerStyle={{marginTop: 8}}
        />
      </>
    );
  };

  _renderButton = () => {
    return (
      <>
        <TouchableOpacity
          onPress={this.onForgetPassword}
          style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              textDecorationLine: 'underline',
              color: GStyle.grayColor,
              paddingVertical: 30,
            }}>
            Forget Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Log In</Text>
          </View>
        </TouchableOpacity>
      </>
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
            <Image source={image_google} style={[GStyles.image, {width: 45}]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              Alert.alert('Facebook Login is clicked.');
            }}>
            <Image
              source={image_facebook}
              style={[GStyles.image, {width: 45}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              Alert.alert('Twitter Login is clicked.');
            }}>
            <Image
              source={image_twitter}
              style={[GStyles.image, {width: 45}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderBottom = () => {
    return (
      <View style={[GStyles.rowContainer, {marginBottom: 10}]}>
        <Text
          style={{
            fontFamily: 'GothamPro',
            color: GStyle.grayColor,
            fontSize: 13,
          }}>
          Don`t have an account?
        </Text>
        <TouchableOpacity onPress={this.onSignup}>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.linkColor,
              paddingLeft: 5,
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default FCSigninScreen;
