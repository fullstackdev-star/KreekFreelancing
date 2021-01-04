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
import {TextInput} from 'react-native-gesture-handler';

const image_email = require('../../assets/images/ic_email.png');

class FNoInterviewsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FNoInterviewsScreen start');

    this.state = {
      isVisible: true,
      isReady: false,
      showIndicator: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onGoBack = () => {
    this.props.navigation.navigate('fc_signin');
  };

  render() {
    return (
      <SafeAreaView style={GStyles.centerContainer}>
        <Image
          source={image_email}
          style={{width: 160, height: 160, resizeMode: 'contain'}}
        />
        <Text style={[GStyles.notifyTitle, {marginTop: 55}]}>
          No interview request yet!
        </Text>
        <Text style={GStyles.notifyDescription}>
          You haven't accepted an interview with {'\n'}a client.
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default FNoInterviewsScreen;
