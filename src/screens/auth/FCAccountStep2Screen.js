import React from 'react';
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
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import BarCollapsible from '../../lib/BarCollapsible/BarCollapsible';
import ProgressBar from '../../lib/Progress/Bar';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const image_quote = require('../../assets/images/ic_quote.png');
const img_portfolio1 = require('../../assets/images/img_portfolio1.png');
const img_portfolio2 = require('../../assets/images/img_portfolio2.png');

class FCAccountStep2Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCAccountStep2Screen start');

    this.state = {
      jobProfileTitle: global.isDebug
        ? 'Expert Animation Artist & Video Producer'
        : '',
      jobProfileDescription: global.isDebug
        ? 'I am an Professional Freelance Artist with 7+ years of Working Experience in the Industry. I am an expert Digital Artist and Video Producer.'
        : '',
      jobProfileHourlyRate: global.isDebug ? '15' : '',
    };

    this.initRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  initRef = () => {
    this.jobProfileTitleRef = (ref) => {
      this.jobProfileTitle = ref;
    };
    this.jobProfileDescriptionRef = (ref) => {
      this.jobProfileDescription = ref;
    };
    this.jobProfileHourlyRateRef = (ref) => {
      this.jobProfileHourlyRate = ref;
    };
  };

  onSubmitJobProfileTitle = () => {
    this.jobProfileDescription.focus();
  };

  onSubmitJobProfileDescription = () => {
    this.jobProfileHourlyRate.focus();
  };

  onSubmitJobProfileHourlyRate = () => {
    this.jobProfileHourlyRate.blur();
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onChangeProfessionalHeading = (text) => {
    this.setState({jobProfileTitle: text});
  };

  onChangeSummary = (text) => {
    this.setState({jobProfileDescription: text});
  };

  onChangeHourlyRate = (text) => {
    this.setState({jobProfileHourlyRate: text});
  };

  onNext = () => {
    const {
      jobProfileTitle,
      jobProfileDescription,
      jobProfileHourlyRate,
    } = this.state;

    showPageLoader(true);
    RestAPI.update_job_profile_info(
      jobProfileTitle,
      jobProfileDescription,
      jobProfileHourlyRate,
      (json, err) => {
        showPageLoader(false);

        if (err !== null) {
          Alert.alert(Constants.errorTitle, 'Failed to setup your job profile');
        } else {
          if (json.status === 1) {
            if (global.roleId == 1) {
              this.props.navigation.navigate('f_membership');
            } else {
              this.props.navigation.navigate('c_membership');
            }
          } else {
            Alert.alert(
              Constants.errorTitle,
              'Failed to setup your job profile',
            );
          }
        }
      },
    );
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
            {this._renderProfessinalHeading()}
            {this._renderSummary()}
            {global.roleId == 1 && this._renderHourlyRate()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle=""
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 2 of 3</Text>
        <Text style={GStyles.titleText}>Setup your job profile</Text>
      </>
    );
  };

  _renderProfessinalHeading = () => {
    const {jobProfileTitle} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 35}]}>
          Professional heading
        </Text>
        <TextInput
          ref={this.jobProfileTitleRef}
          returnKeyType="next"
          placeholder="Please input Professional heading"
          value={jobProfileTitle}
          onChangeText={this.onChangeProfessionalHeading}
          onSubmitEditing={this.onSubmitJobProfileTitle}
          style={[
            GStyles.regularText,
            {
              height: 40,
              borderBottomWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 5,
            },
          ]}
        />
      </>
    );
  };

  _renderSummary = () => {
    const {jobProfileDescription} = this.state;

    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 40}]}>
          Summary
        </Text>
        <Image
          source={image_quote}
          style={[GStyles.image, {width: 24, marginTop: 10}]}
        />
        <TextInput
          ref={this.jobProfileDescriptionRef}
          placeholder="Please input your summary"
          multiline={true}
          numberOfLines={5}
          value={jobProfileDescription}
          onChangeText={this.onChangeSummary}
          style={[
            GStyles.regularText,
            {height: 115, lineHeight: 22, marginTop: 5},
          ]}
        />
      </>
    );
  };

  _renderHourlyRate = () => {
    const {jobProfileHourlyRate} = this.state;

    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 50}]}>
        <Text style={[GStyles.mediumText, {fontSize: 17}]}>Hourly rate</Text>
        <View
          style={{
            ...GStyles.rowContainer,
            ...GStyles.borderBottom,
            width: '50%',
          }}>
          <Text style={{...GStyles.regularText}}>USD</Text>
          <TextInput
            ref={this.jobProfileHourlyRateRef}
            keyboardType="numeric"
            returnKeyType="done"
            value={jobProfileHourlyRate}
            onChangeText={this.onChangeHourlyRate}
            onSubmitEditing={this.onSubmitJobProfileHourlyRate}
            style={{...GStyles.mediumText, flex: 1, marginLeft: 8}}
          />
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 80, marginBottom: 40}}>
        <TouchableOpacity onPress={this.onNext}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  linkText: {
    position: 'absolute',
    zIndex: 99,
    right: 0,
    top: 16,
  },
});

export default FCAccountStep2Screen;
