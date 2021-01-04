import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Toast from 'react-native-simple-toast';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

const ic_verify_active = require('../../assets/images/ic_verify_active.png');

const CELL_COUNT = 6;

const NFVerifyEmailScreen = ({navigation}) => {
  const [code, setCode] = useState(global.isDebug ? 'njrhu5' : '');

  onBack = () => {
    navigation.goBack();
  };

  onSendAgain = () => {
    showPageLoader(true);
    RestAPI.resend_email_verification((json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(
          Constants.errorTitle,
          'Failed to resend verify email, please try again.',
        );
        console.error(err);
        return;
      }

      if (json.status === 1) {
        Toast.show('Verification email is sent successfully.');
      } else {
        Alert.alert(
          Constants.errorTitle,
          'Failed to resend verify email, please try again.',
        );
      }
    });
  };

  onVerify = () => {
    showPageLoader(true);
    RestAPI.verify_email(code, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(
          Constants.errorTitle,
          'Failed to verify email, please try again.',
        );
        console.error(err);
        return;
      }

      if (json.status === 1) {
        navigation.navigate('fc_verify_email_success');
      } else {
        Alert.alert(
          Constants.errorTitle,
          'Failed to verify email, please try again.',
        );
      }
    });
  };

  _Title = () => {
    return (
      <>
        <Text style={GStyles.titleText}>Verify your email address</Text>
        <Text style={GStyles.titleDescription}>
          Please check your email for a six-digit security code and enter it
          below.
        </Text>
      </>
    );
  };

  _Input = () => {
    const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      code,
      setCode,
    });

    return (
      <View style={[GStyles.rowCenterContainer, {marginTop: 85}]}>
        <View style={{width: 272, height: 48}}>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={{marginBottom: 20}}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && {
                    borderColor: '#0EAD69',
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Image
            source={ic_verify_active}
            style={{width: 24, height: 24, resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
  };

  _SendAgain = () => {
    return (
      <View style={[GStyles.rowCenterContainer, {height: 30, marginTop: 25}]}>
        <Text style={[GStyles.regularText, {fontSize: 13, height: '100%'}]}>
          Didn`t get a code?
        </Text>
        <TouchableOpacity onPress={onSendAgain}>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              flex: 1,
              color: GStyle.linkColor,
              marginLeft: 5,
            }}>
            Send again
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _Button = () => {
    return (
      <View style={{marginVertical: 50}}>
        <TouchableOpacity onPress={onVerify}>
          <View style={GStyles.buttonFill}>
            <Text style={GStyles.textFill}>Verify</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={GStyles.statusBar} />
      <SafeAreaView style={GStyles.container}>
        <GHeaderBar headerTitle="" leftType="back" onPressLeftButton={onBack} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={GStyles.elementContainer}>
          <_Title />
          <_Input />
          <_SendAgain />
          <_Button />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 48,
    borderRadius: 8,
    lineHeight: 48,
    color: GStyle.fontColor,
    fontFamily: 'GothamPro-Medium',
    fontSize: 32,
    borderWidth: 1,
    borderColor: '#0EAD69AA',
    textAlign: 'center',
  },
});

export default NFVerifyEmailScreen;
