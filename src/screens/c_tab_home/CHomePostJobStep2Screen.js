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

import CheckBox from '../../lib/Checkbox/index';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');

class CHomePostJobStep2Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomePostJobStep2Screen start');

    this.state = {
      kindDatas: [
        'New website',
        'Website rebuilt',
        'Mobile app',
        'Website fixes',
        'Software',
        'Web application',
        'Website upgrade',
        'Application scaling',
        'Other or not sure',
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSave = () => {
    console.log('---');
  };

  onButton = () => {
    this.props.navigation.navigate('c_home_post_job_step3');
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
            {this._renderOptions()}
            {this._renderButton()}
          </KeyboardAwareScrollView>
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
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 2 of 4</Text>
        <Text style={GStyles.titleText}>What kind?</Text>
      </>
    );
  };

  _renderOptions = () => {
    const {kindDatas} = this.state;

    return (
      <View style={{marginTop: 32}}>
        {kindDatas.map((item, i) => {
          return (
            <CheckBox
              key={i}
              labelBefore={true}
              label={item}
              checkedImage={ic_check_active}
              uncheckedImage={ic_check_inactive}
              containerStyle={{
                width: '100%',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}
              checkboxStyle={{width: 20, height: 20}}
              labelStyle={[GStyles.regularText, {marginLeft: 0}]}
            />
          );
        })}
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 40}}>
        <TouchableOpacity onPress={this.onButton}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>How would you like to pay</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CHomePostJobStep2Screen;
