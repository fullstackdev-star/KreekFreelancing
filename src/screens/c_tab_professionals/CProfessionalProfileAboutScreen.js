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
import Accordion from '../../lib/Collapsible/Accordion';

import BarCollapsible from '../../lib/BarCollapsible/BarCollapsible';
import ProgressBar from '../../lib/Progress/Bar';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import FAddExperienceModal from '../modal/FAddExperienceModal';
import SectionHeader from '../../components/elements/SectionHeader';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const image_quote = require('../../assets/images/ic_quote.png');
const ic_mini_right_arrow = require('../../assets/images/ic_mini_right_arrow.png');

const WINDOW_WIDTH = Helper.getWindowWidth();
const PROGRESS_WIDTH = WINDOW_WIDTH * 0.33;

const ShowMore = (onPress) => {
  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16}}>
      <TouchableOpacity onPress={onPress} style={GStyles.rowContainer}>
        <Text
          style={{
            ...GStyles.mediumText,
            fontSize: 13,
            color: GStyle.activeColor,
          }}>
          Show more
        </Text>
        <Image source={ic_mini_right_arrow} style={styles.rightArrowImage} />
      </TouchableOpacity>
    </View>
  );
};

class CProfessionalProfileAboutScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalProfileAboutScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      activeAboutMeSections: [],
      activeExperienceSections: [],
      activeEducationSections: [],
      activeSkillsSections: [],

      jobProfileInfo: {},
      experienceDatas: [],
      educationDatas: [],
      skillDatas: [],

      isScrollEnabled: false,
    };
    this.offset = 0;
  };

  onRefresh = () => {
    let isError = false;
    let retCount = 0;
    const TOTAL_RET_COUNT = 4;

    const params = {
      professional_id: global._freelancerId,      
    };
    showPageLoader(true);
    RestAPI.get_job_profile_info_by_id(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({jobProfileInfo: json.data});
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

    RestAPI.get_experience_list_by_id(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({experienceDatas: json.data.experience_list});
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

    RestAPI.get_education_list_by_id(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({educationDatas: json.data.education_list});
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

    RestAPI.get_skill_list_by_id(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({skillDatas: json.data.skill_list});
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

  onSuccess4Server = () => {
    showPageLoader(false);
  };

  onFail4Server = () => {
    showPageLoader(false);
    Helper.alertServerDataError();
  };

  setScrollEnable = () => {
    this.setState({isScrollEnabled: true});
  };

  onAboutShowMore = () => {
    console.log('---');
  };

  onExperienceShowMore = () => {
    console.log('---');
  };

  onEducationShowMore = () => {
    console.log('---');
  };

  onScroll = (varTest) => {
    const current_offset = varTest.nativeEvent.contentOffset.y;
    if (current_offset < this.offset && current_offset < 10) {
      this.setState({isScrollEnabled: false});
    }
    this.offset = current_offset;
  };

  render() {
    const {isScrollEnabled} = this.state;

    return (
      <>
        <View style={GStyles.container}>
          <ScrollView
            // scrollEnabled={isScrollEnabled}
            // scrollEventThrottle={1}
            // onScroll={this.onScroll}
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderAboutMe()}
            {this._renderExperience()}
            {this._renderEducation()}
            {this._renderSkills()}
            {this._renderOthers()}
          </ScrollView>
        </View>
      </>
    );
  }

  _renderAboutMe = () => {
    const {activeAboutMeSections, jobProfileInfo} = this.state;

    return (
      <Accordion
        sections={[jobProfileInfo]}
        activeSections={activeAboutMeSections}
        renderHeader={this._renderAboutMeHeader}
        renderContent={this._renderAboutMeContent}
        onChange={this._updateAboutMeSections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        collapsedHeight={80}
        isHeaderMore={false}
        isShowMore={false}
        sectionContainerStyle={{
          ...GStyles.borderBottom,
          marginTop: 24,
          paddingBottom: 16,
        }}
      />
    );
  };

  _renderAboutMeHeader = () => {
    return <Text style={{...GStyles.mediumText, fontSize: 20}}>About me</Text>;
  };

  _renderAboutMeContent = (jobProfileInfo) => {
    return (
      <Text
        numberOfLines={3}
        style={{...GStyles.regularText, lineHeight: 22, marginTop: 10}}>
        {jobProfileInfo.description}
      </Text>
    );
  };

  _updateAboutMeSections = (activeAboutMeSections) => {
    this.setState({activeAboutMeSections});
  };

  _renderExperience = () => {
    const {activeExperienceSections, experienceDatas} = this.state;

    return (
      <Accordion
        sections={[experienceDatas]}
        activeSections={activeExperienceSections}
        renderHeader={this._renderExperienceHeader}
        renderContent={this._renderExperienceContent}
        onChange={this._updateExperienceSections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        collapsedHeight={experienceDatas.length > 0 ? 80 : 0}
        sectionContainerStyle={{...GStyles.borderBottom, paddingBottom: 32}}
        isHeaderMore={experienceDatas.length > 0 ? true : false}
        isShowMore={experienceDatas.length > 0 ? true : false}
      />
    );
  };

  _renderExperienceHeader = () => {
    return (
      <Text style={[GStyles.mediumText, {fontSize: 20, marginTop: 16}]}>
        Experience
      </Text>
    );
  };

  _renderExperienceContent = (experienceDatas) => {
    return (
      <View>
        {experienceDatas.map((item, i) => {
          return (
            <View>
              <Text
                style={[GStyles.mediumText, {lineHeight: 24, marginTop: 24}]}>
                {item.title}
              </Text>
              <Text style={{...GStyles.regularText, marginTop: 10}}>
                {item.start_date} - {item.end_date ? item.end_date : 'Present'}
              </Text>
              <Text
                style={[GStyles.regularText, {lineHeight: 24, marginTop: 16}]}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  _updateExperienceSections = (activeExperienceSections) => {
    this.setState({activeExperienceSections});
  };

  _renderEducation = () => {
    const {activeEducationSections, educationDatas} = this.state;

    return (
      <Accordion
        sections={[educationDatas]}
        activeSections={activeEducationSections}
        renderHeader={this._renderEducationHeader}
        renderContent={this._renderEducationContent}
        onChange={this._updateEducationSections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        collapsedHeight={educationDatas.length > 0 ? 80 : 40}
        sectionContainerStyle={{...GStyles.borderBottom, paddingBottom: 32}}
        isHeaderMore={educationDatas.length > 0 ? true : false}
        isShowMore={educationDatas.length > 0 ? true : false}
      />
    );
  };

  _renderEducationHeader = () => {
    return (
      <Text style={{...GStyles.mediumText, fontSize: 20, marginTop: 16}}>
        Education
      </Text>
    );
  };

  _renderEducationContent = (educationDatas) => {
    return (
      <View>
        {educationDatas.map((item, i) => {
          return (
            <View key={i}>
              <Text
                style={[GStyles.mediumText, {lineHeight: 24, marginTop: 16}]}>
                {item.title}
              </Text>
              <Text style={[GStyles.regularText, {marginTop: 5}]}>
                {item.school}
              </Text>
              <Text style={[GStyles.regularText, {fontSize: 12, marginTop: 8}]}>
                {item.passing_year}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  _updateEducationSections = (activeEducationSections) => {
    this.setState({activeEducationSections});
  };

  _renderSkills = () => {
    const {activeSkillsSections, skillDatas} = this.state;

    return (
      <Accordion
        sections={[skillDatas]}
        activeSections={activeSkillsSections}
        renderHeader={this._renderSkillsHeader}
        renderContent={this._renderSkillsContent}
        onChange={this._updateSkillsSections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        collapsedHeight={skillDatas.length > 1 ? 80 : 40}
        isHeaderMore={skillDatas.length > 1 ? true : false}
        isShowMore={skillDatas.length > 1 ? true : false}
        sectionContainerStyle={{...GStyles.borderBottom, paddingBottom:32}}
      />
    );
  };

  _renderSkillsHeader = () => {
    return (
      <Text style={[GStyles.mediumText, {fontSize: 20, marginTop: 16}]}>
        Skills
      </Text>
    );
  };

  _renderSkillsContent = (skillDatas) => {
    return (
      <View>
        {skillDatas.map((item, i) => {
          return (
            <View key={i} style={{flexDirection: 'row'}}>
              <Text
                style={[
                  GStyles.regularText,
                  {flex: 1, lineHeight: 24, marginTop: 5},
                ]}>
                {Helper.getSkillName4Id(item.skill_list_id)}
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
                  style={[GStyles.regularText, {lineHeight: 24, marginTop: 5}]}>
                  {item.percent}%
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  _updateSkillsSections = (activeSkillsSections) => {
    this.setState({activeSkillsSections});
  };

  _renderOthers = () => {
    return (
      <View style={{marginBottom: 650}}>
        <Text style={{...GStyles.mediumText, fontSize: 20, marginTop: 16}}>
          Ohters
        </Text>
        <Text
          style={{
            ...GStyles.mediumText,
            lineHeight: 18,
            marginTop: 24,
          }}>
          English: <Text style={{fontFamily: 'GothamPro'}}>Native speaker</Text>
        </Text>
        <Text
          style={{
            ...GStyles.mediumText,
            lineHeight: 18,
            marginTop: 24,
          }}>
          Languages:
        </Text>
        <Text style={{...GStyles.regularText, marginTop: 8}}>
          French, Spanish
        </Text>
        <Text
          style={{
            ...GStyles.mediumText,
            lineHeight: 18,
            marginTop: 24,
          }}>
          Lives in: <Text style={{fontFamily: 'GothamPro'}}>Accra, Ghana</Text>
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  rightArrowImage: {
    width: 12,
    height: 12,
    resizeMode: 'center',
    marginLeft: 4,
    marginBottom: 2,
  },
});

export default CProfessionalProfileAboutScreen;
