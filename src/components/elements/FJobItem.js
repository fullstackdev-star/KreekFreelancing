import React, {Component, isValidElement} from 'react';
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
import Flag from '../../lib/SvgFlagkit/Flag';

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_mini_hourly_rate = require('../../assets/images/ic_mini_hourly_rate.png');

const FJobItem = ({item, onPress}) => {
  return (
    <View style={{marginTop: 24}}>
      <Avatar
        image={{uri: item.user_photo}}
        size={80}
        status={item.user_status}
        containerStyle={styles.avatarContainer}
      />
      <View style={[GStyles.shadow, {marginLeft: 16, marginTop: 16}]}>
        <View style={styles.descriptionContainer}>
          <View style={GStyles.rowEndContainer}>
            <TouchableOpacity
              onPress={() => {
                onPress();
              }}>
              <Text style={[GStyles.mediumText, {lineHeight: 20}]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[GStyles.rowContainer, {marginTop: 10}]}>
            <Image
              source={ic_calendar}
              style={{...GStyles.image, width: 16, tintColor: GStyle.grayColor}}
            />
            <Text
              style={{
                fontFamily: 'GothamPro-Medium',
                fontSize: 13,
                color: GStyle.grayColor,
                marginLeft: 8,
              }}>
              {item.post_date}
            </Text>
          </View>
          <View style={[GStyles.rowContainer, {marginTop: 10}]}>
            <Image
              source={ic_mini_hourly_rate}
              style={{...GStyles.image, width: 16}}
            />
            <Text
              style={{
                fontFamily: 'GothamPro-Medium',
                fontSize: 13,
                color: GStyle.grayColor,
                marginLeft: 8,
              }}>
              {item.budget}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 80,
    height: 80,
    zIndex: 99,
  },

  descriptionContainer: {
    marginLeft: 80,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
  },
});

export default FJobItem;
