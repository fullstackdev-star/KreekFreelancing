import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
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
  TouchableOpacity,
  View,
} from 'react-native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import CheckBox from '../../lib/Checkbox/index';
import Avatar from './Avatar';

const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_mini_child = require('../../assets/images/ic_mini_child.png');
const ic_mini_location = require('../../assets/images/ic_mini_location.png');
const ic_mini_date = require('../../assets/images/ic_mini_date.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');

const RequestDetailsItem = ({item, onPress}) => (
  <View>
    {_renderContact()}
    {_renderWhen(item)}
    {_renderDetails(item)}
    {_renderAdditional(item)}
  </View>
);

_renderContact = () => {
  return (
    <>
      <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
        Contact via
      </Text>
      <Text style={[GStyles.mediumText, {marginTop: 24}]}>
        Video Call Interview
      </Text>
      <Text
        style={[
          GStyles.regularText,
          {fontSize: 13, lineHeight: 22, marginTop: 8},
        ]}>
        You will be able to have a video call with Marian via the message page
        once confirmed.
      </Text>
    </>
  );
};

_renderWhen = item => {
  return (
    <>
      <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
        When
      </Text>
      <Text style={[GStyles.regularText, {marginTop: 12}]}>{item.startTime}</Text>
      <Text style={[GStyles.regularText, {marginTop: 12}]}>{item.endTime}</Text>
    </>
  );
};

_renderDetails = item => {
  return (
    <>
      <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
        Details
      </Text>
      <Text style={[GStyles.regularText, {lineHeight: 20, marginTop: 12}]}>
        {item.details}
      </Text>
      <Text style={[GStyles.regularText, {marginTop: 12}]}>
        {item.jobType} rate: {item.minRate} - {item.maxRate}
      </Text>
      <Text style={[GStyles.regularText, {marginTop: 12}]}>
        Payment method: {item.paymentType}
      </Text>
    </>
  );
};

_renderAdditional = item => {
  return (
    <>
      <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
        Additional
      </Text>
      <Text style={[GStyles.regularText, {lineHeight: 24, marginTop: 12}]}>
        {item.additional}
      </Text>
    </>
  );
};

export default RequestDetailsItem;
