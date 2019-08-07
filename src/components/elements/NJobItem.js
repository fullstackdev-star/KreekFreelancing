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

const NJobItem = ({item, onPress, onFavorite}) => {
  let jobTypes = [];
  if (item.job_types) {
    jobTypes = item.job_types.split(',');
  }

  return (
    <View style={{marginTop: 20}}>
      <View style={[GStyles.rowEndContainer, {marginTop: 15}]}>
        <TouchableOpacity
          onPress={() => {
            onPress(item.id);
          }}>
          <Text style={{...GStyles.mediumText, lineHeight: 20}}>
            {item.title}
          </Text>
        </TouchableOpacity>
        {onFavorite && (
          <CheckBox
            label={''}
            checkedImage={ic_favorite_active}
            uncheckedImage={ic_favorite_inactive}
            checkboxStyle={{width: 14, height: 14}}
          />
        )}
      </View>
      <View style={[GStyles.rowContainer, {marginTop: 10}]}>
        <Text style={[GStyles.mediumText, {fontSize: 14}]}>
          {item.type == 'hourly' ? 'Hourly' : 'Fixed rate'}
        </Text>
        <Image source={ic_mini_dot} style={GStyles.miniDot} />
        <Text style={[GStyles.regularText, {fontSize: 14}]}>
          posted {Helper.getPastTimeString(item.post_date)} ago
        </Text>
      </View>
      {(() => {
        if (item.type == 'hourly') {
          return (
            <View>
              <View style={[GStyles.rowContainer, {marginTop: 10}]}>
                <Image source={ic_mini_child} style={styles.miniIcon} />
                <Text
                  style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
                  {item.bidder_count}
                </Text>
                <Image source={ic_mini_dot} style={GStyles.miniDot} />
                <Text style={[GStyles.regularText, {fontSize: 14}]}>
                  {item.bidder_name}
                </Text>
              </View>
              <View style={[GStyles.rowContainer, {marginTop: 10}]}>
                <Image source={ic_mini_location} style={styles.miniIcon} />
                <Text
                  style={{...GStyles.regularText, fontSize: 14, marginLeft: 3}}>
                  {item.location}
                </Text>
                <Image source={ic_mini_dot} style={GStyles.miniDot} />
                <Text style={[GStyles.regularText, {fontSize: 14}]}>
                  {item.location_distance}
                </Text>
              </View>
              <View style={[GStyles.rowContainer, {marginTop: 10}]}>
                <Image source={ic_mini_date} style={styles.miniIcon} />
                <Text
                  style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
                  Start: {item.start_date}
                </Text>
                <Text
                  style={[
                    GStyles.regularText,
                    {fontSize: 14, marginLeft: '10%'},
                  ]}>
                  Hours: Flexible
                </Text>
              </View>
              <JobItemWeek activeDays={['Tue', 'Wed', 'Thu']} />
            </View>
          );
        }
      })()}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Image source={ic_mini_clock} style={styles.miniIcon} />
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
          Expires in {Helper.getPastTimeString(item.expire_date)}
        </Text>
        <Image
          source={ic_mini_avatar}
          style={[styles.miniIcon, {marginLeft: '20%'}]}
        />
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
          {item.bid_count} bids
        </Text>
      </View>
      <View style={[GStyles.rowContainer, {marginTop: 10}]}>
        <Image
          source={ic_mini_money}
          style={[styles.miniIcon, {width: 16, height: 16}]}
        />
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
          Budget: ${item.min_budget} - ${item.max_budget}
        </Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        {jobTypes.map((jobType, i) => {
          return <JobItemProperty key={i} name={jobType} />;
        })}
      </View>
    </View>
  );
};

const itemPropertyColor = {
  onsite: '#53D0EC',
  remote: '#00AFFF',
  featured: '#7BC3A4',
  occational: '#FE9870',
  urgent: '#E45E5E',
};

const JobItemProperty = ({name}) => (
  <View
    style={{
      width: 92,
      height: 20,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: itemPropertyColor[name],
      marginHorizontal: 2,
    }}>
    <Text style={{color: 'white'}}>{name}</Text>
  </View>
);

const JobItemWeek = ({activeDays}) => (
  <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 8}}>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Sun')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: GStyle.grayColor}}>S</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Mon')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: GStyle.grayColor}}>M</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Tue')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: 'white'}}>T</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Wed')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: 'white'}}>W</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Thu')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: 'white'}}>T</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Fri')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: GStyle.grayColor}}>F</Text>
    </View>
    <View
      style={[
        styles.weekItemImage,
        {
          backgroundColor: activeDays.includes('Sat')
            ? '#0ba95f'
            : GStyle.grayBackColor,
        },
      ]}>
      <Text style={{color: GStyle.grayColor}}>S</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  miniIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginBottom: 2,
  },

  weekItemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 16,
    borderRadius: 4,
    backgroundColor: GStyle.grayBackColor,
    marginHorizontal: 5,
  },
});

export default NJobItem;
export {JobItemProperty, JobItemWeek};
