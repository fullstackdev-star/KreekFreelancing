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

import FRequestsProposalsScreen from './FRequestsProposalsScreen';
import FRequestsInivteScreen from './FRequestsInivteScreen';

class FRequestsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('FRequestsTabScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {};
  };

  onRefresh = () => {};

  onLogo = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="Requests"
            leftType="logo"
            onPressLeftButton={this.onLogo}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <FRequestsProposalsScreen tabLabel="PROPOSALS" />
            <FRequestsInivteScreen tabLabel="INVITES" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default FRequestsTabScreen;
