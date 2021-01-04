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

const image_quote = require('../../assets/images/ic_quote.png');
const img_portfolio1 = require('../../assets/images/img_portfolio1.png');
const img_portfolio2 = require('../../assets/images/img_portfolio2.png');

const WINDOW_WIDTH = Helper.getWindowWidth();
const PROGRESS_WIDTH = WINDOW_WIDTH * 0.33;

class FMoreUpdateJobProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMoreUpdateJobProfileScreen start');

    this.state = {
      is_visible_experience_modal: false,

      skill_datas: [
        {
          id: 'id1',
          title: 'Photoshop',
          percent: 60,
        },
        {
          id: 'id2',
          title: '3D Animation',
          percent: 99,
        },
        {
          id: 'id3',
          title: 'Maya',
          percent: 98,
        },
        {
          id: 'id4',
          title: 'Edius',
          percent: 70,
        },
        {
          id: 'id5',
          title: '3D Max',
          percent: 96,
        },
        {
          id: 'id6',
          title: 'After Effect',
          percent: 80,
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
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
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Job Profile"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="save"
        onPressRightButton={this.onBack}
      />
    );
  };

  _renderModal = () => {
    return (
      <FAddExperienceModal
        modalVisible={this.state.is_visible_experience_modal}
        onPressCancel={() => {
          this.setState({is_visible_experience_modal: false});
        }}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={GStyles.titleText}>Update your job profile</Text>
        <Text style={GStyles.titleDescription}>
          Share a few details about your skills and experience
        </Text>
      </>
    );
  };

  _renderProfessinalHeading = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 35}]}>
          Professional heading
        </Text>
        <TextInput
          placeholder="Please input Professional heading"
          defaultValue="Expert Animation Artist & Video Producer"
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
          defaultValue="I am an Professional Freelance Artist with 7+ years of Working Experience in the Industry. I am an expert Digital Artist and Video Producer."
          style={[
            GStyles.regularText,
            {height: 115, lineHeight: 22, marginTop: 5},
          ]}
        />
      </>
    );
  };

  _renderHourlyRate = () => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 50}]}>
        <Text style={[GStyles.mediumText, {fontSize: 17}]}>Hourly rate</Text>
        <TextInput
          defaultValue="GHC 15"
          style={[
            GStyles.regularText,
            {
              width: '50%',
              borderBottomWidth: 1,
              borderColor: GStyle.grayBackColor,
            },
          ]}
        />
      </View>
    );
  };

  _renderPortfolio = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
            <Image
              source={img_portfolio1}
              style={{
                width: '48%',
                height: 150,
                resizeMode: 'stretch',
              }}
            />
            <Image
              source={img_portfolio2}
              style={{
                width: '48%',
                height: 150,
                resizeMode: 'stretch',
              }}
            />
          </View>
        </BarCollapsible>
      </View>
    );
  };

  _renderExperience = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
          <View style={{marginLeft: 10}}>
            <Text style={[GStyles.mediumText, {lineHeight: 24, marginTop: 4}]}>
              Freelancer
            </Text>
            <Text style={[GStyles.regularText, {marginTop: 10}]}>
              July 2016 - Present
            </Text>
            <Text
              style={[GStyles.regularText, {lineHeight: 24, marginTop: 16}]}>
              I have been a full time Freelance digital artist with 5+ years of
              experience working in some of the best projects known like,
              Noddy(Dream Works), Shimmer and Shine(Nick Jr) , Red Dead
              Redemption (AAA Rockstar Games), Rapid Racer (Unity Android Game),
              Racer Xtreme (Personal Unity Android Game Project).
            </Text>
          </View>
        </BarCollapsible>
      </View>
    );
  };

  _renderEducation = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
          <View style={{marginLeft: 10}}>
            <Text style={[GStyles.mediumText, {lineHeight: 24, marginTop: 4}]}>
              Bachelor of Arts - Animation & Visual Effect
            </Text>
            <Text style={[GStyles.regularText, {marginTop: 5}]}>
              University of Ontario
            </Text>
            <Text style={[GStyles.regularText, {fontSize: 12, marginTop: 8}]}>
              Sept.2010 - Oct.2014
            </Text>
          </View>
        </BarCollapsible>
      </View>
    );
  };

  _renderQualification = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
          showOnStart={false}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}
        />
      </View>
    );
  };

  _renderPublication = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
          showOnStart={false}
          titleStyle={[GStyles.mediumText, {fontSize: 17}]}
          style={{backgroundColor: 'white'}}
        />
      </View>
    );
  };

  _renderSkills = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.linkText}
          onPress={() => {
            this.setState({is_visible_experience_modal: true});
          }}>
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
            {this.state.skill_datas.map((item, i) => {
              return (
                <View key={i} style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      GStyles.regularText,
                      {flex: 1, lineHeight: 24, marginTop: 5},
                    ]}>
                    {item.title}
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
}

const styles = StyleSheet.create({
  linkText: {
    position: 'absolute',
    zIndex: 99,
    right: 0,
    top: 16,
  },
});

export default FMoreUpdateJobProfileScreen;
