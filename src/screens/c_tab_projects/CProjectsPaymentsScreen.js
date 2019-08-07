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

import CProjectsRequestMilestoneModal from '../modal/CProjectsRequestMilestoneModal';
import CProjectsPayMilestoneModal from '../modal/CProjectsPayMilestoneModal';
import FMorePaymentsInvoicesScreen from '../f_tab_more/FMorePaymentsInvoicesScreen';

const image_search = require('../../assets/images/ic_search.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');

const Item = ({item, onPress}) => {
  return (
    <View style={{...GStyles.borderBottom, flexDirection: 'row'}}>
      <View style={{flex: 1, marginRight: 8}}>
        <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 4}}>
          {item.date}
        </Text>
        <Text
          style={{
            ...GStyles.regularText,
            fontSize: 13,
            lineHeight: 15,
            marginTop: 8,
          }}>
          {item.content}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{...GStyles.rowEndContainer}}>
          <Text
            style={{
              ...GStyles.regularText,
              flex: 1,
              fontSize: 13,
              lineHeight: 16,
            }}>
            Request in progress
          </Text>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <Text style={{...GStyles.regularText, fontSize: 13}}>
              {item.requestInProgress}
            </Text>
          </View>
        </View>
        <View style={{...GStyles.rowEndContainer, marginTop: 4}}>
          <Text
            style={{
              ...GStyles.regularText,
              flex: 1,
              fontSize: 13,
              lineHeight: 16,
            }}>
            Paid Status
          </Text>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <PayStatusItem status={item.paidStatus} />
          </View>
        </View>
        <View style={{...GStyles.rowEndContainer, marginTop: 4}}>
          <Text
            style={{
              ...GStyles.regularText,
              flex: 1,
              fontSize: 13,
              lineHeight: 16,
            }}>
            Action
          </Text>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  fontFamily: 'GothamPro-Medium',
                  fontSize: 12,
                  color: GStyle.linkColor,
                }}>
                {item.paidStatus == 'unpaid' && 'Pay'}
                {item.paidStatus == 'inProgress' && 'Release'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const payItemColor = {
  unpaid: '#E02020',
  inProgress: '#F7B500',
  paid: '#00A126',
};

const payItemName = {
  unpaid: 'Unpaid',
  inProgress: 'In Progress',
  paid: 'Paid',
};

const PayStatusItem = ({status}) => (
  <View
    style={{
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: payItemColor[status],
      paddingHorizontal: 4,
      paddingVertical: 2,
    }}>
    <Text style={{fontFamily: 'GothamPro-Medium', fontSize: 8, color: 'white'}}>
      {payItemName[status]}
    </Text>
  </View>
);

class CProjectsPaymentsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CProjectsPaymentsScreen start');

    this.state = {
      isVisibleRequestModal: false,
      isVisiblePayModal: false,
      option_type: '',
      option_status: '',
      item_datas: [
        {
          id: 'id1',
          date: '27th August 2020',
          content: 'Completed the website as said',
          requestInProgress: '$20.00',
          paidStatus: 'unpaid',
        },
        {
          id: 'id2',
          date: '27th August 2020',
          content: 'Completed the website as said',
          requestInProgress: '$20.00',
          paidStatus: 'inProgress',
        },
        {
          id: 'id3',
          date: '27th August 2020',
          content: 'Completed the website as said',
          requestInProgress: '$20.00',
          paidStatus: 'paid',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onMilestone = () => {
    this.setState({isVisibleRequestModal: true});
  };

  onPay = () => {
    this.setState({isVisiblePayModal: true});
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    const {item_datas} = this.state;

    return (
      <View style={{...GStyles.container}}>
        <CProjectsRequestMilestoneModal
          modalVisible={this.state.isVisibleRequestModal}
          onPressCancel={() => {
            this.setState({isVisibleRequestModal: false});
          }}
        />
        <CProjectsPayMilestoneModal
          modalVisible={this.state.isVisiblePayModal}
          onPressCancel={() => {
            this.setState({isVisiblePayModal: false});
          }}
        />
        {this._renderMilestone()}
        <FlatList
          data={item_datas}
          renderItem={this._renderItem}
          style={{width: '100%'}}
        />
      </View>
    );
  }

  _renderMilestone = () => {
    return (
      <View style={{width: '88%', flexDirection: 'row-reverse'}}>
        <TouchableOpacity onPress={this.onMilestone}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 13,
              color: GStyle.linkColor,
              marginTop: 12,
            }}>
            +Milestone
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <View style={{marginTop: 24}}>
            <Item item={item} onPress={this.onPay} />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CProjectsPaymentsScreen;
