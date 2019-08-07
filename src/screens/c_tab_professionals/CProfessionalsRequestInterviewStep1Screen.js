import React from 'react';
import {
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

import {TextField} from '../../lib/MaterialTextField/index';
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
import DatePicker from '../../components/elements/DatePicker/datepicker';
import CheckBox from '../../lib/Checkbox/index';
import SwitchSelector from '../../lib/SwitchSelector/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import GHeaderBar from '../../components/GHeaderBar';
import ModalSelector from '../../lib/ModalSelector/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import Avatar from '../../components/elements/Avatar';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_add_file = require('../../assets/images/ic_mini_file_add.png');
const ic_info = require('../../assets/images/ic_info.png');
const ic_clock = require('../../assets/images/ic_clock.png');

class CProfessionalsRequestInterviewStep1Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsRequestInterviewStep1Screen start');

    this.state = {
      interviewDate: '',
      interviewStartTime: '',
      interviewEndTime: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onCancel = () => {
    this.props.navigation.navigate('c_professionals_profile');
  };

  onNext = () => {
    this.props.navigation.navigate('c_professionals_request_interview_step2');
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
            {this._renderInterviewType()}
            {this._renderInterviewDate()}
            {this._renderInterviewTime()}
          </KeyboardAwareScrollView>
          {this._renderButton()}
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
        rightType="cancel"
        onPressRightButton={this.onCancel}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 1 of 3</Text>
        <Text style={GStyles.titleText}>Interview plan</Text>
      </>
    );
  };

  _renderInterviewType = () => {
    const sortByOptions = [
      {label: 'Phone Call', value: '1'},
      {label: 'Video Call', value: '2'},
      {label: 'Messages', value: '3'},
    ];

    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 40}}>
          Interview via
        </Text>
        <SwitchSelector
          options={sortByOptions}
          borderRadius={10}
          buttonColor={GStyle.activeColor}
          backgroundColor={GStyle.grayBackColor}
          textColor={GStyle.grayColor}
          initial={0}
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
          style={{marginTop: 24}}
        />
      </>
    );
  };

  _renderInterviewDate = () => {
    const {interviewDate} = this.state;

    return (
      <View style={[GStyles.borderBottom, {height: 58, marginTop: 40}]}>
        <Text style={GStyles.elementLabel}>Interview Date</Text>
        <DatePicker
          style={{width: 180, marginTop: 6}}
          date={interviewDate}
          mode="date"
          androidMode="spinner"
          iconSource={ic_calendar}
          placeholder="select date"
          format="MMM DD, YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              width: 20,
              height: 20,
              position: 'absolute',
              left: 0,
              top: 8,
              marginLeft: 0,
              tintColor: GStyle.grayColor,
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0,
            },
            dateText: GStyles.mediumText,
          }}
          onDateChange={(date) => {
            this.setState({interviewDate: date});
          }}
        />
      </View>
    );
  };

  _renderInterviewTime = () => {
    const {interviewStartTime, interviewEndTime} = this.state;

    return (
      <View style={{...GStyles.rowEndContainer, marginTop: 40}}>
        <View style={[GStyles.borderBottom, {width: '45%', height: 58}]}>
          <Text style={GStyles.elementLabel}>From</Text>
          <DatePicker
            style={{
              width: 130,
              marginTop: 6,
            }}
            date={interviewStartTime}
            mode="time"
            androidMode="spinner"
            iconSource={ic_clock}
            placeholder="select time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                width: 20,
                height: 20,
                position: 'absolute',
                left: 0,
                top: 8,
                marginLeft: 0,
                tintColor: GStyle.grayColor,
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
              },
              dateText: GStyles.mediumText,
            }}
            onDateChange={(date) => {
              this.setState({interviewStartTime: date});
            }}
          />
        </View>
        <View style={[GStyles.borderBottom, {width: '45%', height: 58}]}>
          <Text style={GStyles.elementLabel}>To</Text>
          <DatePicker
            style={{
              width: 130,
              marginTop: 6,
            }}
            date={interviewEndTime}
            mode="time"
            androidMode="spinner"
            iconSource={ic_clock}
            placeholder="select time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                width: 20,
                height: 20,
                position: 'absolute',
                left: 0,
                top: 8,
                marginLeft: 0,
                tintColor: GStyle.grayColor,
              },
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
              },
              dateText: GStyles.mediumText,
            }}
            onDateChange={(date) => {
              this.setState({interviewEndTime: date});
            }}
          />
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 8}}>
        <View style={{...GStyles.rowEndContainer, width: '88%'}}>
          <View style={{...GStyles.rowContainer, flex: 1}}>
            <Avatar image={img_avatar1} size={40} />
            <View style={{marginLeft: 10}}>
              <Text style={{...GStyles.mediumText, fontSize: 13}}>
                Edith Johnson
              </Text>
              <Text
                style={{
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 13,
                  color: GStyle.grayColor,
                  marginTop: 4,
                }}>
                C20/hr
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.onNext}>
            <View style={styles.buttonFill}>
              <Text style={styles.textFill}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 128,
    height: 50,
  },

  textFill: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default CProfessionalsRequestInterviewStep1Screen;
