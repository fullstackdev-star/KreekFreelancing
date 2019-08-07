import React, {Component} from 'react';
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

import Flag from '../../lib/SvgFlagkit/Flag';
import {Tooltip} from 'react-native-elements';
import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {getStatusBarHeight} from '../../lib/StatusBarHeight/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import ParallaxScrollView from '../../lib/ParallaxScrollView/index';
import Avatar from '../../components/elements/Avatar';
import ModalSelector from '../../lib/ModalSelector/index';

import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from '../../lib/ScrollableTabView/index';

import GHeaderBar from '../../components/GHeaderBar';

import CProfessionalProfileAboutScreen from './CProfessionalProfileAboutScreen';
import CProfessionalsProfilePortfolioScreen from './CProfessionalsProfilePortfolioScreen';
import CProfessionalsProfileReviewsScreen from './CProfessionalsProfileReviewsScreen';
import CProfessionalsSendRequestModal from '../modal/CProfessionalsSendRequestModal';
import CProfessionalsSendOfferModal from '../modal/CProfessionalsSendOfferModal';

const ic_default_avatar = require('../../assets/images/ic_default_avatar.png');
const ic_back = require('../../assets/images/ic_back.png');
const ic_favorite_inactive = require('../../assets/images/ic_heart.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active_1.png');
const ic_more = require('../../assets/images/ic_more.png');
const img_bg_profile = require('../../assets/images/img_bg_profile.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const ic_membership_professional = require('../../assets/images/ic_membership_professional.png');
const ic_flag = require('../../assets/images/ic_flag.png');
const ic_star = require('../../assets/images/ic_star_active.png');

const PARALLAX_HEADER_HEIGHT = 320;

const HeaderButton = ({isParallax, image, onPress, containerStyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...GStyles.centerAlign,
          width: 40,
          height: 40,
          ...containerStyle,
        }}>
        <View
          style={{
            ...GStyles.centerAlign,
            ...GStyles.shadow,
            width: 40,
            height: 40,
            backgroundColor: isParallax ? '#27275552' : '#ffffff00',
          }}>
          <Image
            source={image}
            style={{
              ...GStyles.image,
              width: 20,
              tintColor: isParallax ? 'white' : GStyle.fontColor,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

class CProfessionalsProfileScreen extends Component {
  constructor(props) {
    super(props);

    console.log('CProfessionalsProfileScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.summaryTabRef = React.createRef();
    this.portfolioTabRef = React.createRef();
    this.reviewsTabRef = React.createRef();

    this.state = {
      isVisibleRequestModal: false,
      isVisibleOfferModal: false,

      isVisibleParallaxHeader: true,
      isParallaxScroll: true,
      offset: 0,

      toolTipVisible: false,

      isGetDataDone: false,
      itemData: {},
    };
  };

  onRefresh = () => {
    this.setState({isGetDataDone: false});
    
    let params = {
      professional_id: global._freelancerId,
    };
    showPageLoader(true);
    RestAPI.get_professional_summary(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({itemData: json.data, isGetDataDone: true});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  onFavorite = () => {
    let {itemData} = this.state;
    const isChecked = !itemData.is_favorite;

    const params = {
      user_id: global._freelancerId,
      is_favorite: isChecked,
    };

    showPageLoader(true);
    RestAPI.update_favorite_professional(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          itemData.is_favorite = isChecked;
          this.setState(itemData);
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onSelectMore = (value) => {
    const {itemData} = this.state;

    if (value.key == 1) {
      if (itemData.is_favorite) {
        return;
      }
      this.onFavorite();
    } else if (value.key == 2) {
      console.log('---');
    } else if (value.key == 3) {
      console.log('---');
    }
  };

  onMore = () => {
    console.log('---');
  };

  onChangeHeaderVisibility = (flag) => {
    this.setState({isVisibleParallaxHeader: flag});
  };

  onReachedTabbar = () => {
    // this.summaryTabRef.current.setScrollEnable();
    // this.portfolioTabRef.current.setScrollEnable();
    // this.reviewsTabRef.current.setScrollEnable();
  };

  onSubmit = (value) => {
    if (value.key == 0) {
      this.setState({isVisibleRequestModal: true});
    } else {
      this.setState({isVisibleOfferModal: true});
    }
  };

  onSendRequest = () => {
    this.setState({isVisibleRequestModal: false});
  };

  onCancelRequest = () => {
    this.setState({isVisibleRequestModal: false});
  };

  onSendOffer = () => {
    this.setState({isVisibleOfferModal: false});
  };

  onCancelOffer = () => {
    this.setState({isVisibleOfferModal: false});
  };

  render() {
    const {isVisibleParallaxHeader, isParallaxScroll, itemData} = this.state;

    const statusBarHeight = getStatusBarHeight();
    const headerBarHeight = 50 + statusBarHeight;
    const profileHeight = headerBarHeight + PARALLAX_HEADER_HEIGHT + 16;

    return (
      <View style={{flex: 1}}>
        {this._renderModal()}
        <ParallaxScrollView
          showsVerticalScrollIndicator={false}
          backgroundColor={GStyle.snowColor}
          contentContainerStyle={{borderRadius: 16, marginTop: -16}}
          stickyHeaderHeight={headerBarHeight}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          profileHeight={profileHeight}
          backgroundSpeed={10}
          onChangeHeaderVisibility={this.onChangeHeaderVisibility}
          onReachedTabbar={this.onReachedTabbar}
          renderBackground={() => (
            <View key="background">
              <Image
                source={{uri: itemData.cover_photo}}
                style={{
                  resizeMode: 'stretch',
                  width: '100%',
                  height: PARALLAX_HEADER_HEIGHT,
                }}
              />
            </View>
          )}
          renderStickyHeader={() => (
            <View
              key="sticky-header"
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...GStyles.mediumText,
                  fontSize: 17,
                  lineHeight: 50,
                }}>
                {itemData.name}
              </Text>
            </View>
          )}
          renderFixedHeader={() => {
            let index = 1;
            const buttonDatas = [
              {key: index++, label: 'Add to Favorite'},
              {key: index++, label: 'Share to...'},
              {key: index++, label: 'Report'},
            ];

            return (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}>
                <View style={{height: statusBarHeight}} />
                <View style={{...GStyles.rowEndContainer}}>
                  <View
                    style={{
                      ...GStyles.rowEndContainer,
                      flex: 1,
                    }}>
                    <HeaderButton
                      isParallax={isVisibleParallaxHeader}
                      image={ic_back}
                      onPress={this.onBack}
                      containerStyle={{marginLeft: 24}}
                    />
                    <HeaderButton
                      isParallax={isVisibleParallaxHeader}
                      image={
                        itemData.is_favorite
                          ? ic_favorite_active
                          : ic_favorite_inactive
                      }
                      onPress={this.onFavorite}
                      containerStyle={{marginRight: 12}}
                    />
                  </View>
                  <ModalSelector
                    data={buttonDatas}
                    initValue="Select one"
                    optionTextStyle={{color: GStyle.fontColor}}
                    cancelTextStyle={{color: GStyle.fontColor}}
                    overlayStyle={{justifyContent: 'flex-end'}}
                    accessible={true}
                    onChange={this.onSelectMore}>
                    <HeaderButton
                      isParallax={isVisibleParallaxHeader}
                      image={ic_more}
                      onPress={this.onMore}
                      containerStyle={{marginRight: 24}}
                    />
                  </ModalSelector>
                </View>
              </View>
            );
          }}>
          <View
            style={{
              height: 1500,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '88.1%',
                height: 210,
              }}>
              {this._renderAvatar()}
              {this._renderTitle()}
              {this._renderPercents()}
            </View>
            {this._renderProfileTab()}
          </View>
        </ParallaxScrollView>
        {this._renderButton()}
      </View>
    );
  }

  _renderModal = () => {
    const {isVisibleRequestModal, isVisibleOfferModal} = this.state;

    return (
      <>
        <CProfessionalsSendRequestModal
          modalVisible={isVisibleRequestModal}
          onSubmit={this.onSendRequest}
          onCancel={this.onCancelRequest}
        />
        <CProfessionalsSendOfferModal
          modalVisible={isVisibleOfferModal}
          onSubmit={this.onSendOffer}
          onCancel={this.onCancelOffer}
        />
      </>
    );
  };

  _renderAvatar = () => {
    const {itemData} = this.state;

    return (
      <View style={{...GStyles.rowEndContainer}}>
        <Tooltip
          popover={
            <Text style={{...GStyles.regularText}}>{itemData.package}</Text>
          }
          backgroundColor="#FFFFFFFF"
          overlayColor="#00000055">
          <Image
            source={Helper.getMembershipImage(itemData.package)}
            style={{...GStyles.image, width: 24}}
          />
        </Tooltip>

        <Avatar
          image={
            itemData.profile_photo
              ? {uri: itemData.profile_photo}
              : ic_default_avatar
          }
          size={96}
          status={itemData.status}
          borderWidth={2}
          containerStyle={{marginTop: -48}}
        />
        <Tooltip
          popover={
            <Text style={{...GStyles.regularText}}>{itemData.location}</Text>
          }
          backgroundColor="#FFFFFFFF"
          overlayColor="#00000055">
          {Helper.isValid(itemData.country_code) && (
            <Flag id={itemData.country_code} width={32} height={23} />
          )}
        </Tooltip>
      </View>
    );
  };

  _renderTitle = () => {
    const {itemData} = this.state;

    return (
      <View>
        <Text
          style={{
            ...GStyles.mediumText,
            fontSize: 20,
            textAlign: 'center',
            marginTop: 16,
          }}>
          {itemData.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...GStyles.regularText,
            lineHeight: 18,
            textAlign: 'center',
            marginTop: 8,
          }}>
          {itemData.description}
        </Text>
      </View>
    );
  };

  _renderPercents = () => {
    const {itemData} = this.state;

    return (
      <View style={{flexDirection: 'row', marginTop: 32}}>
        <View style={{flex: 1}}>
          <Text style={styles.percentText}>
            {itemData.job_complete_percent}%
          </Text>
          <Text style={styles.percentGrayText}>Jobs completed</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.percentText}>
            {itemData.job_on_time_percent}%
          </Text>
          <Text style={styles.percentGrayText}>On time</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.percentText}>
            {itemData.job_on_budget_percent}%
          </Text>
          <Text style={styles.percentGrayText}>On budget</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.percentText}>${itemData.total_earned}</Text>
          <Text style={styles.percentGrayText}>Earned</Text>
        </View>
      </View>
    );
  };

  _renderProfileTab = () => {
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={GStyle.snowColor}
        renderTabBar={() => <ScrollableTabBar />}>
        <CProfessionalProfileAboutScreen
          tabLabel="ABOUT"
          ref={this.summaryTabRef}
        />
        <CProfessionalsProfilePortfolioScreen
          tabLabel="PORTFOLIO"
          ref={this.portfolioTabRef}
        />
        <CProfessionalsProfileReviewsScreen
          tabLabel="REVIEWS"
          ref={this.reviewsTabRef}
        />
      </ScrollableTabView>
    );
  };

  _renderButton = () => {
    const {itemData} = this.state;
    let index = 0;
    const buttonDatas = [
      {key: index++, label: 'Request'},
      {key: index++, label: 'Send offer'},
    ];

    return (
      <View style={{alignItems: 'center', marginTop: 16, marginBottom: 40}}>
        <View style={{...GStyles.rowEndContainer, width: '88%'}}>
          <View>
            <Text
              style={{
                ...GStyles.mediumText,
                fontSize: 20,
                lineHeight: 24,
              }}>
              {itemData.hourly_rate}/hr
            </Text>
            <View style={{...GStyles.rowContainer}}>
              <Image
                source={ic_star}
                style={{
                  ...GStyles.image,
                  width: 16,
                  tintColor: '#FE9870',
                }}
              />
              <Text
                style={{
                  ...GStyles.regularText,
                  fontSize: 13,
                  marginTop: 8,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  {itemData.review_score}{' '}
                </Text>
                <Text style={{color: GStyle.grayColor}}>
                  ({itemData.review_count} reviews)
                </Text>
              </Text>
            </View>
          </View>
          <ModalSelector
            data={buttonDatas}
            initValue="Select one"
            optionTextStyle={{color: GStyle.fontColor}}
            cancelTextStyle={{color: GStyle.fontColor}}
            overlayStyle={{justifyContent: 'flex-end'}}
            accessible={true}
            onChange={this.onSubmit}>
            <View style={styles.buttonFill}>
              <Text style={styles.textFill}>Contact</Text>
            </View>
          </ModalSelector>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  percentText: {
    ...GStyles.mediumText,
    color: GStyle.activeColor,
    textAlign: 'center',
  },

  percentGrayText: {
    fontFamily: 'GothamPro',
    fontSize: 11,
    color: GStyle.grayColor,
    textAlign: 'center',
    marginTop: 4,
  },

  buttonFill: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 155,
    height: 50,
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CProfessionalsProfileScreen;
