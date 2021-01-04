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

export default class FPaymentWithdrawModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onPressCancel: PropTypes.func,
  };

  state = {
    start: '',
    end: '',
  };

  render() {
    let index = 0;
    const transfer_type_data = [
      {key: index++, section: true, label: 'Payment Type'},
      {key: index++, label: 'Bank Account - GTBXXX234'},
      {key: index++, label: 'Bank Account - GTBXXX234'},
      {key: index++, label: 'Bank Account - GTBXXX234'},
      {key: index++, label: 'Bank Account - GTBXXX234'},
    ];

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
              <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 10}]}>
                Withdraw
              </Text>
              <View style={{height: 58, marginTop: 20}}>
                <FloatLabelTextField
                  autoCapitalize="none"
                  placeholder={'Enter Amount'}
                  value={'GHC 2500'}
                  onFocus={this.handleTextChange}
                  onBlur={this.handleTextChange}
                />
              </View>
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
                  Transfer to
                </Text>
                <ModalSelector
                  data={transfer_type_data}
                  initValue="Select one"
                  accessible={true}
                  onChange={(option) => {
                    this.setState({paymentTypeValue: option.label});
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
                    <Text style={styles.textFill}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
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
