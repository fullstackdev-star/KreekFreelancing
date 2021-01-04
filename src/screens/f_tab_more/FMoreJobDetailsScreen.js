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
import {AirbnbRating} from '../../lib/StarRating/index';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';

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
const image_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_mini_file_add = require('../../assets/images/ic_mini_file_add.png');

class FMoreJobDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMoreJobDetailsScreen start');

    this.state = {
      item_datas: [
        {
          id: 'id1',
          avatar: img_avatar1,
          name: 'Matt Harper',
          date: 'Aug 21, 2019',
          content: 'Awesome client, always pays on time',
          star: 4,
        },
        {
          id: 'id2',
          avatar: img_avatar2,
          name: 'Matt Harper',
          date: 'Aug 21, 2019',
          content: 'Outstanding experience',
          star: 3,
        },
        {
          id: 'id3',
          avatar: img_avatar3,
          name: 'Matt Harper',
          date: 'Aug 21, 2019',
          content: 'Great, knows what he want',
          star: 4,
        },
        {
          id: 'id4',
          avatar: img_avatar4,
          name: 'Matt Harper',
          date: 'Aug 21, 2019',
          content: 'Pays on time',
          star: 5,
        },
      ],

      value: false,

      textInputValue: '',

      isVisible: true,
      isReady: false,
      showIndicator: false,

      email: '',
      password: '',
      phone_number: '',
      username: '',
      showPassword: false,
      accep_terms: false,
      selectedAddress: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = (newText) => this.setState({value: newText});

  onBack = () => {
    this.props.navigation.goBack();
  };

  onAttach = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, width: '90%'}}>
            <Text style={styles.statusText}>Job in progress</Text>
            <Text
              style={[
                GStyles.mediumText,
                {fontSize: 17, lineHeight: 20, marginTop: 32},
              ]}>
              Need an architectural design of a 4 story building
            </Text>
            {this._renderDate()}
            {this._renderAmount()}
            {this._renderJobStatus()}
            {this._renderStatus()}
            {this._renderClient()}
            {this._renderAdditional()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="My Jobs"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderDate = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Due Date
        </Text>
        <Text style={[GStyles.regularText, {marginTop: 16}]}>July 1, 2020</Text>
      </>
    );
  };

  _renderAmount = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Amount
        </Text>
        <View style={GStyles.rowEndContainer}>
          <Text style={[GStyles.regularText, {marginTop: 16}]}>C20000</Text>
          <TouchableOpacity
            onPress={() => alert('Create Milestone is clicked')}>
            <Text
              style={[
                GStyles.mediumText,
                {fontSize: 13, color: GStyle.activeColor, marginLeft: 8},
              ]}>
              Create Milestone
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  _renderJobStatus = () => {
    let index = 0;
    const jobStatusData = [
      {key: index++, section: true, label: 'Job Status'},
      {key: index++, label: 'In progress'},
      {key: index++, label: 'Pending'},
      {key: index++, label: 'Canceled'},
    ];
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Status
        </Text>
        <ModalSelector
          data={jobStatusData}
          initValue="Select one"
          accessible={true}
          onChange={(option) => {
            this.setState({paymentTypeValue: option.label});
          }}
          style={{width: '50%', marginTop: 12}}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={this.state.paymentTypeValue}
            />
            <Image
              source={image_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </>
    );
  };

  _renderStatus = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Status
        </Text>
        <View style={GStyles.rowEndContainer}>
          <Text style={[GStyles.regularText, {marginTop: 16}]}>
            View updates(36)
          </Text>
          <TouchableOpacity onPress={() => alert('Expand all is clicked')}>
            <Text
              style={[
                GStyles.mediumText,
                {fontSize: 13, color: GStyle.activeColor, marginLeft: 8},
              ]}>
              Expand all
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  _renderClient = () => {
    return (
      <View style={{marginTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={img_avatar1} style={styles.avatarImage} />
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
            <Text style={[GStyles.mediumText, {fontSize: 13, lineHeight: 18}]}>
              Marian Ramsey
            </Text>
            <View style={[GStyles.rowEndContainer]}>
              <Text
                style={[GStyles.mediumText, {fontSize: 11, lineHeight: 16}]}>
                Yup! I love it!
              </Text>
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 11, color: GStyle.grayColor, lineHeight: 16},
                ]}>
                09:40
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderAdditional = () => {
    return (
      <>
        <TextInput
          placeholder="Write message..."
          multiline={true}
          style={styles.messageText}
        />
        <View style={{marginTop: 8}}>
          <TouchableOpacity onPress={this.onAttach}>
            <View style={styles.attachButtonContainer}>
              <Image
                source={ic_mini_file_add}
                style={{width: 16, height: 16, resizeMode: 'contain'}}
              />
              <Text style={styles.attachText}>Attach file</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };
}

const styles = StyleSheet.create({
  statusText: {
    textAlign: 'center',
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
    color: GStyle.activeColor,
  },

  dropdownContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GStyle.grayBackColor,
    marginTop: 16,
  },

  avatarImage: {
    width: 59,
    height: 59,
    resizeMode: 'contain',
  },

  messageText: {
    height: 73,
    color: GStyle.fontColor,
    fontFamily: 'GothamPro',
    fontSize: 11,
    lineHeight: 16,
    borderWidth: 1,
    borderColor: GStyle.lineColor,
    marginTop: 8,
  },

  attachButtonContainer: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GStyle.grayBackColor,
    borderRadius: 10,
    borderColor: GStyle.grayColor,
  },

  attachText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: GStyle.grayColor,
    marginLeft: 2,
  },
});

export default FMoreJobDetailsScreen;
