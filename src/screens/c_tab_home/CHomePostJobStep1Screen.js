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

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_category_development = require('../../assets/images/ic_category_development.png');
const ic_category_design = require('../../assets/images/ic_category_design.png');
const ic_category_business = require('../../assets/images/ic_category_business.png');
const ic_category_sales = require('../../assets/images/ic_category_sales.png');
const ic_category_tutoring = require('../../assets/images/ic_category_tutoring.png');
const ic_category_care = require('../../assets/images/ic_category_care.png');

class CHomePostJobStep1Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomePostJobStep1Screen start');

    this.state = {
      selectionIndex: 0,
      items: [
        {id: 0, image: ic_category_development, title: 'IT & Development'},
        {id: 1, image: ic_category_design, title: 'Design & Multimedia'},
        {id: 2, image: ic_category_business, title: 'Business & Finance'},
        {id: 3, image: ic_category_sales, title: 'Sales & Marketing'},
        {id: 4, image: ic_category_tutoring, title: 'Tutoring'},
        {id: 5, image: ic_category_care, title: 'Senior Care'},
      ],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSave = () => {
    console.log('---');
  };

  onPress = index => {
    this.setState({selectionIndex: index});
  };

  onWhat = () => {
    this.props.navigation.navigate('c_home_post_job_step2')
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <View style={{width: '88%'}}>{this._renderTitle()}</View>
          {this._renderCategory()}
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Post job"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="save"
        onPressRightButton={this.onSave}
      />
    );
  };

  _renderTitle = () => {
    return (
      <>
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 1 of 4</Text>
        <Text style={GStyles.titleText}>What do you need help with?</Text>
      </>
    );
  };

  _renderCategory = () => {
    let {selectionIndex, items} = this.state;

    return (
      <FlatGrid
        itemDimension={120}
        data={items}
        style={{flex: 1}}
        spacing={40}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              this.onPress(item.id);
            }}
            style={{alignItems: 'center'}}>
            <View
              style={[
                GStyles.centerAlign,
                {
                  width: 120,
                  height: 120,
                  borderRadius: 40,
                  backgroundColor:
                    selectionIndex == item.id
                      ? GStyle.activeColor
                      : GStyle.grayBackColor,
                },
              ]}>
              <Image
                source={item.image}
                style={[
                  GStyles.image,
                  {
                    width: 59,
                    tintColor:
                      selectionIndex == item.id ? 'white' : GStyle.grayColor,
                  },
                ]}
              />
            </View>
            <Text
              style={{
                fontFamily: 'GothamPro-Medium',
                fontSize: 13,
                color:
                  selectionIndex == item.id
                    ? GStyle.activeColor
                    : GStyle.grayColor,
                marginTop: 15,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity onPress={this.onWhat} style={{marginBottom: 40}}>
        <View style={GStyles.buttonFill}>
          <Text style={GStyles.textFill}>What kind</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});

export default CHomePostJobStep1Screen;
