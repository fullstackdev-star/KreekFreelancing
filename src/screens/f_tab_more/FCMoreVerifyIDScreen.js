import React from 'react';
import {
  Alert,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

import ImagePicker from 'react-native-image-picker';
import {TextField} from '../../lib/MaterialTextField/index';
import GHeaderBar from '../../components/GHeaderBar';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_file_upload = require('../../assets/images/ic_file_upload.png');

class FCMoreVerifyIDScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FCMoreVerifyIDScreen start');

    this.state = {
      idPhotoUri: '',
      billPhotoUri: '',
      idPhoto: null,
      billPhoto: null,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    const params = {
      none: 'none',
    };
    showPageLoader(true);
    RestAPI.get_id_images(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Alert.alert(Constants.errorTitle, 'Failed to get data.');
      } else {
        if (json.status === 1) {
          this.setState({
            idPhotoUri: json.data.passport_url,
            billPhotoUri: json.data.bill_url,
          });
        } else {
          Alert.alert(Constants.errorTitle, 'Failed to get data.');
        }
      }
    });
  }

  onClose = () => {
    this.props.navigation.goBack();
  };

  onUploadId = () => {
    const options = {
      title: 'Select ID Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          idPhoto: source,
        });

        const params = {
          image: source.uri,
        };
        showPageLoader(true);
        RestAPI.upload_id_image(params, (json, err) => {
          showPageLoader(false);

          if (err !== null) {
            Helper.alertNetworkError();
          } else {
            if (json.status === 1) {
              success(Constants.successTitle, 'Success to update data');
            } else {
              Helper.alertServerDataError();
            }
          }
        });
      }
    });
  };

  onUploadBill = () => {
    const options = {
      title: 'Select Bill Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          billPhoto: source,
        });

        const params = {
          image: source.uri,
        };
        showPageLoader(true);
        RestAPI.upload_bill_image(params, (json, err) => {
          showPageLoader(false);

          if (err !== null) {
            Helper.alertNetworkError();
          } else {
            if (json.status === 1) {
              success(Constants.successTitle, 'Success to update data');
            } else {
              Helper.alertServerDataError();
            }
          }
        });
      }
    });
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
            {this._renderUploadId()}
            {this._renderUploadBill()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle="Verify ID"
        leftType="close"
        onPressLeftButton={this.onClose}
      />
    );
  };

  _renderUploadId = () => {
    const {idPhoto, idPhotoUri} = this.state;
    let showCase = 'default';
    if (idPhoto == null) {
      if (idPhotoUri) {
        showCase = 'url';
      } else {
        showCase = 'default';
      }
    } else {
      showCase = 'photo';
    }

    return (
      <>
        <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 80}}>
          Upload an ID (Passport, national ID, Drivers License)
        </Text>
        <TouchableOpacity onPress={this.onUploadId}>
          <View
            style={{
              ...GStyles.centerContainer,
              width: '100%',
              height: 124,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 16,
            }}>
            {showCase == 'default' && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{...GStyles.image, width: 24}}
                />
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 13,
                    color: GStyle.linkColor,
                    marginTop: 8,
                  }}>
                  UPLOAD IMAGE
                </Text>
              </View>
            )}
            {showCase == 'photo' && (
              <Image
                source={idPhoto}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
            {showCase == 'url' && (
              <Image
                source={{uri: idPhotoUri}}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  _renderUploadBill = () => {
    const {billPhoto, billPhotoUri} = this.state;
    let showCase = 'default';
    if (billPhoto == null) {
      if (billPhotoUri) {
        showCase = 'url';
      } else {
        showCase = 'default';
      }
    } else {
      showCase = 'photo';
    }

    return (
      <>
        <Text style={{...GStyles.regularText, fontSize: 13, marginTop: 56}}>
          Upload Proof of Address(Utility Bill)
        </Text>
        <TouchableOpacity onPress={this.onUploadBill}>
          <View
            style={{
              ...GStyles.centerContainer,
              width: '100%',
              height: 124,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: GStyle.grayBackColor,
              marginTop: 16,
            }}>
            {showCase == 'default' && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{...GStyles.image, width: 24}}
                />
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 13,
                    color: GStyle.linkColor,
                    marginTop: 8,
                  }}>
                  UPLOAD IMAGE
                </Text>
              </View>
            )}
            {showCase == 'photo' && (
              <Image
                source={billPhoto}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
            {showCase == 'url' && (
              <Image
                source={{uri: billPhotoUri}}
                style={{width: '100%', height: 124, resizeMode: 'cover'}}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };
}

const styles = StyleSheet.create({});

export default FCMoreVerifyIDScreen;
