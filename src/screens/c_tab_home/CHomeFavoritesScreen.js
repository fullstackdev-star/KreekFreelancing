import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import UserItem from '../../components/elements/UserItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class CHomeFavoritesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CHomeFavoritesScreen start');

    this.state = {
      current_count: 2,
      past_count: 56,
      favoriteDatas: [
        {
          id: 'id1',
          avatar: img_avatar1,
          status: 'online',
          name: 'Edith Johnson',
          category: 'UI/UX Designer',
          location: 'Accra, Ghana',
          star: '4.85',
          reviewCount: '215',
          hourlyRate: 'C20',
          membership: 'Basic',
        },
        {
          id: 'id2',
          avatar: img_avatar2,
          status: 'online',
          name: 'Matt Chioma',
          category: 'Mobile Developer',
          location: 'Nairobi, Kenya',
          star: '4.85',
          reviewCount: '215',
          hourlyRate: 'C20',
          membership: 'Business',
        },
        {
          id: 'id3',
          avatar: img_avatar3,
          status: 'online',
          name: 'Edith Johnson',
          category: 'UI/UX Designer',
          location: 'Nairobi, Kenya',
          star: '4.85',
          reviewCount: '215',
          hourlyRate: 'C20',
          membership: 'Professional',
        },
        {
          id: 'id4',
          avatar: img_avatar4,
          status: 'online',
          name: 'Christine McLaughlin',
          category: 'Web Developer',
          location: 'Nairobi, Kenya',
          star: '4.85',
          reviewCount: '215',
          hourlyRate: 'C20',
          membership: 'Executive',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onFilter = () => {
    console.log('---')
  };

  handleTextChange = newText => this.setState({value: newText});

  onDetail = () => {
    console.log('---');
  };

  render() {
    const {favoriteDatas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={styles.container}>
          {this._renderHeader()}
          <FlatList data={favoriteDatas} renderItem={this._renderItem} />
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

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <UserItem item={item} onPress={this.onDetail} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CHomeFavoritesScreen;
