import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutAnimation,
  Linking,
  ListView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';
import {Badge, Icon, withBadge} from 'react-native-elements';
import Avatar from '../../components/elements/Avatar';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';

const ic_notification = require('../../assets/images/ic_notification.png');
const ic_more_jobs = require('../../assets/images/ic_more_jobs.png');
const ic_more_payments = require('../../assets/images/ic_more_payments.png');
const ic_more_profile = require('../../assets/images/ic_more_profile.png');
const ic_more_settings = require('../../assets/images/ic_more_settings.png');
const ic_more_about = require('../../assets/images/ic_more_about.png');
const ic_more_help = require('../../assets/images/ic_more_help.png');
const ic_more_membership = require('../../assets/images/ic_more_membership.png');
const ic_more_darkmode = require('../../assets/images/ic_more_darkmode.png');
const ic_more_share = require('../../assets/images/ic_more_share.png');
const ic_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');

class CMoreMainScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CMoreMainScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      photo: global.me.profile_photo,
      name: global.me.first_name + ' ' + global.me.last_name,
      email: global.me.email,
      balance: global.me.balance,

      darkMode: true,
    };
  };

  onRefresh = () => {
    this.setState({isGetDataDone: false});

    let params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_my_info(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          global.me = json.data;
          this.setState({
            photo: json.data.profile_photo,
            name: json.data.first_name + ' ' + json.data.last_name,
            email: json.data.email,
            balance: json.data.balance,
          });
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onProfile = () => {
    this.context.navigate('fc_more_profile');
  };

  onNotifications = () => {
    this.context.navigate('fc_more_notifications');
  };

  onRequests = () => {
    this.context.navigate('c_more_requests_tab');
  };

  onPayments = () => {
    this.context.navigate('c_more_payments_tab');
  };

  onSettings = () => {
    this.context.navigate('c_more_settings');
  };

  onMembership = () => {
    this.context.navigate('c_membership');
  };

  onAbout = () => {
    const url = 'https://kreekafrica.com/about';
    Linking.openURL(url);
  };

  onHelp = () => {
    const url = 'https://kreekafrica.com/faq';
    Linking.openURL(url);
  };

  onPrivacy = () => {
    const url = 'https://kreekafrica.com/privacy';
    Linking.openURL(url);
  };

  onShare = () => {
    console.log('---');
  };

  toggleSwitch = (value) => {
    this.setState({darkMode: value});
  };

  render() {
    return (
      <SafeAreaView style={GStyles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{...GStyles.elementContainer}}>
          {this._renderClient()}
          {this._renderDetails()}
          {this._renderApplication()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  _renderClient = () => {
    const {photo, name, email, balance} = this.state;

    return (
      <View style={{marginTop: 24}}>
        <View style={GStyles.rowEndContainer}>
          <TouchableOpacity onPress={this.onProfile}>
            <View style={GStyles.rowContainer}>
              <Avatar image={{uri: photo}} />
              <View style={{marginLeft: 10}}>
                <Text style={[GStyles.mediumText, {fontSize: 17}]}>{name}</Text>
                <Text
                  style={[
                    GStyles.regularText,
                    {fontSize: 13, color: GStyle.grayColor, marginTop: 4},
                  ]}>
                  {email}
                </Text>
                <Text
                  style={[
                    GStyles.regularText,
                    {fontSize: 13, color: GStyle.grayColor, marginTop: 4},
                  ]}>
                  Balance: ${balance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={this.onNotifications}>
              <View style={[GStyles.centerAlign, {width: 50, height: 50}]}>
                <View
                  style={[
                    GStyles.centerAlign,
                    GStyles.shadow,
                    {width: 40, height: 40},
                  ]}>
                  <Image
                    source={ic_notification}
                    style={[GStyles.image, {width: 20}]}
                  />
                </View>
                <Badge
                  status="error"
                  value="3"
                  containerStyle={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    elevation: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  ...GStyles.mediumText,
                  fontSize: 13,
                  color: GStyle.linkColor,
                  marginTop: 8,
                }}>
                Deposit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderDetails = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 24}]}>
          My Details
        </Text>
        {this._renderItem(ic_more_jobs, 'Requests', this.onRequests)}
        {this._renderItem(ic_more_payments, 'Payments', this.onPayments)}
        {this._renderItem(ic_more_profile, 'My Profile', this.onProfile)}
      </>
    );
  };

  _renderApplication = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 24}]}>
          Application
        </Text>
        {this._renderItem(ic_more_settings, 'Settings', this.onSettings)}
        {this._renderItem(ic_more_membership, 'Membership', this.onMembership)}
        {this._renderItem(ic_more_about, 'About KreekAfrica', this.onAbout)}
        {this._renderItem(ic_more_help, 'Help & FAQ', this.onHelp)}
        {this._renderItem(
          ic_more_membership,
          'Privacy of Policy',
          this.onPrivacy,
        )}
        {this._renderItem(ic_more_share, 'Refer Friend & Family', this.onShare)}
      </>
    );
  };

  _renderItem = (icon, title, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[GStyles.rowEndContainer, {marginTop: 24}]}>
          <View style={GStyles.rowContainer}>
            <Image
              source={icon}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
            <Text style={[GStyles.regularText, {marginLeft: 24}]}>{title}</Text>
          </View>
          <Image
            source={ic_right_arrow}
            style={{width: 12, height: 12, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  ___renderDarkModeItem = () => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 24}]}>
        <View style={GStyles.rowContainer}>
          <Image
            source={ic_more_darkmode}
            style={{width: 40, height: 40, resizeMode: 'contain'}}
          />
          <Text style={[GStyles.regularText, {marginLeft: 24}]}>
            Switch to Dark Mode
          </Text>
        </View>
        <Switch onValueChange={this.toggleSwitch} value={this.state.darkMode} />
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CMoreMainScreen;
