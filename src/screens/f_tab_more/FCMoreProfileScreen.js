import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {TextField} from '../../lib/MaterialTextField/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import Avatar from '../../components/elements/Avatar';

const image_location = require('../../assets/images/ic_location.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_edit = require('../../assets/images/ic_edit_3.png');

class FCMoreProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCMoreProfileScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      secureTextEntry: true,

      fullName: '',
      email: '',
      userName: '',
      phoneNumber: '',
      location: '',
      profilePhoto: '',
      coverPhoto: '',
    };

    this.initRef();
  };

  onRefresh = () => {
    const params = {none: 'none'};
    showPageLoader(true);
    RestAPI.get_user_info(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
        return;
      } else {
        if (json.status === 1) {
          global.me = json.data;

          this.setState({
            fullName: global.me.first_name + ' ' + global.me.last_name,
            email: global.me.email,
            userName: global.me.user_name,
            phoneNumber: global.me.phone_number,
            location: global.me.location,
            profilePhoto: global.me.profile_photo,
            coverPhoto: global.me.cover_photo,
          });

          this.fullName.setValue(
            global.me.first_name + ' ' + global.me.last_name,
          );
          this.email.setValue(global.me.email);
          this.userName.setValue(global.me.user_name);
          this.phoneNumber.setValue(global.me.phone_number);
          this.location.setValue(global.me.location);
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  initRef = () => {
    this.fullNameRef = (ref) => {
      this.fullName = ref;
    };
    this.emailRef = (ref) => {
      this.email = ref;
    };
    this.userNameRef = (ref) => {
      this.userName = ref;
    };
    this.phoneNumberRef = (ref) => {
      this.phoneNumber = ref;
    };
    this.locationRef = (ref) => {
      this.location = ref;
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
    ['fullName', 'email', 'userName', 'phoneNumber', 'location']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitFullName = () => {
    this.email.focus();
  };

  onSubmitEmail = () => {
    this.userName.focus();
  };

  onSubmitUserName = () => {
    this.phoneNumber.focus();
  };

  onSubmitPhoneNumber = () => {
    this.location.focus();
  };

  onSubmitLocation = () => {
    this.location.blur();
  };

  onSubmit = () => {
    let errors = {};

    ['fullName', 'email', 'userName', 'phoneNumber', 'location'].forEach(
      (name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = 'Should not be empty';
        }
      },
    );

    this.setState({errors});
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onEdit = () => {
    this.props.navigation.navigate('fc_more_edit_profile');
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
            {this._renderAvartar()}
            {this._renderInputs()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Account"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="edit"
        onPressRightButton={this.onEdit}
      />
    );
  };

  _renderAvartar = () => {
    const {profilePhoto, coverPhoto} = this.state;

    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: coverPhoto}}
          style={{
            width: '100%',
            height: 165,
            backgroundColor: GStyle.grayBackColor,
          }}></Image>
        <Avatar
          image={{uri: profilePhoto}}
          size={96}
          borderWidth={2}
          containerStyle={{marginTop: -48}}
        />
      </View>
    );
  };

  _renderInputs = () => {
    const {
      fullName,
      email,
      userName,
      phoneNumber,
      location,
      errors = {},
    } = this.state;

    return (
      <>
        <TextField
          ref={this.fullNameRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitFullName}
          returnKeyType="next"
          editable={false}
          label="Full Name"
          value={fullName}
          error={errors.fullName}
          containerStyle={{marginTop: 24}}
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
          editable={false}
          label="Email"
          value={email}
          error={errors.email}
        />
        <TextField
          ref={this.userNameRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitUserName}
          returnKeyType="next"
          editable={false}
          label="Username"
          value={userName}
          error={errors.userName}
        />
        <TextField
          ref={this.phoneNumberRef}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitPhoneNumber}
          returnKeyType="next"
          editable={false}
          label="Phone Number"
          value={phoneNumber}
          error={errors.phoneNumber}
          containerStyle={{marginTop: 8}}
        />
        <TextField
          ref={this.locationRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitLocation}
          returnKeyType="next"
          editable={false}
          label="Location"
          value={location}
          error={errors.location}
        />
      </>
    );
  };
}

const styles = StyleSheet.create({
  buttonBlank: {
    width: 165,
    height: 50,
    justifyContent: 'center',
    backgroundColor: GStyle.snowColor,
    borderWidth: 1,
    borderRadius: GStyle.buttonRadius,
    borderColor: GStyle.activeColor,
  },

  textBlank: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
    color: GStyle.activeColor,
    textAlign: 'center',
  },
});

export default FCMoreProfileScreen;
