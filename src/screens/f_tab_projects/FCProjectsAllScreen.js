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

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import JobItem from '../../components/elements/JobItem';
import CheckBox from '../../lib/Checkbox/index';

const ic_mini_call = require('../../assets/images/ic_mini_call.png');

const FLATLIST_WIDTH = Helper.getContentWidth();

class FCProjectsAllScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FCProjectsAllScreen start');

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
    RestAPI.get_all_project_list(params, (json, err) => {
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
            let data = itemDatas.concat(json.data.project_list);
            this.setState({itemDatas: data});
          } else {
            this.setState({itemDatas: json.data.project_list});
          }
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onJobDetail = (projectId) => {
    global._projectId = projectId;

    if (global.roleId == 2) {
      this.context.navigate('c_projects_details_tab');
    } else {
      this.context.navigate('fc_projects_detail');
    }
  };

  onFavorite = (isChecked, item) => {
    let {itemDatas} = this.state;

    const params = {
      project_id: item.id,
      is_favorite: isChecked,
    };
    showPageLoader(true);
    RestAPI.update_favorite_project(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to favorite.');
      } else {
        if (json.status === 1) {
          item.is_favorite = isChecked;
          this.setState(itemDatas);
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to favorite.');
        }
      }
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.container}>
          {this._renderProjectCount()}
          {this._renderProjects()}
        </SafeAreaView>
      </>
    );
  }

  _renderProjectCount = () => {
    const {totalCount} = this.state;

    return (
      <View style={{width: '88%', marginTop: 18}}>
        <View style={GStyles.rowContainer}>
          <Text style={[GStyles.mediumText, {fontSize: 17}]}>ALL</Text>
          <Text
            style={{
              ...GStyles.regularText,
              lineHeight: 17,
              color: GStyle.grayColor,
              marginLeft: 4,
            }}>
            {totalCount}
          </Text>
        </View>
      </View>
    );
  };

  _renderProjects = () => {
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
        keyExtractor={(item) => item.id.toString()}
        style={{width: FLATLIST_WIDTH}}
      />
    );
  };

  _renderFooter = () => {
    const {isFetching} = this.state;

    if (!isFetching) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  _renderItem = ({item}) => {
    return (
      <JobItem
        item={item}
        onPress={this.onJobDetail}
        onFavorite={this.onFavorite}
      />
    );
  };
}

const styles = StyleSheet.create({});

export default FCProjectsAllScreen;
