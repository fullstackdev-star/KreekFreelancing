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
import CheckBox from '../../lib/Checkbox/index';
import {AirbnbRating} from '../../lib/StarRating/index';
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import DatePicker from '../../components/elements/DatePicker/datepicker';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

export default class FLeaveFeedbackModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onPressCancel: PropTypes.func,
  };

  state = {
    start: '',
    end: '',
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
        <View style={{flex: 1, backgroundColor: GStyle.modalBackColor}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[GStyles.mediumText, {fontSize: 17, marginTop: 10}]}>
                Leave Feedback
              </Text>
              <Text style={[GStyles.regularText, {fontSize: 13, marginTop: 8}]}>
                For Marian Ramsey
              </Text>
              <View style={{marginTop: 14}}>
                <AirbnbRating
                  showRating={false}
                  onFinishRating={this.ratingCompleted}
                  style={{paddingVertical: 10}}
                  starContainerStyle={{
                    width: 180,
                    height: 32,
                    justifyContent: 'space-between',
                  }}
                  size={30}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  multiline={true}
                  placeholder=""
                  defaultValue={
                    'Great employer to work for. \nAlways pays on time'
                  }
                  onChangeText={text => {
                    this.setState({description: text});
                  }}
                  style={[
                    GStyles.regularText,
                    {
                      width: '100%',
                      height: 142,
                      fontSize: 13,
                      lineHeight: 23,
                      borderWidth: 1,
                      borderColor: GStyle.grayBackColor,
                      marginLeft: 6,
                      marginTop: 16,
                    },
                  ]}
                />
              </View>

              <View style={{alignItems: 'flex-end', marginTop: 16}}>
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
