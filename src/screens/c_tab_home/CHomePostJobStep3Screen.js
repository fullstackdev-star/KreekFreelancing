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

import SwitchSelector from '../../lib/SwitchSelector/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_check_active = require('../../assets/images/ic_check_active.png');
const ic_check_inactive = require('../../assets/images/ic_check_inactive.png');

class CHomePostJobStep3Screen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomePostJobStep3Screen start');

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
    this.props.navigation.navigate('c_home_post_job_step4');
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
            {this._renderJobType()}
            {this._renderWhatKind()}
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
        <Text style={[GStyles.regularText, {marginTop: 12}]}>Step 3 of 4</Text>
        <Text style={GStyles.titleText}>How would you like to pay?</Text>
        <Text style={GStyles.titleDescription}>
          Let's skip the awkward money conversation, shall we? Professional know
          upfront what rate you're offering for this job.
        </Text>
      </>
    );
  };

  _renderJobType = () => {
    const sortByOptions = [
      {label: 'Fixed', value: '1'},
      {label: 'Hourly', value: '2'},
    ];

    return (
      <SwitchSelector
        options={sortByOptions}
        borderRadius={10}
        buttonColor={GStyle.activeColor}
        backgroundColor={GStyle.grayBackColor}
        textColor={GStyle.grayColor}
        initial={0}
        onPress={value => console.log(`Call onPress with value: ${value}`)}
        style={{marginTop: 40}}
      />
    );
  };

  _renderWhatKind = () => {
    return (
      <>
        <Text style={[GStyles.mediumText, {marginTop: 36}]}>
          Number of proposals
        </Text>
        <View style={{marginTop: 24}}>
          <RadioGroup
            normalMode={false}
            containerStyle={{height: 360, flexDirection: 'column'}}
            radioGroupList={[
              {
                label: 'GHC 10 - 30',
                value: 'ghc_10',
              },
              {
                label: 'GHC 30 - 250',
                value: 'ghc_30',
              },
              {
                label: 'GHC 250 - 750',
                value: 'ghc_250',
              },
              {
                label: 'GHC 750 - 1500',
                value: 'ghc_750',
              },
              {
                label: 'GHC 1500 - 3000',
                value: 'ghc_1500',
              },
              {
                label: 'GHC 3000 - 5000',
                value: 'ghc_3000',
              },
              {
                label: 'GHC 5000 - 10000',
                value: 'ghc_5000',
              },
              {
                label: 'GHC 10000 - 20000',
                value: 'ghc_10000',
              },
              {
                label: 'GHC 20000 - 50000',
                value: 'ghc_20000',
              },
              {
                label: 'GHC 50000 +',
                value: 'ghc_50000',
              },
            ]}
          />
        </View>
      </>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginVertical: 40}}>
        <TouchableOpacity onPress={this.onButton}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Job title and detail</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CHomePostJobStep3Screen;
