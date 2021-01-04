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
import GHeaderBar from '../../components/GHeaderBar';

const ic_favorite = require('../../assets/images/ic_favorite.png');

class CHomeNoFavoritesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomeNoFavoritesScreen start');
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onFind = () => {
    Alert.alert('Find Professionals is clicked.');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <View style={[GStyles.centerAlign, {width: '100%', height: '100%'}]}>
            <Image
              source={ic_favorite}
              style={{width: 160, height: 160, resizeMode: 'contain'}}
            />
            <Text style={GStyles.notifyTitle}>
              You don't save professionals yet!
            </Text>
            <Text style={GStyles.notifyDescription}>
              Browse the list and save the best {'\n'}professionals.
            </Text>
            <View style={{marginTop: 25}}>
              <TouchableOpacity onPress={this.onFind}>
                <View style={styles.buttonFill}>
                  <Text style={styles.textFill}>Find Professionals</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="My Favorites"
        leftType="back"
        onPressLeftButton={this.onBack}
        rightType="filter"
        onPressRightButton={this.onFilter}
      />
    );
  };
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

export default CHomeNoFavoritesScreen;
