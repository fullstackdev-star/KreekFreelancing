import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
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

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import MessageRoomItem from '../../components/elements/MessageRoomItem';
import SearchBarItem from '../../components/elements/SearchBarItem';

const image_search = require('../../assets/images/ic_search.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');

const FLATLIST_WIDTH = Helper.getContentWidth();

class FCMessagesMainScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCMessagesMainScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh('init');
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isFetching: false,
      totalCount: 0,
      curPage: 1,

      searchText: '',

      itemDatas: [],
    };
  };

  onRefresh = (type) => {
    let {isFetching, totalCount, curPage, itemDatas, searchText} = this.state;

    if (isFetching) {
      return;
    }

    if (type == 'more') {
      curPage += 1;
      const maxPage =
        (totalCount + Constants.COUNT_PER_PAGE - 1) / Constants.COUNT_PER_PAGE;
      if (curPage > maxPage) {
        return;
      }
    } else {
      curPage = 1;
    }
    this.setState({curPage});

    if (type == 'init') {
      showPageLoader(true);
    } else {
      this.setState({isFetching: true});
    }
    let params = {
      page_number: type == 'more' ? curPage : '1',
      count_per_page: Constants.COUNT_PER_PAGE,
      keyword: searchText,
    };
    RestAPI.get_room_list(params, (json, err) => {
      if (type == 'init') {
        showPageLoader(false);
      } else {
        this.setState({isFetching: false});
      }

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({totalCount: json.data.total_count});
          if (type == 'more') {
            let data = itemDatas.concat(json.data.room_list);
            this.setState({itemDatas: data});
          } else {
            this.setState({itemDatas: json.data.room_list});
          }
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onLogo = () => {
    console.log('---');
  };

  onChangeSearchText = (value) => {
    this.setState({searchText: value});
  };

  onSubmitSearchText = (value) => {};

  onPressRoom = (value) => {
    global._roomId = value.opponent_id;
    global._opponentName = value.opponent_name;
    this.props.navigation.navigate('fc_messages_chat');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          {this._renderHeader()}
          {this._renderSearch()}
          {this._renderRooms()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Messages"
        leftType="logo"
        onPressLeftButton={this.onLogo}
      />
    );
  };

  _renderSearch = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%', marginTop: 16}}>
          <SearchBarItem
            onChangeText={this.onChangeSearchText}
            onSubmitText={this.onSubmitSearchText}
          />
        </View>
      </View>
    );
  };

  _renderRooms = () => {
    const {isFetching, itemDatas} = this.state;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          this.onRefresh('pull');
        }}
        refreshing={isFetching}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          this.onRefresh('more');
        }}
        data={itemDatas}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.opponent_id.toString()}
      />
    );
  };

  _renderFooter = () => {
    const {isFetching} = this.state;

    if (!isFetching) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  _renderItem = ({item}) => {
    return <MessageRoomItem item={item} onPress={this.onPressRoom} />;
  };
}

const styles = StyleSheet.create({});

export default FCMessagesMainScreen;
