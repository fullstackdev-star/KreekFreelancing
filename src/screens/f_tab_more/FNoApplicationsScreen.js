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

import GHeaderBar from '../../components/GHeaderBar';

const image_job = require('../../assets/images/ic_job.png');

class FNoApplicationsScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FNoApplicationsScreen start');
  }

  componentWillUnmount() {}

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={image_job}
            style={{width: 160, height: 160, resizeMode: 'contain'}}
          />
          <Text style={GStyles.notifyTitle}>No applications yet!</Text>
          <Text style={GStyles.notifyDescription}>
            Your full list of notifications live here. {'\n'}Try searching for
            job.
          </Text>
          <View style={{marginTop: 25}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Find Jobs is clicked.');
              }}>
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

export default FNoApplicationsScreen;
