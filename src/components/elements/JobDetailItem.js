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
import {JobItemProperty} from './JobItem';
import Flag from '../../lib/SvgFlagkit/Flag';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_star = require('../../assets/images/ic_mini_star.png');

const JobDetailItem = ({item, onPress}) => (
  <View>
    {_renderTitle(item)}
    {_renderJobDetail(item)}
    {_renderInfos(item)}
    {_renderClient(item.client, onPress)}
  </View>
);

const jobTypeColor = {
  onsite: '#53D0EC',
  remote: '#00AFFF',
  featured: '#7BC3A4',
  occational: '#FE9870',
  urgent: '#E45E5E',
};

const _renderTitle = (item) => {
  let jobTypes = [''];
  if (item.job_types) {
    jobTypes = item.job_types.split(',');
  }

  return (
    <View style={[GStyles.borderBottom, {paddingBottom: 12}]}>
      <Text style={[GStyles.bigText, {marginTop: 5}]}>{item.title}</Text>
      <View style={[GStyles.rowContainer, {marginTop: 10}]}>
        <Text style={{...styles.infoText_12, color: jobTypeColor[jobTypes[0]]}}>
          {Helper.capitalizeString(jobTypes[0])}
        </Text>
        <Image source={ic_mini_dot} style={GStyles.miniDot} />
        <Text style={{...styles.infoText_12}}>
          {Helper.getPastTimeString(item.post_date)} ago
        </Text>
        <Image source={ic_mini_dot} style={GStyles.miniDot} />
        {Helper.isValid(item.contry_code) && (
          <Flag id={item.contry_code} width={14} height={14} />
        )}
        <Text style={{...styles.infoText_12}}>{item.location}</Text>
      </View>
      <View style={[GStyles.rowContainer, {marginTop: 12}]}>
        <Text style={{...styles.infoText_12}}>Project Category: </Text>
        <Text style={{...styles.infoText_12}}>{item.category}</Text>
      </View>
      <View style={[GStyles.rowContainer, {marginTop: 12}]}>
        <Text style={{...styles.infoText_12}}>
          Expires in {Helper.getPastTimeString(item.post_date)}
        </Text>
      </View>
    </View>
  );
};

const _renderJobDetail = (item) => {
  let skillList = [];
  if (item.skills) {
    skillList = item.skills.split(',');
  }

  return (
    <View style={[GStyles.borderBottom, {paddingBottom: 12}]}>
      <View style={{marginTop: 16}}>
        <Text style={[GStyles.regularText, {lineHeight: 24}]}>
          {item.description}
        </Text>
      </View>

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
    </View>
  );
};

const _renderInfos = (item) => {
  return (
    <View>
      {_renderInfo(
        'Client Budget:',
        '$' + item.min_budget.toString() + '-$' + item.max_budget.toString(),
      )}
      {_renderInfo('Proposals:', item.proposal_count)}
    </View>
  );
};

const _renderInfo = (name, value) => {
  return (
    <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
      <View style={GStyles.rowContainer}>
        <Image
          source={ic_mini_dot}
          style={[GStyles.image, {width: 4, tintColor: GStyle.activeColor}]}
        />
        <Text style={[GStyles.regularText, {marginLeft: 10}]}>{name}</Text>
      </View>
      <Text style={GStyles.regularText}>{value}</Text>
    </View>
  );
};

const _renderClient = (item, onPress) => {
  return (
    <View style={{marginTop: 28}}>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Avatar
            image={{uri: item.photo}}
            size={30}
            containerStyle={{...GStyles.shadow}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{...styles.infoText_12, marginTop: 4}}>
              {item.name}
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 2}]}>
              <Image
                source={ic_mini_star}
                style={[GStyles.image, {width: 12}]}
              />
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
      </TouchableOpacity>
    </View>
  );
};

const ___renderDate = (item, onPress) => {
  return (
    <>
      {item.client_name && (
        <View>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.grayColor,
              marginLeft: 10,
              marginTop: 20,
            }}>
            Posted on {item.postDate} by
          </Text>
          <TouchableOpacity onPress={onPress} style={{marginTop: 10}}>
            <View style={{...GStyles.rowContainer}}>
              <Text
                style={{
                  fontFamily: 'GothamPro',
                  fontSize: 13,
                  color: GStyle.activeColor,
                  marginLeft: 10,
                }}>
                {item.client_name}({item.client_review_score})
              </Text>
              <Image source={ic_star} style={{...GStyles.image, width: 10}} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

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
    color: GStyle.infoColor,
  },
});

export default JobDetailItem;
