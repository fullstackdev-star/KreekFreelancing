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


const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');



class FRequestsInviteAcceptedScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FRequestsInviteAcceptedScreen start');

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
        <SafeAreaView style={GStyles.statusBar} />
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
            {this._renderCancelButton()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Request Details"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={styles.statusText}>Accepted</Text>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 32}]}>
          You are invited to work on this job
        </Text>
      </>
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

  _renderCancelButton = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={this.onBack}>
          <View
            style={{
              width: 160,
              height: 36,
              justifyContent: 'center',
              backgroundColor: GStyle.snowColor,
              borderColor: GStyle.grayColor,
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 36,
            }}>
            <Text
              style={{
                fontFamily: 'GothamPro-Medium',
                fontSize: 15,
                color: GStyle.grayColor,
                textAlign: 'center',
              }}>
              Cancel Invite
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 50}}>
        <TouchableOpacity onPress={this.onBack}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Send a Message</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 59,
    height: 59,
    resizeMode: 'contain',
  },

  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  miniDotImage: {
    width: 3,
    height: 3,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },

  smallStarImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginBottom: 4,
  },

  statusText: {
    textAlign: 'center',
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
    color: GStyle.activeColor,
  },

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

export default FRequestsInviteAcceptedScreen;
