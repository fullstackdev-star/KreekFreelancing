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

const ic_mini_child = require('../../assets/images/ic_mini_child.png');
const ic_mini_location = require('../../assets/images/ic_mini_location.png');
const ic_mini_date = require('../../assets/images/ic_mini_date.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');

const JobListItem = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 12}}>
    <View style={{...GStyles.borderBottom, width: '88%', marginTop: 25}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={onPress}>
            <Text style={[GStyles.mediumText, {lineHeight: 20}]}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <View style={[GStyles.rowContainer, {marginTop: 8}]}>
            <Text style={[GStyles.regularText, {fontSize: 14}]}>
              Hired on {item.hire_date} by
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  GStyles.regularText,
                  {fontSize: 14, color: GStyle.linkColor, marginLeft: 4},
                ]}>
                {item.client_name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[GStyles.rowContainer, {marginTop: 8}]}>
            <Text style={[GStyles.regularText, {fontSize: 14}]}>
              Fixed rate:
            </Text>
            <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 4}]}>
              GHC3000
            </Text>
            <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 16}]}>
              Job ID: 231678
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default JobListItem;
