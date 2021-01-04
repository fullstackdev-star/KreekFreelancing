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
import ClientItem from '../../components/elements/ClientItem';
import RequestDetailsItem from '../../components/elements/RequestDetailsItem';

const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class FRequestsInterviewAcceptedScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FRequestsInterviewAcceptedScreen start');

    this.state = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = newText => this.setState({value: newText});

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{...GStyles.elementContainer}}>
            {this._renderTitle()}
            {this._renderClient()}
            {this._renderRequestDetails()}
            {this._renderCancelButton()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Request Details"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={styles.statusText}>Accepted</Text>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 32}]}>
          Interview with
        </Text>
      </>
    );
  };

  _renderClient = () => {
    const itemData = {
      avatar: img_avatar1,
      name: 'Marian Ramsey',
      reviewScore: '4.0',
      location: 'Accra, Ghana',
      spentAmount: 'GHC2000',
    };

    return <ClientItem item={itemData} />;
  };

  _renderRequestDetails = () => {
    const itemData = {
      startTime: 'Today, Oct 14',
      endTime: '17:00 - 17:30',
      details: 'Need an architectural design of a 4 story building',
      jobType: 'Fixed',
      minRate: 'GHC5000',
      maxRate: 'GHC10,000',
      paymentType: 'Credit Card',
      additional:
        'I am looking for a great architectural designer to design my 4 story building house I have on paper.',
    };

    return <RequestDetailsItem item={itemData} />;
  };

  _renderCancelButton = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={this.onBack}>
          <View
            style={[
              styles.buttonBlank,
              {
                height: 36,
                borderColor: GStyle.grayColor,
                marginTop: 36,
              },
            ]}>
            <Text style={[styles.textBlank, {color: GStyle.grayColor}]}>
              Cancel Interview
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 50}}>
        <TouchableOpacity onPress={this.onBack}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Send a Message</Text>
          </View>
        </TouchableOpacity>
      </View>
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

  buttonBlank: {
    justifyContent: 'center',
    backgroundColor: GStyle.snowColor,
    borderWidth: 1,
    borderRadius: GStyle.buttonRadius,
    borderColor: GStyle.activeColor,
    width: 155,
    height: 50,
  },

  textBlank: {
    textAlign: 'center',
    color: GStyle.activeColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FRequestsInterviewAcceptedScreen;
