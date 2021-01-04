import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BallIndicator,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
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
  useColorScheme,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import CheckBox from '../../lib/Checkbox/index';
import SwitchSelector from '../../lib/SwitchSelector/index';
import Accordion from '../../lib/Collapsible/Accordion';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_radio_inactive = require('../../assets/images/ic_radio_inactive.png');
const ic_membership_free = require('../../assets/images/ic_membership_free.png');
const ic_membership_basic = require('../../assets/images/ic_membership_basic.png');
const ic_membership_professional = require('../../assets/images/ic_membership_professional.png');
const ic_membership_business = require('../../assets/images/ic_membership_business.png');
const ic_membership_executive = require('../../assets/images/ic_membership_executive.png');

class FMembershipScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMembershipScreen start');

    this.init()
  }

  componentDidMount() {
    showPageLoader(true);
    RestAPI.get_package_list((json, err) => {
      showPageLoader(false);
      global.package_list = json.data.package_list;

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
      } else {
        if (json.status === 1) {
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
        }
      }
    });
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      activeSections: [],

      membershipDurationDatas: [
        {label: 'Monthly', value: '0'},
        {label: 'Annually', value: '1'},
      ],
      membershipDurationSelIndex: 0,

      membershipDatas: [
        {
          title: 'Basic',
          price: 'Free',
          image: ic_membership_free,
          descriptions: [
            '9% Job Fee',
            'Find Projects',
            'Save Projects',
            '10 Bids',
            '5 Skills Limit',
            '5 Portfolio Limit',
            '10 Clients Follow',
          ],
          seledted: global.me.package == 'Basic' ? true : false,
        },
        {
          title: 'Basic+',
          price: '$10.95',
          image: ic_membership_basic,
          descriptions: [
            '8% Job Fee',
            'Find Projects',
            'Save Projects',
            '30 Bids',
            '7 Bids / Premium quotes',
            '10 Skills Limit',
            '30 Portfolio Limit',
            '30 Clients Follow',
          ],
          seledted: global.me.package == 'Basic+' ? true : false,
        },
        {
          title: 'Professional',
          price: '$20.95',
          image: ic_membership_professional,
          descriptions: [
            '6% Job Fee',
            'Find Projects',
            'Save Projects',
            '50 Bids',
            '6 Bids / Premium quotes',
            '20 Skills Limit',
            '50 Portfolio Limit',
            '40 Clients Follow',
          ],
          seledted: global.me.package == 'Professional' ? true : false,
        },
        {
          title: 'Business',
          price: '$29.95',
          image: ic_membership_business,
          descriptions: [
            '5% Job Fee',
            'Find Projects',
            'Save Projects',
            '50 Bids',
            '5 Bids / Premium quotes',
            '30 Skills Limit',
            '50 Portfolio Limit',
            '60 Clients Follow',
          ],
          seledted: global.me.package == 'Business' ? true : false,
        },
        {
          title: 'Executive',
          price: '$50.95',
          image: ic_membership_executive,
          descriptions: [
            '4% Job Fee',
            'Find Projects',
            'Save Projects',
            '60 Bids',
            '4 Bids / Premium quotes',
            '50 Skills Limit',
            'Unlimited Portfolio Limit',
            'Unlimited Clients Follow',
          ],
          seledted: global.me.package == 'Executive' ? true : false,
        },
      ],
    };
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onChangeDuration = (value) => {
    this.setState({membershipDurationSelIndex: value});
  };

  onChangeMembership = ({label, checked}) => {
    let {membershipDatas} = this.state;

    membershipDatas.forEach((item) => {
      if (item.title == label) {
        item.seledted = true;
      } else {
        item.seledted = false;
      }
    });
    this.setState({membershipDatas: membershipDatas});
  };

  onPurchaseNow = () => {
    const {membershipDurationSelIndex, membershipDatas} = this.state;

    let packageName = 'Basic';
    membershipDatas.forEach((item) => {
      if (item.seledted) {
        packageName = item.title;
      }
    });
    let packageId = Helper.getPackageId4Name(packageName);

    let isMonthly = true;

    showPageLoader(true);
    RestAPI.update_membership(isMonthly, packageId, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to update.');
      } else {
        if (json.status === 1) {
          global._cardInfo = json.data.card_info;
          if (!global._cardInfo) {
            global._accessCode = json.data.accessCode;
            global._cardInfo = {
              card_number: '',
              name_on_card: '',
              expire_year: '',
              expire_month: '',
              cvv: '',
            };
          }
          global._isMonthly = isMonthly;
          global._membershipPlan = packageName;
          if (packageName == 'Basic') {
            this.props.navigation.navigate('f_main_tab_navigator');
          } else {
            this.props.navigation.navigate('fc_confirm_payment');
          }
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to update.');
        }
      }
    });
  };

  _renderCheck = (section) => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 8}]}>
        <CheckBox
          label={section.title}
          forceCheck={true}
          checked={section.seledted}
          onChange={this.onChangeMembership}
          labelStyle={[GStyles.mediumText, {fontSize: 17, marginLeft: 16}]}
          checkedImage={ic_radio_active}
          uncheckedImage={ic_radio_inactive}
          checkboxStyle={{width: 20, height: 20}}
        />
        <Text style={{...GStyles.mediumText, fontSize: 17}}>
          {section.price}
        </Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={[GStyles.rowContainer, {marginTop: 8}]}>
        <Image
          source={section.image}
          style={{
            ...GStyles.image,
            width: 24,
            position: 'absolute',
            top: 24,
          }}
        />
        <View style={{marginLeft: 36}}>
          {section.descriptions.map((it, i) => {
            return (
              <Text
                key={i}
                style={{
                  fontFamily: 'GothamPro',
                  fontSize: 13,
                  color: GStyle.grayColor,
                  marginTop: 10,
                }}>
                {it}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            {this._renderTitle()}
            {this._renderMembership()}
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

  _renderTitle = () => {
    return (
      <View style={{...GStyles.centerContainer}}>
        <View style={{...GStyles.elementContainer}}>
          <Text style={GStyles.titleText}>Choose a package</Text>
        </View>
      </View>
    );
  };

  _renderMembership = () => {
    const {membershipDatas} = this.state;

    return (
      <Accordion
        sections={membershipDatas}
        activeSections={this.state.activeSections}
        renderHeader={this._renderCheck}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        collapsedHeight={80}
        sectionContainerStyle={{
          ...GStyles.shadow,
          marginTop: 32,
          marginHorizontal: '6%',
          padding: 16,
        }}
      />
    );
  };

  _renderButton = () => {
    return (
      <View style={{...GStyles.centerContainer}}>
        <View style={{...GStyles.elementContainer}}>
          <TouchableOpacity
            onPress={this.onPurchaseNow}
            style={{marginVertical: 40}}>
            <View style={GStyles.buttonFill}>
              <Text style={GStyles.textFill}>Purchase Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  ___renderOption = () => {
    const {membershipDurationDatas, membershipDurationSelIndex} = this.state;

    return (
      <View style={{...GStyles.centerContainer}}>
        <View style={{...GStyles.elementContainer}}>
          <SwitchSelector
            options={membershipDurationDatas}
            borderRadius={10}
            buttonColor={GStyle.activeColor}
            backgroundColor={GStyle.grayBackColor}
            fontSize={13}
            textColor={GStyle.grayColor}
            initial={membershipDurationSelIndex}
            onPress={this.onChangeDuration}
            style={{marginTop: 16}}
          />
          <Text style={[GStyles.regularText, {lineHeight: 24, marginTop: 18}]}>
            More flexible, pay each month. Save 20% on annual plan
          </Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default FMembershipScreen;
