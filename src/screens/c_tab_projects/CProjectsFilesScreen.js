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
import FileItem from '../../components/elements/FileItem';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

import SectionHeader from '../../components/elements/SectionHeader';
import JobItem from '../../components/elements/JobItem';
import Avatar from '../../components/elements/Avatar';

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_mini_star = require('../../assets/images/ic_mini_star.png');
const ic_message = require('../../assets/images/ic_message.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const ic_file_sketch = require('../../assets/images/ic_file_sketch.png');

class CProjectsFilesScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('CProjectsFilesScreen start');

    this.state = {
      itemDatas: [
        {
          id: 'id1',
          type: 'sketch',
          name: 'IOtask web UI kit.sketch',
          date: '14 Aug 2019',
          percent: 78,
        },
        {
          id: 'id2',
          type: 'docx',
          name: 'User stories.docx',
          date: '14 Aug 2019',
          percent: 56,
        },
        {
          id: 'id3',
          type: 'xlsx',
          name: 'Budget estimates project.xlsx',
          date: '14 Aug 2019',
        },
        {
          id: 'id4',
          type: 'dir',
          name: 'Additional materials',
          date: '14 Aug 2019',
        },
        {
          id: 'id5',
          type: 'pptx',
          name: 'Presentation for Investors.pptx',
          date: '14 Aug 2019',
        },
        {
          id: 'id6',
          type: 'psd',
          name: 'Converted files.psd',
          date: '14 Aug 2019',
        },
        {
          id: 'id7',
          type: 'ai',
          name: 'Logo and branding book.ai',
          date: '14 Aug 2019',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onUpload = () => {
    this.context.navigate('c_projects_files_upload');
  };

  render() {
    const {itemDatas} = this.state;

    return (
      <>
        <View style={{...GStyles.container}}>
          {this._renderSection()}
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

  _renderSection = () => {
    return (
      <View style={{...GStyles.rowEndContainer, width: '88%', marginTop: 24}}>
        <Text style={{...GStyles.mediumText}}>Files</Text>
        <TouchableOpacity onPress={this.onUpload}>
          <Text style={{...GStyles.mediumText, fontSize: 13}}>+upload</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: '88%'}}>
          <View style={{marginTop: 24}}>
            <FileItem item={item} onPress={this.onDetail} />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default CProjectsFilesScreen;
