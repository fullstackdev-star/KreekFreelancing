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

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import SectionHeader from '../../components/elements/SectionHeader';
import JobItem from '../../components/elements/JobItem';

class NFApplicationsListScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('NFApplicationsListScreen start');

    this.state = {
      ongoingCount: 2,
      canceledCount: 56,
      completedCount: 12,
      itemDatas: [
        {
          id: 'id1',
          type: 'fixed',
          title: 'Need an architectural design of a 4 story building',
          post_date: 'posted 2 hours ago',
          bidder_count: '',
          bidder_name: '',
          location: '',
          location_distance: '',
          start_date: '',
          expire_date: 'Expires in 6 days',
          bid_count: '11 bids',
          budget: 'Budget: GHC5000 - GHC10,000',
          tags: ['Remote', 'Featured'],
        },
        {
          id: 'id2',
          type: 'fixed',
          title: 'Logo design and Brand/Corporate Identity',
          post_date: 'posted May 5,2020',
          bidder_count: '',
          bidder_name: '',
          location: '',
          location_distance: '',
          start_date: '',
          expire_date: 'Expires in 3 days',
          bid_count: '11 bids',
          budget: 'Budget: GHC5000 - GHC10,000',
          tags: ['Remote', 'Urgent'],
        },
        {
          id: 'id3',
          type: 'hourly',
          title: 'I need a babysitter for a few hours',
          post_date: 'posted 6 hours ago',
          bidder_count: '2 children',
          bidder_name: 'Toddler, nursury',
          location: 'Dansoman, Accra',
          location_distance: '2miles',
          start_date: 'Start: Mon, June 7, 20',
          expire_date: 'Expires in 12days',
          bid_count: '15 bids',
          budget: 'Budget: GHC30 - GHC50/hr',
          tags: ['Onsite', 'Remote', 'Featured'],
        },
        {
          id: 'id4',
          type: 'hourly',
          title: 'I need a babysitter for a few hours',
          post_date: 'posted 6 hours ago',
          bidder_count: '2 children',
          bidder_name: 'Toddler, nursury',
          location: 'Dansoman, Accra',
          location_distance: '2miles',
          start_date: 'Start: Mon, June 7, 20',
          expire_date: 'Expires in 12days',
          bid_count: '15 bids',
          budget: 'Budget: GHC30 - GHC50/hr',
          tags: ['Onsite', 'Remote', 'Featured'],
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onLogo = () => {
    console.log('---');
  };

  onDetail = () => {
    console.log('---')
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderOngoing()}
            {this._renderCanceled()}
            {this._renderCompleted()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Jobs"
        leftType="logo"
        onPressLeftButton={this.onLogo}
      />
    );
  };

  _renderOngoing = () => {
    const {ongoingCount, itemDatas} = this.state;

    return (
      <>
        <SectionHeader
          title={'Ongoing'}
          count={ongoingCount}
          onPress={this.onDetail}
        />
        <JobItem item={itemDatas[0]} onPress={this.onDetail} />
        <JobItem item={itemDatas[1]} onPress={this.onDetail} />
      </>
    );
  };

  _renderCanceled = () => {
    const {canceledCount, itemDatas} = this.state;

    return (
      <>
        <SectionHeader
          title={'Canceled'}
          count={canceledCount}
          onPress={this.onDetail}
        />
        <JobItem item={itemDatas[2]} onPress={this.onDetail} />
      </>
    );
  };

  _renderCompleted = () => {
    const {completedCount, itemDatas} = this.state;

    return (
      <>
        <SectionHeader
          title={'Completed'}
          count={completedCount}
          onPress={this.onDetail}
        />
        <JobItem item={itemDatas[3]} onPress={this.onDetail} />
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default NFApplicationsListScreen;
