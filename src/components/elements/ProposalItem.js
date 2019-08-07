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
import ReadMore from '../../lib/ReadMore/index';

const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active_1.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive_1.png');
const ic_mini_location = require('../../assets/images/ic_mini_location_1.png');

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_mini_star = require('../../assets/images/ic_mini_star.png');
const ic_message = require('../../assets/images/ic_message.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');

const ProposalItem = ({item}) => {
  return (
    <View>
      <View style={{...GStyles.rowContainer}}>
        <Avatar image={item.avatar} status={item.status} />
        <View style={{flex: 1, marginLeft: 4}}>
          <View style={{...GStyles.rowEndContainer}}>
            <View style={{...GStyles.rowContainer}}>
              <Text style={{...GStyles.regularText, fontSize: 14}}>
                {item.name}
              </Text>
              <Image
                source={ic_radio_active}
                style={{...GStyles.image, width: 14, marginLeft: 4}}
              />
            </View>
            <Text style={{...GStyles.regularText, fontSize: 12}}>
              <Text style={{fontWeight: 'bold'}}>{item.price}</Text> in{' '}
              {item.period}
            </Text>
          </View>
          <View style={{...GStyles.rowEndContainer, marginTop: 12}}>
            <View style={{...GStyles.rowContainer}}>
              <Image
                source={ic_mini_star}
                style={{...GStyles.image, width: 14, marginBottom: 4}}
              />
              <Text
                style={{
                  fontFamily: 'GothamPro',
                  fontSize: 11,
                  color: GStyle.grayColor,
                  marginLeft: 4,
                }}>
                {item.reviewScore} ({item.reviewCount} review)
              </Text>
            </View>
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: GStyle.grayBackColor,
              }}
            />
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 11,
                color: GStyle.grayColor,
                marginLeft: 4,
              }}>
              {item.totalEarned} earned
            </Text>
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: GStyle.grayBackColor,
              }}
            />
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 11,
                color: GStyle.grayColor,
                marginLeft: 4,
              }}>
              {item.completionPercent} Completion
            </Text>
          </View>
        </View>
      </View>
      <View style={{...GStyles.rowContainer, flexDirection: 'row-reverse'}}>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 14,
              color: GStyle.linkColor,
            }}>
            Hire
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={ic_message}
            style={{...GStyles.image, width: 16, marginRight: 8}}
          />
        </TouchableOpacity>
      </View>
      <View style={{...GStyles.borderBottom}}>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          onReady={_handleTextReady}>
          <Text style={{...GStyles.regularText, fontSize: 14, lineHeight: 20}}>
            {item.content}
          </Text>
        </ReadMore>
      </View>
    </View>
  );
};

_renderTruncatedFooter = handlePress => {
  return (
    <Text style={{color: GStyle.linkColor, marginTop: 4}} onPress={handlePress}>
      more...
    </Text>
  );
};

_renderRevealedFooter = handlePress => {
  return (
    <Text style={{color: GStyle.linkColor, marginTop: 4}} onPress={handlePress}>
      less
    </Text>
  );
};

_handleTextReady = () => {};

const styles = StyleSheet.create({});

export default ProposalItem;
