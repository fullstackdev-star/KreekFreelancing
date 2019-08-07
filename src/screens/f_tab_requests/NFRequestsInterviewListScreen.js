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

class NFRequestsInterviewListScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('NFRequestsInterviewListScreen start');

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

  onSeeAll = () => {
    const navigation = this.context;
    navigation.navigate('f_requests_past_interview');
  };

  handleTextChange = (newText) => this.setState({value: newText});

  render() {
    const {current_count, past_count, itemDatas} = this.state;

    return (
      <SafeAreaView style={GStyles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '88%'}}>
          {this._renderTitle('Current', current_count)}
          <InterviewListItem item={itemDatas[0]} />
          <InterviewListItem item={itemDatas[1]} />
          {this._renderTitle('Past', past_count, this.onSeeAll)}
          <InterviewListItem item={itemDatas[2]} />
          <InterviewListItem item={itemDatas[3]} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  _renderTitle = (title, count, onPress) => {
    return <SectionHeader title={title} count={count} onPress={onPress} />;
  };
}

const styles = StyleSheet.create({});

export default NFRequestsInterviewListScreen;
