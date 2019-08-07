import React from 'react';
import {
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
import {FlatGrid} from 'react-native-super-grid';
import {NavigationContext} from '@react-navigation/native';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const img_portfolio1 = require('../../assets/images/img_portfolio1.png');
const img_portfolio2 = require('../../assets/images/img_portfolio2.png');
const img_portfolio3 = require('../../assets/images/img_portfolio3.png');
const img_portfolio4 = require('../../assets/images/img_portfolio4.png');
const img_portfolio5 = require('../../assets/images/img_portfolio5.png');
const img_portfolio6 = require('../../assets/images/img_portfolio6.png');
const img_portfolio7 = require('../../assets/images/img_portfolio7.png');
const img_portfolio8 = require('../../assets/images/img_portfolio8.png');

class CProfessionalsProfilePortfolioScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CProfessionalsProfilePortfolioScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      selectionIndex: 0,
      itemDatas: [],

      isScrollEnabled: false,
    };
  };

  onRefresh = () => {
    showPageLoader(true);
    let params = {
      professional_id: global._freelancerId,
    };
    RestAPI.get_portfolio_list_by_id(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({itemDatas: json.data.portfolio_list});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  setScrollEnable = () => {
    this.setState({isScrollEnabled: true});
  };

  onPress = (index) => {
    this.setState({selectionIndex: index});
    this.context.navigate('c_find_portfolio_details');
  };

  onScroll = (varTest) => {
    const current_offset = varTest.nativeEvent.contentOffset.y;
    if (current_offset < this.offset && current_offset < 10) {
      this.setState({isScrollEnabled: false});
    }
    this.offset = current_offset;
  };

  render() {
    return (
      <>
        <View style={{...GStyles.container}}>{this._renderCategory()}</View>
      </>
    );
  }

  _renderCategory = () => {
    const {itemDatas, isScrollEnabled} = this.state;

    return (
      <View style={{marginBottom: 613}}>
        <FlatGrid
          // scrollEnabled={isScrollEnabled}
          // onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          itemDimension={120}
          data={itemDatas}
          style={{flex: 1}}
          spacing={20}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.onPress(item.id);
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.13 / 1,
                    resizeMode: 'stretch',
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onWhat} style={{marginBottom: 650}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>What kind</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default CProfessionalsProfilePortfolioScreen;
