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

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
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

const itemTypeColor = {
  Completed: '#0EAD69',
  Accepted: '#2574FF',
  Unconfirmed: '#FE9870',
  Declined: '#FA4169',
  Canceled: GStyle.grayColor,
};

const InterviewListItem = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={[GStyles.shadow, {width: '100%', padding: 16}]}>
      <TouchableOpacity onPress={onPress}>
        <View style={GStyles.rowContainer}>
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={GStyles.mediumText}>
              {item.title}
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 8}]}>
              <Text style={[GStyles.regularText, {fontSize: 13}]}>
                {item.postDate}
              </Text>
              <Image source={ic_mini_dot} style={GStyles.miniDot} />
              <Text style={[GStyles.regularText, {fontSize: 13}]}>
                {item.postTime}
              </Text>
            </View>
            <View style={[GStyles.rowContainer, {marginTop: 8}]}>
              <Text
                numberOfLines={1}
                style={{
                  color: itemTypeColor[item.type],
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 13,
                  lineHeight: 16,
                }}>
                {item.type}
              </Text>
              <Text
                style={{
                  color: GStyle.grayColor,
                  fontFamily: 'GothamPro',
                  fontSize: 13,
                  marginLeft: 8,
                }}>
                {item.leftTime}
              </Text>
            </View>
          </View>
          <Avatar image={item.avatar} interviewType={item.interviewType} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default InterviewListItem;
