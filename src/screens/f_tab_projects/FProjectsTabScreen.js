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

import FCProjectsAllScreen from './FCProjectsAllScreen';
import FProejctsMatchesScreen from './FProejctsMatchesScreen';
import FProjectsNearbyScreen from './FProjectsNearbyScreen';
import FProjectsClientsScreen from './FProjectsClientsScreen';

export default class FProjectsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('FProjectsTabScreen start');

    this.state = {
      value: true,
    };
  }

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
        headerTitle="Projects"
        leftType="logo"
        rightType="filter"
        onPressLeftButton={this.onLogo}
        onPressRightButton={this.onFilter}
      />
    );
  }

  _renderTabBar = () => {
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={GStyle.snowColor}
        renderTabBar={() => <ScrollableTabBar />}>
        <FCProjectsAllScreen tabLabel="ALL" />
        <FProejctsMatchesScreen tabLabel="MATCHES" />
        <FProjectsNearbyScreen tabLabel="NEARBY" />
        <FProjectsClientsScreen tabLabel="CLIENTS" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({});
