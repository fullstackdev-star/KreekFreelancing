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
const ic_star = require('../../assets/images/ic_star_active.png');

const ClientItem = ({item, onPress}) => (
  <View style={{marginTop: 24}}>
    <View style={{flexDirection: 'row'}}>
      <Image source={item.avatar} style={{...GStyles.image, width: 59}} />
      <View style={{marginLeft: 10}}>
        <View style={{...GStyles.rowContainer, marginTop: 14}}>
          <Text style={GStyles.mediumText}>{item.name}</Text>
          <Image source={ic_mini_dot} style={{...GStyles.miniDot}} />
          <Text style={GStyles.regularText}>{item.reviewScore}</Text>
          <Image source={ic_star} style={{...GStyles.image, width: 14}} />
        </View>
        <View style={{...GStyles.rowContainer, marginTop: 10}}>
          <Text style={[GStyles.regularText, {fontSize: 14}]}>
            {item.location}
          </Text>
          <Image source={ic_mini_dot} style={{...GStyles.miniDot}} />
          <Text style={[GStyles.regularText, {fontSize: 14}]}>
            {item.spentAmount} spent
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({});

export default ClientItem;
