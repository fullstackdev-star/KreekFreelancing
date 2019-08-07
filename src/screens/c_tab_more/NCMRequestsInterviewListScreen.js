import React from 'react';
import {
  BackHandler,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import Avatar from '../../components/elements/Avatar';
import InterviewListItem from '../../components/elements/InterviewListItem';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');
const ic_mini_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_mini_chat = require('../../assets/images/ic_mini_chat.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class NCMRequestsInterviewListScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('NCMRequestsInterviewListScreen start');

    this.state = {
      current_count: 2,
      past_count: 56,
      itemDatas: [
        {
          title: 'Need an architectural design',
          postDate: 'Today',
          postTime: '17:00 - 17:30',
          type: 'Unconfirmed',
          leftTime: '19 hours left',
          avatar: img_avatar1,
          interviewType: 'call',
        },
        {
          title: 'Logo design and Brand/Corp',
          postDate: 'Today',
          postTime: '18:00 - 18:30',
          type: 'Accepted',
          leftTime: '',
          avatar: img_avatar2,
          interviewType: 'chat',
        },
        {
          title: 'I need a babysitter for a few',
          postDate: 'Tue Oto',
          postTime: '17:00 - 17:30',
          type: 'Completed',
          leftTime: '',
          avatar: img_avatar3,
          interviewType: 'call',
        },
        {
          title: 'Logo design and Brand/Corp',
          postDate: 'Sun Sep',
          postTime: '18:00 - 18:30',
          type: 'Accepted',
          leftTime: '',
          avatar: img_avatar4,
          interviewType: 'call',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onDetail = (type) => {
    if (type == 'Unconfirmed') {
      this.context.navigate('c_m_requests_interview_unconfirmed');
    } else if (type == 'Accepted') {
      this.context.navigate('c_m_requests_interview_accepted');
    } else if (type == 'Completed') {
      this.context.navigate('c_m_requests_interview_completed');
    } else if (type == 'Canceled') {
      Alert.alert('The project is canceled.');
    } else if (type == 'Declined') {
      Alert.alert('The project is declined.');
    } else {
      alert('Error');
    }
  };

  onSeeAll = () => {
    this.context.navigate('c_m_requests_past_interview');
  };

  render() {
    const {current_count, past_count, itemDatas} = this.state;

    return (
      <SafeAreaView style={GStyles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '88%'}}>
          {this._renderTitle('Current', current_count)}
          <InterviewListItem
            item={itemDatas[0]}
            onPress={() => {
              this.onDetail(itemDatas[0].type);
            }}
          />
          <InterviewListItem
            item={itemDatas[1]}
            onPress={() => {
              this.onDetail(itemDatas[1].type);
            }}
          />
          {this._renderTitle('Past', past_count, this.onSeeAll)}
          <InterviewListItem
            item={itemDatas[2]}
            onPress={() => {
              this.onDetail(itemDatas[2].type);
            }}
          />
          <InterviewListItem
            item={itemDatas[3]}
            onPress={() => {
              this.onDetail(itemDatas[3].type);
            }}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  _renderTitle = (title, count, onPress) => {
    return <SectionHeader title={title} count={count} onPress={onPress} />;
  };
}

const styles = StyleSheet.create({});

export default NCMRequestsInterviewListScreen;
