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

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';

import FLeaveFeedbackModal from '../modal/FLeaveFeedbackModal';

const image_search = require('../../assets/images/ic_search.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={{width: '88%'}}>
      <View style={{...GStyles.borderBottom, flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <Text style={{...GStyles.regularText, fontSize: 13, lineHeight: 16}}>
            {item.date}
          </Text>
        </View>
        <View style={{flex: 1, marginHorizontal: 4}}>
          <Text style={[GStyles.regularText, {fontSize: 13, lineHeight: 16}]}>
            {item.amount}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
          <Text style={[GStyles.regularText, {fontSize: 13}]}>
            {item.payment_method}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

class CMorePaymentsDepositScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CMorePaymentsDepositScreen start');

    this.init();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  init = () => {
    this.state = {
      itemDatas: [
        {
          date: 'Sep.30, 2020',
          amount: '3000',
          payment_method: 'paystack',
        },
        {
          date: 'Sep.30, 2020',
          amount: '3000',
          payment_method: 'paystack',
        },
      ],
    };
  };

  onPayNow = () => {
    this.context.navigate('c_more_pay_invoice');
  };

  render() {
    const {itemDatas} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this._renderListHeader()}
        <FlatList data={itemDatas} renderItem={this.renderItem} />
      </SafeAreaView>
    );
  }

  renderItem = ({item}) => {
    return <Item item={item} onPress={this.onPayNow} />;
  };

  _renderListHeader = () => {
    return (
      <View style={[, {alignItems: 'center', marginTop: 24}]}>
        <View style={{width: '88%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>TIME</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 4}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>AMOUNT</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 8}}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>
                PAYMENT METHOD
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default CMorePaymentsDepositScreen;
