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
import UserItem from '../../components/elements/UserItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_add_file = require('../../assets/images/ic_mini_file_add.png');
const ic_info = require('../../assets/images/ic_info.png');
const ic_clock = require('../../assets/images/ic_clock.png');
const ic_quote = require('../../assets/images/ic_quote.png');

class CProfessionalsRequestInterviewStep4Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsRequestInterviewStep4Screen start');

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
    console.log('---');
  };

  onAddSkill = () => {
    console.log('---');
  };

  onSend = () => {
    this.props.navigation.navigate('c_professionals_request_interview_step5');
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
            {this._renderUser()}
            {this._renderContact()}
            {this._renderWhen()}
            {this._renderDetails()}
            {this._renderAdditional()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Review"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderUser = () => {
    const item = {
      id: 'id1',
      avatar: img_avatar1,
      status: 'online',
      name: 'Edith Johnson',
      category: 'UI/UX Designer',
      location: 'Accra, Ghana',
      star: '4.85',
      reviewCount: '215',
      hourlyRate: 'C20',
      membership: 'Professional',
    };

    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 24}}>
          Interview with
        </Text>
        <UserItem item={item} onPress={this.onDetail} />
      </>
    );
  };

  _renderContact = () => {
    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 32}}>
          Contact via
        </Text>
        <Text style={{...GStyles.mediumText, marginTop: 24}}>
          Video Call Interview
        </Text>
        <Text
          style={{
            ...GStyles.regularText,
            fontSize: 13,
            lineHeight: 22,
            marginTop: 8,
          }}>
          You will be able to have a video call with Marian via the message page
          once confirmed.
        </Text>
      </>
    );
  };

  _renderWhen = () => {
    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 40}}>
          When
        </Text>
        <Text style={{...GStyles.regularText, marginTop: 20}}>
          Today, Oct 14
        </Text>
        <Text style={{...GStyles.regularText, marginTop: 12}}>
          17:00 - 17:30
        </Text>
      </>
    );
  };

  _renderDetails = () => {
    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 40}}>
          Details
        </Text>
        <Text style={{...GStyles.regularText, marginTop: 20}}>
          Fixed rate: GHC5000 - GHC10,000
        </Text>
        <Text style={{...GStyles.regularText, marginTop: 12}}>
          Payment method: Credit Card
        </Text>
      </>
    );
  };

  _renderAdditional = () => {
    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 40}}>
          Additional
        </Text>
        <Text style={{...GStyles.regularText, lineHeight: 24, marginTop: 16}}>
          I am looking for a great architectural designer to design my 4 story
          building house I have on paper.
        </Text>
      </>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSend} style={{marginVertical: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Send Request</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default CProfessionalsRequestInterviewStep4Screen;
