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
import {NavigationContext} from '@react-navigation/native';
import GHeaderBar from '../../components/GHeaderBar';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import FSentJobRequestModal from '../modal/FSentJobRequestModal';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import Slider from '../../lib/Slider/Slider';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import Avatar from '../../components/elements/Avatar';

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_quote = require('../../assets/images/ic_quote.png');
const ic_slider_ruler_c = require('../../assets/images/ic_slider_ruler_c.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');



class CFindSendOfferScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CFindSendOfferScreen start');

    this.state = {
      birthday: 'Jun 07, 1991',
      is_visible_sent_modal: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack()
  };

  onCancel = () => {
    this.props.navigation.goBack();
  };

  onNext = () => {
    console.log('---');
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
            {this._renderOffer()}
            {this._renderOption()}
            {this._renderHourly()}
          </KeyboardAwareScrollView>
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Send offer"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="cancel"
        onPressRightButton={this.onCancel}
      />
    );
  };

  _renderTitle = () => {
    return (
      <Text
        style={{
          ...GStyles.mediumText,
          fontSize: 18,
          lineHeight: 28,
          marginTop: 24,
        }}>
        Contact Edit Johnson about your job
      </Text>
    );
  };

  _renderOffer = () => {
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

  _renderOption = () => {
    return (
      <>
        <Text style={{...GStyles.elementLabel, marginTop: 46}}>Hire for</Text>
        <View style={{marginTop: 20}}>
          <RadioGroup
            normalMode={true}
            radioGroupList={[
              {
                label: 'Fixed Rate',
                value: 'fixed',
              },
              {
                label: 'Hourly Rate',
                value: 'hourly',
              },
            ]}
          />
        </View>
      </>
    );
  };

  _renderHourly = () => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 46}]}>
        <View style={[GStyles.borderBottom, {width: '45%', height: 58}]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            Rate/Hour
          </Text>
          <View style={[GStyles.rowContainer, {marginTop: 12}]}>
            <Image
              source={ic_dollar}
              style={[GStyles.image, {width: 24, tintColor: GStyle.grayColor}]}
            />
            <TextInput
              placeholder=""
              style={[GStyles.mediumText, {width: '70%', marginLeft: 12}]}
            />
          </View>
        </View>
        <View style={[GStyles.borderBottom, {width: '45%', height: 58}]}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.grayColor,
              marginBottom: 5,
            }}>
            Hours/Week
          </Text>
          <TextInput
            placeholder=""
            style={[GStyles.mediumText, {marginTop: 12}]}
          />
        </View>
      </View>
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

export default CFindSendOfferScreen;
