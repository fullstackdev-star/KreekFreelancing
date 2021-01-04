import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
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

import ModalSelector from '../../lib/ModalSelector/index';
import {TextField} from '../../lib/MaterialTextField/index';
import DismissKeyboard from '../../components/DismissKeyboard';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
const image_dropdown = require('../../assets/images/ic_dropdown.png');
const image_quote = require('../../assets/images/ic_quote.png');

export default class CProfessionalsSendRequestModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);

    console.log('CProfessionalsSendRequestModal start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isVisibleRequestModal: false,

      projectId: 0,
      projectName: '',
      itemDatas: [{key: 0, section: true, label: 'Project Name'}],
      message: '',
    };
  };

  onRefresh = () => {
    console.log('--- crn_dev --- :');
    return;
    let {itemDatas} = this.state;

    const params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_projet_list_for_reqest(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          let data = itemDatas.concat(json.data.project_name_list);
          this.setState({itemDatas: data});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onChangeProject = (value) => {
    this.setState({projectId: value.key, projectName: value.label});
  };

  onChangeMessage = (value) => {
    this.setState({message: value});
  };

  onSubmit = () => {
    const {projectId, message} = this.state;

    if (projectId < 1) {
      Alert.alert(Constants.warningTitle, 'Please select project.');
      return;
    }

    console.log('projectId:', projectId);
    console.log('message:', message);

    const params = {
      project_id: projectId,
      professional_id: global.me.user_id,
      message: message,
    };
    showPageLoader(true);
    RestAPI.send_request(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.props.onSubmit();
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <DismissKeyboard>
          <View style={{flex: 1, backgroundColor: GStyle.modalBackColor}}>
            <View style={styles.centeredView}>
              <KeyboardAvoidingView
                style={{...styles.modalView}}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                {this._renderTitle()}
                {this._renderProject()}
                {this._renderInput()}
                {this._renderButton()}
              </KeyboardAvoidingView>
            </View>
          </View>
        </DismissKeyboard>
      </Modal>
    );
  }

  _renderTitle = () => {
    return (
      <View style={GStyles.rowEndContainer}>
        <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 10}]}>
          Send Request
        </Text>
        <TouchableOpacity onPress={this.onCancel}>
          <Text
            style={{
              fontFamily: 'GothamPro-Medium',
              fontSize: 14,
              color: GStyle.linkColor,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderProject = () => {
    const {projectName, itemDatas} = this.state;

    return (
      <View
        style={{
          width: '100%',
          height: 58,
          borderColor: GStyle.lineColor,
          borderBottomWidth: 1,
          marginTop: 30,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Project
        </Text>
        <ModalSelector
          data={itemDatas}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangeProject}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={{...GStyles.mediumText, height: 45, flex: 1}}
              editable={false}
              placeholder="Select one"
              value={projectName}
            />
            <Image
              source={image_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderInput = () => {
    const {message} = this.state;

    return (
      <View style={{...GStyles.borderBottom, marginTop: 24}}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Send a private message
        </Text>
        <TextInput
          placeholder="Please input a private message."
          multiline={true}
          numberOfLines={10}
          value={message}
          onChangeText={this.onChangeMessage}
          style={{
            ...GStyles.regularText,
            height: 160,
            lineHeight: 24,
            marginTop: 8,
          }}
        />
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          marginVertical: 16,
        }}>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: '88%',
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

  buttonFill: {
    justifyContent: 'center',
    backgroundColor: GStyle.activeColor,
    borderRadius: GStyle.buttonRadius,
    width: 90,
    height: 36,
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
