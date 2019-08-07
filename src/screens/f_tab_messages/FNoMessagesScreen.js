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
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_no_message = require('../../assets/images/ic_no_message.png');

class FNoMessagesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FNoMessagesScreen start');

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.container}>
          <View style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
            <Image
              source={ic_no_message}
              style={{width: 160, height: 157, resizeMode: 'contain'}}
            />
            <Text style={GStyles.notifyTitle}>No messages yet.</Text>
            <Text style={GStyles.notifyDescription}>
              Eager to work? Be sure to express interest in jobs, {'\n'}
              improve your profile and add some portfolio
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default FNoMessagesScreen;
