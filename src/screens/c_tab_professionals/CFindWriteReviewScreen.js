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

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_quote = require('../../assets/images/ic_quote.png');
const ic_slider_ruler_c = require('../../assets/images/ic_slider_ruler_c.png');

const BUTTON_WIDTH = Helper.getContentWidth();

class CFindWriteReviewScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CFindWriteReviewScreen start');

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

  onSubmit = () => {
    this.props.navigation.goBack()
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
            {this._renderReview()}
            {this._renderOption()}
            {this._renderSlider()}
            {this._renderButton()}
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

  _renderReview = () => {
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
        <Text
          style={{
            ...GStyles.mediumText,
            marginTop: 40,
          }}>
          Was your job completed?
        </Text>
        <View style={{marginTop: 20}}>
          <RadioGroup
            normalMode={true}
            radioGroupList={[
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
              },
            ]}
          />
        </View>
      </>
    );
  };

  _renderSlider = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 40}]}>On time</Text>
        <View style={{marginTop: 16}}>
          <Slider
            trackStyle={{height: 4, borderRadius: 2}}
            thumbStyle={{
              width: 32,
              height: 32,
              borderRadius: 12,
              backgroundColor: 'white',
              borderColor: GStyle.activeColor,
              borderWidth: 2,
            }}
            minimumTrackTintColor={GStyle.activeColor}
            maximumTrackTintColor={'#E0E0E0'}
            onValueChange={value => this.setState({value})}
          />
          <Image
            source={ic_slider_ruler_c}
            style={{
              width: '100%',
              height: 30,
              resizeMode: 'contain',
              marginTop: -15,
              zIndex: -10,
            }}
          />
        </View>
        <Text style={[GStyles.mediumText, {marginTop: 40}]}>On budget</Text>
        <View style={{marginTop: 16}}>
          <Slider
            trackStyle={{height: 4, borderRadius: 2}}
            thumbStyle={{
              width: 32,
              height: 32,
              borderRadius: 12,
              backgroundColor: 'white',
              borderColor: GStyle.activeColor,
              borderWidth: 2,
            }}
            minimumTrackTintColor={GStyle.activeColor}
            maximumTrackTintColor={'#E0E0E0'}
            onValueChange={value => this.setState({value})}
          />
          <Image
            source={ic_slider_ruler_c}
            style={{
              width: '100%',
              height: 30,
              resizeMode: 'contain',
              marginTop: -15,
              zIndex: -10,
            }}
          />
        </View>
      </>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSubmit} style={{marginVertical: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Submit Review</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default CFindWriteReviewScreen;
