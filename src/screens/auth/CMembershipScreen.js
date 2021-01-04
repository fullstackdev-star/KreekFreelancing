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

const image_radio_checked = require('../../assets/images/ic_radio_active.png');
const image_radio_unchecked = require('../../assets/images/ic_radio_inactive.png');
const ic_membership_free = require('../../assets/images/ic_membership_free.png');
const ic_membership_basic = require('../../assets/images/ic_membership_basic.png');
const ic_membership_professional = require('../../assets/images/ic_membership_professional.png');
const ic_membership_business = require('../../assets/images/ic_membership_business.png');
const ic_membership_executive = require('../../assets/images/ic_membership_executive.png');

class CMembershipScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CMembershipScreen start');

    this.init();
  }

  componentDidMount() {
    showPageLoader(true);
    RestAPI.get_package_list((json, err) => {
      showPageLoader(false);
      global.package_list = json.data.package_list;

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
        } else {
          Helper.alertServerDataError();
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
            '3% Handling Fee',
            '50 Fixed projects',
            '50 Hourly projects',
            '10 Send offers',
            'Access to verified',
            'Professionals',
            'Favorite professionals',
            'Access to workroom',
            'Low Priority Support',
          ],
          seledted: global.me.package == 'Basic' ? true : false,
        },
        {
          title: 'Professional',
          price: '$250.00',
          image: ic_membership_professional,
          descriptions: [
            '2% Handling Fee',
            '200 Fixed projects',
            '200 Hourly projects',
            '100 Send offers',
            'Access to verified',
            'Professionals',
            'Favorite professionals',
            'Access to workroom',
            'Project management support',
            'Moderate Priority Support',
          ],
          seledted: global.me.package == 'Professional' ? true : false,
        },
        {
          title: 'Business',
          price: '$500.00',
          image: ic_membership_business,
          descriptions: [
            '1% Handling Fee',
            '999 Fixed projects',
            '999 Hourly projects',
            '999 Send offers',
            'Access to verified',
            'Professionals',
            'Favorite professionals',
            'Access to workroom',
            'Project management support',
            'High Priority Support',
          ],
          seledted: global.me.package == 'Business' ? true : false,
        },
      ],
    };
  };

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

      global._isMonthly = isMonthly;
      global._membershipPlan = packageName;
      this.props.navigation.navigate('fc_confirm_payment');

      // if (err !== null) {
      //   Helper.alertNetworkError();
      // } else {
      //   if (json.status === 1) {
      //     this.props.navigation.navigate('fc_confirm_payment');
      //   } else {
      //     Helper.alertServerDataError();
      //   }
      // }
    });
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

  _renderCheck = (section) => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 8}]}>
        <CheckBox
          label={section.title}
          forceCheck={true}
          checked={section.seledted}
          onChange={this.onChangeMembership}
          labelStyle={[GStyles.mediumText, {fontSize: 17, marginLeft: 16}]}
          checkedImage={image_radio_checked}
          uncheckedImage={image_radio_unchecked}
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
      <View style={{...GStyles.rowContainer, marginTop: 8}}>
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

export default CMembershipScreen;
