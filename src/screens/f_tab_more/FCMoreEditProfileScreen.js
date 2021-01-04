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
import ModalSelector from '../../lib/ModalSelector/index';
import ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-native-phone-input';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {TextField} from '../../lib/MaterialTextField/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import Avatar from '../../components/elements/Avatar';

const ic_location = require('../../assets/images/ic_location.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_edit = require('../../assets/images/ic_edit_3.png');

class FCMoreEditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCMoreEditProfileScreen start');

    this.init();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  init = () => {
    this.state = {
      secureTextEntry: true,

      firstName: global.me.first_name,
      lastName: global.me.last_name,
      email: global.me.email,
      userName: global.me.user_name,
      password: '',
      phoneNumber: global.me.phone_number ? global.me.phone_number : '',
      phoneCountryCode: '',

      // countryName: '',
      // countryId: '',
      // cityName: '',
      // cityId: '',
      // zipCode: global.me.zip_code ? global.me.zip_code : '',
      companyName: global.me.company_name ? global.me.company_name : '',
      display: global.me.display ? global.me.display : '',

      profilePhotoUri: global.me.profile_photo,
      coverPhotoUri: global.me.cover_photo,
      coverPhoto: null,
      profilePhoto: null,
    };

    this.initRef();
  };

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
    this.userNameRef = (ref) => {
      this.userName = ref;
    };
    this.passwordRef = (ref) => {
      this.password = ref;
    };
    this.phoneNumberRef = (ref) => {
      this.phoneNumber = ref;
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
    ['firstName', 'lastName', 'email', 'userName', 'password']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
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

  onSubmitFirstName = () => {
    this.lastName.focus();
  };

  onSubmitLastName = () => {
    this.email.focus();
  };

  onSubmitEmail = () => {
    this.userName.focus();
  };

  onSubmitUserName = () => {
    this.password.focus();
  };

  onSubmitPassword = () => {
    this.password.focus();
  };

  onPressCoverPhoto = () => {
    const options = {
      title: 'Select Cover Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          coverPhoto: source,
        });
      }
    });
  };

  onPressProfilePhoto = () => {
    const options = {
      title: 'Select Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          profilePhoto: source,
        });
      }
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onChangePhoneNumber = (value) => {
    this.setState({
      phoneNumber: value,
      phoneCountryCode: this.phoneNumber.getCountryCode(),
    });
  };

  onChangePhoneCountry = (value) => {
    this.setState({
      phoneCountryCode: this.phoneNumber.getCountryCode(),
    });
  };

  onChangeCountry = (value) => {
    this.setState({
      countryName: value.label,
      countryId: value.key,
      cityName: '',
      cityId: '',
    });

    showPageLoader(true);
    RestAPI.get_city_list_by_country(value.key, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to login.');
      } else {
        if (json.status === 1) {
          this.setState({cityDatas: json.data.city_list});
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to login.');
        }
      }
    });
  };

  onChangeCity = (value) => {
    this.setState({cityName: value.label});
    this.setState({cityId: value.key});
  };

  onSave = () => {
    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      phoneNumber,
      phoneCountryCode,
      companyName,
      display,
      profilePhoto,
      coverPhoto,
    } = this.state;
    let errors = {};

    ['firstName', 'lastName', 'email', 'userName'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      if (!phoneNumber) {
        Alert.alert(Constants.warningTitle, 'Please input all fields.');
        return;
      }

      const validPhoneNumber = phoneNumber.startsWith('+')
        ? phoneNumber
        : '+' + phoneCountryCode + phoneNumber;
      const params = {
        photo: profilePhoto ? profilePhoto.uri : '',
        cover_photo: coverPhoto ? coverPhoto.uri : '',
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        company_name: companyName,
        display: display,
        password: password,
        phone_number: validPhoneNumber,
      };

      showPageLoader(true);
      RestAPI.update_user_info(params, (json, err) => {
        showPageLoader(false);

        if (err !== null) {
          Alert.alert(
            Constants.errorTitle,
            'Failed to update your information, please try again.',
          );
        } else {
          if (json.status === 1) {
            this.props.navigation.navigate('c_main_tab_navigator');
          } else {
            Alert.alert(
              Constants.errorTitle,
              'Failed to update your information, please try again.',
            );
          }
        }
      });
    }
  };

  onVerify = () => {
    this.props.navigation.navigate('fc_more_verify_id');
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
            {this._renderMainInputs()}
            {this._renderPhoneNumber()}
            {this._renderCompanyInfo()}
            {this._renderButton()}
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
        rightType="save"
        onPressRightButton={this.onSave}
      />
    );
  };

  _renderAvartar = () => {
    const {
      profilePhotoUri,
      coverPhotoUri,
      coverPhoto,
      profilePhoto,
    } = this.state;
    const isCoverPhotoSelected = coverPhoto == null ? false : true;
    const isProfilePhotoSelected = profilePhoto == null ? false : true;

    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            height: 165,
            backgroundColor: GStyle.grayBackColor,
          }}>
          <Image
            source={isCoverPhotoSelected ? coverPhoto : {uri: coverPhotoUri}}
            style={{width: '100%', height: '100%'}}></Image>
          <View
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              right: 16,
              top: 16,
            }}>
            <TouchableOpacity onPress={this.onPressCoverPhoto}>
              <Image
                source={ic_edit}
                style={{
                  ...GStyles.image,
                  width: 20,
                  tintColor: GStyle.linkColor,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Avatar
          image={isProfilePhotoSelected ? profilePhoto : {uri: profilePhotoUri}}
          size={96}
          borderWidth={2}
          containerStyle={{marginTop: -48}}
        />
        <TouchableOpacity onPress={this.onPressProfilePhoto}>
          <Text
            style={[
              GStyles.regularText,
              {fontSize: 13, color: GStyle.linkColor, marginTop: 16},
            ]}>
            Edit photo
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderMainInputs = () => {
    const {
      errors = {},
      secureTextEntry,
      firstName,
      lastName,
      email,
      userName,
      password,
    } = this.state;

    return (
      <>
        <TextField
          ref={this.firstNameRef}
          autoCorrect={false}
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
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitLastName}
          returnKeyType="next"
          label="Last Name"
          value={lastName}
          error={errors.lastName}
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
          disabled={true}
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
          label="Username"
          value={userName}
          error={errors.userName}
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
          error={errors.password}
          renderRightAccessory={this.renderPasswordAccessory}
          containerStyle={{marginTop: 8}}
        />
      </>
    );
  };

  _renderPhoneNumber = () => {
    const {phoneNumber} = this.state;

    return (
      <View
        style={{
          ...GStyles.borderBottom,
          height: 58,
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
            marginBottom: 10,
          }}>
          Phone number
        </Text>
        <PhoneInput
          ref={this.phoneNumberRef}
          onChangePhoneNumber={this.onChangePhoneNumber}
          onSelectCountry={this.onChangePhoneCountry}
          flagStyle={{width: 26, height: 15, resizeMode: 'contain'}}
          textStyle={{...GStyles.mediumText}}
          value={phoneNumber}
        />
      </View>
    );
  };

  _renderCompanyInfo = () => {
    let {companyName, display, errors = {}} = this.state;
    let index = 0;
    const itemTypeData = [
      {key: index++, section: true, label: 'Company display type'},
      {key: index++, label: 'company'},
      {key: index++, label: 'name'},
    ];

    return (
      <>
        <TextField
          ref={this.companyNameRef}
          autoCorrect={false}
          autoCapitalize="none"
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitCompanyName}
          returnKeyType="done"
          label="Company name"
          value={companyName}
          error={errors.companyName}
          containerStyle={{marginTop: 12}}
        />

        <View
          style={[
            GStyles.borderBottom,
            {width: '100%', height: 58, marginTop: 20},
          ]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            Company display
          </Text>
          <ModalSelector
            data={itemTypeData}
            initValue="Select one"
            accessible={true}
            onChange={(option) => {
              this.setState({display: option.label});
            }}>
            <View style={GStyles.rowEndContainer}>
              <TextInput
                style={[GStyles.mediumText, {height: 45, flex: 1}]}
                editable={false}
                placeholder="Select one"
                value={display}
              />
              <Image
                source={ic_dropdown}
                style={[GStyles.image, {width: 16}]}
              />
            </View>
          </ModalSelector>
        </View>
      </>
    );
  };

  _renderButton = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 40}}>
        <TouchableOpacity onPress={this.onVerify}>
          <View style={styles.buttonBlank}>
            <Text style={styles.textBlank}>Verify ID</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  ___renderCountry = () => {
    const {errors = {}, countryName, countryId} = this.state;

    let countryList = [{key: 0, section: true, label: 'Countries'}];
    global.country_list.forEach((countryItem) => {
      countryList.push({
        key: countryItem.id,
        label: countryItem.name,
      });
    });

    return (
      <>
        <View
          style={{
            width: '100%',
            height: 58,
            borderColor: GStyle.lineColor,
            borderBottomWidth: 1,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            I`m located in
          </Text>
          <ModalSelector
            data={countryList}
            initValue="Select one"
            accessible={true}
            onChange={this.onChangeCountry}>
            <View style={GStyles.rowEndContainer}>
              <TextInput
                style={[GStyles.mediumText, {height: 45, flex: 1}]}
                editable={false}
                placeholder="Select one"
                value={countryName}
              />
              <Image
                source={ic_location}
                style={[GStyles.image, {width: 24}]}
              />
            </View>
          </ModalSelector>
        </View>
      </>
    );
  };

  ___renderCity = () => {
    const {errors = {}, cityName, cityId, cityDatas} = this.state;

    let cityList = [{key: 0, section: true, label: 'Cities'}];
    if (cityDatas) {
      cityDatas.forEach((cityItem) => {
        cityList.push({
          key: cityItem.id,
          label: cityItem.name,
        });
      });
    }

    return (
      <>
        <View
          style={[
            GStyles.borderBottom,
            {width: '100%', height: 58, marginTop: 20},
          ]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            City
          </Text>
          <ModalSelector
            data={cityList}
            initValue="Select one"
            accessible={true}
            onChange={this.onChangeCity}>
            <View style={GStyles.rowEndContainer}>
              <TextInput
                style={[GStyles.mediumText, {height: 45, flex: 1}]}
                editable={false}
                placeholder="Select one"
                value={cityName}
              />
              <Image
                source={ic_dropdown}
                style={[GStyles.image, {width: 16}]}
              />
            </View>
          </ModalSelector>
        </View>
      </>
    );
  };

  ___renderZipCode = () => {
    const {errors = {}, zipCode} = this.state;

    return (
      <>
        <TextField
          ref={this.zipCodeRef}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitZipCode}
          returnKeyType="done"
          label="Zip Code"
          value={zipCode}
          error={errors.zipCode}
          containerStyle={{marginTop: 8}}
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

export default FCMoreEditProfileScreen;
