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

import {NavigationContext} from '@react-navigation/native';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import UserItem from '../../components/elements/UserItem';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class FProjectsFollowersScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsFollowersScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh('init');
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isFetching: false,

      itemDatas: [],
    };
  };

  onRefresh = (type) => {
    let params = {
      client_id: global._clientId,
    };

    if (type == 'pull') {
      this.setState({isFetching: true});
    } else {
      showPageLoader(true);
    }
    RestAPI.get_followers_by_client(params, (json, err) => {
      if (type == 'pull') {
        this.setState({isFetching: false});
      } else {
        showPageLoader(false);
      }

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
      } else {
        if (json.status === 1) {
          this.setState({itemDatas: json.data.follower_list});
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
        }
      }
    });
  };

  render() {
    const {isFetching, itemDatas} = this.state;

    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              this.onRefresh('pull');
            }}
            refreshing={isFetching}
            data={itemDatas}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <UserItem item={item} onPress={this.onDetail} />
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

export default FProjectsFollowersScreen;
