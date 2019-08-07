import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutAnimation,
  Linking,
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
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import SectionHeader from '../../components/elements/SectionHeader';
import CFeedbackItem from '../../components/elements/CFeedbackItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');

class FProjectsReviewsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsReviewsScreen start');

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
    RestAPI.get_reviews_by_client(params, (json, err) => {
      if (type == 'pull') {
        this.setState({isFetching: false});
      } else {
        showPageLoader(false);
      }

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
      } else {
        if (json.status === 1) {
          this.setState({itemDatas: json.data.review_list});
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
        <View style={{...GStyles.container}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              this.onRefresh('pull');
            }}
            refreshing={isFetching}
            data={itemDatas}
            renderItem={this._renderItem}
            style={{width: '100%'}}
          />
        </View>
      </>
    );
  }

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <CFeedbackItem item={item} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default FProjectsReviewsScreen;