import React from 'react';
import {
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

import {TextField} from '../../lib/MaterialTextField/index';
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
import DatePicker from '../../components/elements/DatePicker/datepicker';
import CheckBox from '../../lib/Checkbox/index';
import SwitchSelector from '../../lib/SwitchSelector/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import GHeaderBar from '../../components/GHeaderBar';
import ModalSelector from '../../lib/ModalSelector/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');
const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_add_file = require('../../assets/images/ic_mini_file_add.png');
const ic_info = require('../../assets/images/ic_info.png');

class CHomePostJobStep4Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomePostJobStep4Screen start');

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);

    this.titleRef = this.updateRef.bind(this, 'title');
    this.descriptionRef = this.updateRef.bind(this, 'description');

    this.state = {
      skillDatas: ['Design', 'Html', 'Bootstrap', 'MySQL', 'Software', 'PHP'],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['title', 'description']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitTitle() {
    this.description.focus();
  }

  onSubmitDescription() {}

  onSubmit() {
    let errors = {};

    ['title', 'description'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onBack = () => {
    this.props.navigation.goBack()
  };

  onSave = () => {
    console.log('---');
  };

  onAddFile = () => {
    console.log('---');
  };

  onAddSkill = () => {
    console.log('---');
  };

  onPost = () => {
    this.props.navigation.navigate('c_main_tab_navigator')
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
            {this._renderTitle()}
            {this._renderInputs()}
            {this._renderOptions()}
            {this._renderDuration()}
            {this._renderAddAttachment()}
            {this._renderCheckbox()}
            {this._renderAddSkill()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Post job"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="save"
        onPressRightButton={this.onSave}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 4 of 4</Text>
        <Text style={GStyles.titleText}>Job title and detail</Text>
        <Text style={GStyles.titleDescription}>
          Write a job details of what you need done
        </Text>
      </>
    );
  };

  _renderInputs = () => {
    let {errors = {}} = this.state;

    return (
      <>
        <TextField
          ref={this.titleRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitTitle}
          returnKeyType="next"
          label="Title"
          error={errors.title}
          containerStyle={{marginTop: 32}}
        />
        <TextField
          ref={this.descriptionRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitDescription}
          multiline={true}
          label="Description"
          characterRestriction={500}
          error={errors.description}
          containerStyle={{marginTop: 16}}
        />
      </>
    );
  };

  _renderOptions = () => {
    let index = 0;
    const paymentTypeData = [
      {key: index++, section: true, label: 'Payment Type'},
      {key: index++, label: 'Fixed'},
      {key: index++, label: 'Hourly'},
    ];
    index = 0;
    const budgetData = [
      {key: index++, section: true, label: 'Budget'},
      {key: index++, label: 'GHC 10 - 30'},
      {key: index++, label: 'GHC 30 - 250'},
      {key: index++, label: 'GHC 250 - 750'},
      {key: index++, label: 'GHC 750 - 1500'},
      {key: index++, label: 'GHC 1500 - 3000'},
      {key: index++, label: 'GHC 3000 - 5000'},
      {key: index++, label: 'GHC 5000 - 10000'},
    ];

    return (
      <>
        <View
          style={[
            GStyles.borderBottom,
            {width: '100%', height: 58, marginTop: 8},
          ]}>
          <Text style={GStyles.elementLabel}>Payment Type</Text>
          <ModalSelector
            data={paymentTypeData}
            initValue="Select one"
            accessible={true}
            onChange={option => {
              this.setState({paymentTypeValue: option.label});
            }}>
            <View style={GStyles.rowEndContainer}>
              <TextInput
                style={[GStyles.mediumText, {height: 45, flex: 1}]}
                editable={false}
                placeholder="Select one"
                value={this.state.paymentTypeValue}
              />
              <Image
                source={ic_dropdown}
                style={[GStyles.image, {width: 16}]}
              />
            </View>
          </ModalSelector>
        </View>
        <View
          style={[
            GStyles.borderBottom,
            {width: '100%', height: 58, marginTop: 24},
          ]}>
          <Text style={GStyles.elementLabel}>Budget</Text>
          <ModalSelector
            data={budgetData}
            initValue="Select one"
            accessible={true}
            onChange={option => {
              this.setState({budgetValue: option.label});
            }}>
            <View style={GStyles.rowEndContainer}>
              <TextInput
                style={[GStyles.mediumText, {height: 45, flex: 1}]}
                editable={false}
                placeholder="Select one"
                value={this.state.budgetValue}
              />
              <Image
                source={ic_dropdown}
                style={[GStyles.image, {width: 16}]}
              />
            </View>
          </ModalSelector>
        </View>
      </>
    );
  };

  _renderDuration = () => {
    return (
      <View style={[GStyles.borderBottom, {height: 58, marginTop: 24}]}>
        <Text style={GStyles.elementLabel}>Duration</Text>
        <DatePicker
          style={{width: 180, marginTop: 6}}
          date={this.state.birthday}
          mode="date"
          androidMode="spinner"
          iconSource={ic_calendar}
          placeholder="select date"
          format="MMM DD, YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              width: 20,
              height: 20,
              position: 'absolute',
              left: 0,
              top: 8,
              marginLeft: 0,
              tintColor: GStyle.grayColor,
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0,
            },
            dateText: GStyles.mediumText,
          }}
          onDateChange={date => {
            this.setState({birthday: date});
          }}
        />
      </View>
    );
  };

  _renderAddAttachment = () => {
    return (
      <TouchableOpacity onPress={this.onAddFile}>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={GStyles.elementLabel}>Add attachment</Text>
          <Image source={ic_add_file} style={[GStyles.image, {width: 20}]} />
        </View>
      </TouchableOpacity>
    );
  };

  _renderCheckbox = () => {
    const {skillDatas} = this.state;

    return (
      <>
        <Text style={[GStyles.elementLabel, {marginTop: 24}]}>Skills</Text>
        <View style={{marginTop: 8}}>
          {skillDatas.map((item, i) => {
            return (
              <CheckBox
                key={i}
                labelBefore={true}
                label={item}
                checkedImage={ic_check_active}
                uncheckedImage={ic_check_inactive}
                containerStyle={{
                  width: '100%',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}
                checkboxStyle={{width: 20, height: 20}}
                labelStyle={[GStyles.regularText, {marginLeft: 0}]}
              />
            );
          })}
        </View>
      </>
    );
  };

  _renderAddSkill = () => {
    return (
      <TouchableOpacity onPress={this.onAddSkill}>
        <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
          <Text style={(GStyles.regularText, {color: GStyle.grayColor})}>
            Add Skill
          </Text>
          <Image source={ic_info} style={[GStyles.image, {width: 18}]} />
        </View>
      </TouchableOpacity>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 40}}>
        <TouchableOpacity onPress={this.onPost}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Post now</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CHomePostJobStep4Screen;
