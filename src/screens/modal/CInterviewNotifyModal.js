import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import Avatar from '../../components/elements/Avatar';

const img_avatar1 = require('../../assets/images/img_avatar1.png');

export default class CInterviewNotifyModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onPressCancel: PropTypes.func,
  };

  state = {
    start: '',
    end: '',
  };

  onOK = () => {
    this.props.onPressCancel();
  }
  
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          console.log('---');
        }}>
        <View style={{flex: 1, backgroundColor: GStyle.modalBackColor}}>
          <View style={[GStyles.centerAlign, {flex: 1}]}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                {this._renderAvatar()}
                {this._renderTitle()}
                {this._renderDescription()}
              </View>
              {this._renderButton()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  _renderAvatar = () => {
    return <Avatar image={img_avatar1} size={80} status={'online'} />;
  };

  _renderTitle = () => {
    return (
      <Text
        style={[
          GStyles.regularText,
          {
            width: '90%',
            lineHeight: 24,
            textAlign: 'center',
            marginTop: 32,
          },
        ]}>
        <Text style={GStyles.mediumText}>Edith Johnson</Text> accepted your
        interview request.
      </Text>
    );
  };

  _renderDescription = () => {
    return (
      <Text
        style={[
          GStyles.regularText,
          {
            width: '80%',
            color: GStyle.grayColor,
            lineHeight: 18,
            marginTop: 48,
            textAlign:'center'
          },
        ]}>
        Send a message
      </Text>
    );
  };

  _renderButton = () => {
    return (
      <TouchableOpacity
        style={[GStyles.centerAlign, {height: 30, marginTop: 32}]}
        onPress={this.onOK}>
        <Text style={[GStyles.mediumText, {color: GStyle.activeColor}]}>
          OK, Thanks!
        </Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
