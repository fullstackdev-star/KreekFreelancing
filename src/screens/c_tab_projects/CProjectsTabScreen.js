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

import FCProjectsAllScreen from '../f_tab_projects/FCProjectsAllScreen';
import FCProjectsOpenScreen from '../f_tab_projects/FCProjectsOpenScreen';

export default class CProjectsTabScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: true,
    };
  }

  onLogo = () => {
    console.log('---');
  };

  onAdd = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="Projects"
            leftType="logo"
            onPressLeftButton={this.onLogo}
            rightType="add"
            onPressRightButton={this.onAdd}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <FCProjectsAllScreen tabLabel="ALL PROJECTS" />
            <FCProjectsOpenScreen tabLabel="OPEN PROJECTS" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
