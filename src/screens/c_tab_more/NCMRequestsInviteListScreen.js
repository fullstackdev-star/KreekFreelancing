import React from 'react';
import {
  BackHandler,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import SectionHeader from '../../components/elements/SectionHeader';
import UserItem from '../../components/elements/UserItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class CMRequestsInviteListScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CMRequestsInviteListScreen start');

    this.state = {
      currentCount: 2,
      pastCount: 56,
      itemDatas: [
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
          type: 'Unconfirmed',
          leftTime: '19 hours left',
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
          type: 'Completed',
          leftTime: '',
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
          type: 'Completed',
          leftTime: '',
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
          type: 'Unconfirmed',
          leftTime: '',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onBack = () => {
    const navigation = this.context;
    navigation.goBack();
  };

  onDetail = () => {
    console.log('---');
  };

  onDetailTest = () => {
    console.log('---');
  };

  onSeeAll = () => {
    console.log('---');
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    const {pastCount, itemDatas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{...GStyles.elementContainer}}>
            {this._renderCurrentTitle()}
            {this._renderCurrentList()}
            {this._renderPastTitle()}
            {this._renderPastList()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderCurrentTitle = () => {
    const {currentCount} = this.state;

    return <SectionHeader title={'Current'} count={currentCount} />;
  };

  _renderCurrentList = () => {
    const {itemDatas} = this.state;

    return (
      <>
        <UserItem item={itemDatas[0]} onPress={this.onDetail} />
        <UserItem item={itemDatas[1]} onPress={this.onDetailTest} />
      </>
    );
  };

  _renderPastTitle = () => {
    const {pastCount} = this.state;

    return (
      <SectionHeader title={'Past'} count={pastCount} onPress={this.onSeeAll} />
    );
  };

  _renderPastList = () => {
    const {itemDatas} = this.state;

    return <UserItem item={itemDatas[2]} onPress={this.onDetail} />;
  };
}

const styles = StyleSheet.create({});

export default CMRequestsInviteListScreen;
