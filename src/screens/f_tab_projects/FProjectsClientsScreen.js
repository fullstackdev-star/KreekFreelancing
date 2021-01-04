import React from 'react';
import {
  ActivityIndicator,
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
import ProjectsClientItem from '../../components/elements/ProjectsClientItem';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

const FLATLIST_WIDTH = Helper.getContentWidth();

class FProjectsClientsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsClientsScreen start');

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

      itemDatas: [],
    };
  };

  onRefresh = (type) => {
    let {isFetching, totalCount, curPage, itemDatas} = this.state;

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
    };
    RestAPI.get_all_client_list(params, (json, err) => {
      if (type == 'init') {
        showPageLoader(false);
      } else {
        this.setState({isFetching: false});
      }

      if (err !== null) {
        Helper.alertNetworkError()
      } else {
        if (json.status === 1) {
          this.setState({totalCount: json.data.total_count});
          if (type == 'more') {
            let data = itemDatas.concat(json.data.client_list);
            this.setState({itemDatas: data});
          } else {
            this.setState({itemDatas: json.data.client_list});
          }
        } else {
          Helper.alertServerDataError()
        }
      }
    });
  };

  onFilter = () => {
    console.log('---');
  };

  onDetail = (clientId) => {
    global._clientId = clientId;
    this.context.navigate('f_projects_client_profile');
  };

  onFavorite = (isChecked, item) => {
    let {itemDatas} = this.state;

    const params = {
      client_id: item.client_id,
      is_follow: isChecked,
    };
    showPageLoader(true);
    RestAPI.update_follow_client(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          item.is_follow = isChecked;
          this.setState(itemDatas);
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to favorite.');
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
            ListFooterComponent={this._renderFooter}
            onEndReachedThreshold={0.4}
            onEndReached={() => {
              this.onRefresh('more');
            }}
            data={itemDatas}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.client_id.toString()}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderFooter = () => {
    const {isFetching} = this.state;

    if (!isFetching) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  _renderItem = ({item}) => {
    return (
      <View style={{...GStyles.centerContainer}}>
        <View style={{...GStyles.elementContainer}}>
          <ProjectsClientItem
            item={item}
            onPress={this.onDetail}
            onFavorite={this.onFavorite}
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

export default FProjectsClientsScreen;
