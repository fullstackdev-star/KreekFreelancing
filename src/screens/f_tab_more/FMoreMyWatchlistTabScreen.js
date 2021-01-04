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

import FMoreSavedProjectsScreen from './FMoreSavedProjectsScreen';
import FMoreFollowedClientsScreen from './FMoreFollowedClientsScreen';

class FMoreMyWatchlistTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('FMoreMyWatchlistTabScreen start');

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

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="My Watchlist"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <FMoreSavedProjectsScreen tabLabel="SAVED PROJECTS" />
            <FMoreFollowedClientsScreen tabLabel="CLIENTS FOLLOWED" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default FMoreMyWatchlistTabScreen;
