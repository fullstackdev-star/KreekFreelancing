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
  ListView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';
import {Badge, Icon, withBadge} from 'react-native-elements';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import SectionHeader from '../../components/elements/SectionHeader';
import Avatar from '../../components/elements/Avatar';
import UserItem from '../../components/elements/UserItem';
import JobItem from '../../components/elements/JobItem';
import CJobItem from '../../components/elements/CJobItem';

const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const img_bg_post = require('../../assets/images/img_bg_post.png');
const img_bg_upgrade = require('../../assets/images/img_bg_upgrade.png');

const ic_notification = require('../../assets/images/ic_notification.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');

class CHomeMainScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CHomeMainScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      ongoingJobCount: 0,
      ongoingJobDatas: [],
      inviteCount: 0,
      inviteDatas: [],
      recentProposalCount: 0,
      recentProposalDatas: [],
      pendingPaymentCount: 0,
      pendingPaymentDatas: [],

      upcomingRequestDatas: [],
      favoriteDatas: [],
      recommendedDatas: [],
    };

    var hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      this._greetings = 'Good morning!';
    } else if (hours >= 12 && hours < 18) {
      this._greetings = 'Good afternoon!';
    } else if (hours >= 18 && hours < 22) {
      this._greetings = 'Good evening!';
    } else {
      this._greetings = 'Good night!';
    }
  };

  onRefresh = () => {
    let isError = false;
    let retCount = 0;
    const TOTAL_RET_COUNT = 4;

    let params = {
      page_number: 1,
      count_per_page: 2,
    };
    showPageLoader(true);
    RestAPI.get_ongoing_job_list(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({
            ongoingJobCount: json.data.total_count,
            ongoingJobDatas: json.data.job_list,
          });
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

    RestAPI.get_all_invites_list(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({
            inviteCount: json.data.total_count,
            inviteDatas: json.data.invite_list,
          });
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

    RestAPI.get_recent_proposal_list(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({
            recentProposalCount: json.data.total_count,
            recentProposalDatas: json.data.project_list,
          });
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

    RestAPI.get_all_pending_payments(params, (json, err) => {
      retCount++;
      if (err !== null) {
        isError = true;
      } else {
        if (json.status === 1) {
          this.setState({
            pendingPaymentCount: json.data.total_count,
            pendingPaymentDatas: json.data.payment_list,
          });
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

  onProfile = () => {
    this.context.navigate('fc_more_profile');
  };

  onNotifications = () => {
    this.context.navigate('fc_more_notifications');
  };

  onCreatePost = () => {
    this.context.navigate('c_home_post_job_step1');
  };

  onUpgradeNow = () => {
    this.context.navigate('c_membership');
  };

  onUpcomingAll = () => {
    this.context.navigate('c_more_requests_tab');
  };

  onFavorite = () => {
    this.context.navigate('c_home_favorites');
  };

  onOngoingAll = () => {
    this.props.navigation.navigate('c_home_jobs_tab');
  };

  onRecentAll = () => {
    this.props.navigation.navigate('c_home_recent_proposals');
  };

  onPendingPaymentsAll = () => {
    this.props.navigation.navigate('c_more_payments_tab');
  };

  onRecommended = () => {
    console.log('---');
  };

  onDetail = () => {
    console.log('---');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderClient()}
            {/* {this._renderJobPost()} */}
            {/* {this._renderUpgradeNow()} */}
            {this._renderOngoingJobsHeader()}
            {this._renderOngingJobs()}
            {this._renderUpcomingRequestsHeader()}
            {this._renderInvites()}
            {this._renderRecentProposalsHeader()}
            {this._renderRecentProposals()}
            {this._renderPendingPaymentsHeader()}
            {this._renderPendingPayments()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderClient = () => {
    return (
      <View style={{marginTop: 24}}>
        <View style={GStyles.rowEndContainer}>
          <TouchableOpacity onPress={this.onProfile}>
            <View style={GStyles.rowContainer}>
              <Avatar image={{uri: global.me.profile_photo}} />
              <View style={{marginLeft: 10}}>
                <Text style={[GStyles.regularText, {fontSize: 13}]}>
                  {this._greetings}
                </Text>
                <Text
                  style={{...GStyles.mediumText, fontSize: 17, marginTop: 8}}>
                  {global.me.first_name + ' ' + global.me.last_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onNotifications}>
            <View style={[GStyles.centerAlign, {width: 50, height: 50}]}>
              <View
                style={[
                  GStyles.centerAlign,
                  GStyles.shadow,
                  {width: 40, height: 40},
                ]}>
                <Image
                  source={ic_notification}
                  style={{...GStyles.image, width: 20}}
                />
              </View>
              <Badge
                status="error"
                value="3"
                containerStyle={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  elevation: 3,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderJobPost = () => {
    return (
      <ImageBackground
        source={img_bg_post}
        imageStyle={{borderRadius: 12}}
        style={{
          width: '100%',
          height: 152,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 36,
        }}>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Text
            style={[
              GStyles.mediumText,
              {lineHeight: 24, color: 'white', textAlign: 'center'},
            ]}>
            Find the right professional for your project!
          </Text>
          <TouchableOpacity onPress={this.onCreatePost}>
            <View style={styles.createJobButton}>
              <Text style={styles.textFill}>Create a Job post</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  _renderUpgradeNow = () => {
    return (
      <ImageBackground
        source={img_bg_upgrade}
        imageStyle={{borderRadius: 12}}
        style={styles.notifyImage}>
        <View style={{width: '90%', alignItems: 'center'}}>
          <Text
            style={[
              GStyles.mediumText,
              {lineHeight: 24, color: '#6A104A', textAlign: 'center'},
            ]}>
            Access a wide range of capabilities and services including talent
            sourcing…
          </Text>
          <TouchableOpacity onPress={this.onUpgradeNow}>
            <View style={styles.createUpgradeButton}>
              <Text style={styles.textFill}>Upgrade Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  _renderOngoingJobsHeader = () => {
    const {ongoingJobCount} = this.state;

    return (
      <SectionHeader
        title={'Ongoing jobs'}
        count={ongoingJobCount}
        onPress={this.onOngoingAll}
      />
    );
  };

  _renderOngingJobs = () => {
    const {ongoingJobDatas} = this.state;

    return (
      <>
        {ongoingJobDatas.map((item, i) => {
          return <CJobItem key={i} item={item} onPress={this.onJobDetail} />;
        })}
      </>
    );
  };

  _renderUpcomingRequestsHeader = () => {
    return (
      <SectionHeader
        title={'Upcoming requests'}
        count={1}
        onPress={this.onUpcomingAll}
      />
    );
  };

  _renderInvites = () => {
    const {inviteDatas} = this.state;

    return (
      <>
        {inviteDatas.map((item, i) => {
          return <UserItem key={i} item={item} onPress={this.onUserDetail} />;
        })}
      </>
    );
  };

  _renderRecentProposalsHeader = () => {
    const {recentProposalCount} = this.state;

    return (
      <SectionHeader
        title={'Recent Proposals'}
        count={recentProposalCount}
        onPress={this.onRecentAll}
      />
    );
  };

  _renderRecentProposals = () => {
    const {recentProposalDatas} = this.state;

    return (
      <>
        {recentProposalDatas.map((item, i) => {
          return <JobItem key={i} item={item} onPress={this.onJobDetail} />;
        })}
      </>
    );
  };

  _renderPendingPaymentsHeader = () => {
    const {pendingPaymentCount} = this.state;

    return (
      <SectionHeader
        title={'Pending payments'}
        count={pendingPaymentCount}
        onPress={this.onPendingPaymentsAll}
      />
    );
  };

  _renderPendingPayments = () => {
    const {pendingPaymentDatas} = this.state;

    return pendingPaymentDatas.map((item, i) => {
      return (
        <View key={i} style={{marginTop: 24}}>
          <View style={{...GStyles.rowEndContainer}}>
            <TouchableOpacity style={{flex: 1}}>
              <View style={{...GStyles.rowContainer}}>
                <Avatar image={{uri: item.photo}} />
                <Text
                  style={{
                    ...GStyles.mediumText,
                    flex: 1,
                    fontSize: 13,
                    lineHeight: 20,
                    marginLeft: 10,
                    marginRight: 20,
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <Text style={{...GStyles.regularText, fontSize: 14}}>
                {Helper.getDateString4Server(item.date)}
              </Text>
              <Text
                style={{
                  ...GStyles.regularText,
                  fontSize: 14,
                  marginTop: 12,
                }}>
                ${item.price}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  ___renderUpcomingRequests = () => {
    const {upcomingRequestDatas} = this.state;

    return upcomingRequestDatas.map((item, i) => {
      return (
        <View key={i} style={{alignItems: 'center', marginTop: 24}}>
          <View style={[GStyles.shadow, {width: '100%', padding: 16}]}>
            <View style={GStyles.rowContainer}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 13,
                    lineHeight: 16,
                    color: '#EE7425',
                  }}>
                  {item.type}
                </Text>
                <Text style={[GStyles.mediumText, {marginTop: 8}]}>
                  {item.name}
                </Text>
                <View style={[GStyles.rowContainer, {marginTop: 8}]}>
                  <Text style={[GStyles.regularText, {fontSize: 13}]}>
                    {item.date}
                  </Text>
                  <Image source={ic_mini_dot} style={GStyles.miniDot} />
                  <Text style={[GStyles.regularText, {fontSize: 13}]}>
                    {item.startTime} - {item.endTime}
                  </Text>
                </View>
              </View>
              <Avatar image={item.avatar} interviewType={item.interviewType} />
            </View>
          </View>
        </View>
      );
    });
  };

  ___renderFavoriteHeader = () => {
    return <SectionHeader title={'My Favorites'} onPress={this.onFavorite} />;
  };

  ___renderFavorite = () => {
    const {favoriteDatas} = this.state;

    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={{alignItems: 'center', height: 120}}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 24}}>
        {favoriteDatas.map((item, i) => {
          return (
            <View
              key={i}
              style={{alignItems: 'center', marginLeft: i > 0 ? 24 : 0}}>
              <Avatar image={item.avatar} size={80} status={item.status} />
              <Text
                style={[GStyles.regularText, {fontSize: 12, marginTop: 12}]}>
                {item.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  ___renderRecommendedHeader = () => {
    return (
      <SectionHeader
        title={'Recommended for You'}
        onPress={this.onRecommended}
      />
    );
  };

  ___renderRecommended = () => {
    const {recommendedDatas} = this.state;

    return recommendedDatas.map((item, i) => {
      return (
        <UserItem
          key={i}
          item={recommendedDatas[i]}
          onPress={this.onDetail}
          onFavorite={this.onDetail}
        />
      );
    });
  };
}

const styles = StyleSheet.create({
  notifyImage: {
    width: '100%',
    height: 152,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },

  createJobButton: {
    width: 156,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#EE7425',
    marginTop: 16,
  },

  createUpgradeButton: {
    width: 136,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FA395E',
    marginTop: 16,
  },

  textFill: {
    fontFamily: 'GothamPro-Medium',
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
});

export default CHomeMainScreen;
