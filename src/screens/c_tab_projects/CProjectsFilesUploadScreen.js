import React from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';

const ic_file_upload = require('../../assets/images/ic_file_upload.png');

class CProjectsFilesUploadScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('CProjectsFilesUploadScreen start');

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onClose = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView style={GStyles.statusBar} />
        <SafeAreaView style={GStyles.container}>
          {this._renderHeader()}
          <View style={{...GStyles.centerAlign, width: '100%', height: '100%'}}>
            <TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={ic_file_upload}
                  style={{...GStyles.image, width: 48}}
                />
                <Text
                  style={{
                    fontFamily: 'GothamPro-Medium',
                    fontSize: 18,
                    color: GStyle.linkColor,
                  }}>
                  +Upload Files
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }

  _renderHeader = () => {
    return (
      <GHeaderBar
        headerTitle=""
        leftType="close"
        onPressLeftButton={this.onClose}
      />
    );
  };
}

const styles = StyleSheet.create({});

export default CProjectsFilesUploadScreen;
