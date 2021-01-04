import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

// var ScrollableTabView = require('react-native-scrollable-tab-view');
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from '../../lib/ScrollableTabView/index';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import CMorePaymentsInvoicesScreen from './CMorePaymentsInvoicesScreen';
import CMorePaymentsDepositScreen from './CMorePaymentsDepositScreen';

export default class CMorePaymentsTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="Payments"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <CMorePaymentsInvoicesScreen tabLabel="INVOICES" />
            <CMorePaymentsDepositScreen tabLabel="DEPOSIT" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
