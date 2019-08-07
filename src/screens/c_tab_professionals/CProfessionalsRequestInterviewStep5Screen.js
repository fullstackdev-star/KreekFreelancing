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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const image_success = require('../../assets/images/ic_success.png');

class CProfessionalsRequestInterviewStep5Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsRequestInterviewStep5Screen start');

    this.state = {
      isVisible: true,
      isReady: false,
      showIndicator: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onGo = () => {
    this.props.navigation.navigate('c_main_tab_navigator');
  };

  render() {
    return (
      <SafeAreaView style={GStyles.centerContainer}>
        {this._renderImage()}
        {this._renderMessage()}
        {this._renderButton()}
      </SafeAreaView>
    );
  }

  _renderImage = () => {
    return (
      <Image source={image_success} style={[GStyles.image, {width: 100}]} />
    );
  };

  _renderMessage = () => {
    return (
      <>
        <Text style={GStyles.notifyTitle}>Request sent!</Text>
        <Text style={GStyles.notifyDescription}>
          Your request has been sent successfully. {'\n'}Edith will have 48
          hours to responsed to request.
        </Text>
      </>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity onPress={this.onGo}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Go Dashboard</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 200,
    height: 50,
  },

  textFill: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default CProfessionalsRequestInterviewStep5Screen;