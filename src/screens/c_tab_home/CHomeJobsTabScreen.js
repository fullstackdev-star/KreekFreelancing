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

import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from '../../lib/ScrollableTabView/index';

import GHeaderBar from '../../components/GHeaderBar';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import CHomeJobsOngoingScreen from './CHomeJobsOngoingScreen';
import CHomeJobsCanceledScreen from './CHomeJobsCanceledScreen';
import CHomeJobsCompletedScreen from './CHomeJobsCompletedScreen';

export default class CHomeJobsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('CHomeJobsTabScreen start');

    this.init();
  }

  init = () => {
    this.state = {
      value: true,
    };
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onFilter = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          {this._renderHeader()}
          {this._renderTabBar()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Jobs"
        leftType="back"
        rightType="filter"
        onPressLeftButton={this.onBack}
        onPressRightButton={this.onFilter}
      />
    );
  };

  _renderTabBar = () => {
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={GStyle.snowColor}
        renderTabBar={() => <ScrollableTabBar />}>
        <CHomeJobsOngoingScreen tabLabel="ONGOING" />
        <CHomeJobsCanceledScreen tabLabel="CANCELED" />
        <CHomeJobsCompletedScreen tabLabel="COMPLETED" />
      </ScrollableTabView>
    );
  };
}

const styles = StyleSheet.create({});
