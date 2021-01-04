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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

const image_success = require('../../assets/images/ic_success.png');

class FCPaymentSuccessScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCPaymentSuccessScreen start');

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onContinue = () => {
    if (global.roleId == 1) {
      this.props.navigation.navigate('f_main_tab_navigator');
    } else if (global.roleId == 2) {
      this.props.navigation.navigate('c_main_tab_navigator');
    }
  };

  render() {
    let logoImageWidth =
      WINDOW_WIDTH < WINDOW_HEIGHT ? WINDOW_WIDTH / 2.5 : WINDOW_HEIGHT / 2.5;

    return (
      <>
        <SafeAreaView style={GStyles.centerContainer}>
          {this._renderMessage()}
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderMessage = () => {
    return (
      <>
        <Image source={image_success} style={[GStyles.image, {width: 100}]} />
        <Text style={[GStyles.notifyTitle, {fontSize: 24}]}>
          Payment Successful!
        </Text>
        <Text style={GStyles.notifyDescription}>
          Thank you for subscribing to professional {'\n'}membership, your card
          will be charged after your {'\n'}one month free trial
        </Text>
      </>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onContinue} style={{marginTop: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Continue</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default FCPaymentSuccessScreen;
