import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

class FRequestsInviteUnconfirmedScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FRequestsInviteUnconfirmedScreen start');

    this.state = {
      value: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = newText => this.setState({value: newText});

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
      <SafeAreaView style={GStyles.statusBar}></SafeAreaView>
      <SafeAreaView style={GStyles.container}>
        {this._renderHeader()}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={GStyles.elementContainer}>
          {this._renderTitle()}
          {this._renderClient()}
          {this._renderDetails()}
          {this._renderDescription()}
          {this._renderDuration()}
          {this._renderLeftTime()}
          {this._renderButton()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      </>
    );
  }

  _renderTitle = () => {
    return (
      <>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.orangeColor,
          }}>
          Unconfirmed
        </Text>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 32}]}>
          You are invited to work on this job
        </Text>
      </>
    );
  };

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Request Details"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderClient = () => {
    return (
      <View style={{marginTop: 24}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={img_avatar1} style={[GStyles.image, {width: 59}]} />
          <View style={{marginLeft: 10}}>
            <View style={[GStyles.rowContainer, {marginTop: 15}]}>
              <Text style={GStyles.mediumText}>Marian Ramsey</Text>
              <Image
                source={ic_mini_dot}
                style={[GStyles.miniDot, {marginHorizontal: 8}]}
              />
              <Text style={GStyles.regularText}>4.0</Text>
              <Image
                source={ic_star}
                style={[GStyles.image, {width: 14, marginBottom: 3}]}
              />
            </View>
            <View style={[GStyles.rowContainer, {marginTop: 10}]}>
              <Text style={[GStyles.regularText, {fontSize: 13}]}>
                Accra, Ghana
              </Text>
              <Image
                source={ic_mini_dot}
                style={[GStyles.miniDot, {marginHorizontal: 8}]}
              />
              <Text style={[GStyles.regularText, {fontSize: 13}]}>
                GHC2000 spent
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderDetails = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 28}]}>Details</Text>
        <Text style={[GStyles.regularText, {lineHeight: 20, marginTop: 8}]}>
          Need an architectural design of a 4 story building
        </Text>
        <Text style={[GStyles.regularText, {marginTop: 8}]}>
          Fixed rate: GHC5000 - GHC10,000
        </Text>
        <Text style={[GStyles.regularText, {marginTop: 8}]}>
          Payment method: Credit Card
        </Text>
      </>
    );
  };

  _renderDescription = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Description
        </Text>
        <Text style={[GStyles.regularText, {lineHeight: 24, marginTop: 12}]}>
          I am looking for a great architectural designer to design my 4 story
          building house I have on paper. I have the idea and I want someone to
          be able to draw it for me to have a feel of how it will be.{'\n\n'} I
          should have an experince in this field and be able to a 3D design
          including a 360 degree virtual of the house.
        </Text>
      </>
    );
  };

  _renderDuration = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Duration
        </Text>
        <Text style={[GStyles.regularText, {lineHeight: 20, marginTop: 12}]}>
          One Month starting immediately
        </Text>
      </>
    );
  };

  _renderLeftTime = () => {
    return (
      <Text
        style={[
          GStyles.regularText,
          {fontSize: 13, color: GStyle.grayColor, marginTop: 26},
        ]}>
        You have 19 hours left to response
      </Text>
    );
  };

  _renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this.onBack}>
          <View style={styles.buttonBlank}>
            <Text style={styles.textBlank}>Decline</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onBack}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Accept</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 40,
  },

  buttonBlank: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GStyle.snowColor,
    borderWidth: 1,
    borderRadius: GStyle.buttonRadius,
    borderColor: GStyle.activeColor,
    width: 155,
    height: 50,
  },

  buttonFill: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 155,
    height: 50,
  },

  textBlank: {
    textAlign: 'center',
    color: GStyle.activeColor,
    fontSize: 16,
    fontWeight: 'bold',
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FRequestsInviteUnconfirmedScreen;
