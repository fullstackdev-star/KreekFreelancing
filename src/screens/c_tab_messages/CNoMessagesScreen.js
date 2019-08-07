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
import GHeaderBar from '../../components/GHeaderBar';

const ic_no_message = require('../../assets/images/ic_no_message.png');

class CNoMessagesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CNoMessagesScreen start');

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <View
            style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
            <Image
              source={ic_no_message}
              style={{width: 160, height: 157, resizeMode: 'contain'}}
            />
            <Text style={GStyles.notifyTitle}>No messages yet!</Text>
            <Text style={GStyles.notifyDescription}>
              Search for professionals now to send messages or {'\n'}book
              jobs. Or post a job to find out who's {'\n'}interested in your
              job.
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Messages"
        leftType="logo"
        onPressLeftButton={this.onBack}
      />
    );
  };
}

const styles = StyleSheet.create({});

export default CNoMessagesScreen;
