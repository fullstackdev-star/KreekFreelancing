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

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import Avatar from '../../components/elements/Avatar';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import CFeedbackItem from '../../components/elements/CFeedbackItem';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';
import {AirbnbRating} from '../../lib/StarRating/index';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class FProjectsClientDetailScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsClientDetailScreen start');

    this.init();
  }

  componentDidMount() {
    this.setState({isGetDataDone: false});
    showPageLoader(true);
    RestAPI.get_client_info(global._clientId, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(
          Constants.errorTitle,
          'Failed to get client data from server.',
        );
      } else {
        if (json.status === 1) {
          const itemData = json.data;
          this.setState({itemData: itemData, isGetDataDone: true});
        } else {
          Alert.alert(
            Constants.errorTitle,
            'Failed to get client data from server.',
          );
        }
      }
    });
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isGetDataDone: false,

      itemData: {},
    };
  };

  onClose = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderClient()}
            {this._renderStats()}
            {this._renderFeedback()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="About Client"
        leftType="back"
        onPressLeftButton={this.onClose}
      />
    );
  };

  _renderClient = () => {
    const {itemData} = this.state;

    return (
      <View style={{marginTop: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Avatar image={{uri: itemData.photo}} size={59} containerStyle={{...GStyles.shadow}}/>
          <View style={{marginLeft: 10}}>
            <View style={[GStyles.rowContainer, {marginTop: 15}]}>
              <Text style={GStyles.mediumText}>{itemData.client_name}</Text>
              <Image
                source={ic_mini_dot}
                style={[GStyles.miniDot, {marginHorizontal: 8}]}
              />
              <Text style={GStyles.regularText}>
                {itemData.client_review_score}
              </Text>
              <Image source={ic_star} style={[GStyles.image, {width: 14}]} />
            </View>
            <View style={[GStyles.rowContainer, {marginTop: 10}]}>
              <Text style={[GStyles.regularText, {fontSize: 14}]}>
                {itemData.location}
              </Text>
              <Image
                source={ic_mini_dot}
                style={[GStyles.miniDot, {marginHorizontal: 8}]}
              />
              <Text style={[GStyles.regularText, {fontSize: 14}]}>
                {itemData.total_spent} spent
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderStats = () => {
    const {itemData} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <Text style={[GStyles.mediumText, {fontSize: 17}]}>Stats</Text>
        <View style={[GStyles.rowEndContainer, {marginTop: 24}]}>
          <Text style={GStyles.regularText}>Member since:</Text>
          <Text style={GStyles.regularText}>
            {Helper.getDateString4Server(itemData.member_since)}
          </Text>
        </View>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={GStyles.regularText}>Jobs posted:</Text>
          <Text style={GStyles.regularText}>{itemData.project_post_count}</Text>
        </View>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={GStyles.regularText}>Jobs paid:</Text>
          <Text style={GStyles.regularText}>{itemData.project_paid_count}</Text>
        </View>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={GStyles.regularText}>Paid invoice:</Text>
          <Text style={GStyles.regularText}>{itemData.paid_invoice_count}</Text>
        </View>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={GStyles.regularText}>Oustanding invoice:</Text>
          <Text style={GStyles.regularText}>
            {itemData.outstanding_invoice_count}
          </Text>
        </View>
      </View>
    );
  };

  _renderFeedback = () => {
    const {itemData} = this.state;

    return (
      <>
        <View style={[GStyles.rowEndContainer, {marginTop: 32}]}>
          <Text style={[GStyles.mediumText, {fontSize: 17}]}>Feedback</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[GStyles.regularText, {marginTop: 3}]}>
              {itemData.client_review_score}
            </Text>
            <AirbnbRating
              showRating={false}
              onFinishRating={this.ratingCompleted}
              style={{paddingVertical: 10}}
              isDisabled={true}
              defaultRating={itemData.client_review_score}
              starContainerStyle={{width: 85, height: 20}}
              size={14}
            />
          </View>
        </View>
        <View style={{marginTop: 5}}>{this._renderFeedbackList()}</View>
      </>
    );
  };

  _renderFeedbackList = () => {
    const {itemData, isGetDataDone} = this.state;

    return (
      isGetDataDone &&
      itemData.feedback_list.map((item, i) => {
        return <CFeedbackItem key={i} item={item} />;
      })
    );
  };
}

const styles = StyleSheet.create({});

export default FProjectsClientDetailScreen;
