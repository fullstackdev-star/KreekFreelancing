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
import FAddExperienceModal from '../modal/FAddExperienceModal';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const image_quote = require('../../assets/images/ic_quote.png');
const img_portfolio1 = require('../../assets/images/img_portfolio1.png');
const img_portfolio2 = require('../../assets/images/img_portfolio2.png');

const WINDOW_WIDTH = Helper.getWindowWidth();
const PROGRESS_WIDTH = WINDOW_WIDTH * 0.33;

class NFAccountStep2Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('NFAccountStep2Screen start');

    this.state = {
      isVisiblePortfolioModal: false,
      isVisibleExperienceModal: false,
      isVisibleEducationModal: false,
      isVisibleQualificationModal: false,
      isVisiblePublicationModal: false,
      isVisibleSkillsModal: false,

      jobProfileTitle: global.isDebug
        ? 'Expert Animation Artist & Video Producer'
        : '',
      jobProfileDescription: global.isDebug
        ? 'I am an Professional Freelance Artist with 7+ years of Working Experience in the Industry. I am an expert Digital Artist and Video Producer.'
        : '',
      jobProfileHourlyRate: global.isDebug ? '15' : '',

      portfolioList: [],
      experienceList: [],
      educationList: [],
      qualificationList: [],
      publicationList: [],
      skillList: [],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.getData4Server();
  }

  getData4Server = () => {
    showPageLoader(true);

    let isError = false;
    let retCount = 0;
    const TOTAL_RET_COUNT = 5;

    RestAPI.get_portfolio_list((json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          const portfolioList = json.data.portfolio_list;
          this.setState({portfolioList: portfolioList});
          if (!isError && retCount == TOTAL_RET_COUNT) {
            this.onSuccess4Server();
          }
        } else {
          isError = true;
        }
      }

      if (isError && retCount == TOTAL_RET_COUNT) {
        this.onFail4Server();
      }
    });

    RestAPI.get_experience_list((json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          const experienceList = json.data.experience_list;
          this.setState({experienceList: experienceList});
          if (!isError && retCount == TOTAL_RET_COUNT) {
            this.onSuccess4Server();
          }
        } else {
          isError = true;
        }
      }

      if (isError && retCount == TOTAL_RET_COUNT) {
        this.onFail4Server();
      }
    });

    RestAPI.get_education_list((json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          const educationList = json.data.education_list;
          this.setState({educationList: educationList});
          if (!isError && retCount == TOTAL_RET_COUNT) {
            this.onSuccess4Server();
          }
        } else {
          isError = true;
        }
      }

      if (isError && retCount == TOTAL_RET_COUNT) {
        showPageLoader(false);
        Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
      }
    });

    RestAPI.get_award_list((json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          const qualificationList = json.data.award_list;
          this.setState({qualificationList: qualificationList});
          if (!isError && retCount == TOTAL_RET_COUNT) {
            this.onSuccess4Server();
          }
        } else {
          isError = true;
        }
      }

      if (isError && retCount == TOTAL_RET_COUNT) {
        this.onFail4Server();
      }
    });

    RestAPI.get_skill_list_by_user((json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          const skillList = json.data.skill_list;
          this.setState({skillList: skillList});
          if (!isError && retCount == TOTAL_RET_COUNT) {
            this.onSuccess4Server();
          }
        } else {
          isError = true;
        }
      }

      if (isError && retCount == TOTAL_RET_COUNT) {
        this.onFail4Server();
      }
    });
  };

  onBack = () => {
    this.props.navigation.navigate('fc_account_step_first');
  };

  onSkip = () => {
    this.props.navigation.navigate('f_membership');
  };

  onPortfolioManage = () => {
    console.log('---');
  };

  onAddExperience = () => {
    this.setState({isVisibleExperienceModal: true});
  };

  onAddExperienceSave = () => {
    this.setState({isVisibleExperienceModal: false});
    this.getData4Server();
  };

  onAddExperienceCancel = () => {
    this.setState({isVisibleExperienceModal: false});
  };

  onAddEducation = () => {
    console.log('---');
  };

  onAddQualification = () => {
    console.log('---');
  };

  onAddPublification = () => {
    console.log('---');
  };

  onAddSkills = () => {
    console.log('---');
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
            this.props.navigation.navigate('f_membership');
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

  onSuccess4Server = () => {
    showPageLoader(false);
  };

  onFail4Server = () => {
    showPageLoader(false);
    Alert.alert(Constants.errorTitle, 'Failed to get data from server.');
  };

  getSkillName4Id = (skillId) => {
    let skillName = null;

    global.skill_list.forEach((item) => {
      if (item.id == skillId) {
        skillName = item.name;
      }
    });

    return skillName;
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
            {this._renderProfessinalHeading()}
            {this._renderSummary()}
            {this._renderHourlyRate()}
            {this._renderPortfolio()}
            {this._renderExperience()}
            {this._renderEducation()}
            {this._renderQualification()}
            {this._renderPublication()}
            {this._renderSkills()}
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

  _renderModal = () => {
    const {isVisibleExperienceModal} = this.state

    return (
      <FAddExperienceModal
        modalVisible={isVisibleExperienceModal}
        onPressSave={this.onAddExperienceSave}
        onPressCancel={this.onAddExperienceCancel}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 2 of 3</Text>
        <Text style={GStyles.titleText}>Setup your job profile</Text>
        <Text style={GStyles.titleDescription}>
          Share a few details about your skills and experience
        </Text>
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
          placeholder="Please input Professional heading"
          value={jobProfileTitle}
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
          placeholder="Please input your summary"
          multiline={true}
          numberOfLines={5}
          value={jobProfileDescription}
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
        <TextInput
          value={jobProfileHourlyRate}
          style={{
            ...GStyles.regularText,
            width: '50%',
            borderBottomWidth: 1,
            borderColor: GStyle.grayBackColor,
          }}
        />
      </View>
    );
  };

  _renderPortfolio = () => {
    const {portfolioList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={this.onPortfolioManage}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Manage
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Portfolio items"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}>
          <View
            style={[GStyles.rowEndContainer, {width: '100%', marginTop: 30}]}>
            {portfolioList.map((item, i) => {
              return (
                <Image
                  key={i}
                  source={{uri: item.image}}
                  style={{
                    width: '48%',
                    height: 150,
                    resizeMode: 'stretch',
                  }}
                />
              );
            })}
          </View>
        </BarCollapsible>
      </View>
    );
  };

  _renderExperience = () => {
    const {experienceList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={this.onAddExperience}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Add experience
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Experience"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}>
          {experienceList.map((item, i) => {
            return (
              <View key={i} style={{marginLeft: 10, marginTop: 10}}>
                <Text
                  style={[GStyles.mediumText, {lineHeight: 24, marginTop: 4}]}>
                  {item.title}
                </Text>
                <Text style={[GStyles.regularText, {marginTop: 10}]}>
                  {item.start_date} - {item.end_date}
                </Text>
                <Text
                  style={[
                    GStyles.regularText,
                    {lineHeight: 24, marginTop: 16},
                  ]}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </BarCollapsible>
      </View>
    );
  };

  _renderEducation = () => {
    const {educationList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity style={styles.linkText} onPress={this.onAddEducation}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Add education
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Education"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}>
          {educationList.map((item, i) => {
            return (
              <View key={i} style={{marginLeft: 10, marginTop: 20}}>
                <Text
                  style={[GStyles.mediumText, {lineHeight: 24, marginTop: 4}]}>
                  {item.title}
                </Text>
                <Text style={[GStyles.regularText, {marginTop: 5}]}>
                  {item.school}
                </Text>
                <Text
                  style={[GStyles.regularText, {fontSize: 12, marginTop: 8}]}>
                  {item.passing_year}
                </Text>
              </View>
            );
          })}
        </BarCollapsible>
      </View>
    );
  };

  _renderQualification = () => {
    const {qualificationList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={this.onAddQualification}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Add qualification
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Qualification"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}
        />
      </View>
    );
  };

  _renderPublication = () => {
    const {publicationList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={this.onAddPublification}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Add publication
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Publication"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}
        />
      </View>
    );
  };

  _renderSkills = () => {
    const {skillList} = this.state;

    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity style={styles.linkText} onPress={this.onAddSkills}>
          <Text
            style={[
              GStyles.mediumText,
              {fontSize: 13, color: GStyle.linkColor},
            ]}>
            Add Skills
          </Text>
        </TouchableOpacity>
        <BarCollapsible
          isIcon={false}
          imgSize={14}
          title="Skills"
          collapsible={true}
          showOnStart={true}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}>
          <View style={{marginLeft: 10}}>
            {skillList.map((item, i) => {
              return (
                <View key={i} style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      GStyles.regularText,
                      {flex: 1, lineHeight: 24, marginTop: 5},
                    ]}>
                    {this.getSkillName4Id(item.skill_list_id)}
                  </Text>
                  <View style={[GStyles.rowEndContainer, {flex: 1}]}>
                    <ProgressBar
                      progress={item.percent * 0.01}
                      width={PROGRESS_WIDTH}
                      height={4}
                      color={GStyle.activeColor}
                      borderColor={'white'}
                    />
                    <Text
                      style={[
                        GStyles.regularText,
                        {lineHeight: 24, marginTop: 5},
                      ]}>
                      {item.percent}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </BarCollapsible>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 40}}>
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

export default NFAccountStep2Screen;
