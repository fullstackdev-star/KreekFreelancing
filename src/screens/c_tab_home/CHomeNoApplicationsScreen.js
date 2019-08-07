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

const ic_email = require('../../assets/images/ic_email.png');

class CHomeNoApplicationsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomeNoApplicationsScreen start');

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.container}>
          <View
            style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
            <Image
              source={ic_email}
              style={{width: 160, height: 157, resizeMode: 'contain'}}
            />
            <Text style={GStyles.notifyTitle}>No applications yet!</Text>
            <Text style={GStyles.notifyDescription}>
              Your full list of notifications live here.
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default CHomeNoApplicationsScreen;
