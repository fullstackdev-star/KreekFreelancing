import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useNavigation, useRoute} from '@react-navigation/native';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

import ModalSelector from '../../lib/ModalSelector/index';
import Slider from '../../lib/Slider/Slider';
import CheckBox from '../../lib/Checkbox/index';
import SwitchSelector from '../../lib/SwitchSelector/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import SearchBarItem from '../../components/elements/SearchBarItem';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_location = require('../../assets/images/ic_location.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_slider_ruler_f = require('../../assets/images/ic_slider_ruler_f.png');
const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');
const ic_search = require('../../assets/images/ic_search.png');

class FProjectsFilterScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FProjectsFilterScreen start');

    this.initState();
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.onRefresh();
    });

    this.onRefresh();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initState = () => {
    this.state = {
      jobType: 0,
      countryName: '',
      countryId: '',
      skillName: '',
      skillId: '',
      paymentType: '',
      fixedMinValue: 0,
      fixedMaxValue: 10000,
      hourlyValue: 0,
      numberOfProposals: 0,
      keyword: '',
      sortBy: 0,
    };
  };

  onRefresh = () => {
    const params = global._projectsFilterParams;

    if (params) {
      let jobType = 0;
      if (params.job_type == 'Remote') {
        jobType = 1;
      } else if (params.job_type == 'Onsite') {
        jobType = 2;
      } else if (params.job_type == 'Featured') {
        jobType = 3;
      }

      let sortBy = 0;
      if (params.sortBy == 'Lowest') {
        sortBy = 1;
      } else if (params.sortBy == 'Moderate') {
        sortBy = 2;
      } else if (params.sortBy == 'Highest') {
        sortBy = 3;
      }

      const newState = {
        jobType: jobType,
        countryId: params.country_id,
        skillId: params.skill_id,
        paymentType: params.payment_type,
        fixedMinValue: params.fixed_min_value,
        fixedMaxValue: params.fixed_max_value,
        hourlyValue: params.hourly_value,
        numberOfProposals: params.proposal_count,
        keyword: params.keyword,
        sortBy: sortBy,
      };
      this.setState(newState);
    }
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onClear = () => {
    this.initState();
    success(Constants.successTitle, 'Filter is cleared');
  };

  onChangeJobType = (value) => {
    this.setState({jobType: value});
  };

  onChangeCountry = (value) => {
    this.setState({
      countryName: value.label,
      countryId: value.key,
    });
  };

  onChangeSkill = (value) => {
    this.setState({
      skillName: value.label,
      skillId: value.key,
    });
  };

  onChangePaymentType = (value) => {
    this.setState({paymentType: value.label});
  };

  onChangeFixedSlider = (values) => {
    this.setState({fixedMinValue: values[0], fixedMaxValue: values[1]});
  };

  onChangeHourlySlider = (value) => {
    this.setState({hourlyValue: value});
  };

  onChangeNumberOfProposals = (value) => {
    this.setState({numberOfProposals: value});
  };

  onChangeSearchText = (value) => {
    this.setState({keyword: value});
  };

  onSubmitSearchText = (value) => {};

  onChangeSortBy = (value) => {
    this.setState({sortBy: value});
  };

  onSubmit = () => {
    const {
      jobType,
      countryId,
      skillId,
      paymentType,
      fixedMinValue,
      fixedMaxValue,
      hourlyValue,
      numberOfProposals,
      keyword,
      sortBy,
    } = this.state;

    let jobTypeString = '';
    if (jobType == 1) {
      jobTypeString = 'Remote';
    } else if (jobType == 2) {
      jobTypeString = 'Onsite';
    } else if (jobType == 3) {
      jobTypeString = 'Featured';
    }

    let sortByString = '';
    if (sortBy == 1) {
      sortByString = 'Lowest';
    } else if (sortBy == 2) {
      sortByString = 'Moderate';
    } else if (sortBy == 3) {
      sortByString = 'Highest';
    }

    global._projectsFilterParams = {
      page_number: '1',
      fixed_min_value: fixedMinValue,
      fixed_max_value: fixedMaxValue,
      hourly_value: hourlyValue,
      category_id: skillId,
      job_type: jobTypeString,
      payment_type: paymentType,
      proposal_count: numberOfProposals,
      skill_id: skillId,
      country_id: countryId,
      keyword: keyword,
      sortBy: sortByString,
    };
    this.props.navigation.navigate('f_main_tab_navigator');
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
            {this._renderJobType()}
            {this._renderLocation()}
            {this._renderSkill()}
            {this._renderPaymentType()}
            {this._renderSlider()}
            {this._renderNumberOfProposals()}
            {this._renderKeyword()}
            {this._renderSortBy()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Filter"
        leftType="back"
        rightType="clear"
        onPressLeftButton={this.onBack}
        onPressRightButton={this.onClear}
      />
    );
  };

  _renderJobType = () => {
    const {jobType} = this.state;
    const jobTypeOptions = [
      {label: 'Remote', value: '1'},
      {label: 'Onsite', value: '2'},
      {label: 'Featured', value: '3'},
    ];

    console.log('jobType', jobType);

    return (
      <>
        <Text style={[GStyles.titleText, {marginTop: 32}]}>General</Text>
        <Text style={[GStyles.mediumText, {marginTop: 24}]}>Job Type</Text>
        <SwitchSelector
          options={jobTypeOptions}
          borderRadius={10}
          buttonColor={GStyle.activeColor}
          backgroundColor={GStyle.grayBackColor}
          textColor={GStyle.grayColor}
          initial={jobType}
          onPress={this.onChangeJobType}
          style={{marginTop: 24}}
        />
      </>
    );
  };

  _renderLocation = () => {
    const {countryName} = this.state;

    let countryList = [{key: 0, section: true, label: 'Countries'}];
    global.country_list.forEach((countryItem) => {
      countryList.push({
        key: countryItem.id,
        label: countryItem.name,
      });
    });

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 32},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Location
        </Text>
        <ModalSelector
          data={countryList}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangeCountry}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={countryName}
            />
            <Image source={ic_location} style={[GStyles.image, {width: 20}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderSkill = () => {
    const {skillName} = this.state;

    let skillList = [{key: 0, section: true, label: 'Skills'}];
    global.skill_list.forEach((item) => {
      skillList.push({
        key: item.id,
        label: item.name,
      });
    });

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 32},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Skill
        </Text>
        <ModalSelector
          data={skillList}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangeSkill}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={skillName}
            />
            <Image source={ic_dropdown} style={[GStyles.image, {width: 16}]} />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderPaymentType = () => {
    const {paymentType} = this.state;

    let index = 0;
    const paymentTypeData = [
      {key: index++, section: true, label: 'Payment Type'},
      {key: index++, label: 'Fixed'},
      {key: index++, label: 'Hourly'},
    ];

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 32},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Payment Type
        </Text>
        <ModalSelector
          data={paymentTypeData}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangePaymentType}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={paymentType}
            />
            <Image
              source={ic_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderSlider = () => {
    const {paymentType, fixedMinValue, fixedMaxValue} = this.state;
    const minValue = Number(fixedMinValue);
    const maxValue = Number(fixedMaxValue);

    return (
      <>
        {paymentType == 'Fixed' && (
          <View>
            <Text style={[GStyles.mediumText, {marginTop: 32}]}>
              Price range
            </Text>
            <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 20}}>
              ${fixedMinValue} - ${fixedMaxValue}
            </Text>
            <MultiSlider
              values={[minValue, maxValue]}
              min={0}
              max={10000}
              step={10}
              onValuesChange={this.onChangeFixedSlider}
              containerStyle={{alignItems: 'center'}}
            />
          </View>
        )}

        {paymentType != 'Fixed' && (
          <View>
            <Text style={[GStyles.mediumText, {marginTop: 32}]}>
              Over this amount per hours ($)
            </Text>
            <View style={{marginTop: 20}}>
              <Slider
                trackStyle={{height: 4, borderRadius: 2}}
                thumbStyle={{
                  width: 32,
                  height: 32,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  borderColor: GStyle.activeColor,
                  borderWidth: 2,
                }}
                minimumTrackTintColor={GStyle.activeColor}
                maximumTrackTintColor={'#E0E0E0'}
                onValueChange={this.onChangeHourlySlider}
                maximumValue={50}
              />
              <Image
                source={ic_slider_ruler_f}
                style={{
                  width: '100%',
                  height: 30,
                  resizeMode: 'contain',
                  marginTop: -15,
                  zIndex: -10,
                }}
              />
            </View>
          </View>
        )}
      </>
    );
  };

  _renderNumberOfProposals = () => {
    const {numberOfProposals} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 36}]}>
          Number of proposals
        </Text>
        <View style={{marginTop: 24}}>
          <RadioGroup
            normalMode={false}
            initialValue={numberOfProposals}
            onChange={this.onChangeNumberOfProposals}
            containerStyle={{height: 160, flexDirection: 'column'}}
            radioGroupList={[
              {
                label: 'Any Number',
                value: '0',
              },
              {
                label: 'Less than 10',
                value: '10',
              },
              {
                label: 'Less than 20',
                value: '20',
              },
              {
                label: 'Less than 30',
                value: '30',
              },
              {
                label: 'Less than 50',
                value: '50',
              },
              {
                label: 'Less than 100',
                value: '100',
              },
            ]}
          />
        </View>
      </>
    );
  };

  _renderKeyword = () => {
    return (
      <>
        <Text style={[GStyles.titleText, {marginTop: 36}]}>Others</Text>
        <Text style={[GStyles.regularText, {marginTop: 32}]}>Keyword</Text>
        <View style={{marginTop: 24}}>
          <SearchBarItem
            onChangeText={this.onChangeSearchText}
            onSubmitText={this.onSubmitSearchText}
          />
        </View>
      </>
    );
  };

  _renderSortBy = () => {
    const {sortBy} = this.state;
    const sortByOptions = [
      {label: 'Lowest rate', value: '1'},
      {label: 'Moderate rate', value: '2'},
      {label: 'Highest rate', value: '3'},
    ];

    console.log('SortBy', sortBy);
    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 36}]}>Sort by</Text>
        <SwitchSelector
          options={sortByOptions}
          borderRadius={10}
          buttonColor={GStyle.activeColor}
          backgroundColor={GStyle.grayBackColor}
          textColor={GStyle.grayColor}
          initial={sortBy}
          onPress={this.onChangeSortBy}
          style={{marginTop: 24}}
        />
      </>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSubmit} style={{marginVertical: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>See Projects</Text>
        </View>
      </TouchableOpacity>
    );
  };

  ___renderShowOnly = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 36}]}>Show Only</Text>
        <View style={{marginTop: 24}}>
          <CheckBox
            labelBefore={true}
            label={'Featured jobs'}
            checkedImage={ic_check_active}
            uncheckedImage={ic_check_inactive}
            containerStyle={{
              width: '100%',
              justifyContent: 'space-between',
            }}
            checkboxStyle={{width: 20, height: 20}}
            labelStyle={[GStyles.regularText, {marginLeft: 0}]}
          />
          <CheckBox
            labelBefore={true}
            label={'Urgent jobs'}
            checkedImage={ic_check_active}
            uncheckedImage={ic_check_inactive}
            containerStyle={{
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
            checkboxStyle={{width: 20, height: 20}}
            labelStyle={[GStyles.regularText, {marginLeft: 0}]}
          />
          <CheckBox
            labelBefore={true}
            label={'With verified payment method'}
            checkedImage={ic_check_active}
            uncheckedImage={ic_check_inactive}
            containerStyle={{
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
            checkboxStyle={{width: 20, height: 20}}
            labelStyle={[GStyles.regularText, {marginLeft: 0}]}
          />
        </View>
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();
  return (
    <FProjectsFilterScreen {...props} navigation={navigation} route={route} />
  );
}
