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

const ic_mini_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_mini_chat = require('../../assets/images/ic_mini_chat.png');
const ic_mini_clock = require('../../assets/images/ic_mini_clock.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const image_search = require('../../assets/images/ic_search.png');
const image_check_active = require('../../assets/images/ic_radio_active_1.png');
const image_check_inactive = require('../../assets/images/ic_radio_inactive_1.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');
const ic_card_master = require('../../assets/images/ic_card_master.png');
const ic_card_amex = require('../../assets/images/ic_card_amex.png');
const ic_card_visa = require('../../assets/images/ic_card_visa.png');
const ic_lock = require('../../assets/images/ic_lock.png');

const cardName = {
  master: 'Master Card',
  visa: 'Visa Master',
  amex: 'American Express',
};

const cardImage = {
  master: ic_card_master,
  visa: ic_card_visa,
  amex: ic_card_amex,
};

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View
      style={{
        ...GStyles.shadow,
        width: '88%',
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}>
      <CheckBox
        customLabel={<ItemLabel item={item} />}
        checkedImage={image_check_active}
        uncheckedImage={image_check_inactive}
        containerStyle={{
          width: '100%',
          justifyContent: 'space-between',
        }}
        checkboxStyle={{width: 20, height: 20}}
        labelStyle={{marginLeft: 0}}
      />
    </View>
  </View>
);

const ItemLabel = ({item}) => (
  <View style={{...GStyles.rowContainer, flex: 1}}>
    <View
      style={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: GStyle.grayColor,
        marginLeft: 24,
      }}>
      <Image source={cardImage[item.card_type]} style={GStyles.image} />
    </View>
    <View style={{marginLeft: 10}}>
      <Text style={{...GStyles.mediumText, fontSize: 17}}>
        {cardName[item.card_type]}
      </Text>
      <Text
        style={{
          ...GStyles.mediumText,
          fontSize: 13,
          color: GStyle.grayColor,
          marginTop: 8,
        }}>
        {item.card_num}
      </Text>
    </View>
  </View>
);

class CMoreSelectCardScreen extends React.Component {
  handleTextChange = newText => this.setState({value: newText});

  constructor(props) {
    super(props);

    console.log('CMoreSelectCardScreen start');

    this.state = {
      cardDatas: [
        {
          key: '0',
          card_type: 'master',
          card_num: 'xxxx - xxxx - xxxx - 5689',
        },
        {
          key: '1',
          card_type: 'visa',
          card_num: 'xxxx - xxxx - xxxx - 6497',
        },
        {
          key: '2',
          card_type: 'master',
          card_num: 'xxxx - xxxx - xxxx - 8973',
        },
        {
          key: '3',
          card_type: 'amex',
          card_num: 'xxxx - xxxx - xxxx - 1346',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onPlus = () => {
    console.log('---');
  };

  onPressed = () => {};

  onPayNow = () => {
    this.props.navigation.navigate('c_more_payment_success');
  };

  render() {
    const {cardDatas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={styles.container}>
          {this._renderHeader()}
          <FlatList
            data={cardDatas}
            renderItem={this._renderItem}
            style={{marginTop: 20}}
          />
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Select Card"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="plus"
        onPressRightButton={this.onPlus}
      />
    );
  };

  _renderItem = ({item}) => {
    return <Item item={item} onPress={this.onPressed} />;
  };

  _renderButton = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity onPress={this.onPayNow}>
          <View style={{...GStyles.buttonFill, ...GStyles.rowContainer}}>
            <Image
              source={ic_lock}
              style={{...GStyles.image, width: 16, marginBottom: 4}}
            />
            <Text style={{...GStyles.textFill, marginLeft: 8}}>Pay Now</Text>
          </View>
        </TouchableOpacity>
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

export default CMoreSelectCardScreen;
