import React from 'react';
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

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import CJobItem from '../../components/elements/CJobItem';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';

const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');
const ic_job = require('../../assets/images/ic_job.png');

const FLATLIST_WIDTH = Helper.getContentWidth();

class FJobsOngoingScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FJobsOngoingScreen start');

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
    const params = {
      page_number: '1',
      count_per_page: Constants.COUNT_PER_PAGE,
    };

    if (type == 'pull') {
      this.setState({isFetching: true});
    } else {
      showPageLoader(true);
    }
    RestAPI.get_ongoing_job_list(params, (json, err) => {
      if (type == 'pull') {
        this.setState({isFetching: false});
      } else {
        showPageLoader(false);
      }

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to get ongoing jobs.');
      } else {
        if (json.status === 1) {
          this.setState({itemDatas: json.data.job_list});
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to get ongoing jobs.');
        }
      }
    });
  };

  onJobDetail = () => {
    console.log('---');
  };

  render() {
    const {itemDatas} = this.state;
    const itemCount = itemDatas.length;

    return (
      <>
        {itemCount > 0 && this._renderItems()}
        {itemCount < 1 && this._renderEmpty()}
      </>
    );
  }

  _renderItems = () => {
    const {isFetching, itemDatas} = this.state;

    return (
      <SafeAreaView style={GStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.onRefresh('pull');
          }}
          refreshing={isFetching}
          data={itemDatas}
          renderItem={this._renderItem}
          style={{width: FLATLIST_WIDTH}}
        />
      </SafeAreaView>
    );
  };

  _renderItem = ({item}) => {
    return <CJobItem item={item} onPress={this.onJobDetail} />;
  };

  _renderEmpty = () => {
    return (
      <SafeAreaView>
        <View style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
          <Image
            source={ic_job}
            style={{width: 160, height: 160, resizeMode: 'contain'}}
          />
          <Text style={GStyles.notifyTitle}>No proposals yet!</Text>
          <Text style={GStyles.notifyDescription}>
            You haven't applied to any job yet.{'\n'}Try searching for job.
          </Text>
        </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({});

export default FJobsOngoingScreen;
