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

const img_tutorial1 = require('../assets/images/img_tutorial1.png');
const img_tutorial2 = require('../assets/images/img_tutorial2.png');
const img_tutorial3 = require('../assets/images/img_tutorial3.png');

const WINDOW_WIDTH = Helper.getWindowWidth();
const WINDOW_HEIGHT = Helper.getWindowHeight();
const CAROUSEL_WIDTH = WINDOW_WIDTH - 40;
const CAROUSEL_HEIGHT = WINDOW_HEIGHT * 0.6;

const tutorials = new Array(3).fill('');

class FTutorialScreen extends React.Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);

    console.log('FTutorialScreen start');
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onLogin = () => {
    this.props.navigation.navigate('fc_signin');
  }

  onSignup = () => {
    this.props.navigation.navigate('fc_signup');
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderTutorial()}
        {this._renderButton()}
      </View>
    );
  }

  _renderTutorial = () => {
    return (
      <View style={styles.tutorialContainer}>
        <View style={styles.tutorialFixedContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.scrollX,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={1}>
            <View style={styles.pageContainer} key={1}>
              <Image source={img_tutorial1} style={styles.img_tutorial1} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Find the right job that fits your skills and talent
                </Text>
              </View>
            </View>
            <View style={styles.pageContainer} key={2}>
              <Image source={img_tutorial2} style={styles.img_tutorial2} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Submit your proposal and get hired for the job
                </Text>
              </View>
            </View>
            <View style={styles.pageContainer} key={3}>
              <Image source={img_tutorial3} style={styles.img_tutorial3} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Complete the job and get paid through the app
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {tutorials.map((tutorial, imageIndex) => {
              const width = this.scrollX.interpolate({
                inputRange: [
                  WINDOW_WIDTH * (imageIndex - 1),
                  WINDOW_WIDTH * imageIndex,
                  WINDOW_WIDTH * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, {width}]}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.onLogin}>
            <View style={styles.buttonBlank}>
              <Text style={styles.textBlank}>Log In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSignup}>
            <View style={styles.buttonFill}>
              <Text style={styles.textFill}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('start here is clicked');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: GStyle.grayColor}}>Find a job. </Text>
            <Text style={{color: GStyle.linkColor}}>start here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  tutorialContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tutorialFixedContainer: {
    height: CAROUSEL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: CAROUSEL_WIDTH,
    flex: 3,
  },

  img_tutorial1: {
    flex: 3,
    width: 267,
    resizeMode: 'contain',
  },
  img_tutorial2: {
    flex: 3,
    width: 330,
    resizeMode: 'contain',
  },
  img_tutorial3: {
    flex: 3,
    width: 330,
    resizeMode: 'contain',
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    color: GStyle.fontColor,
    fontFamily: 'GothamPro-Medium',
    fontSize: 24,    
    lineHeight: 37,
    paddingHorizontal: 10,
  },

  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: GStyle.activeColor,
    marginHorizontal: 4,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
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

export default FTutorialScreen;
