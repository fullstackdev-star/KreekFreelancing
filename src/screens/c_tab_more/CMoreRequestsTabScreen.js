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

import CRequestsInvitesListScreen from './CMRequestsInvitesListScreen';
import CRequestsInvitesListScreen1 from './CMRequestsInvitesListScreen';

class CMoreRequestsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('CMoreRequestsTabScreen start');

    this.init();
  }

  init = () => {
    this.state = {};
  };

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

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
            headerTitle="Requests"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <CRequestsInvitesListScreen tabLabel="INVITES" />
            <CRequestsInvitesListScreen1 tabLabel="PRIVATES" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default CMoreRequestsTabScreen;
