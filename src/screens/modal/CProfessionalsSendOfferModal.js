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
import RadioGroup from '../../components/elements/RadioButton/RadioGroup';
import {TextField} from '../../lib/MaterialTextField/index';
import DismissKeyboard from '../../components/DismissKeyboard';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
const ic_dropdown = require('../../assets/images/ic_dropdown.png');
const ic_dollar = require('../../assets/images/ic_dollar.png');

export default class CProfessionalsSendOfferModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);

    console.log('CProfessionalsSendOfferModal start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isVisibleRequestModal: false,

      projectName: '',
      paymentType: '',
      budget: 0,
      categoryId: 0,
      projectCategory: '',
      itemDatas: [{key: 0, section: true, label: 'Project category'}],
      projectDescription: '',
    };

    this.initRef();
  };

  initRef = () => {
    this.projectNameRef = (ref) => {
      this.projectName = ref;
    };
  };

  onRefresh = () => {
    let {itemDatas} = this.state;

    const params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_all_category_list(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          let data = itemDatas.concat(json.data.category_list);
          this.setState({itemDatas: data});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onFocus = () => {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  onChangeText = (text) => {
    ['projectName']
      .map((name) => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  onSubmitProjectName = () => {
    this.projectName.blur();
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onChangePaymentType = (value) => {
    this.setState({paymentType: value.label});
  };

  onChangeBudget = (value) => {
    this.setState({budget: value});
  };

  onChangeProjectCategory = (value) => {
    this.setState({categoryId: value.key, projectCategory: value.label});
  };

  onChangeProjectDescription = (value) => {
    this.setState({projectDescription: value});
  };

  onSubmit = () => {
    const {
      projectName,
      paymentType,
      budget,
      categoryId,
      projectDescription,
    } = this.state;

    if (!projectName) {
      Alert.alert(Constants.warningTitle, 'Please input project title.');
      return;
    }
    if (paymentType == '') {
      Alert.alert(Constants.warningTitle, 'Please select payment type.');
      return;
    }
    if (Number(budget) <= 0) {
      Alert.alert(Constants.warningTitle, 'Please input budget.');
      return;
    }
    if (categoryId < 1) {
      Alert.alert(Constants.warningTitle, 'Please select category.');
      return;
    }
    if (projectDescription == '') {
      Alert.alert(Constants.warningTitle, 'Please input project details.');
      return;
    }

    const params = {
      project_name: projectName,
      payment_type: paymentType,
      budget: budget,
      category_id: categoryId,
      project_description: projectDescription,
      files: '',
    };
    showPageLoader(true);
    RestAPI.send_offer(params, (json, err) => {
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
          <View
            style={{
              flex: 1,
              backgroundColor: GStyle.modalBackColor,
            }}>
            <View style={{...styles.centeredView}}>
              <KeyboardAvoidingView
                style={{...styles.modalView}}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View>
                  {this._renderTitle()}
                  {this._renderProjectTitle()}
                  {this._renderPaymentType()}
                  {this._renderBudget()}
                  {this._renderProjectCategory()}
                  {this._renderInput()}
                  {this._renderButton()}
                </View>
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
        <Text
          style={[
            GStyles.mediumText,
            {fontSize: 17, lineHeight: 25, marginTop: 10},
          ]}>
          Send invitation {'\n'}for a private project
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

  _renderProjectTitle = () => {
    const {projectName, errors = {}} = this.state;

    return (
      <TextField
        ref={this.projectNameRef}
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        onFocus={this.onFocus}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitProjectName}
        returnKeyType="next"
        editable={true}
        label="Project title"
        value={projectName}
        error={errors.projectName}
        containerStyle={{marginTop: 12}}
      />
    );
  };

  _renderPaymentType = () => {
    const {paymentType} = this.state;

    let index = 0;
    const paymentTypeData = [
      {key: index++, section: true, label: 'Payment Type'},
      {key: index++, label: 'Fixed'},
      {key: index++, label: 'Hourly'},
    ];

    return (
      <View
        style={[
          GStyles.borderBottom,
          {width: '100%', height: 58, marginTop: 24},
        ]}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Payment Type
        </Text>
        <ModalSelector
          data={paymentTypeData}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangePaymentType}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={[GStyles.mediumText, {height: 45, flex: 1}]}
              editable={false}
              placeholder="Select one"
              value={paymentType}
            />
            <Image
              source={ic_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderBudget = () => {
    const {budget} = this.state;

    return (
      <View style={{...GStyles.borderBottom, height: 58, marginTop: 24}}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Project budget offer
        </Text>
        <View style={[GStyles.rowContainer, {marginTop: 12}]}>
          <Image
            source={ic_dollar}
            style={[GStyles.image, {width: 24, tintColor: GStyle.grayColor}]}
          />
          <TextInput
            keyboardType="numeric"
            placeholder=""
            value={budget}
            onChangeText={this.onChangeBudget}
            style={{...GStyles.mediumText, flex: 1, marginLeft: 12}}
          />
        </View>
      </View>
    );
  };

  _renderProjectCategory = () => {
    const {projectCategory, itemDatas} = this.state;

    return (
      <View
        style={{
          width: '100%',
          height: 58,
          borderColor: GStyle.lineColor,
          borderBottomWidth: 1,
          marginTop: 24,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Project category
        </Text>
        <ModalSelector
          data={itemDatas}
          initValue="Select one"
          accessible={true}
          onChange={this.onChangeProjectCategory}>
          <View style={GStyles.rowEndContainer}>
            <TextInput
              style={{...GStyles.mediumText, height: 45, flex: 1}}
              editable={false}
              placeholder="Select one"
              value={projectCategory}
            />
            <Image
              source={ic_dropdown}
              style={{...GStyles.image, width: 12, marginRight: 8}}
            />
          </View>
        </ModalSelector>
      </View>
    );
  };

  _renderInput = () => {
    const {projectDescription} = this.state;

    return (
      <View style={{...GStyles.borderBottom, marginTop: 24}}>
        <Text
          style={{
            fontFamily: 'GothamPro-Medium',
            fontSize: 13,
            color: GStyle.grayColor,
          }}>
          Project Details
        </Text>
        <TextInput
          placeholder="Please input project details."
          multiline={true}
          numberOfLines={10}
          value={projectDescription}
          onChangeText={this.onChangeProjectDescription}
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
        style={{alignItems: 'flex-end', marginVertical: 16}}>
        <TouchableOpacity onPress={this.onSubmit}>
          <View style={styles.buttonFill}>
            <Text style={styles.textFill}>Send invitation</Text>
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
    width: 150,
    height: 36,
  },

  textFill: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
