import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Alert,
} from 'react-native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_job = require('../../assets/images/ic_job.png');

class FNoProposalsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FNoProposalsScreen start');
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onFind = () => {
    Alert.alert('Find Jobs is clicked.');
  }
  
  render() {
    return (
      <SafeAreaView>
        <View style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
          <Image
            source={ic_job}
            style={{width: 160, height: 160, resizeMode: 'contain'}}
          />
          <Text style={GStyles.notifyTitle}>No proposals yet!</Text>
          <Text style={GStyles.notifyDescription}>
            You haven't applied to any job yet.{'\n'}Try searching for job.
          </Text>
          <View style={{marginTop: 25}}>
            <TouchableOpacity
              onPress={this.onFind}>
              <View style={styles.buttonFill}>
                <Text style={styles.textFill}>Find Jobs</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 200,
    height: 50,
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FNoProposalsScreen;
