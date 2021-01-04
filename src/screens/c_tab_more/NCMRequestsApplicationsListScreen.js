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
import UserMoreItem from '../../components/elements/UserMoreItem';

const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const img_avatar3 = require('../../assets/images/img_avatar3.png');
const img_avatar4 = require('../../assets/images/img_avatar4.png');
const img_avatar5 = require('../../assets/images/img_avatar5.png');

class NCMRequestsApplicationsListScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('NCMRequestsApplicationsListScreen start');

    this.state = {
      designCount: 2,
      itemDatas: [
        {
          id: 'id1',
          avatar: img_avatar1,
          name: 'Marian Ramsey',
          reviewScore: '4.0',
          hourlyRate: 'GHC20',
          description:
            'I am a design expert with vast experience in brand evelopment',
        },
        {
          id: 'id2',
          avatar: img_avatar2,
          name: 'Joyce Mann',
          reviewScore: '4.0',
          hourlyRate: 'GHC20',
          description:
            'I am a design expert with vast experience in brand evelopment',
        },
        {
          id: 'id3',
          avatar: img_avatar3,
          name: 'Marian Ramsey',
          reviewScore: '4.0',
          hourlyRate: 'GHC20',
          description:
            'I am a design expert with vast experience in brand evelopment',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onDetail = () => {
    console.log('---');
  };

  onSeeAll = () => {
    console.log('---');
  };

  handleTextChange = (newText) => this.setState({value: newText});

  render() {
    const {pastCount, itemDatas} = this.state;

    return (
      <>
        <SafeAreaView style={GStyles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{...GStyles.elementContainer}}>
            {this._renderDesignTitle()}
            {this._renderDesignList()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderDesignTitle = () => {
    const {designCount} = this.state;

    return <SectionHeader title={'Design brand Logo'} count={designCount} />;
  };

  _renderDesignList = () => {
    const {itemDatas} = this.state;

    return (
      <>
        <UserMoreItem item={itemDatas[0]} onPress={this.onDetail} />
        <UserMoreItem item={itemDatas[1]} onPress={this.onDetail} />
        <UserMoreItem item={itemDatas[2]} onPress={this.onDetail} />
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

    return <UserMoreItem item={itemDatas[2]} onPress={this.onDetail} />;
  };
}

const styles = StyleSheet.create({});

export default NCMRequestsApplicationsListScreen;
