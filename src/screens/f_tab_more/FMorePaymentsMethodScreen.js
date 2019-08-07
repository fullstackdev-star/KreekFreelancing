import React from 'react';
import {
  Alert,
  Animated,
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
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';

import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';
import {SwipeListView} from '../../lib/SwipeListView/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';

const ic_notification = require('../../assets/images/ic_notification.png');
const ic_more_jobs = require('../../assets/images/ic_more_jobs.png');
const ic_more_stats = require('../../assets/images/ic_more_stats.png');
const ic_more_payments = require('../../assets/images/ic_more_payments.png');
const ic_more_profile = require('../../assets/images/ic_more_profile.png');
const ic_more_settings = require('../../assets/images/ic_more_settings.png');
const ic_more_about = require('../../assets/images/ic_more_about.png');
const ic_more_help = require('../../assets/images/ic_more_help.png');
const ic_more_membership = require('../../assets/images/ic_more_membership.png');
const ic_more_darkmode = require('../../assets/images/ic_more_darkmode.png');
const ic_more_share = require('../../assets/images/ic_more_share.png');
const ic_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_card_amex = require('../../assets/images/ic_card_amex.png');
const ic_card_master = require('../../assets/images/ic_card_master.png');

// const rowTranslateAnimatedValues = {};
// Array(4)
//   .fill('')
//   .forEach((_, i) => {
//     rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
//   });

class FMorePaymentsMethodScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FMorePaymentsMethodScreen start');

    this.state = {
      cardDatas: [
        {
          key: '0',
          card_type: 'master',
          card_num: 'xxxx - xxxx - xxxx - 5689',
        },
        {
          key: '1',
          card_type: 'master',
          card_num: 'xxxx - xxxx - xxxx - 6497',
        },
        {
          key: '2',
          card_type: 'master',
          card_num: 'xxxx - xxxx - xxxx - 8973',
        },
        {
          key: '3',
          card_type: 'ames',
          card_num: 'xxxx - xxxx - xxxx - 1346',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = newText => this.setState({value: newText});

  onAdd = () => {
    const navigation = this.context;
    navigation.navigate('f_more_add_card');
  };

  toggleSwitch = value => {
    this.setState({dark_mode: value});
  };

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    const {cardDatas} = this.state;
    this.closeRow(rowMap, rowKey);
    const newData = [...cardDatas];
    const prevIndex = cardDatas.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({cardDatas: newData});
  };

  onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  renderItem = data => (
    <View style={{...GStyles.centerContainer, backgroundColor: 'transparent'}}>
      <View style={{...GStyles.elementContainer}}>
        <View style={{...GStyles.shadow, ...styles.rowFront}}>
          <View style={{...GStyles.rowContainer}}>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: GStyle.grayColor,
                marginLeft: 16,
              }}>
              <Image source={ic_card_master} style={GStyles.image} />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={[GStyles.mediumText, {fontSize: 17}]}>
                Master Card
              </Text>
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.grayColor, marginTop: 8},
                ]}>
                {data.item.card_num}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  renderHiddenItem = (data, rowMap) => (
    <View style={{...GStyles.centerContainer}}>
      <View style={{...GStyles.elementContainer}}>
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => this.closeRow(rowMap, data.item.key)}>
            <Text style={styles.backTextWhite}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => this.deleteRow(rowMap, data.item.key)}>
            <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  render() {
    const {cardDatas} = this.state;

    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        {this._renderAdd()}
        <View style={{marginTop: 24}}>
          <SwipeListView
            data={cardDatas}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={this.onRowDidOpen}
          />
        </View>
      </SafeAreaView>
    );
  }

  _renderAdd = () => (
    <View style={{alignItems: 'center'}}>
      <View style={{width: '88%', marginTop: 24}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.onAdd}>
            <Text
              style={{
                ...GStyles.mediumText,
                fontSize: 13,
                color: GStyle.linkColor,
                marginTop: 8,
              }}>
              +Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    height: 96,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 12,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 16,
    marginVertical: 12,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#FE9870',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#FA4169',
    right: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default FMorePaymentsMethodScreen;
