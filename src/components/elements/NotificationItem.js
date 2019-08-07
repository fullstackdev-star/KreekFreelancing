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
import Avatar from './Avatar';

const notificationStringList = {
  freelancer_bid_on_project: 'A new bid has been submitted by',
  freelancer_proposal_for_project:
    'You have received a proposal for a project by',
  freelancer_hired_for_project: 'You have been hired for a project by',

  milestone_payment_request_to_client:
    'A milestone payment has been requested by',
  milestone_payments_done_to_freelancer:
    'Your milestone payment request has been accepted by',
  project_completed_by_client: 'A project has been marked as completed by',

  freelancer_review_by_client: 'You have been given a review for a project by',
  client_review_by_freelancer: 'You have been given a review for a project by',
};
const NotificationItem = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <TouchableOpacity
      onPress={() => {
        onPress(item);
      }}>
      <View style={{width: '88%', flexDirection: 'row', alignItems: 'center'}}>
        {item.is_read == 'false' && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              position: 'absolute',
              backgroundColor: 'red',
              left: -16,
              top: 25,
            }}
          />
        )}
        <Avatar image={{uri: item.sender_photo}} status={item.sender_status} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            numberOfLines={2}
            style={[GStyles.mediumText, {lineHeight: 20}]}>
            {item.sender_name}{' '}
            <Text style={GStyles.regularText}>
              {notificationStringList[item.notification_type]}
            </Text>
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...GStyles.regularText,
              color: GStyle.grayColor,
              fontSize: 13,
              marginTop: 8,
            }}>
            {Helper.getPastTimeString(item.send_time)} ago
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({});

export default NotificationItem;
