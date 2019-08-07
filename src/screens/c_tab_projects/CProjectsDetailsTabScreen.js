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

import FCProjectsDetailsScreen from '../f_tab_projects/FCProjectsDetailScreen';
import CProjectsProposalsScreen from './CProjectsProposalsScreen';
import CProjectsFilesScreen from './CProjectsFilesScreen';
import CProjectsPaymentsScreen from './CProjectsPaymentsScreen';
import CProjectsReviewScreen from './CProjectsReviewScreen';

class CProjectsDetailsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('CProjectsDetailsTabScreen start');

    this.init();
  }

  init = () => {
    this.state = {};
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="I want to add paypal to my ecommerce werbsite"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <FCProjectsDetailsScreen tabLabel="DETAILS" />
            <CProjectsProposalsScreen tabLabel="PROPOSALS" />
            <CProjectsFilesScreen tabLabel="FILES" />
            <CProjectsPaymentsScreen tabLabel="PAYMENTS" />
            <CProjectsReviewScreen tabLabel="REVIEWS" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default CProjectsDetailsTabScreen;
