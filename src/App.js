import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import ZMsg, {MsgTypes} from '../src/components/ZMsg/ZMsg';
import PageLoaderIndicator from '../src/components/PageLoaderIndicator';

function App() {
  const zMsgRef = React.useRef();

  const [msgTitle, setmsgTitle] = useState('KreekAfrica');
  const [msgtext, setmsgtext] = useState('');
  const [msgType, setMsgType] = useState(MsgTypes.success);
  const [showFullLoader, setShowFullLoader] = useState(false);
  const [isShowPageLoader, setIsShowPageLoader] = useState(false);

  global.success = (title, text) => {
    showMessage({
      message: title,
      description: text,
      type: 'success',
      icon: 'auto',
    });
  };
  global.warning = (title, text) => {
    showMessage({
      message: title,
      description: text,
      type: 'warning',
      icon: 'auto',
    });
  };

  global.error = (title, text) => {
    showMessage({
      message: title,
      description: text,
      type: 'error',
      icon: 'auto',
    });
  };

  global.failed = (title, text, type = MsgTypes.failed) => {
    console.log('failed > set null for both button actions');
    global.onTapOkMsgButton = null;
    global.onTapCancelMsgButton = null;
    if (zMsgRef.current) {
      setmsgTitle(title);
      setmsgtext(text);
      setMsgType(type);
      setShowFullLoader(false);
      zMsgRef.current.showMsg();
    }
  };

  global.alertOk = (title, text, onTapOk, type = MsgTypes.success) => {
    console.log('alertOk > set null for both button actions');
    global.onTapOkMsgButton = null;
    global.onTapCancelMsgButton = null;
    if (zMsgRef.current) {
      global.onTapOkMsgButton = onTapOk;
      setmsgTitle(title);
      setmsgtext(text);
      setMsgType(type);
      setShowFullLoader(false);

      zMsgRef.current.showMsg();
    }
  };

  global.confirm = (title, text, onTapOk, onTapCancel) => {
    console.log('Confirm > set null for both button actions');
    global.onTapOkMsgButton = null;
    global.onTapCancelMsgButton = null;
    if (zMsgRef.current) {
      console.log('confirm > set both buttons actions');
      global.onTapOkMsgButton = onTapOk;
      global.onTapCancelMsgButton = onTapCancel;

      setmsgTitle(title);
      setmsgtext(text);
      setMsgType(MsgTypes.confirm);
      setShowFullLoader(false);

      console.log(
        typeof global.onTapOkMsgButton,
        typeof global.onTapCancelMsgButton,
      );

      zMsgRef.current.showMsg();
    }
  };

  global.showPageLoader = (isShow) => {
    setIsShowPageLoader(isShow);
  };

  const onTapOkMsg = () => {
    if (global.onTapOkMsgButton) {
      console.log('Called onTapOkMsgButton');
      global.onTapOkMsgButton();
    } else {
      console.log('onTapOkMsgButtons is null');
    }
  };

  const onTapCancelMsg = () => {
    if (global.onTapCancelMsgButton) {
      console.log('Called onTapCancelMsgButton');
      global.onTapCancelMsgButton();
    } else {
      console.log('onTapCancelMsgButton is null');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <AppNavigator />
        <FlashMessage position="top" />
        <ZMsg
          ref={zMsgRef}
          isLoadingIndicator={showFullLoader}
          title={msgTitle}
          text={msgtext}
          type={msgType}
          onTapOkButton={() => {
            onTapOkMsg();
          }}
          onTapCancelButton={() => {
            onTapCancelMsg();
          }}
        />
        <PageLoaderIndicator isPageLoader={isShowPageLoader} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
