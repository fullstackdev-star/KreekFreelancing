import React from 'react';
import {
  Alert,
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

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';

import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import JobDetailItem from '../../components/elements/JobDetailItem';
const ic_mini_dot = require('../../assets/images/ic_mini_dot.png');
const ic_favorite_inactive = require('../../assets/images/ic_favorite_inactive.png');
const ic_star = require('../../assets/images/ic_star_active.png');

const BUTTON_WIDTH = Helper.getContentWidth() - 50;

class FCProjectsDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCProjectsDetailScreen start');

    this.state = {
      itemData: null,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    showPageLoader(true);
    RestAPI.get_project_detail(global._projectId, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(
          Constants.errorTitle,
          'Failed to get project detail from server.',
        );
      } else {
        if (json.status === 1) {
          const itemData = json.data;
          global._projectTitle = itemData.title;
          this.setState({itemData: itemData});
        } else {
          Alert.alert(
            Constants.errorTitle,
            'Failed to get project detail from server.',
          );
        }
      }
    });
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onAboutClient = () => {
    const {itemData} = this.state;

    global._clientId = itemData.client.id;
    this.props.navigation.navigate('f_projects_client_detail');
  };

  onSubmit = () => {
    this.props.navigation.navigate('f_projects_apply');
  };

  onFavorite = () => {
    Alert.alert('Favorite button is clicked');
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={GStyles.elementContainer}>
            {this._renderJobDetails()}
          </KeyboardAwareScrollView>
          {this._renderButton()}
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <>
        {global.roleId == 1 && (
          <GHeaderBar
            headerTitle="Project Detail"
            leftType="back"
            onPressLeftButton={this.onBack}
          />
        )}
      </>
    );
  };

  _renderJobDetails = () => {
    const {itemData} = this.state;

    return (
      <>
        {itemData && (
          <JobDetailItem item={itemData} onPress={this.onAboutClient} />
        )}
      </>
    );
  };

  _renderButton = () => {
    return (
      <>
        {global.roleId == 1 && (
          <View style={{...GStyles.rowEndContainer, marginVertical: 8}}>
            <TouchableOpacity onPress={this.onSubmit}>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: GStyle.activeColor,
                  borderRadius: GStyle.buttonRadius,
                  width: BUTTON_WIDTH,
                  height: 50,
                }}>
                <Text style={GStyles.textFill}>Place Bid</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onFavorite}
              style={{marginLeft: 20}}>
              <Image
                source={ic_favorite_inactive}
                style={{...GStyles.image, width: 30}}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default FCProjectsDetailScreen;
