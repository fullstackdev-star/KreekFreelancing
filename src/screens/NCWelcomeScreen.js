import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Alert,
} from 'react-native';

import {GStyle, GStyles, Global, Helper} from '../utils/Global/index';

const image_logo = require('../assets/images/ic_logo.png');

class NCWelcomeScreen extends React.Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);

    console.log('NCWelcomeScreen start');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onDashboard = () => {
    this.props.navigation.navigate('c_main_tab_navigator')
  };

  onCreateJob = () => {
    Alert.alert('Create a new Job is clicked.');
  };

  render() {
    return (
      <SafeAreaView style={GStyles.centerContainer}>
        {this._renderMessage()}
        {this._renderButton()}
      </SafeAreaView>
    );
  }

  _renderMessage = () => {
    return (
      <>
        <Image
          source={image_logo}
          style={{width: 101, height: 109, resizeMode: 'contain'}}
        />
        <Text style={[GStyles.titleText, {marginTop: 36}]}>
          Welcome to KreekAfrica!
        </Text>
        <Text style={[GStyles.notifyDescription, {marginTop: 8}]}>
          The Smart New Way Of Working
        </Text>
      </>
    );
  };

  _renderButton = () => {
    return (
      <View
        style={{
          height: 116,
          justifyContent: 'space-between',
          marginTop: 32,
        }}>
        <TouchableOpacity onPress={this.onDashboard}>
          <View style={styles.buttonBlank}>
            <Text style={styles.textBlank}>See your dashboard</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onCreateJob}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Create a new job</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonBlank: {
    width: 240,
    height: 50,
    justifyContent: 'center',
    backgroundColor: GStyle.snowColor,
    borderWidth: 1,
    borderRadius: GStyle.buttonRadius,
    borderColor: GStyle.activeColor,
  },

  buttonFill: {
    width: 240,
    height: 50,
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
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

export default NCWelcomeScreen;
