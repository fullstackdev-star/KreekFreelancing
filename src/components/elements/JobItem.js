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
import Flag from '../../lib/SvgFlagkit/Flag';
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
const ic_mini_star = require('../../assets/images/ic_mini_star.png');

const jobTypeColor = {
  onsite: '#53D0EC',
  remote: '#00AFFF',
  featured: '#7BC3A4',
  occational: '#FE9870',
  urgent: '#E45E5E',
};

const JobItem = ({
  item,
  onPress,
  onFavorite,
  onReject,
  onAccept,
  onChatWithClient,
}) => {
  return (
    <View style={{marginTop: 20}}>
      {_renderHeader(item, onFavorite)}
      {_renderBody(item, onPress, onReject, onAccept, onChatWithClient)}
    </View>
  );
};

const _renderHeader = (item, onFavorite) => {
  return (
    <View style={{...GStyles.rowEndContainer}}>
      <View style={{...GStyles.rowContainer}}>
        <Text style={{...styles.infoText_8}}>
          {Helper.capitalizeString(item.type)} Budget
        </Text>
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 4}]}>
          ${item.min_budget}-
        </Text>
        <Text style={{...styles.infoText_10}}>${item.max_budget}</Text>
      </View>
      {onFavorite && (
        <CheckBox
          label={''}
          checkedImage={ic_favorite_active}
          uncheckedImage={ic_favorite_inactive}
          forceCheck={true}
          checked={
            item.is_favorite == 'true' || item.is_favorite === true
              ? true
              : false
          }
          onChange={(value) => {
            onFavorite(value.checked, item);
          }}
          checkboxStyle={{width: 14, height: 14}}
        />
      )}
    </View>
  );
};

const _renderBody = (item, onPress, onReject, onAccept, onChatWithClient) => {
  let jobTypes = [];
  if (item.job_types) {
    jobTypes = item.job_types.split(',');
  }

  return (
    <View
      style={{
        borderLeftColor: jobTypeColor[jobTypes[0]],
        borderLeftWidth: 1,
        paddingLeft: 8,
        paddingBottom: 4,
      }}>
      {_renderInfo(item)}
      {_renderContent(item, onPress)}
      {_renderSkills(item)}
      {item.type == 'hourly' && _renderHourly(item)}
      {_renderClient(item.client)}
      {_renderActions(onReject, onAccept, onChatWithClient)}
    </View>
  );
};

const _renderInfo = (item) => {
  let jobTypes = [];
  if (item.job_types) {
    jobTypes = item.job_types.split(',');
  }

  return (
    <View style={[GStyles.rowContainer, {marginTop: 10}]}>
      <Text
        style={{
          ...GStyles.regularText,
          fontSize: 10,
          color: jobTypeColor[jobTypes[0]],
        }}>
        {Helper.capitalizeString(jobTypes[0])}
      </Text>
      <View style={{marginLeft: 8}}>
        {Helper.isValid(item.contry_code) && (
          <Flag id={item.contry_code} width={14} height={14} />
        )}
      </View>
      <Text style={{...styles.infoText_10}}>{item.location}</Text>
      <Image
        source={ic_mini_clock}
        style={{...styles.miniIcon, marginLeft: 10}}
      />
      <Text style={{...styles.infoText_10, marginLeft: 4}}>
        open {Helper.getPastTimeString(item.post_date)} -
      </Text>
      <Text style={{...styles.infoText_10, marginLeft: 4}}>
        {item.bid_count} bids
      </Text>
    </View>
  );
};

const _renderContent = (item, onPress) => {
  return (
    <View style={[GStyles.rowEndContainer, {marginTop: 8}]}>
      <TouchableOpacity
        onPress={() => {
          onPress(item.id);
        }}>
        <Text numberOfLines={1} style={{...GStyles.mediumText, fontSize: 15}}>
          {item.title}
        </Text>
        <Text
          numberOfLines={3}
          style={{...styles.infoText_12, lineHeight: 16, marginTop: 8}}>
          {item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const _renderSkills = (item) => {
  let skillList = [];
  if (item.skills) {
    skillList = item.skills.split(',');
  }

  return (
    <View style={[GStyles.rowContainer, {marginTop: 10}]}>
      {skillList.map((it, i) => {
        return (
          <View
            key={i}
            style={[
              GStyles.centerAlign,
              {
                height: 16,
                borderRadius: 5,
                backgroundColor: '#C4C2CB',
                marginHorizontal: 2,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'GothamPro-Medium',
                fontSize: 10,
                marginHorizontal: 4,
                marginTop: 2,
              }}>
              {it}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const _renderHourly = (item) => {
  return (
    <View>
      <View style={[GStyles.rowContainer, {marginTop: 10}]}>
        <Image source={ic_mini_child} style={styles.miniIcon} />
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
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
          style={{
            ...GStyles.regularText,
            fontSize: 14,
            marginLeft: 3,
          }}>
          {item.location}
        </Text>
        <Image source={ic_mini_dot} style={GStyles.miniDot} />
        <Text style={[GStyles.regularText, {fontSize: 14}]}>
          {item.location_distance}
        </Text>
      </View>
      <View style={[GStyles.rowContainer, {marginTop: 10}]}>
        <Image source={ic_mini_date} style={styles.miniIcon} />
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: 3}]}>
          Start: {item.start_date}
        </Text>
        <Text style={[GStyles.regularText, {fontSize: 14, marginLeft: '10%'}]}>
          Hours: Flexible
        </Text>
      </View>
      <JobItemWeek activeDays={['Tue', 'Wed', 'Thu']} />
    </View>
  );
};

const _renderClient = (item) => {
  return (
    <View style={{marginTop: 8}}>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          image={{uri: item.photo}}
          size={30}
          containerStyle={{...GStyles.shadow}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{...styles.infoText_12, marginTop: 4}}>{item.name}</Text>
          <View style={[GStyles.rowContainer, {marginTop: 2}]}>
            <Image source={ic_mini_star} style={[GStyles.image, {width: 12}]} />
            <Text style={{...styles.infoText_10, marginLeft: 4}}>
              {item.review_score}
            </Text>
            <Text style={{...styles.infoText_10, marginLeft: 4}}>
              ({item.review_count} reviews)
            </Text>
            <Image
              source={ic_mini_dot}
              style={[GStyles.miniDot, {marginHorizontal: 8}]}
            />
            <Text style={{...styles.infoText_10}}>
              {item.total_spent} spent
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const _renderActions = (onReject, onAccept, onChatWithClient) => {
  return (
    <>
      {onReject && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          <ActionButtion name={'Reject'} onPress={onReject}></ActionButtion>
          <ActionButtion name={'Accept'} onPress={onAccept}></ActionButtion>
          <ActionButtion
            name={'Chat with client'}
            onPress={onChatWithClient}></ActionButtion>
        </View>
      )}
    </>
  );
};

const actionButtonColor = {
  Reject: '#FA6400',
  Accept: '#7BC3A4',
  'Chat with client': '#0C4682',
};

const ActionButtion = ({name, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width: 92,
        height: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: actionButtonColor[name],
        marginHorizontal: 2,
      }}>
      <Text
        style={{fontFamily: 'GothamPro-Medium', fontSize: 10, color: 'white'}}>
        {name}
      </Text>
    </View>
  </TouchableOpacity>
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
  infoText_8: {
    fontFamily: 'GothamPro',
    fontSize: 8,
    color: GStyle.infoColor,
  },
  infoText_10: {
    fontFamily: 'GothamPro',
    fontSize: 10,
    color: GStyle.infoColor,
  },
  infoText_12: {
    fontFamily: 'GothamPro',
    fontSize: 12,
    color: GStyle.fontColor,
  },

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

export default JobItem;
export {JobItemWeek};
