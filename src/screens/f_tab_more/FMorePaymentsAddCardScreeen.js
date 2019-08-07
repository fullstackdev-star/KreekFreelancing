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

import FloatLabelTextField from '../../components/elements/FloatLabelTextField';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';

const img_card = require('../../assets/images/img_card.png');

class FMorePaymentsAddCardScreeen extends React.Component {
  state = {
    birthday: '',
    textInputValue: '',

    value: '',
  };

  constructor(props) {
    super(props);

    console.log('FMorePaymentsAddCardScreeen start');

    this.state = {
      username: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSave = () => {
    this.props.navigation.goBack();
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Locations'},
      {key: index++, label: 'Germany'},
      {key: index++, label: 'Spain'},
      {key: index++, label: 'Turkey'},
      {key: index++, label: 'Japanese'},
    ];

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          <GHeaderBar
            headerTitle="Add New Credit Card"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, width: '90%'}}>
            <View style={{alignItems: 'center', marginTop: 32}}>
              <Image
                source={img_card}
                style={{width: 326, height: 200, resizeMode: 'contain'}}
              />
            </View>
            <View style={{marginTop: 40}}>
              <FloatLabelTextField
                autoCapitalize="none"
                placeholder={'Card Number'}
                value={''}
                onFocus={this.handleTextChange}
                onBlur={this.handleTextChange}
              />
            </View>
            <View style={{marginVertical: 40}}>
              <TouchableOpacity onPress={this.onSave}>
                <View style={GStyles.buttonFill}>
                  <Text style={GStyles.textFill}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default FMorePaymentsAddCardScreeen;
