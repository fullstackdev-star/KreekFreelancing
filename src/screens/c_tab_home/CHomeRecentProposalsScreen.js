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
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import JobItem from '../../components/elements/JobItem';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import Constants from '../../DB/Constants';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');

const FLATLIST_WIDTH = Helper.getContentWidth();

class CHomeRecentProposalsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CHomeRecentProposalsScreen start');

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

      totalCount: '0',
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
    RestAPI.get_recent_proposal_list(params, (json, err) => {
      if (type == 'init') {
        showPageLoader(false);
      } else {
        this.setState({isFetching: false});
      }

      if (err !== null) {
        Alert.alert(
          Constants.errorTitle,
          'Failed to get projects from server.',
        );
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
          Alert.alert(
            Constants.errorTitle,
            'Failed to get projects from server.',
          );
        }
      }
    });
  };

  onBack = () => {
    this.props.navigation.goBack()
  };

  onJobDetail = (projectId) => {
    global._projectId = projectId;
    this.context.navigate('fc_projects_detail');
  };

  onFavorite = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          {this._renderProjectCount()}
          {this._renderProjects()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Recent Proposals"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

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
        style={{width: FLATLIST_WIDTH}}
      />
    );
  };

  _renderFooter = () => {
    const {isFetching} = this.state;

    if (!isFetching) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  _renderItem = ({item, i}) => {
    return (
      <JobItem
        key={i}
        item={item}
        onPress={this.onJobDetail}
        onFavorite={this.onFavorite}
      />
    );
  };
}

const styles = StyleSheet.create({});

export default CHomeRecentProposalsScreen;