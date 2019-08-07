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

import CProfessionalsAllScreen from './CProfessionalsAllScreen';
import CProfessionalsFavoritesScreen from './CProfessionalsFavoritesScreen';
import CProfessionalsNearbyScreen from './CProfessionalsNearbyScreen';


export default class CProfessionalsTabScreen extends Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsTabScreen start');
    
    this.state = {
      value: true,
    };
  }

  onLogo = () => {
    console.log('---');
  };

  onFilter = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={{flex: 1}}>
          <GHeaderBar
            headerTitle="Professionals"
            leftType="logo"
            onPressLeftButton={this.onLogo}
            rightType="filter"
            onPressRightButton={this.onFilter}
          />
          <ScrollableTabView
            initialPage={0}
            tabBarBackgroundColor={GStyle.snowColor}
            renderTabBar={() => <ScrollableTabBar />}>
            <CProfessionalsAllScreen tabLabel="ALL" />
            <CProfessionalsNearbyScreen tabLabel="NEARBY" />
            <CProfessionalsFavoritesScreen tabLabel="FAVORITES" />
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
