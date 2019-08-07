import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BallIndicator,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  LogBox,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton} from 'react-native-paper';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import {Dropdown} from '../../lib/MaterialDropdown/index';
import {TextField} from '../../lib/MaterialTextField/index';

const ic_send = require('../../assets/images/ic_send.png');

const WINDOW_WIDTH = Helper.getContentWidth();

export default class App extends Component {
  constructor(props) {
    super(props);

    LogBox.ignoreAllLogs();
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
