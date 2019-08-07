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
import {NavigationContext} from '@react-navigation/native';
import GHeaderBar from '../../components/GHeaderBar';
import CheckBox from '../../lib/Checkbox/index';
import DocumentPicker from 'react-native-document-picker';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_radio_inactive = require('../../assets/images/ic_radio_inactive.png');

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import FSentJobRequestModal from '../modal/FSentJobRequestModal';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';
import CMorePaymentSuccessScreen from '../c_tab_more/CMorePaymentSuccessScreen';

const ic_calendar = require('../../assets/images/ic_calendar.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_file_upload = require('../../assets/images/ic_file_upload.png');

const BUTTON_WIDTH = Helper.getContentWidth();

class FProjectsApplyScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FProjectsApplyScreen start');

    this.state = {
      isVisibleSentModal: false,

      proposedAmount: global.isDebug ? '225' : '',
      projectDuration: global.isDebug ? '12' : '',
      durationUnit: global.isDebug ? 'Weeks' : 'Days',
      isPremiumBid: false,
      description: global.isDebug
        ? 'I am professional and I can easily get this project done for you'
        : '',
    };

    this.initRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  initRef = () => {
    this.proposedAmountRef = (ref) => {
      this.proposedAmount = ref;
    };
    this.projectDurationRef = (ref) => {
      this.projectDuration = ref;
    };
    this.descriptionRef = (ref) => {
      this.description = ref;
    };
  };

  onFocus = () => {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  onChangeText = (text) => {
    ['proposedAmount', 'projectDuration', 'description']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitProposedAmount = () => {
    this.projectDuration.focus();
  };

  onSubmitProjectDuration = () => {
    this.description.focus();
  };

  onSubmitDescription = () => {
    this.description.blur();
  };

  onChangeDurationUnit = (option) => {
    this.setState({durationUnit: option.label});
  };

  onChangePremiumBid = (value) => {
    this.setState({isPremiumBid: value.checked});
  };

  onClose = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  async onPressCoverPhoto() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  onSubmit = () => {
    const {
      proposedAmount,
      projectDuration,
      durationUnit,
      isPremiumBid,
      description,
    } = this.state;

    if (!proposedAmount || !projectDuration || !description) {
      Alert.alert(Constants.warningTitle, 'Please input all fields.');
      return;
    }

    const params = {
      project_id: global._projectId,
      proposed_amount: proposedAmount,
      project_duration: projectDuration,
      duration_unit: durationUnit,
      is_premium_bid: isPremiumBid,
      proposal_description: description,
      attachment_list: '',
    };

    showPageLoader(true);
    RestAPI.submit_proposal(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to submit proposal.');
      } else {
        if (json.status === 1) {
          success(Constants.successTitle, 'Success to submit proposal.');
          this.props.navigation.navigate('f_main_tab_navigator');
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to submit proposal.');
        }
      }
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          {this._renderModal()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderTitle()}
            {this._renderProposal()}
            {this._renderResult()}
            {this._renderCheckbox()}
            {this._renderDescription()}
            {this._renderAttachment()}
          </KeyboardAwareScrollView>
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Apply"
        leftType="close"
        onPressLeftButton={this.onClose}
      />
    );
  };

  _renderModal = () => {
    return (
      <FSentJobRequestModal
        modalVisible={this.state.isVisibleSentModal}
        onPressCancel={() => {
          this.setState({isVisibleSentModal: false});
        }}
      />
    );
  };

  _renderTitle = () => {
    return (
      <Text style={GStyles.titleText}>
        Submit proposal to {global._projectTitle}
      </Text>
    );
  };

  _renderProposal = () => {
    const {proposedAmount, projectDuration, durationUnit} = this.state;

    let index = 0;
    const paymentTypeData = [
      {key: index++, section: true, label: 'Project Duration'},
      {key: index++, label: 'Days'},
      {key: index++, label: 'Weeks'},
      {key: index++, label: 'Month'},
      {key: index++, label: 'Year'},
    ];

    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 30}]}>
        <View style={[GStyles.borderBottom, {width: '45%', height: 58}]}>
          <Text style={{...styles.infoText}}>Proposed amount</Text>
          <View style={[GStyles.rowContainer, {marginTop: 12}]}>
            <Image
              source={ic_dollar}
              style={[GStyles.image, {width: 24, tintColor: GStyle.grayColor}]}
            />
            <TextInput
              ref={this.proposedAmountRef}
              keyboardType="numeric"
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitProposedAmount}
              placeholder=""
              value={proposedAmount}
              style={[GStyles.mediumText, {width: '70%', marginLeft: 12}]}
            />
          </View>
        </View>
        <View
          style={{
            ...GStyles.rowEndContainer,
            ...GStyles.borderBottom,
            width: '45%',
            height: 58,
          }}>
          <View style={{flex: 1}}>
            <Text style={{...styles.infoText}}>Project duration</Text>
            <View style={{...GStyles.rowEndContainer}}>
              <TextInput
                ref={this.projectDurationRef}
                keyboardType="number-pad"
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitProjectDuration}
                placeholder=""
                value={projectDuration}
                style={{...GStyles.mediumText, flex: 2, marginTop: 12}}
              />
              <View style={{width: 60}}>
                <ModalSelector
                  data={paymentTypeData}
                  accessible={true}
                  onChange={this.onChangeDurationUnit}>
                  <View style={GStyles.rowEndContainer}>
                    <TextInput
                      style={{...styles.infoText, flex: 1, height: 38}}
                      editable={false}
                      value={durationUnit}
                    />
                    <Image
                      source={ic_dropdown}
                      style={[GStyles.image, {width: 14}]}
                    />
                  </View>
                </ModalSelector>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderResult = () => {
    const {proposedAmount} = this.state;

    return (
      <View style={{backgroundColor: GStyle.grayBackColor, marginTop: 16}}>
        <View
          style={{
            ...GStyles.rowEndContainer,
            ...GStyles.borderBottom,
            height: 32,
            padding: 8,
          }}>
          <View style={{...GStyles.rowContainer}}>
            <Text style={{...styles.infoText}}>$</Text>
            <Text style={{...styles.infoText, marginLeft: 8}}>
              {Math.round(proposedAmount * 9) / 100}
            </Text>
          </View>
          <Text style={{...styles.infoText}}>Fee</Text>
        </View>
        <View
          style={{
            ...GStyles.rowEndContainer,
            height: 32,
            padding: 8,
          }}>
          <View style={{...GStyles.rowContainer}}>
            <Text style={{...styles.infoText}}>$</Text>
            <Text style={{...styles.infoText, marginLeft: 8}}>
              {proposedAmount - Math.round(proposedAmount * 9) / 100}
            </Text>
          </View>
          <Text style={{...styles.infoText}}>Amount after fee</Text>
        </View>
      </View>
    );
  };

  _renderCheckbox = () => {
    const {isPremiumBid} = this.state;

    return (
      <View style={{marginTop: 10}}>
        <CheckBox
          label={'Premium bid'}
          checked={isPremiumBid}
          onChange={this.onChangePremiumBid}
          labelStyle={{...styles.infoText, marginLeft: 8}}
          checkedImage={ic_radio_active}
          uncheckedImage={ic_radio_inactive}
          checkboxStyle={{width: 20, height: 20}}
        />
      </View>
    );
  };

  _renderDescription = () => {
    const {description} = this.state;

    return (
      <View style={{...GStyles.borderBottom}}>
        <Text style={{...styles.infoText, marginTop: 24}}>Description</Text>
        <TextInput
          ref={this.descriptionRef}
          onChangeText={this.onChangeText}
          placeholder="Please input description"
          value={description}
          multiline={true}
          numberOfLines={5}
          style={[
            GStyles.regularText,
            {
              height: 115,
              lineHeight: 22,
              marginTop: 4,
            },
          ]}
        />
      </View>
    );
  };

  _renderAttachment = () => {
    const {coverPhoto} = this.state;
    const isCoverPhotoSelected = coverPhoto == null ? false : true;

    return (
      <>
        <Text style={{...styles.infoText, marginTop: 24}}>
          Attachment (Optional)
        </Text>
        <TouchableOpacity onPress={this.onPressCoverPhoto}>
          <View
            style={{
              ...GStyles.centerContainer,
              width: '100%',
              height: 124,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 16,
            }}>
            {!isCoverPhotoSelected && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{
                    ...GStyles.image,
                    width: 20,
                    tintColor: GStyle.grayColor,
                  }}
                />
                <Text style={{...styles.infoText, marginTop: 8}}>
                  upload file
                </Text>
              </View>
            )}
            {isCoverPhotoSelected && (
              <Image
                source={coverPhoto}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onSubmit} style={{marginVertical: 8}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>Submit</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  infoText: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
    color: GStyle.grayColor,
  },
});

export default FProjectsApplyScreen;
