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
  useColorScheme,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

import ModalSelector from '../../lib/ModalSelector/index';

import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import {TextField} from '../../lib/MaterialTextField/index';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import PhoneInput from 'react-native-phone-input';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_location = require('../../assets/images/ic_location.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_file_upload = require('../../assets/images/ic_file_upload.png');

class FCAccountStep1Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCAccountStep1Screen start');

    this.state = {
      coverPhoto: null,
      profilePhoto: null,
      firstName: global.isDebug ? 'Dick' : '',
      lastName: global.isDebug ? 'Arnold' : '',
      email: global.isDebug
        ? global.roleId == 1
          ? 'crn221@163.com'
          : 'dickarnold221@gmail.com'
        : '',
      userName: global.isDebug ? 'dick0221' : '',
      birthday: global.isDebug ? 'Jun 09, 1991' : '',
      companyName: global.isDebug ? 'KreekAfricaGroup' : '',
      display: 'name',
      phoneNumber: '',
      phoneCountryCode: '',
      countryName: '',
      countryId: '',
      cityName: '',
      cityId: '',
      cityDatas: {},
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
    this.userNameRef = (ref) => {
      this.userName = ref;
    };
    this.companyNameRef = (ref) => {
      this.companyName = ref;
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
    ['firstName', 'lastName', 'email', 'userName', 'companyName']
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
    this.userName.focus();
  };

  onSubmitUserName = () => {
    this.companyName.focus();
  };

  onSubmitCompanyName = () => {
    this.companyName.blur();
  };

  onBack = () => {
    this.props.navigation.goBack();
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

  onChangeBirthday = (date) => {
    this.setState({birthday: date});
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
        Helper.alertNetworkError();
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

  onSubmit = () => {
    const {
      coverPhoto,
      profilePhoto,
      firstName,
      lastName,
      userName,
      birthday,
      companyName,
      display,
      phoneNumber,
      phoneCountryCode,
      countryId,
      cityId,
    } = this.state;
    let errors = {};

    ['firstName', 'lastName', 'userName', 'companyName'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });
    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      if (
        !coverPhoto ||
        !profilePhoto ||
        !birthday ||
        !display ||
        !phoneNumber ||
        !countryId ||
        !cityId
      ) {
        Alert.alert(Constants.warningTitle, 'Please input all fields.');
        return;
      }

      const validPhoneNumber = phoneNumber.startsWith('+')
        ? phoneNumber
        : '+' + phoneCountryCode + phoneNumber;
      const params = {
        photo: profilePhoto.uri,
        cover_photo: coverPhoto.uri,
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        birthday: birthday,
        company_name: companyName,
        display: display,
        phone_number: validPhoneNumber,
        country_id: countryId,
        city_id: cityId,
        zip_code: '',
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
            this.props.navigation.navigate('fc_account_step_second');
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
            {this._renderCoverPhoto()}
            {this._renderProfilePhoto()}
            {this._renderUserInfo()}
            {this._renderBirthday()}
            {this._renderCompanyInfo()}
            {this._renderDisplay()}
            {this._renderPhoneNumber()}
            {this._renderCountry()}
            {this._renderCity()}
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
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 1 of 3</Text>
        <Text style={GStyles.titleText}>Great, lets get to know you</Text>
      </>
    );
  };

  _renderCoverPhoto = () => {
    const {coverPhoto} = this.state;
    const isCoverPhotoSelected = coverPhoto == null ? false : true;

    return (
      <>
        <Text style={{...GStyles.regularText, marginTop: 20}}>Cover photo</Text>
        <TouchableOpacity onPress={this.onPressCoverPhoto}>
          <View
            style={{
              ...GStyles.centerContainer,
              width: '100%',
              height: 124,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 16,
            }}>
            {!isCoverPhotoSelected && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{...GStyles.image, width: 24}}
                />
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 13,
                    color: GStyle.linkColor,
                    marginTop: 8,
                  }}>
                  UPLOAD COVER
                </Text>
              </View>
            )}
            {isCoverPhotoSelected && (
              <Image
                source={coverPhoto}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  _renderProfilePhoto = () => {
    const {profilePhoto} = this.state;
    const isProfilePhotoSelected = profilePhoto == null ? false : true;

    return (
      <>
        <Text style={{...GStyles.regularText, marginTop: 20}}>
          Profile photo
        </Text>
        <TouchableOpacity onPress={this.onPressProfilePhoto}>
          <View
            style={{
              ...GStyles.centerContainer,
              width: '50%',
              height: 124,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 16,
            }}>
            {!isProfilePhotoSelected && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{...GStyles.image, width: 24}}
                />
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 13,
                    color: GStyle.linkColor,
                    marginTop: 8,
                  }}>
                  UPLOAD IMAGE
                </Text>
              </View>
            )}
            {isProfilePhotoSelected && (
              <Image
                source={profilePhoto}
                style={{width: '100%', height: 124, resizeMode: 'contain'}}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  _renderUserInfo = () => {
    const {firstName, lastName, email, userName, errors = {}} = this.state;

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
        />
        <TextField
          ref={this.emailRef}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          disabled={true}
          returnKeyType="next"
          label="Email"
          value={email}
          error={errors.email}
        />
        <TextField
          ref={this.userNameRef}
          autoCorrect={false}
          autoCapitalize="none"
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitUserName}
          returnKeyType="done"
          label="Choose a username"
          value={userName}
          error={errors.userName}
        />
      </>
    );
  };

  _renderBirthday = () => {
    const {birthday} = this.state;

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
            marginBottom: 5,
          }}>
          Birthday
        </Text>
        <DatePicker
          style={{width: 180}}
          date={birthday}
          mode="date"
          androidMode="spinner"
          iconSource={ic_calendar}
          placeholder="select date"
          format="MMM DD, YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              width: 24,
              height: 24,
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              tintColor: GStyle.grayColor,
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0,
            },
            dateText: {
              color: GStyle.fontColor,
              fontSize: 15,
              fontWeight: 'bold',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={this.onChangeBirthday}
        />
      </View>
    );
  };

  _renderCompanyInfo = () => {
    let {companyName, errors = {}} = this.state;

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
      </>
    );
  };

  _renderDisplay = () => {
    let index = 0;
    const itemTypeData = [
      {key: index++, section: true, label: 'Company display type'},
      {key: index++, label: 'company'},
      {key: index++, label: 'name'},
    ];

    return (
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
            this.setState({paymentTypeValue: option.label});
          }}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={this.state.paymentTypeValue}
            />
            <Image source={ic_dropdown} style={[GStyles.image, {width: 16}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderPhoneNumber = () => {
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
        />
      </View>
    );
  };

  _renderCountry = () => {
    const {countryName} = this.state;

    let countryList = [{key: 0, section: true, label: 'Countries'}];
    global.country_list.forEach((countryItem) => {
      countryList.push({
        key: countryItem.id,
        label: countryItem.name,
      });
    });

    return (
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
            <Image source={ic_location} style={[GStyles.image, {width: 24}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderCity = () => {
    const {cityDatas, cityName} = this.state;

    let cityList = [{key: 0, section: true, label: 'Cities'}];
    if (Object.keys(cityDatas).length > 0) {
      cityDatas.forEach((cityItem) => {
        cityList.push({
          key: cityItem.id,
          label: cityItem.name,
        });
      });
    }

    return (
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
            <Image source={ic_dropdown} style={[GStyles.image, {width: 16}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 40}}>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  ___renderGender = () => {
    const {gender} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 30}]}>Gender</Text>
        <View style={{marginTop: 20}}>
          <RadioGroup
            normalMode={true}
            radioGroupList={[
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
            ]}
            initialValue={gender}
            onChange={this.onChangeGender}
          />
        </View>
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default FCAccountStep1Screen;
