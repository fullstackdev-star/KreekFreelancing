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

import ModalSelector from '../../lib/ModalSelector/index';
import FloatLabelTextField from '../../components/elements/FloatLabelTextField';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
const image_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_close = require('../../assets/images/ic_close.png');

export default class CProjectsPayMilestoneModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onPressCancel: PropTypes.func,
  };

  state = {
    start: '',
    end: '',
  };

  onClose = () => {
    this.props.onPressCancel();
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
        <View
          style={{
            flex: 1,
            backgroundColor: GStyle.modalBackColor,
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {this._renderClose()}
              {this._renderTitle()}
              {this._renderAmount()}
              {this._renderPayWith()}
              {this._renderResult()}
              {this._renderButton()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  _renderClose = () => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 16,
          top: 10,
        }}>
        <TouchableOpacity onPress={this.onClose}>
          <Image source={ic_close} style={{...GStyles.image, width: 14}} />
        </TouchableOpacity>
      </View>
    );
  };

  _renderTitle = () => {
    return (
      <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 10}]}>
        Details
      </Text>
    );
  };

  _renderAmount = () => {
    return (
      <View
        style={{
          height: 58,
          marginTop: 20,
        }}>
        <FloatLabelTextField
          autoCapitalize="none"
          placeholder={'Amount'}
          value={'20'}
          onFocus={this.handleTextChange}
          onBlur={this.handleTextChange}
        />
      </View>
    );
  };

  _renderPayWith = () => {
    let index = 0;
    const transfer_type_data = [
      {
        key: index++,
        section: true,
        label: 'Pay with',
      },
      {
        key: index++,
        label: 'Balance',
      },
      {
        key: index++,
        label: 'Bank Account - GTBXXX234',
      },
      {
        key: index++,
        label: 'Bank Account - GTBXXX234',
      },
      {
        key: index++,
        label: 'Bank Account - GTBXXX234',
      },
    ];

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
          Pay with
        </Text>
        <ModalSelector
          data={transfer_type_data}
          initValue="Select one"
          accessible={true}
          onChange={(option) => {
            this.setState({
              paymentTypeValue: option.label,
            });
          }}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={this.state.paymentTypeValue}
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

  _renderResult = () => {
    return (
      <View>
        <View style={{...GStyles.rowEndContainer}}>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            Fee
          </Text>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            $0.6
          </Text>
        </View>
        <View
          style={{
            ...GStyles.rowEndContainer,
            marginTop: 12,
          }}>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            Total
          </Text>
          <Text
            style={{
              fontFamily: 'GothamPro',
              fontSize: 13,
              color: GStyle.grayColor,
            }}>
            $20.6
          </Text>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          marginTop: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.onPressCancel();
          }}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Pay</Text>
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
