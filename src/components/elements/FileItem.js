import React, {Component, isValidElement} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
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
  TouchableOpacity,
  View,
} from 'react-native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import CheckBox from '../../lib/Checkbox/index';
import Avatar from './Avatar';
import Flag from '../../lib/SvgFlagkit/Flag';
import ReadMore from '../../lib/ReadMore/index';
import ProgressBar from '../../lib/Progress/Bar';

const ic_mini_money = require('../../assets/images/ic_mini_money.png');
const ic_favorite_active = require('../../assets/images/ic_favorite_active_1.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive_1.png');
const ic_mini_location = require('../../assets/images/ic_mini_location_1.png');

const ic_radio_active = require('../../assets/images/ic_radio_active.png');
const ic_mini_star = require('../../assets/images/ic_mini_star.png');
const ic_message = require('../../assets/images/ic_message.png');
const img_avatar1 = require('../../assets/images/img_avatar1.png');
const img_avatar2 = require('../../assets/images/img_avatar2.png');
const ic_file_download = require('../../assets/images/ic_file_download.png');
const ic_file_cancel = require('../../assets/images/ic_file_cancel.png');
const ic_file_sketch = require('../../assets/images/ic_file_sketch.png');
const ic_file_docx = require('../../assets/images/ic_file_docx.png');
const ic_file_xlsx = require('../../assets/images/ic_file_xlsx.png');
const ic_file_dir = require('../../assets/images/ic_file_dir.png');
const ic_file_pptx = require('../../assets/images/ic_file_pptx.png');
const ic_file_psd = require('../../assets/images/ic_file_psd.png');
const ic_file_ai = require('../../assets/images/ic_file_ai.png');

const itemIcon = {
  sketch: ic_file_sketch,
  docx: ic_file_docx,
  xlsx: ic_file_xlsx,
  dir: ic_file_dir,
  pptx: ic_file_pptx,
  psd: ic_file_psd,
  ai: ic_file_ai,
};

const FileItem = ({item}) => {
  return (
    <View
      style={{
        ...GStyles.rowEndContainer,
        ...GStyles.borderBottom,
        paddingBottom: 12,
      }}>
      <View style={{...GStyles.rowContainer}}>
        <Image
          source={itemIcon[item.type]}
          style={{width: 34, height: 40, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 14}}>
          <Text style={{...GStyles.regularText, fontSize: 14}}>
            {item.name}
          </Text>
          {item.percent < 1 && (
            <Text
              style={{...GStyles.regularText, fontSize: 12, marginTop: 6}}>
              {item.date}
            </Text>
          )}
          {item.percent > 0 && (
            <ProgressBar
              progress={item.percent * 0.01}
              width={200}
              height={4}
              color={'#FFAB2B'}
              borderColor={'white'}
              style={{marginTop: 6}}
            />
          )}
        </View>
      </View>
      <TouchableOpacity>
        <Image
          source={item.percent > 0 ? ic_file_cancel : ic_file_download}
          style={{...GStyles.image, width: item.percent > 0 ? 16 : 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FileItem;
