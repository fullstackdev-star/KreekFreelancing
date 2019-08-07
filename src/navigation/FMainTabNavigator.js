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

import FProjectsTabScreen from '../screens/f_tab_projects/FProjectsTabScreen';
import FCMessagesMainScreen from '../screens/f_tab_messages/FCMessagesMainScreen';
import FJobsTabScreen from '../screens/f_tab_jobs/FJobsTabScreen';
import FRequestsTabScreen from '../screens/f_tab_requests/FRequestsTabScreen';
import FMoreMainScreen from '../screens/f_tab_more/FMoreMainScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const ic_tab_projects = require('../assets/images/ic_tab_projects.png');
const ic_tab_messages = require('../assets/images/ic_tab_messages.png');
const ic_tab_applications = require('../assets/images/ic_tab_applications.png');
const ic_tab_requests = require('../assets/images/ic_tab_requests.png');
const ic_tab_more = require('../assets/images/ic_tab_more.png');

const Tab = createBottomTabNavigator();

export default class FMainTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  render() {
    const {value} = this.state;

    return (
      <Tab.Navigator
        initialRouteName="projects"
        tabBarOptions={{
          activeTintColor: GStyle.activeColor,
          inactiveTintColor: GStyle.grayColor,
        }}>
        <Tab.Screen
          name="projects"
          component={FProjectsTabScreen}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_projects}
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
          name="jobs"
          component={FJobsTabScreen}
          options={{
            tabBarLabel: 'Jobs',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_applications}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="requests"
          component={FRequestsTabScreen}
          options={{
            tabBarLabel: 'Requests',
            tabBarIcon: ({color, size}) => (
              <Image
                source={ic_tab_requests}
                style={[GStyles.image, {width: 20, tintColor: color}]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="more"
          component={FMoreMainScreen}
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
