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

import {GStyle, GStyles, Global, Helper} from '../utils/Global/index';

import CHomeMainScreen from '../screens/c_tab_home/CHomeMainScreen';
import CProfessionalsTabScreen from '../screens/c_tab_professionals/CProfessionalsTabScreen';
import FCMessagesMainScreen from '../screens/f_tab_messages/FCMessagesMainScreen';
import CProjectsTabScreen from '../screens/c_tab_projects/CProjectsTabScreen';
import CMoreMainScreen from '../screens/c_tab_more/CMoreMainScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const ic_tab_home = require('../assets/images/ic_tab_home.png');
const ic_tab_professionals = require('../assets/images/ic_tab_projects.png');
const ic_tab_messages = require('../assets/images/ic_tab_messages.png');
const ic_tab_applications = require('../assets/images/ic_tab_applications.png');
const ic_tab_requests = require('../assets/images/ic_tab_requests.png');
const ic_tab_more = require('../assets/images/ic_tab_more.png');

const Tab = createBottomTabNavigator();

export default class CMainTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  render() {
    const {value} = this.state;
    // crn_dev
    // global.roleId = 2

    return (
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          activeTintColor: GStyle.activeColor,
          inactiveTintColor: GStyle.grayColor,
        }}>
        <Tab.Screen
          name="home"
          component={CHomeMainScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_home}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="find"
          component={CProfessionalsTabScreen}
          options={{
            tabBarLabel: 'Professionals',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_professionals}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="requests"
          component={CProjectsTabScreen}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_requests}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="messages"
          component={FCMessagesMainScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_messages}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="more"
          component={CMoreMainScreen}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_more}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
