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

import FMoreApplicationsScreen from './FMoreApplicationsScreen';
import FMoreApplicationsScreen1 from './FMoreApplicationsScreen';
import FMoreApplicationsScreen2 from './FMoreApplicationsScreen';

export default class FMoreNotificationsTabScreen extends Component {
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
          {this._renderHeader()}
          {this._renderTabView()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Notifications"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTabView = () => {
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={GStyle.snowColor}
        renderTabBar={() => <ScrollableTabBar />}>
        <FMoreApplicationsScreen tabLabel="APPLICATIONS" />
        <FMoreApplicationsScreen1 tabLabel="INTERVIEW" />
        <FMoreApplicationsScreen2 tabLabel="INVITE" />
      </ScrollableTabView>
    );
  };
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
