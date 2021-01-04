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

import NCMoreOpenJobsScreen from './NCMoreOpenJobsScreen';

export default class NCMoreMyPostTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('NCMoreMyPostTabScreen start');

    this.state = {
      value: true,
    };
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onPlus = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="My Post"
            leftType="back"
            onPressLeftButton={this.onBack}
            rightType="plus"
            onPressRightButton={this.onPlus}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <NCMoreOpenJobsScreen tabLabel="OPEN JOB" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
