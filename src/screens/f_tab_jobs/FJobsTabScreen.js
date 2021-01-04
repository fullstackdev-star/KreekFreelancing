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

import FJobsOngoingScreen from './FJobsOngoingScreen';
import FJobsCanceledScreen from './FJobsCanceledScreen';
import FJobsCompletedScreen from './FJobsCompletedScreen';

export default class FJobsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('FJobsTabScreen start');

    this.init();
  }

  init = () => {
    this.state = {};
  };

  onLogo = () => {
    console.log('---');
  };

  onFilter = () => {
    this.props.navigation.navigate('f_projects_filter');
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
        leftType="logo"
        rightType="filter"
        onPressLeftButton={this.onLogo}
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
        <FJobsOngoingScreen tabLabel="ONGOING" />
        <FJobsCanceledScreen tabLabel="CANCELED" />
        <FJobsCompletedScreen tabLabel="COMPLETED" />
      </ScrollableTabView>
    );
  };
}

const styles = StyleSheet.create({});
