import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Button,
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import {SearchBar} from 'react-native-elements';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';

const ic_search = require('../../assets/images/ic_search.png');

class SearchBarItem extends Component {
  constructor(props) {
    super(props);

    this.state = {searchText: ''};
  }

  onChangeText(value) {
    this.setState({searchText: value});
    this.props.onChangeText(value);
  }

  onSubmitText = () => {
    const {searchText} = this.state;

    this.props.onSubmitText(searchText);
  };

  searchImage = () => {
    return <Image source={ic_search} style={{width: 16, height: 16}} />;
  };

  render() {
    const {searchText} = this.state;

    return (
      <SearchBar
        lightTheme
        searchIcon={this.searchImage}
        onChangeText={(text) => this.onChangeText(text)}
        onClear={(text) => this.onChangeText('')}
        placeholder="Enter something..."
        value={searchText}
        returnKeyType={'search'}
        onSubmitEditing={this.onSubmitText}
        autoCapitalize="none"
        inputStyle={GStyles.regularText}
        containerStyle={{
          ...GStyles.shadow,
          height: 48,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          height: 44,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});

SearchBarItem.defaultProps = {
  onChangeText: () => {},
  onSubmitText: () => {},
};

SearchBarItem.propTypes = {
  onChangeText: PropTypes.func,
  onSubmitText: PropTypes.func,
};

export default SearchBarItem;
