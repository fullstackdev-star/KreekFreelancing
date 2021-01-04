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

import NotificationItem from '../../components/elements/NotificationItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class CHomeApplicationsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomeApplicationsScreen start');

    this.state = {
      current_count: 2,
      past_count: 56,
      item_datas: [
        {
          id: 'id1',
          is_unread: true,
          avatar: img_avatar1,
          name: 'John Bulock',
          action: 'accepted your applications.',
          description: 'Design corporate logo for my business',
          time: '20 mins ago',
        },
        {
          id: 'id2',
          is_unread: false,
          avatar: img_avatar2,
          name: 'Bettie Chapman',
          action: 'accepted your applications.',
          description: 'Design corporate logo for my business',
          time: '20 mins ago',
        },
        {
          id: 'id3',
          is_unread: false,
          avatar: img_avatar3,
          name: 'Mary Shaw',
          action: 'accepted your applications.',
          description: 'Design corporate logo for my business',
          time: '20 mins ago',
        },
        {
          id: 'id4',
          is_unread: false,
          avatar: img_avatar4,
          name: 'Matilda Collins',
          action: 'accepted your applications.',
          description: 'Design corporate logo for my business',
          time: '20 mins ago',
        },
        {
          id: 'id5',
          is_unread: false,
          avatar: img_avatar5,
          name: 'George Davidson',
          action: 'accepted your applications.',
          description: 'Design corporate logo for my business',
          time: '20 mins ago',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = newText => this.setState({value: newText});

  onBack = () => {
    console.log('---');
  };

  onPressed = () => {};

  render() {
    const {item_datas} = this.state;

    return (
      <SafeAreaView>
        <FlatList
          data={item_datas}
          renderItem={this._renderItem}
          style={{height: '100%'}}
        />
      </SafeAreaView>
    );
  }

  _renderItem = ({item}) => {
    return <NotificationItem item={item} onPress={this.onPressed} />;
  };
}

const styles = StyleSheet.create({});

export default CHomeApplicationsScreen;
