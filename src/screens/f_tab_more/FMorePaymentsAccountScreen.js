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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import FPaymentWithdrawModal from '../modal/FPaymentWithdrawModal';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_mini_call = require('../../assets/images/ic_mini_call.png');
const ic_mini_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_mini_chat = require('../../assets/images/ic_mini_chat.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const image_search = require('../../assets/images/ic_search.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={{width: '90%'}}>
      <View style={[GStyles.rowEndContainer, GStyles.borderBottom]}>
        <View>
          <Text style={[GStyles.regularText]}>{item.title}</Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
            {item.description}
          </Text>
          <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
            {item.date}
          </Text>
        </View>
        <Text style={[GStyles.mediumText, {color: GStyle.redColor}]}>
          {item.amount}
        </Text>
      </View>
    </View>
  </View>
);

class FMorePaymentsAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMorePaymentsAccountScreen start');

    this.state = {
      is_visible_withdraw_modal: false,
      option_type: '',
      option_date_range: '',
      item_datas: [
        {
          id: 'id1',
          title: 'Withdraw to Bank account',
          description: 'GT Bank Ghana - XXXX344',
          date: 'June 1,  2020',
          amount: '- C300',
        },
        {
          id: 'id2',
          title: 'Payment from Ramsey',
          description: 'Invoice ID: 23425',
          date: 'June 1,  2020',
          amount: '- C500',
        },
        {
          id: 'id3',
          title: 'Withdraw to Bank account',
          description: 'GT Bank Ghana - XXXX344',
          date: 'June 1,  2020',
          amount: '- C300',
        },
        {
          id: 'id4',
          title: 'Payment from Ramsey',
          description: 'Invoice ID: 23425',
          date: 'June 1,  2020',
          amount: '- C500',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onGoBack = () => {
    console.log('---');
  };

  onWithdraw = () => {
    this.setState({is_visible_withdraw_modal: true});
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FPaymentWithdrawModal
          modalVisible={this.state.is_visible_withdraw_modal}
          onPressCancel={() => {
            this.setState({is_visible_withdraw_modal: false});
          }}
        />
        {this._renderTitle()}
        {this._renderOptions()}
        {this._renderList()}
      </SafeAreaView>
    );
  }

  _renderTitle = () => (
    <View style={{alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 40}]}>
          Account Balance
        </Text>
        <View style={GStyles.rowEndContainer}>
          <Text style={[GStyles.bigText, {marginTop: 16}]}>GHC 3000</Text>
          <TouchableOpacity onPress={this.onWithdraw}>
            <Text
              style={[
                GStyles.mediumText,
                {fontSize: 13, color: GStyle.linkColor},
              ]}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  renderItem = ({item}) => <Item item={item} onPress={this.onPressed} />;

  _renderOptions = () => {
    let index = 0;
    const date_range_data = [
      {key: index++, section: true, label: 'Type'},
      {key: index++, label: 'Type1'},
      {key: index++, label: 'Type2'},
      {key: index++, label: 'Type3'},
    ];
    index = 0;
    const year_data = [
      {key: index++, section: true, label: 'Date range'},
      {key: index++, label: 'Range1'},
      {key: index++, label: 'Range2'},
      {key: index++, label: 'Range3'},
    ];
    const {option_type, option_date_range} = this.state;
    return (
      <View style={{alignItems: 'center', marginTop: 24}}>
        <View style={{width: '90%'}}>
          <View style={GStyles.rowEndContainer}>
            <ModalSelector
              data={date_range_data}
              initValue={option_type}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                this.setState({option_type: option.label});
              }}
              style={{
                width: 100,
                height: 30,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 32}]}>
                <TextInput
                  style={[
                    GStyles.mediumText,
                    {
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      color: GStyle.grayColor,
                    },
                  ]}
                  editable={false}
                  placeholder="Type"
                  value={this.state.option_type}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
            <ModalSelector
              data={year_data}
              initValue={option_date_range}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => {
                this.setState({option_date_range: option.label});
              }}
              style={{
                width: 100,
                height: 30,
                backgroundColor: GStyle.grayBackColor,
                borderRadius: 6,
              }}>
              <View style={[GStyles.rowEndContainer, {height: 32}]}>
                <TextInput
                  style={[
                    GStyles.mediumText,
                    {
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      color: GStyle.grayColor,
                    },
                  ]}
                  editable={false}
                  placeholder="Date range"
                  value={this.state.option_date_range}
                />
                <Image
                  source={image_dropdown}
                  style={{...GStyles.image, width: 12, marginRight: 8}}
                />
              </View>
            </ModalSelector>
            <View style={[GStyles.centerAlign, {width: 100, height: 30}]}>
              <TouchableOpacity>
                <Text
                  style={[
                    GStyles.mediumText,
                    {fontSize: 13, color: GStyle.linkColor},
                  ]}>
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderList = () => {
    const {item_datas} = this.state;

    return (
      <View style={{marginTop: 8}}>
        <FlatList
          data={item_datas}
          renderItem={this.renderItem}
          style={{height: '100%'}}
        />
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

export default FMorePaymentsAccountScreen;
