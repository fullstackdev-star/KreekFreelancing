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

import GHeaderBar from '../../components/GHeaderBar';
import Swiper from '../../lib/Swiper/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import {JobItemProperty} from '../../components/elements/JobItem';
const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');
const ic_mini_left_direction = require('../../assets/images/ic_mini_left_direction.png');
const ic_mini_right_direction = require('../../assets/images/ic_mini_right_direction.png');

const img_portfolio1 = require('../../assets/images/img_portfolio1.png');
const img_portfolio2 = require('../../assets/images/img_portfolio2.png');
const img_portfolio3 = require('../../assets/images/img_portfolio3.png');
const img_portfolio4 = require('../../assets/images/img_portfolio4.png');
const img_portfolio5 = require('../../assets/images/img_portfolio5.png');
const img_portfolio6 = require('../../assets/images/img_portfolio6.png');
const img_portfolio7 = require('../../assets/images/img_portfolio7.png');
const img_portfolio8 = require('../../assets/images/img_portfolio8.png');

class CFindPortfolioDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CFindPortfolioDetailsScreen start');

    this.state = {portfolioIndex: 0};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onClose = () => {
    this.props.navigation.goBack()
  };

  onNext = () => {
    console.log('---');
  };

  onMiniPress = i => {
    this.setState({portfolioIndex: i});
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
            {this._renderImages()}
            {this._renderAbout()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Portfolio"
        leftType="close"
        onPressLeftButton={this.onClose}
        rightType="next"
        onPressRightButton={this.onNext}
      />
    );
  };

  _renderTitle = () => {
    return <Text style={GStyles.titleText}>Brand Identity for Rapiwallet</Text>;
  };

  _renderImages = () => {
    const {portfolioIndex} = this.state;
    const imageDatas = [
      {id: 'id1', image: img_portfolio1},
      {id: 'id2', image: img_portfolio2},
      {id: 'id3', image: img_portfolio3},
      {id: 'id4', image: img_portfolio4},
      {id: 'id5', image: img_portfolio5},
    ];
    return (
      <View style={{marginTop: 24}}>
        <Swiper
          index={portfolioIndex}
          loop={false}
          style={{height: 174}}
          showsButtons
          prevButton={
            <Image
              source={ic_mini_left_direction}
              style={{width: 7, height: 16, resizeMode: 'contain'}}
            />
          }
          nextButton={
            <Image
              source={ic_mini_right_direction}
              style={{width: 7, height: 16, resizeMode: 'contain'}}
            />
          }
          renderPagination={() => {}}>
          {imageDatas.map((item, i) => {
            return (
              <View key={i} testID={item.id}>
                <Image
                  source={item.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
            );
          })}
        </Swiper>
        <View style={{...GStyles.rowEndContainer, marginTop: 8}}>
          {imageDatas.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  this.onMiniPress(i);
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  _renderAbout = () => {
    return (
      <View>
        <Text style={{...GStyles.mediumText, fontSize: 20, marginTop: 24}}>
          About the project
        </Text>
        {this._renderInfo('Name:', 'Rapiwallet Branding')}
        {this._renderInfo('Client:', 'Africient Group')}
        {this._renderInfo('Duration:', 'One Month')}
        {this._renderInfo('Budget:', 'GHC 1000 - 2000')}
        {this._renderInfo('Software used:', 'Illustrator, Photoshop')}
      </View>
    );
  };

  _renderInfo = (name, value) => {
    return (
      <View style={[GStyles.rowEndContainer, {marginTop: 16}]}>
        <View style={GStyles.rowContainer}>
          <Image
            source={ic_mini_dot}
            style={[GStyles.image, {width: 4, tintColor: GStyle.fontColor}]}
          />
          <Text style={[GStyles.regularText, {marginLeft: 10}]}>{name}</Text>
        </View>
        <Text style={GStyles.regularText}>{value}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CFindPortfolioDetailsScreen;
