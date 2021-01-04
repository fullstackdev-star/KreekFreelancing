import React from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import {TextInput} from 'react-native-gesture-handler';

const image_logo = require('../../assets/images/ic_logo.png');
const image_google = require('../../assets/images/ic_google.png');
const ic_share_facebook = require('../../assets/images/ic_share_facebook.png');
const ic_share_instagram = require('../../assets/images/ic_share_instagram.png');
const ic_share_twitter = require('../../assets/images/ic_share_twitter.png');
const ic_share_email = require('../../assets/images/ic_share_email.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

class FMoreInviteFriendNextScreen extends React.Component {
  state = {
    value: '',
  };

  handleTextChange = (newText) => this.setState({value: newText});

  constructor(props) {
    super(props);

    console.log('FMoreInviteFriendNextScreen start');

    this.state = {
      isVisible: true,
      isReady: false,
      showIndicator: false,

      email: '',
      password: '',
      phone_number: '',
      username: '',
      showPassword: false,
      accep_terms: false,
      selectedAddress: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
            <Text style={GStyles.titleText}>C10 to Your Friend</Text>
            <Text
              style={[
                GStyles.regularText,
                {
                  fontSize: 13,
                  lineHeight: 22,
                  textAlign: 'center',
                  marginTop: 48,
                },
              ]}>
              Your friends can just enter promotion code in checkout to get C10.
            </Text>

            <View
              style={[
                GStyles.rowEndContainer,
                GStyles.shadow,
                {
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  paddingHorizontal: 16,
                  marginTop: 24,
                },
              ]}>
              <TextInput
                style={[GStyles.mediumText, {flex: 1}]}
                underlineColorAndroid="transparent"
                placeholder="Promotion Code"
                autoCapitalize="none"
                onChangeText={this.handleEmail}
                defaultValue={'JACKSON345928'}
              />
              <TouchableOpacity>
                <Text
                  style={[
                    GStyles.mediumText,
                    {
                      textAlign: 'center',
                      color: GStyle.linkColor,
                    },
                  ]}>
                  Copy
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                GStyles.regularText,
                {fontSize: 13, textAlign: 'center', marginTop: 48},
              ]}>
              or share this link:
            </Text>

            <View
              style={[
                GStyles.rowEndContainer,
                GStyles.shadow,
                {
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  paddingHorizontal: 16,
                  marginTop: 24,
                },
              ]}>
              <TextInput
                style={[GStyles.mediumText, {flex: 1}]}
                underlineColorAndroid="transparent"
                placeholder="Promotion Code"
                autoCapitalize="none"
                onChangeText={this.handleEmail}
                defaultValue={'kreekafrica.com/refer/u345928'}
              />
              <TouchableOpacity>
                <Text
                  style={[
                    GStyles.mediumText,
                    {
                      textAlign: 'center',
                      color: '#0EAD69',
                    },
                  ]}>
                  Copied
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                GStyles.regularText,
                {fontSize: 13, textAlign: 'center', marginTop: 48},
              ]}>
              Share via
            </Text>

            <View style={{alignItems: 'center', marginTop: 20}}>
              <View style={[GStyles.rowEndContainer, {width: '70%'}]}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Facebook is clicked.');
                  }}>
                  <Image
                    source={ic_share_facebook}
                    style={[GStyles.image, {width: 40}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Instagram is clicked.');
                  }}>
                  <Image
                    source={ic_share_instagram}
                    style={[GStyles.image, {width: 40}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Twitter is clicked.');
                  }}>
                  <Image
                    source={ic_share_twitter}
                    style={[GStyles.image, {width: 40}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Email is clicked.');
                  }}>
                  <Image
                    source={ic_share_email}
                    style={[GStyles.image, {width: 40}]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={[
                GStyles.regularText,
                {
                  fontSize: 13,
                  lineHeight: 22,
                  textAlign: 'center',
                  marginTop: 16,
                },
              ]}>
              You'll see a preview before anything is posted. Please only share
              the offer with friends you know would be happy to receive it.
            </Text>
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
}

const styles = StyleSheet.create({
  logoImage: {
    width: 50,
    height: 54,
    resizeMode: 'contain',
    marginTop: 40,
  },

  forgetPassword: {
    fontSize: 13,
    fontFamily: 'GothamPro',
    textDecorationLine: 'underline',
    color: GStyle.grayColor,
    paddingVertical: 30,
  },

  socialText: {
    color: GStyle.grayColor,
    fontSize: 15,
    marginVertical: 10,
  },

  socialContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  socialImage: {
    width: 45,
    height: undefined,
    aspectRatio: 1 / 1,
  },

  bottomContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  notHave: {
    fontFamily: 'GothamPro',
    color: GStyle.grayColor,
    fontSize: 13,
  },

  signup: {
    fontFamily: 'GothamPro',
    fontSize: 13,
    color: GStyle.linkColor,
    paddingLeft: 5,
  },
});

export default FMoreInviteFriendNextScreen;
