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
const ic_quote = require('../../assets/images/ic_quote.png');

class CProfessionalsRequestInterviewStep2Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsRequestInterviewStep2Screen start');

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

  onAddSkill = () => {
    console.log('---');
  };

  onNext = () => {
    this.props.navigation.navigate('c_professionals_request_interview_step3');
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
            {this._renderAbout()}
            {this._renderSkills()}
            {this._renderAddSkill()}
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
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 2 of 3</Text>
        <Text style={GStyles.titleText}>About your project</Text>
      </>
    );
  };

  _renderAbout = () => {
    return (
      <View style={{...GStyles.borderBottom}}>
        <Image
          source={ic_quote}
          style={{...GStyles.image, width: 24, marginTop: 16}}
        />
        <TextInput
          placeholder="Please input review"
          multiline={true}
          numberOfLines={5}
          style={{
            ...GStyles.regularText,
            fontSize: 13,
            height: 180,
            lineHeight: 22,
            marginTop: 4,
          }}
          value={
            'She was very warm and sweet with with great talent. She was able to put my thoughs into a very insigntly design and the results were outstand, I will higly recommend her for your branding needs.'
          }
        />
      </View>
    );
  };

  _renderSkills = () => {
    const skillDatas = [
      {id: 'id1', skill: 'Photoshop'},
      {id: 'id2', skill: 'Cats'},
      {id: 'id3', skill: 'Others'},
    ];

    return (
      <>
        <Text style={{...GStyles.mediumText, fontSize: 17, marginTop: 40}}>
          Skills
        </Text>
        {skillDatas.map((item, i) => {
          return (
            <Text key={i} style={{...GStyles.regularText, marginVertical: 20}}>
              {item.skill}
            </Text>
          );
        })}
      </>
    );
  };

  _renderAddSkill = () => {
    return (
      <TouchableOpacity onPress={this.onAddSkill}>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={(GStyles.regularText, {color: GStyle.grayColor})}>
            Add Skill
          </Text>
          <Image source={ic_info} style={[GStyles.image, {width: 18}]} />
        </View>
      </TouchableOpacity>
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

export default CProfessionalsRequestInterviewStep2Screen;
