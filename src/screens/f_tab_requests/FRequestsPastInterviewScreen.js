import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
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

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import Avatar from '../../components/elements/Avatar';
import InterviewListItem from '../../components/elements/InterviewListItem';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class FRequestsPastInterviewScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FRequestsPastInterviewScreen start');

    this.state = {
      current_count: 2,
      past_count: 56,
      itemDatas: [
        {
          id: 'id1',
          title: 'Stationary Design',
          postDate: 'Tue Oct 8',
          postTime: '17:00 - 17:30',
          type: 'Completed',
          avatar: img_avatar1,
          interviewType: 'call',
        },
        {
          id: 'id2',
          title: 'Website development for',
          postDate: 'Sun Sep 29',
          postTime: '18:00 - 18:30',
          type: 'Unconfirmed',
          avatar: img_avatar2,
          interviewType: 'call',
        },
        {
          id: 'id3',
          title: 'Write a fictional book on',
          postDate: 'Tue Sep 2',
          postTime: '14:00 - 14:30',
          type: 'Accepted',
          avatar: img_avatar3,
          interviewType: 'chat',
        },
        {
          id: 'id4',
          title: 'Data specialty needed for',
          postDate: 'Fri Aug 28',
          postTime: '18:00 - 18:30',
          type: 'Declined',
          avatar: img_avatar4,
          interviewType: 'call',
        },
        {
          id: 'id5',
          title: 'Handyman needed for an',
          postDate: 'Sun Sep',
          postTime: '18:00 - 18:30',
          type: 'Canceled',
          avatar: img_avatar5,
          interviewType: 'call',
        },
        {
          id: 'id6',
          title: 'Josie Andrews',
          postDate: 'Sun Sep',
          postTime: '18:00 - 18:30',
          type: 'Accepted',
          avatar: img_avatar1,
          interviewType: 'call',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onFilter = () => {
    console.log('---');
  };

  onDetail = type => {
    if (type == 'Unconfirmed') {
      this.props.navigation.navigate('f_requests_interview_unconfirmed');
    } else if (type == 'Accepted') {
      this.props.navigation.navigate('f_requests_interview_accepted');
    } else if (type == 'Completed') {
      this.props.navigation.navigate('f_requests_interview_completed');
    } else if (type == 'Canceled') {
      Alert.alert('The project is canceled.');
    } else if (type == 'Declined') {
      Alert.alert('The project is declined.');
    } else {
      alert('Error');
    }
  };

  render() {
    const {itemDatas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={styles.container}>
          {this._renderHeader()}
          <FlatList data={itemDatas} renderItem={this._renderItem} />
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Interview in Past"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="filter"
        onPressRightButton={this.onFilter}
      />
    );
  };

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <InterviewListItem
            item={item}
            onPress={() => {
              this.onDetail(item.type);
            }}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FRequestsPastInterviewScreen;
