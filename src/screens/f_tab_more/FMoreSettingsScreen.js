import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutAnimation,
  Linking,
  ListView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import {getSymbols} from 'react-native-confirmation-code-field/esm/utils';
import {Badge, Icon, withBadge} from 'react-native-elements';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import ModalSelector from '../../lib/ModalSelector/index';
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';

import {Switch} from '../../lib/Switch/index';

const ic_notification = require('../../assets/images/ic_notification.png');
const ic_more_jobs = require('../../assets/images/ic_more_jobs.png');
const ic_more_stats = require('../../assets/images/ic_more_stats.png');
const ic_more_payments = require('../../assets/images/ic_more_payments.png');
const ic_more_profile = require('../../assets/images/ic_more_profile.png');
const ic_more_settings = require('../../assets/images/ic_more_settings.png');
const ic_more_about = require('../../assets/images/ic_more_about.png');
const ic_more_help = require('../../assets/images/ic_more_help.png');
const ic_more_membership = require('../../assets/images/ic_more_membership.png');
const ic_more_darkmode = require('../../assets/images/ic_more_darkmode.png');
const ic_more_share = require('../../assets/images/ic_more_share.png');
const ic_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_edit_2 = require('../../assets/images/ic_edit_2.png');

const CSwitch = ({title, value, onChanged, containerStyle}) => {
  return (
    <View style={{...GStyles.rowEndContainer, ...containerStyle}}>
      <Text style={{...GStyles.regularText, fontSize: 12}}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onChanged}
        circleSize={11}
        barHeight={17}
        switchWidthMultiplier={2.73}
        circleBorderWidth={0}
        backgroundActive={GStyle.activeColor}
        backgroundInactive={GStyle.grayBackColor}
        circleActiveColor={'#ffffff'}
        circleInActiveColor={GStyle.grayColor}
        changeValueImmediately={true}
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        containerStyle={{borderColor: GStyle.grayColor, borderWidth: 1}}
      />
    </View>
  );
};

class FMoreSettingsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('FMoreSettingsScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isHired: false,
      isReceivedMessage: false,
      isCreatedMilestone: false,
      isReleasedMilestone: false,
      isReceivedOffer: false,
      isReceivedRequest: false,
      isPurchasedBid: false,
      isRequestedWithdraw: false,
      isPostedJob: false,
      isCanceledJob: false,
      isEndedJob: false,
      isSubmittedWork: false,
      isSecurityAlert: false,
      isSubmittedProposal: false,
      isReceivedFeedback: false,
    };
  };

  onRefresh = () => {
    const params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_f_email_settings(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          const itemData = json.data;
          this.setState({
            isHired: itemData.isHired == 'true' ? true : false,
            isReceivedMessage:
              itemData.isReceivedMessage == 'true' ? true : false,
            isCreatedMilestone:
              itemData.isCreatedMilestone == 'true' ? true : false,
            isReleasedMilestone:
              itemData.isReleasedMilestone == 'true' ? true : false,
            isReceivedOffer: itemData.isReceivedOffer == 'true' ? true : false,
            isReceivedRequest:
              itemData.isReceivedRequest == 'true' ? true : false,
            isPurchasedBid: itemData.isPurchasedBid == 'true' ? true : false,
            isRequestedWithdraw:
              itemData.isRequestedWithdraw == 'true' ? true : false,
            isPostedJob: itemData.isPostedJob == 'true' ? true : false,
            isCanceledJob: itemData.isCanceledJob == 'true' ? true : false,
            isEndedJob: itemData.isEndedJob == 'true' ? true : false,
            isSubmittedWork: itemData.isSubmittedWork == 'true' ? true : false,
            isSecurityAlert: itemData.isSecurityAlert == 'true' ? true : false,
            isSubmittedProposal:
              itemData.isSubmittedProposal == 'true' ? true : false,
            isReceivedFeedback:
              itemData.isReceivedFeedback == 'true' ? true : false,
          });
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onChangedHired = (value) => {
    this.onUpdateEmailNotificaiton('isHired', value, () => {
      this.setState({isHired: value});
    });
  };

  onChangedReceivedMessage = (value) => {
    this.onUpdateEmailNotificaiton('isReceivedMessage', value, () => {
      this.setState({isReceivedMessage: value});
    });
  };

  onChangedCreatedMilestone = (value) => {
    this.onUpdateEmailNotificaiton('isCreatedMilestone', value, () => {
      this.setState({isCreatedMilestone: value});
    });
  };

  onChangedReleasedMilestone = (value) => {
    this.onUpdateEmailNotificaiton('isReleasedMilestone', value, () => {
      this.setState({isReleasedMilestone: value});
    });
  };

  onChangedReceivedOffer = (value) => {
    this.onUpdateEmailNotificaiton('isReceivedOffer', value, () => {
      this.setState({isReceivedOffer: value});
    });
  };

  onChangedReceivedRequest = (value) => {
    this.onUpdateEmailNotificaiton('isReceivedRequest', value, () => {
      this.setState({isReceivedRequest: value});
    });
  };

  onChangedPurchasedBid = (value) => {
    this.onUpdateEmailNotificaiton('isPurchasedBid', value, () => {
      this.setState({isPurchasedBid: value});
    });
  };

  onChangedRequestedWithdraw = (value) => {
    this.onUpdateEmailNotificaiton('isRequestedWithdraw', value, () => {
      this.setState({isRequestedWithdraw: value});
    });
  };

  onChangedPostedJob = (value) => {
    this.onUpdateEmailNotificaiton('isPostedJob', value, () => {
      this.setState({isPostedJob: value});
    });
  };

  onChangedCanceledJob = (value) => {
    this.onUpdateEmailNotificaiton('isCanceledJob', value, () => {
      this.setState({isCanceledJob: value});
    });
  };

  onChangedEndedJob = (value) => {
    this.onUpdateEmailNotificaiton('isEndedJob', value, () => {
      this.setState({isEndedJob: value});
    });
  };

  onChangedSubmittedWork = (value) => {
    this.onUpdateEmailNotificaiton('isSubmittedWork', value, () => {
      this.setState({isSubmittedWork: value});
    });
  };

  onChangedSecurityAlert = (value) => {
    this.onUpdateEmailNotificaiton('isSecurityAlert', value, () => {
      this.setState({isSecurityAlert: value});
    });
  };

  onChangedSubmittedProposal = (value) => {
    this.onUpdateEmailNotificaiton('isSubmittedProposal', value, () => {
      this.setState({isSubmittedProposal: value});
    });
  };

  onChangedReceivedFeedback = (value) => {
    this.onUpdateEmailNotificaiton('isReceivedFeedback', value, () => {
      this.setState({isReceivedFeedback: value});
    });
  };

  onUpdateEmailNotificaiton = (option, value, callback) => {
    const params = {
      option: option,
      value: value,
    };
    showPageLoader(true);
    RestAPI.update_f_email_settings(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          callback();
        } else {
          Helper.alertServerDataError();
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
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{...GStyles.elementContainer}}>
            {this._renderTitle()}
            {this._renderNotifications()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Settings"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderTitle = () => {
    return (
      <Text style={[GStyles.mediumText, {fontSize: 24, marginTop: 24}]}>
        Email Notifications
      </Text>
    );
  };

  _renderNotifications = () => {
    const {
      isHired,
      isReceivedMessage,
      isCreatedMilestone,
      isReleasedMilestone,
      isReceivedOffer,
      isReceivedRequest,
      isPurchasedBid,
      isRequestedWithdraw,
      isPostedJob,
      isCanceledJob,
      isEndedJob,
      isSubmittedWork,
      isSecurityAlert,
      isSubmittedProposal,
      isReceivedFeedback,
    } = this.state;

    return (
      <View style={{...GStyles.borderBottom, marginTop: 20}}>
        <CSwitch
          title={'When you are hired'}
          value={isHired}
          onChanged={this.onChangedHired}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you receive a message'}
          value={isReceivedMessage}
          onChanged={this.onChangedReceivedMessage}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a milestone is created'}
          value={isCreatedMilestone}
          onChanged={this.onChangedCreatedMilestone}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a milestone is released'}
          value={isReleasedMilestone}
          onChanged={this.onChangedReleasedMilestone}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When an offer is sent to you'}
          value={isReceivedOffer}
          onChanged={this.onChangedReceivedOffer}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a request is sent to you'}
          value={isReceivedRequest}
          onChanged={this.onChangedReceivedRequest}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you purchase a bid'}
          value={isPurchasedBid}
          onChanged={this.onChangedPurchasedBid}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you make a request for a withdrawal'}
          value={isRequestedWithdraw}
          onChanged={this.onChangedRequestedWithdraw}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a Client you follow posts a job'}
          value={isPostedJob}
          onChanged={this.onChangedPostedJob}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a job is cancelled'}
          value={isCanceledJob}
          onChanged={this.onChangedCanceledJob}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a project has ended'}
          value={isEndedJob}
          onChanged={this.onChangedEndedJob}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'Work submitted for approval'}
          value={isSubmittedWork}
          onChanged={this.onChangedSubmittedWork}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'Security Alert'}
          value={isSecurityAlert}
          onChanged={this.onChangedSecurityAlert}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'Proposal submitted for the first time'}
          value={isSubmittedProposal}
          onChanged={this.onChangedSubmittedProposal}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a feedback is left for you'}
          value={isReceivedFeedback}
          onChanged={this.onChangedReceivedFeedback}
          containerStyle={{marginTop: 16}}
        />
      </View>
    );
  };

  _renderMessagesEmails = () => {
    const {contactMessageEmail, projectMessageEmail} = this.state;

    return (
      <View style={{...GStyles.borderBottom}}>
        <Text style={[GStyles.mediumText, {fontSize: 14, marginTop: 24}]}>
          Emails for messages
        </Text>
        <CSwitch
          title={'When you receive a private message from a contact'}
          value={contactMessageEmail}
          onChanged={this.onChangedContactMessageEmailNotification}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you recieve a message about a project'}
          value={projectMessageEmail}
          onChanged={this.onChangedProjectMessageEmailNotification}
          containerStyle={{marginTop: 16}}
        />
      </View>
    );
  };

  ___renderIndividualEmails = () => {
    const {newsEmail, awardedEmail, paymentEmail, interviewEmail} = this.state;

    return (
      <View style={{...GStyles.borderBottom}}>
        <Text style={[GStyles.mediumText, {fontSize: 14, marginTop: 24}]}>
          Individual Emails
        </Text>
        <CSwitch
          title={'News and announcement from Kreekafrica.com'}
          value={newsEmail}
          onChanged={this.onChangedNewsEmailNotification}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'You are awarded a project'}
          value={awardedEmail}
          onChanged={this.onChangedAwardedEmailNotification}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'You received a payment'}
          value={paymentEmail}
          onChanged={this.onChangedPaymentEmailNotification}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'You received a request for an interview'}
          value={interviewEmail}
          onChanged={this.onChangedInterviewEmailNotification}
          containerStyle={{marginTop: 16}}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default FMoreSettingsScreen;
