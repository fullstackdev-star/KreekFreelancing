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
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');

const BUTTON_WIDTH = Helper.getContentWidth();

class FProjectsApplyScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsApplyScreen start');

    this.state = {
      birthday: 'Jun 07, 1991',
      is_visible_sent_modal: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onClose = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  onSubmit = () => {
    this.setState({is_visible_sent_modal: true});
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          {this._renderModal()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderTitle()}
            {this._renderPaymentType()}
            {this._renderHourly()}
            {this._renderBillingDate()}
            {this._renderOption()}
            {this._renderScopeOfWork()}
            {this._renderWorkUpdate()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Apply"
        leftType="close"
        onPressLeftButton={this.onClose}
      />
    );
  };

  _renderModal = () => {
    return (
      <FSentJobRequestModal
        modalVisible={this.state.is_visible_sent_modal}
        onPressCancel={() => {
          this.setState({is_visible_sent_modal: false});
        }}
      />
    );
  };

  _renderTitle = () => {
    return <Text style={GStyles.titleText}>Submit proposal</Text>;
  };

  _renderPaymentType = () => {
    let index = 0;

    const paymentTypeData = [
      {key: index++, section: true, label: 'Payment Type'},
      {key: index++, label: 'Fixed'},
      {key: index++, label: 'Hourly'},
    ];

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 32},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Payment Type
        </Text>
        <ModalSelector
          data={paymentTypeData}
          initValue="Select one"
          accessible={true}
          onChange={option => {
            this.setState({paymentTypeValue: option.label});
          }}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={this.state.paymentTypeValue}
            />
            <Image source={ic_dropdown} style={[GStyles.image, {width: 16}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderHourly = () => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 24}]}>
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

  _renderBillingDate = () => {
    return (
      <View style={[GStyles.borderBottom, {height: 58, marginTop: 24}]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Billing End Date
        </Text>
        <DatePicker
          style={{width: 180, marginTop: 6}}
          date={this.state.birthday}
          mode="date"
          androidMode="spinner"
          iconSource={ic_calendar}
          placeholder="select date"
          format="MMM DD, YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              width: 20,
              height: 20,
              position: 'absolute',
              left: 0,
              top: 8,
              marginLeft: 0,
              tintColor: GStyle.grayColor,
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0,
            },
            dateText: GStyles.mediumText,
          }}
          onDateChange={date => {
            this.setState({birthday: date});
          }}
        />
      </View>
    );
  };

  _renderOption = () => {
    return (
      <>
        <Text
          style={{
            color: GStyle.grayColor,
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            marginTop: 24,
          }}>
          Require safepay
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

  _renderScopeOfWork = () => {
    return (
      <>
        <Text
          style={{
            color: GStyle.grayColor,
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            marginTop: 24,
          }}>
          Scope of Work
        </Text>
        <TextInput
          placeholder="Please input scope of work"
          multiline={true}
          numberOfLines={5}
          style={[
            GStyles.regularText,
            {
              height: 115,
              lineHeight: 22,
              marginTop: 4,
            },
          ]}
        />
      </>
    );
  };

  _renderWorkUpdate = () => {
    let index = 0;
    const workUpdateData = [
      {key: index++, section: true, label: 'Work Update Type'},
      {key: index++, label: 'Daily'},
      {key: index++, label: 'Weekly'},
      {key: index++, label: 'Monthly'},
    ];

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 32},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Work update will be sent
        </Text>
        <ModalSelector
          data={workUpdateData}
          initValue="Select one"
          accessible={true}          
          onChange={option => {
            this.setState({paymentTypeValue: option.label});
          }}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={this.state.paymentTypeValue}
            />
            <Image
              source={ic_dropdown}
              style={[GStyles.image, {width: 16}]}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSubmit} style={{marginVertical: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Submit</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default FProjectsApplyScreen;
