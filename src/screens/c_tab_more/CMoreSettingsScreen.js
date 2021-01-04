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

class CMoreSettingsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CMoreSettingsScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isPostProject: false,
      isReceivedProposals: false,
      isSentMessage: false,
      isHiredProfessional: false,
      isDoneOffer: false,
      isRequestedMilestone: false,
      isReleasedMilestone: false,
      isEndedProject: false,
      isLeftFeeback: false,
      isFollowedFreelancer: false,
      isMadeDeposit: false,
      isSecurityAlert: false,
    };
  };

  onRefresh = () => {
    const params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_c_email_settings(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          const itemData = json.data;          
          this.setState({
            isPostProject: itemData.isPostProject == 'true' ? true : false,
            isReceivedProposals:
              itemData.isReceivedProposals == 'true' ? true : false,
            isSentMessage: itemData.isSentMessage == 'true' ? true : false,
            isHiredProfessional:
              itemData.isHiredProfessional == 'true' ? true : false,
            isDoneOffer: itemData.isDoneOffer == 'true' ? true : false,
            isRequestedMilestone:
              itemData.isRequestedMilestone == 'true' ? true : false,
            isReleasedMilestone:
              itemData.isReleasedMilestone == 'true' ? true : false,
            isEndedProject: itemData.isEndedProject == 'true' ? true : false,
            isLeftFeeback: itemData.isLeftFeeback == 'true' ? true : false,
            isFollowedFreelancer:
              itemData.isFollowedFreelancer == 'true' ? true : false,
            isMadeDeposit: itemData.isMadeDeposit == 'true' ? true : false,
            isSecurityAlert: itemData.isSecurityAlert == 'true' ? true : false,
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

  onChangedPostProject = (value) => {
    this.onUpdateEmailNotificaiton('isPostProject', value, () => {
      this.setState({isPostProject: value});
    });
  };

  onChangedReceivedProposals = (value) => {
    this.onUpdateEmailNotificaiton('isReceivedProposals', value, () => {
      this.setState({isReceivedProposals: value});
    });
  };

  onChangedSentMessage = (value) => {
    this.onUpdateEmailNotificaiton('isSentMessage', value, () => {
      this.setState({isSentMessage: value});
    });
  };

  onChangedHiredProfessional = (value) => {
    this.onUpdateEmailNotificaiton('isHiredProfessional', value, () => {
      this.setState({isHiredProfessional: value});
    });
  };

  onChangedDoneOffer = (value) => {
    this.onUpdateEmailNotificaiton('isDoneOffer', value, () => {
      this.setState({isDoneOffer: value});
    });
  };

  onChangedRequestedMilestone = (value) => {
    this.onUpdateEmailNotificaiton('isRequestedMilestone', value, () => {
      this.setState({isRequestedMilestone: value});
    });
  };

  onChangedReleasedMilestone = (value) => {
    this.onUpdateEmailNotificaiton('isReleasedMilestone', value, () => {
      this.setState({isReleasedMilestone: value});
    });
  };

  onChangedEndedProject = (value) => {
    this.onUpdateEmailNotificaiton('isEndedProject', value, () => {
      this.setState({isEndedProject: value});
    });
  };

  onChangedLeftFeeback = (value) => {
    this.onUpdateEmailNotificaiton('isLeftFeeback', value, () => {
      this.setState({isLeftFeeback: value});
    });
  };

  onChangedFollowedFreelancer = (value) => {
    this.onUpdateEmailNotificaiton('isFollowedFreelancer', value, () => {
      this.setState({isFollowedFreelancer: value});
    });
  };

  onChangedMadeDeposit = (value) => {
    this.onUpdateEmailNotificaiton('isMadeDeposit', value, () => {
      this.setState({isMadeDeposit: value});
    });
  };

  onChangedSecurityAlert = (value) => {
    this.onUpdateEmailNotificaiton('isSecurityAlert', value, () => {
      this.setState({isSecurityAlert: value});
    });
  };

  onUpdateEmailNotificaiton = (option, value, callback) => {
    const params = {
      option: option,
      value: value,
    };
    showPageLoader(true);
    RestAPI.update_c_email_settings(params, (json, err) => {
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
      isPostProject,
      isReceivedProposals,
      isSentMessage,
      isHiredProfessional,
      isDoneOffer,
      isRequestedMilestone,
      isReleasedMilestone,
      isEndedProject,
      isLeftFeeback,
      isFollowedFreelancer,
      isMadeDeposit,
      isSecurityAlert,
    } = this.state;

    return (
      <View style={{...GStyles.borderBottom, marginTop: 20}}>
        <CSwitch
          title={'When you post a project'}
          value={isPostProject}
          onChanged={this.onChangedPostProject}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you receive proposals'}
          value={isReceivedProposals}
          onChanged={this.onChangedReceivedProposals}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a message is sent to you'}
          value={isSentMessage}
          onChanged={this.onChangedSentMessage}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you hire a Professional'}
          value={isHiredProfessional}
          onChanged={this.onChangedHiredProfessional}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a Professional accepts/decline your offer'}
          value={isDoneOffer}
          onChanged={this.onChangedDoneOffer}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a milestone is requested'}
          value={isRequestedMilestone}
          onChanged={this.onChangedRequestedMilestone}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you release milestone'}
          value={isReleasedMilestone}
          onChanged={this.onChangedReleasedMilestone}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you end a project'}
          value={isEndedProject}
          onChanged={this.onChangedEndedProject}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a feedback is left for you'}
          value={isLeftFeeback}
          onChanged={this.onChangedLeftFeeback}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When a Professional follow you'}
          value={isFollowedFreelancer}
          onChanged={this.onChangedFollowedFreelancer}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'When you make a deposit'}
          value={isMadeDeposit}
          onChanged={this.onChangedMadeDeposit}
          containerStyle={{marginTop: 16}}
        />
        <CSwitch
          title={'Security Alert'}
          value={isSecurityAlert}
          onChanged={this.onChangedSecurityAlert}
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

export default CMoreSettingsScreen;
