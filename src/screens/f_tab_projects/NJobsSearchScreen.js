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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const image_search = require('../../assets/images/ic_search.png');
const image_category_development = require('../../assets/images/ic_category_development.png');
const image_category_design = require('../../assets/images/ic_category_design.png');
const image_category_business = require('../../assets/images/ic_category_business.png');
const image_category_sales = require('../../assets/images/ic_category_sales.png');
const image_category_support = require('../../assets/images/ic_category_support.png');
const image_category_networking = require('../../assets/images/ic_category_networking.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

class NJobsSearchScreen extends React.Component {
  state = {
    value: false,

    textInputValue: '',
  };

  handleTextChange = (newText) => this.setState({value: newText});

  constructor(props) {
    super(props);

    console.log('NJobsSearchScreen start');

    this.state = {
      value: false,

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

  onBack = () => {
    console.log('---');
  };

  render() {
    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Locations'},
      {key: index++, label: 'Germany'},
      {key: index++, label: 'Spain'},
      {key: index++, label: 'Turkey'},
      {key: index++, label: 'Japanese'},
    ];

    const {value} = this.state;

    return (
      <>
        <SafeAreaView style={styles.background}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, width: '90%'}}>
            <View
              style={{
                height: 48,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Image
                source={image_search}
                style={{width: 24, height: 24, resizeMode: 'contain'}}
              />
              <TextInput
                style={{
                  fontFamily: 'GothamPro',
                  fontSize: 15,
                  color: GStyle.fontColor,
                  marginLeft: 10,
                }}
                placeholder="Search jobs..."
                value={this.state.locationValue}
              />
            </View>

            <Text
              style={{
                color: GStyle.fontColor,
                fontFamily: 'GothamPro-Medium',
                fontSize: 24,
                marginTop: 30,
              }}>
              Browse by category
            </Text>

            <View style={{flexDirection: 'row', marginTop: 35}}>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.activeColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_development}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.activeColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    IT & Development
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.grayBackColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_design}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                        tintColor: GStyle.grayColor,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.grayColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    Design & Multimedia
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 35}}>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.grayBackColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_business}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                        tintColor: GStyle.grayColor,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.grayColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    Business & Finance
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.grayBackColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_sales}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                        tintColor: GStyle.grayColor,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.grayColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    Sales & Marketing
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 35}}>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.grayBackColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_support}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.grayColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    Support
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: GStyle.grayBackColor,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={image_category_networking}
                      style={{
                        width: 59,
                        height: 59,
                        resizeMode: 'contain',
                        tintColor: GStyle.grayColor,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: GStyle.grayColor,
                      fontFamily: 'GothamPro-Medium',
                      fontSize: 13,
                      marginTop: 15,
                    }}>
                    Networking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
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
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  comment_view: {
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    marginBottom: 20,
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
});

export default NJobsSearchScreen;
