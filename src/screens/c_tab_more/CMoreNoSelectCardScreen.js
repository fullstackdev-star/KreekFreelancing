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

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_card = require('../../assets/images/ic_card.png');

class CMoreNoSelectCardScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CMoreNoSelectCardScreen start');

    this.state = {
      isVisible: true,
      isReady: false,
      showIndicator: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onAddCard = () => {
    this.props.navigation.navigate('c_more_payments_add_card')
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <View style={GStyles.centerContainer}>
            {this._renderImage()}
            {this._renderMessage()}
            {this._renderButton()}
          </View>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Select Card"
        leftType="back"
        onPressLeftButton={this.onBack}
      />
    );
  };

  _renderImage = () => {
    return <Image source={ic_card} style={{...GStyles.image, width: 160}} />;
  };

  _renderMessage = () => {
    return (
      <>
        <Text style={{...GStyles.notifyTitle}}>No card attached yet!</Text>
        <Text style={{...GStyles.notifyDescription, width: '80%'}}>
          Please, attach your card to pay for your job. Thanks!
        </Text>
      </>
    );
  };

  _renderButton = () => {
    return (
      <View style={{marginTop: 40}}>
        <TouchableOpacity onPress={this.onAddCard}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Add New Credit Card</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 240,
    height: 50,
  },

  textFill: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default CMoreNoSelectCardScreen;
