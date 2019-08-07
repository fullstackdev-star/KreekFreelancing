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

import CHomeApplicationsScreen from './CHomeApplicationsScreen';
import CHomeApplicationsScreen1 from './CHomeApplicationsScreen';
import CHomeApplicationsScreen2 from './CHomeApplicationsScreen';


export default class CHomeNotificationsTabScreen extends Component {
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
            headerTitle="Notifications"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <CHomeApplicationsScreen tabLabel="APPLICATIONS" />
            <CHomeApplicationsScreen1 tabLabel="INTERVIEW" />
            <CHomeApplicationsScreen2 tabLabel="BOOKINGS" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
