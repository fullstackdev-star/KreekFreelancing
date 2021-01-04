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

import {TextField} from '../../lib/MaterialTextField/index';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';
import ModalSelector from '../../lib/ModalSelector/index';

const img_card = require('../../assets/images/img_card.png');

class CMorePaymentsAddCardScreeen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CMorePaymentsAddCardScreeen start');

    this.cardRef = this.updateRef.bind(this, 'card');

    this.state = {
      username: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  updateRef(name, ref) {
    this[name] = ref;
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSave = () => {
    this.props.navigation.navigate('c_more_select_card')
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    let {errors = {}} = this.state;

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
            style={{...GStyles.elementContainer}}>
            <View style={{alignItems: 'center', marginTop: 32}}>
              <Image
                source={img_card}
                style={{width: 326, height: 200, resizeMode: 'contain'}}
              />
            </View>
            <View style={{marginTop: 40}}>
              <TextField
                ref={this.cardRef}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhoneNumber}
                returnKeyType="next"
                label="Phone Number"
                error={errors.phoneNumber}
                containerStyle={{marginTop: 8}}
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

export default CMorePaymentsAddCardScreeen;
