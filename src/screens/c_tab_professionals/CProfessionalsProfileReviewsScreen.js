import React from 'react';
import {
  BackHandler,
  Button,
  Dimensions,
  FlatList,
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

import CircularProgress from '../../lib/Other/CircularProgress';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import Avatar from '../../components/elements/Avatar';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const image_search = require('../../assets/images/ic_search.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const ic_edit_1 = require('../../assets/images/ic_edit_1.png');
const ic_favorite_inactive_1 = require('../../assets/images/ic_favorite_inactive_1.png');

const Item = ({item, onPress}) => (
  <View style={{alignItems: 'center', marginTop: 24}}>
    <View style={{width: '88%'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar image={item.profile_photo} size={40} />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={GStyles.mediumText}>{item.full_name}</Text>
            <View style={{...GStyles.rowContainer}}>
              <Image
                source={ic_star}
                style={{
                  ...GStyles.image,
                  width: 16,
                  tintColor: '#FE9870',
                }}
              />
              <View
                style={{
                  ...GStyles.rowEndContainer,
                  flex: 1,
                  marginTop: 3,
                  marginLeft: 4,
                }}>
                <Text
                  style={{
                    ...GStyles.regularText,
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {item.review_score}
                </Text>
                <Text
                  style={{
                    ...GStyles.regularText,
                    fontSize: 13,
                    color: GStyle.grayColor,
                  }}>
                  {item.review_date}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          ...GStyles.regularText,
          fontSize: 13,
          lineHeight: 22,
          marginTop: 16,
        }}>
        {item.review_description}
      </Text>
      <View style={{...GStyles.rowEndContainer, marginTop: 16}}>
        <View style={{...GStyles.rowContainer}}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 13,
                color: GStyle.activeColor,
              }}>
              Reply
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 40}}>
            <Text
              style={{
                fontFamily: 'GothamPro',
                fontSize: 13,
                color: GStyle.grayColor,
              }}>
              Report
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={ic_favorite_inactive_1}
            style={{
              ...GStyles.image,
              width: 16,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

class CProfessionalsProfileReviewsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CProfessionalsProfileReviewsScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      itemData: {},
      itemDatas: [],
    };
  };

  onRefresh = () => {
    let params = {
      professional_id: global._freelancerId,
      page_number: '1',
      count_per_page: '10',
    };
    showPageLoader(true);
    RestAPI.get_reviews_by_professional(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({itemData: json.data});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onWriteReview = () => {
    this.context.navigate('c_find_write_review');
  };

  render() {
    return (
      <>
        <View style={{backgroundColor: 'white'}}>
          {this._renderPercent()}
          {this._renderReviewsHeader()}
          {this._renderReviews()}
        </View>
      </>
    );
  }

  _renderPercent = () => {
    const {itemData} = this.state

    const percentDatas = [
      {
        percent: itemData.job_complete_percent,
        text: 'Jobs completed',
        pgColor: '#FE9870',
        bgColor: '#FE98701A',
      },
      {
        percent: itemData.job_on_time_percent,
        text: 'On time',
        pgColor: '#53D0EC',
        bgColor: '#53D0EC1A',
      },
      {
        percent: itemData.job_on_budget_percent,
        text: 'On budget',
        pgColor: '#0EAD69',
        bgColor: '#0EAD691A',
      },
    ];

    return (
      <View style={{alignItems: 'center', marginTop: 32}}>
        <View
          style={{
            ...GStyles.rowEndContainer,
            ...GStyles.borderBottom,
            width: '88%',
          }}>
          {percentDatas.map((item, i) => {
            return (
              <View key={i} style={{alignItems: 'center'}}>
                <CircularProgress
                  size={84}
                  strokeWidth={5}
                  progressPercent={item.percent}
                  pgColor={item.pgColor}
                  bgColor={item.bgColor}
                  textColor={GStyle.fontColor}
                  textSize={20}
                />
                <Text style={{...GStyles.regularText, fontSize: 12}}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  _renderReviewsHeader = () => {
    const {itemData} = this.state;

    return (
      <View style={{alignItems: 'center', marginTop: 40}}>
        <View style={{...GStyles.rowEndContainer, width: '88%'}}>
          <View>
            <Text
              style={{
                ...GStyles.mediumText,
                fontSize: 20,
                lineHeight: 24,
              }}>
              Reviews
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
                  marginTop: 3,
                  marginLeft: 4,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  {itemData.average_review_score}{' '}
                </Text>
                <Text style={{color: GStyle.grayColor}}>
                  ({itemData.total_review_count} reviews)
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.onWriteReview}>
            <View style={styles.buttonFill}>
              <Image source={ic_edit_1} style={{...GStyles.image, width: 16}} />
              <Text style={{...styles.textFill, marginLeft: 8}}>
                Write a Review
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderReviews = () => {
    const {itemDatas} = this.state;

    return (
      <FlatList
        data={itemDatas}
        renderItem={this._renderItem}
        style={{height: '100%'}}
      />
    );
  };

  _renderItem = ({item}) => {
    return <Item item={item} onPress={this.onPressed} />;
  };
}

const styles = StyleSheet.create({
  buttonFill: {
    ...GStyles.rowCenterContainer,
    width: 137,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#EE7425',
    borderRadius: 8,
  },

  textFill: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

export default CProfessionalsProfileReviewsScreen;
