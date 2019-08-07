import React from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-gesture-handler';

import {BallIndicator} from 'react-native-indicators';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

const image_job = require('../../assets/images/ic_job.png');

class FNoInvitesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FNoInvitesScreen start');

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

  async componentDidMount() {}

  componentWillUnmount() {}

  onGoBack = () => {
    console.log('-*- onGoBack');
    this.props.navigation.navigate('fc_signin');
  };

  render() {
    let logoImageWidth =
      WINDOW_WIDTH < WINDOW_HEIGHT ? WINDOW_WIDTH / 2.5 : WINDOW_HEIGHT / 2.5;

    return (
      <>
        <SafeAreaView style={styles.background}>
          <Image
            source={image_job}
            style={{width: 160, height: 160, resizeMode: 'contain'}}
          />
          <View style={styles.title_view}>
            <Text
              style={{
                fontFamily: 'GothamPro-Medium',
                color: GStyle.fontColor,
                fontSize: 17,
              }}>
              No bookings request yet!
            </Text>
            <View
              style={{
                width: '80%',
                marginTop: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: GStyle.fontColor,
                  fontFamily: 'GothamPro',
                  fontSize: 15,
                  lineHeight: 24,
                }}>
                You haven't accepted any job request from a client yet
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title_view: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  input_view: {
    width: '100%',
    height: 60,
    borderBottomColor: GStyle.lineColor,
    borderBottomWidth: 1,
    alignItems: 'stretch',
    marginBottom: 30,
  },
  input_title_text: {
    height: '35%',
    fontFamily: 'GothamPro',
    color: GStyle.fontColor,
    fontSize: 13,
  },
  input_text: {
    width: '100%',
    height: '65%',
    color: GStyle.fontColor,
    fontSize: 15,
    fontWeight: 'bold',
  },

  buttonFill: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: BUTTON_WIDTH,
    height: 50,
  },
  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  social_signup: {
    width: '100%',
    height: 100,
    marginTop: 20,
  },

  bottom_view: {
    flexDirection: 'row',
    height: 30,
  },
});

export default FNoInvitesScreen;
