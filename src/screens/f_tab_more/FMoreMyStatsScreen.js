import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';
import SwitchSelector from '../../lib/SwitchSelector/index';

const ic_mini_calendar = require('../../assets/images/ic_mini_calendar.png');
const ic_mini_avatar = require('../../assets/images/ic_mini_avatar.png');
const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active.png');
const ic_mini_up_arrow = require('../../assets/images/ic_mini_up_arrow.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const image_dropdown = require('../../assets/images/ic_dropdown_small.png');
const ic_mini_file_add = require('../../assets/images/ic_mini_file_add.png');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = WINDOW_WIDTH * 0.9;

class FMoreMyStatsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMoreMyStatsScreen start');

    this.state = {
      chartDateRange: 'Monthly',
      chartYear: '2020',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  handleTextChange = (newText) => this.setState({value: newText});

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderChartPart()}
            {this._renderIncome()}
            {this._renderJobs()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Statistics"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderChartPart = () => {
    return (
      <>
        {this._renderChartRange()}
        {this._renderChart()}
        {this._renderChartOption()}
      </>
    );
  };

  _renderChartRange = () => {
    let index = 0;
    const date_range_data = [
      {key: index++, section: true, label: 'Date range'},
      {key: index++, label: 'Yearly'},
      {key: index++, label: 'Monthly'},
      {key: index++, label: 'Weekly'},
    ];
    index = 0;
    const year_data = [
      {key: index++, section: true, label: 'Select Year'},
      {key: index++, label: '2018'},
      {key: index++, label: '2019'},
      {key: index++, label: '2020'},
    ];
    const {chartDateRange, chartYear} = this.state;
    return (
      <View style={[GStyles.rowContainer, {justifyContent: 'flex-end'}]}>
        <ModalSelector
          data={date_range_data}
          initValue={chartDateRange}
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          onChange={(option) => {
            this.setState({chartDateRange: option.label});
          }}
          style={{
            width: 93,
            backgroundColor: GStyle.grayBackColor,
            borderRadius: 6,
          }}>
          <View style={[GStyles.rowEndContainer, {height: 32}]}>
            <TextInput
              style={[
                GStyles.mediumText,
                {fontSize: 11, color: GStyle.grayColor, marginLeft: 8},
              ]}
              editable={false}
              placeholder="Select one"
              value={this.state.chartDateRange}
            />
            <Image
              source={image_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
        <ModalSelector
          data={year_data}
          initValue={chartYear}
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          onChange={(option) => {
            this.setState({chartYear: option.label});
          }}
          style={{
            width: 93,
            backgroundColor: GStyle.grayBackColor,
            borderRadius: 6,
            marginLeft: 8,
          }}>
          <View style={[GStyles.rowEndContainer, {height: 32}]}>
            <TextInput
              style={[
                GStyles.mediumText,
                {fontSize: 11, color: GStyle.grayColor, marginLeft: 8},
              ]}
              editable={false}
              placeholder="Select one"
              value={this.state.chartYear}
            />
            <Image
              source={image_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderChart = () => {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          interpolation="natural"
          domain={{x: [0.5, 7], y: [0, 9000]}}
          style={{
            data: {stroke: GStyle.activeColor},
            parent: {border: '3px solid #ccc'},
          }}
          data={[
            {x: 'Jan', y: 5000},
            {x: 'Feb', y: 3000},
            {x: 'Mar', y: 5000},
            {x: 'Apr', y: 4000},
            {x: 'May', y: 7000},
            {x: 'June', y: 5000},
          ]}
        />
      </VictoryChart>
    );
  };

  _renderChartOption = () => {
    const chart_options = [
      {label: 'Income', value: '1'},
      {label: 'Jobs', value: '2'},
    ];
    return (
      <View style={[, {flexDirection: 'row', justifyContent: 'center'}]}>
        <SwitchSelector
          options={chart_options}
          height={30}
          borderRadius={6}
          fontSize={11}
          bold={true}
          buttonColor={GStyle.activeColor}
          backgroundColor={GStyle.grayBackColor}
          textColor={GStyle.grayColor}
          initial={0}
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
          style={{width: 130}}
        />
      </View>
    );
  };

  _renderIncome = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 13, marginTop: 40}]}>
          Income
        </Text>
        <View style={[GStyles.rowContainer, {}]}>
          <View style={[, {flex: 1}]}>
            <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 16}]}>
              This month, Sep 2020
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 16}]}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>GHC</Text>
              <Text style={[GStyles.mediumText, {fontSize: 20}]}>2,356</Text>
              <Image
                source={ic_mini_up_arrow}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  marginBottom: 4,
                }}
              />
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.greenColor},
                ]}>
                32.48%
              </Text>
            </View>
          </View>
          <View style={[, {flex: 1}]}>
            <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 16}]}>
              Total, from Jan 2020
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 16}]}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>GHC</Text>
              <Text style={[GStyles.mediumText, {fontSize: 20}]}>36,486</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  _renderJobs = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 13, marginTop: 40}]}>
          Jobs
        </Text>
        <View style={[GStyles.rowContainer, {}]}>
          <View style={[, {flex: 1}]}>
            <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 16}]}>
              This month, Sep 2020
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 16}]}>
              <Text style={[GStyles.mediumText, {fontSize: 20}]}>6</Text>
              <Image
                source={ic_mini_up_arrow}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  marginBottom: 4,
                }}
              />
              <Text
                style={[
                  GStyles.mediumText,
                  {fontSize: 13, color: GStyle.greenColor},
                ]}>
                24.5%
              </Text>
            </View>
          </View>
          <View style={[, {flex: 1}]}>
            <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 16}]}>
              Total, from Jan 2020
            </Text>
            <View style={[GStyles.rowContainer, {marginTop: 16}]}>
              <Text style={[GStyles.mediumText, {fontSize: 13}]}>GHC</Text>
              <Text style={[GStyles.mediumText, {fontSize: 20}]}>265</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
}

const styles = StyleSheet.create({
  statusText: {
    textAlign: 'center',
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
    color: GStyle.activeColor,
  },

  dropdownContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GStyle.grayBackColor,
    marginTop: 16,
  },

  avatarImage: {
    width: 59,
    height: 59,
    resizeMode: 'contain',
  },

  messageText: {
    height: 73,
    color: GStyle.fontColor,
    fontFamily: 'GothamPro',
    fontSize: 11,
    lineHeight: 16,
    borderWidth: 1,
    borderColor: GStyle.lineColor,
    marginTop: 8,
  },

  attachButtonContainer: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GStyle.grayBackColor,
    borderRadius: 10,
    borderColor: GStyle.grayColor,
  },

  attachText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: GStyle.grayColor,
    marginLeft: 2,
  },
});

export default FMoreMyStatsScreen;
