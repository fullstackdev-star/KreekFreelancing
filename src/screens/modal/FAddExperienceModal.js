import React, {Component} from 'react';
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
import PropTypes from 'prop-types';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import {TextField} from '../../lib/MaterialTextField/index';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import CheckBox from '../../lib/Checkbox/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const image_logo = require('../../assets/images/ic_calendar.png');
const image_radio_checked = require('../../assets/images/ic_radio_active.png');
const image_radio_unchecked = require('../../assets/images/ic_radio_inactive.png');

export default class FAddExperienceModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onPressCancel: PropTypes.func,
    onPressSave: PropTypes.func,
  };

  constructor(props) {
    super(props);

    console.log('FAddExperienceModal start');

    this.state = {
      title: global.isDebug ? 'Photoshop Expert' : '',
      company: global.isDebug ? 'KreekAfrica Group' : '',
      startDate: global.isDebug ? 'Sep 10, 2020' : '',
      endDate: global.isDebug ? 'Sep 20, 2020' : '',
      isCurrentWorking: global.isDebug ? true : false,
      description: global.isDebug
        ? 'I have been a full time Freelance digital artist with 5+ years of experience working in some of the best projects'
        : '',
    };

    this.initRef();
  }

  initRef = () => {
    this.titleRef = (ref) => {
      this.title = ref;
    };

    this.companyRef = (ref) => {
      this.company = ref;
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
    ['title', 'company']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitTitle = () => {
    this.company.focus();
  };

  onSubmitCompany = () => {
    this.company.blur();
  };

  onCancel = () => {
    this.props.onPressCancel();
  };

  onChangeSummary = (value) => {
    this.setState({description: value});
  };

  onSave = () => {
    const {
      title,
      company,
      startDate,
      endDate,
      isCurrentWorking,
      description,
    } = this.state;
    let errors = {};

    ['title', 'company'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});

    const errorCount = Object.keys(errors).length;
    if (errorCount < 1) {
      showPageLoader(true);
      RestAPI.add_experience(
        title,
        company,
        Helper.getDateString4Input(startDate),
        Helper.getDateString4Input(endDate),
        isCurrentWorking,
        description,
        (json, err) => {
          showPageLoader(false);

          if (err !== null) {
            Alert.alert(Constants.errorTitle, 'Failed to update experience.');
          } else {
            if (json.status === 1) {
              this.props.onPressSave();
            } else {
              Alert.alert(Constants.errorTitle, 'Failed to update experience.');
            }
          }
        },
      );
    }
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
        <View style={{flex: 1, backgroundColor: GStyle.modalBackColor}}>
          <View style={styles.centeredView}>
            <KeyboardAvoidingView
              style={styles.modalView}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              {this._renderTitle()}
              {this._renderInputs()}
              {this._renderDates()}
              {this._renderCheckbox()}
              {this._renderSummary()}
              {this._renderButton()}
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    );
  }

  _renderTitle = () => {
    return (
      <View style={GStyles.rowEndContainer}>
        <Text style={[GStyles.mediumText, {fontSize: 17}]}>Add Experience</Text>
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

  _renderTitle = () => {
    return (
      <View style={GStyles.rowEndContainer}>
        <Text style={[GStyles.mediumText, {fontSize: 17}]}>Add Experience</Text>
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

  _renderInputs = () => {
    let {title, company, errors = {}} = this.state;

    return (
      <>
        <TextField
          ref={this.titleRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitTitle}
          returnKeyType="next"
          label="Title"
          value={title}
          error={errors.title}
          containerStyle={{marginTop: 8}}
        />
        <TextField
          ref={this.companyRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitCompany}
          returnKeyType="done"
          label="Company"
          value={company}
          error={errors.company}
          containerStyle={{marginTop: 8}}
        />
      </>
    );
  };

  _renderDates = () => {
    const {startDate, endDate} = this.state;

    return (
      <>
        <View
          style={{
            height: 58,
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: GStyle.grayColor,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            Start
          </Text>
          <DatePicker
            style={{width: 180, marginTop: 5}}
            date={startDate}
            mode="date"
            androidMode="spinner"
            iconSource={image_logo}
            placeholder="select date"
            format="MMM DD, YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                width: 22,
                height: 22,
                position: 'absolute',
                left: 0,
                top: 6,
                marginLeft: 0,
                tintColor: GStyle.grayColor,
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
              },
              dateText: GStyles.mediumText,
              placeholderText: {
                fontFamily: 'GothamPro-Medium',
                fontSize: 15,
                color: GStyle.grayColor,
              },
            }}
            onDateChange={(date) => {
              this.setState({startDate: date});
            }}
          />
        </View>
        <View
          style={{
            height: 58,
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: GStyle.grayColor,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            End
          </Text>
          <DatePicker
            style={{width: 180, marginTop: 5}}
            date={endDate}
            mode="date"
            androidMode="spinner"
            iconSource={image_logo}
            placeholder="select date"
            format="MMM DD, YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                width: 22,
                height: 22,
                position: 'absolute',
                left: 0,
                top: 6,
                marginLeft: 0,
                tintColor: GStyle.grayColor,
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
              },
              dateText: GStyles.mediumText,
              placeholderText: {
                fontFamily: 'GothamPro-Medium',
                fontSize: 15,
                color: GStyle.grayColor,
              },
            }}
            onDateChange={(date) => {
              this.setState({endDate: date});
            }}
          />
        </View>
      </>
    );
  };

  _renderCheckbox = () => {
    const {isCurrentWorking} = this.state;

    return (
      <View style={{marginTop: 10}}>
        <CheckBox
          label={'I currently work here'}
          checked={isCurrentWorking}
          labelStyle={[GStyles.regularText, {marginLeft: 8}]}
          checkedImage={image_radio_checked}
          uncheckedImage={image_radio_unchecked}
          checkboxStyle={{width: 20, height: 20}}
        />
      </View>
    );
  };

  _renderSummary = () => {
    const {description} = this.state;

    return (
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: GStyle.lineColor,
          paddingBottom: 20,
        }}>
        <Text
          style={{
            color: GStyle.grayColor,
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            marginTop: 30,
          }}>
          Summary
        </Text>
        <TextInput
          placeholder="Please input your experience"
          multiline={true}
          numberOfLines={5}
          value={description}
          onChangeText={this.onChangeSummary}
          style={{...GStyles.regularText, lineHeight: 24, marginTop: 15}}
        />
      </View>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity
        style={{alignItems: 'flex-end', marginTop: 20, marginBottom: 10}}
        onPress={this.onSave}>
        <View style={styles.buttonFill}>
          <Text style={styles.textFill}>Save</Text>
        </View>
      </TouchableOpacity>
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
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 90,
    height: 36,
  },
  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
