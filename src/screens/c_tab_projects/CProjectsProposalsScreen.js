import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LayoutAnimation,
  Linking,
  ListView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import GHeaderBar from '../../components/GHeaderBar';
import ProposalItem from '../../components/elements/ProposalItem';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import SectionHeader from '../../components/elements/SectionHeader';
import JobItem from '../../components/elements/JobItem';
import Avatar from '../../components/elements/Avatar';

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_mini_star = require('../../assets/images/ic_mini_star.png');
const ic_message = require('../../assets/images/ic_message.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');

class CProjectsProposalsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CProjectsProposalsScreen start');

    this.state = {
      itemDatas: [
        {
          id: 'id1',
          avatar: img_avatar1,
          status: 'online',
          name: 'Kelvin Heart',
          price: '$500',
          period: '7days',
          reviewScore: '4.85',
          reviewCount: '215',
          totalEarned: '$20K',
          completionPercent: '98%',
          content:
            'Dear Hiring Manager. \nFor a great Graphic Designer that can help with our website. We need someone that can work with nice images that will be shared with others',
        },
        {
          id: 'id2',
          avatar: img_avatar1,
          status: 'online',
          name: 'Kelvin Heart',
          price: '$500',
          period: '7days',
          reviewScore: '4.85',
          reviewCount: '215',
          totalEarned: '$20K',
          completionPercent: '98%',
          content:
            'Dear Hiring Manager. \nFor a great Graphic Designer that can help with our website. We need someone that can work with nice images that will be shared with others',
        },
        {
          id: 'id3',
          avatar: img_avatar1,
          status: 'online',
          name: 'Kelvin Heart',
          price: '$500',
          period: '7days',
          reviewScore: '4.85',
          reviewCount: '215',
          totalEarned: '$20K',
          completionPercent: '98%',
          content:
            'Dear Hiring Manager. \nFor a great Graphic Designer that can help with our website. We need someone that can work with nice images that will be shared with others',
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
    const navigation = this.context;
    navigation.navigate('c_projects_details_tab');
  };

  handleTextChange = newText => this.setState({value: newText});

  render() {
    const {itemDatas} = this.state;

    return (
      <>
        <View style={{...GStyles.container}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={itemDatas}
            renderItem={this._renderItem}
            style={{width: '100%'}}
          />
        </View>
      </>
    );
  }

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <Text style={{...GStyles.mediumText, marginTop: 18}}>
            Hired Freelancers
          </Text>
          <View style={{marginTop: 24}}>
            <ProposalItem item={item} onPress={this.onDetail} />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CProjectsProposalsScreen;
