import React from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {TextField} from '../../lib/MaterialTextField/index';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';

class FMoreInviteFriendScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FMoreInviteFriendScreen start');

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFullName = this.onSubmitFullName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);

    this.fullNameRef = this.updateRef.bind(this, 'fullName');
    this.emailRef = this.updateRef.bind(this, 'email');

    this.state = {
      isVisible: true,
      isReady: false,
      showIndicator: false,

      email: '',
      password: '',
      phone_number: '',
      username: '',
      showPassword: false,
      accep_terms: false,
      selectedAddress: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['fullName', 'email']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitFullName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.email.blur();
  }

  onSubmit() {
    let errors = {};

    ['fullName', 'email'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onGet = () => {
    this.props.navigation.navigate('f_more_invite_friend');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          <GHeaderBar
            headerTitle=""
            leftType="back"
            onPressLeftButton={this.onBack}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            <Text style={GStyles.titleText}>Get C10 for you</Text>

            {this._renderInputs()}

            <View style={{marginVertical: 40}}>
              <TouchableOpacity onPress={this.onGet}>
                <View style={GStyles.buttonFill}>
                  <Text style={GStyles.textFill}>Get $10 credit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderInputs = () => {
    let {errors = {}} = this.state;

    return (
      <>
        <TextField
          ref={this.fullNameRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitFullName}
          returnKeyType="next"
          label="Full Name"
          error={errors.fullName}
          containerStyle={{marginTop: 24}}
        />
        <TextField
          ref={this.emailRef}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEmail}
          returnKeyType="next"
          label="Email"
          error={errors.email}
        />
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default FMoreInviteFriendScreen;
