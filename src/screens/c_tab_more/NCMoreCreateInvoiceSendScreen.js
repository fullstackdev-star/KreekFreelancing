import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';

import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';

const ic_notification = require('../../assets/images/ic_notification.png');
const ic_more_jobs = require('../../assets/images/ic_more_jobs.png');
const ic_more_stats = require('../../assets/images/ic_more_stats.png');
const ic_more_payments = require('../../assets/images/ic_more_payments.png');
const ic_more_profile = require('../../assets/images/ic_more_profile.png');
const ic_more_settings = require('../../assets/images/ic_more_settings.png');
const ic_more_about = require('../../assets/images/ic_more_about.png');
const ic_more_help = require('../../assets/images/ic_more_help.png');
const ic_more_membership = require('../../assets/images/ic_more_membership.png');
const ic_more_darkmode = require('../../assets/images/ic_more_darkmode.png');
const ic_more_share = require('../../assets/images/ic_more_share.png');
const ic_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_mini_multi = require('../../assets/images/ic_mini_multi.png');
const ic_mini_minus = require('../../assets/images/ic_mini_minus.png');

class NCMoreCreateInvoiceSendScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('NCMoreCreateInvoiceSendScreen start');

    this.state = {
      item_datas: [
        {
          description: 'Extra work for design',
          quantity: '5',
          rate: 'C 100',
        },
        {
          description: 'New website design',
          quantity: '1',
          rate: 'C 2000',
        },
      ],
      start_date: '',
      end_date: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = newText => this.setState({value: newText});

  onClose = () => {
    this.props.navigation.goBack();
  };

  onMakePayment = () => {
    this.props.navigation.navigate('c_more_no_select_card')
  };

  render() {
    const {item_datas} = this.state;
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          <GHeaderBar
            headerTitle="Pay invoice"
            leftType="close"
            onPressLeftButton={this.onClose}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, width: '90%'}}>
            {this._renderTitle()}
            {this._renderClient()}
            {this._renderBillingPeriod()}
            {item_datas.map((item, i) => {
              return this._renderDescription({item, i});
            })}
            {this._renderAddButton()}
            {this._renderTotal()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderTitle = () => {
    return <Text style={GStyles.titleText}>Bill to:</Text>;
  };

  _renderClient = () => {
    return (
      <View style={{marginTop: 24}}>
        <View style={GStyles.rowEndContainer}>
          <View style={GStyles.rowContainer}>
            <Image source={img_avatar1} style={GStyles.image} />
            <View style={{marginLeft: 10}}>
              <Text style={[GStyles.mediumText]}>Rasak Johnson</Text>
              <Text
                style={[GStyles.mediumText, {lineHeight: 18, marginTop: 8}]}>
                Need an architectural design of a 4 story building
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Image
                source={ic_notification}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.linkColor, marginTop: 8},
                ]}>
                withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderBillingPeriod = () => {
    return (
      <>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
            marginTop: 32,
          }}>
          Billing Period
        </Text>
        <View style={[GStyles.rowEndContainer, {marginTop: 4}]}>
          <View style={[GStyles.borderBottom, {width: 150, paddingBottom: 0}]}>
            <DatePicker
              style={{height: 40}}
              labelBefore={false}
              date={this.state.start_date}
              mode="date"
              androidMode="spinner"
              iconSource={ic_calendar}
              placeholder="start date"
              format="MMM DD, YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 24,
                  height: 24,
                  tintColor: GStyle.grayColor,
                },
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 15,
                  color: GStyle.fontColor,
                },
                placeholderText: {
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 15,
                  color: GStyle.grayColor,
                },
              }}
              onDateChange={date => {
                this.setState({start_date: date});
              }}
            />
          </View>
          <View style={[GStyles.borderBottom, {width: 150, paddingBottom: 0}]}>
            <DatePicker
              style={{height: 40}}
              labelBefore={false}
              date={this.state.end_date}
              mode="date"
              androidMode="spinner"
              iconSource={ic_calendar}
              placeholder="end date"
              format="MMM DD, YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 24,
                  height: 24,
                  tintColor: GStyle.grayColor,
                },
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 15,
                  color: GStyle.fontColor,
                },
                placeholderText: {
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 15,
                  color: GStyle.grayColor,
                },
              }}
              onDateChange={date => {
                this.setState({end_date: date});
              }}
            />
          </View>
        </View>
      </>
    );
  };

  _renderDescription = ({item, i}) => {
    return (
      <View key={i}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
          }}>
          <View>
            <Text
              style={[
                GStyles.mediumText,
                {fontSize: 13, color: GStyle.grayColor},
              ]}>
              Description
            </Text>
            <TextInput
              style={[
                GStyles.regularText,
                {
                  width: 240,
                  height: 40,
                  fontSize: 13,
                  borderWidth: 1,
                  borderColor: GStyle.grayBackColor,
                  marginTop: 12,
                },
              ]}
              placeholder=""
              defaultValue={item.description}
              onChangeText={text => {
                this.setState({description: text});
              }}
            />
          </View>
          <Text style={[GStyles.mediumText, {fontSize: 13}]}>Total</Text>
        </View>
        <View
          style={[
            GStyles.rowEndContainer,
            GStyles.borderBottom,
            {marginTop: 8},
          ]}>
          <View style={[GStyles.rowEndContainer, {width: 240}]}>
            <View>
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.grayColor},
                ]}>
                Quantity
              </Text>
              <TextInput
                style={[
                  GStyles.regularText,
                  {
                    width: 110,
                    height: 40,
                    fontSize: 13,
                    borderWidth: 1,
                    borderColor: GStyle.grayBackColor,
                    marginTop: 12,
                  },
                ]}
                placeholder=""
                defaultValue={item.quantity}
                onChangeText={text => {
                  this.setState({quantity: text});
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.grayColor},
                ]}>
                Rate
              </Text>
              <TextInput
                style={[
                  GStyles.regularText,
                  {
                    width: 110,
                    height: 40,
                    fontSize: 13,
                    borderWidth: 1,
                    borderColor: GStyle.grayBackColor,
                    marginTop: 12,
                  },
                ]}
                placeholder=""
                defaultValue={item.rate}
                onChangeText={text => {
                  this.setState({rate: text});
                }}
              />
            </View>
          </View>
          <View style={GStyles.rowContainer}>
            <Text style={[GStyles.mediumText, {fontSize: 13}]}>C500</Text>
            <TouchableOpacity>
              <Image
                source={ic_mini_multi}
                style={[
                  GStyles.image,
                  {width: 6, marginLeft: 5, marginBottom: 2},
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderAddButton = () => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('fc_signin');
          }}>
          <View
            style={{
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: GStyle.grayBackColor,
              marginTop: 12,
            }}>
            <Text style={[styles.textBlank, {color: GStyle.grayColor}]}>
              + Add item
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderTotal = () => {
    return (
      <View style={{alignItems: 'flex-end'}}>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={[GStyles.regularText, {}]}>Discount</Text>
          <View
            style={[
              GStyles.rowEndContainer,
              {borderWidth: 1, borderColor: GStyle.grayBackColor},
            ]}>
            <Image
              source={ic_mini_minus}
              style={[GStyles.image, {width: 6, marginLeft: 6}]}
            />
            <TextInput
              style={[
                GStyles.regularText,
                {
                  width: 50,
                  height: 24,
                  fontSize: 13,
                  textAlign: 'right',
                  marginLeft: 6,
                },
              ]}
              placeholder=""
              defaultValue={'0.00'}
              onChangeText={text => {
                this.setState({description: text});
              }}
            />
          </View>
        </View>
        <View style={[GStyles.rowEndContainer, {width: '50%', marginTop: 12}]}>
          <Text style={[GStyles.mediumText, {}]}>Invoice Total</Text>
          <Text style={[GStyles.mediumText, {fontSize: 13}]}>C2500</Text>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity onPress={this.onMakePayment}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Make payment</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  
});

export default NCMoreCreateInvoiceSendScreen;
