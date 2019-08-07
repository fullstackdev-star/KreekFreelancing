import React from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NavigationContext} from '@react-navigation/native';

import {GStyle, GStyles, Global, Helper} from '../../utils/Global/index';
import GHeaderBar from '../../components/GHeaderBar';
import JobListItem from '../../components/elements/JobListItem';
import CheckBox from '../../lib/Checkbox/index';


class NCMoreOpenJobsScreen extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    console.log('NCMoreOpenJobsScreen start');

    this.state = {
      itemDatas: [
        {
          id: 'id1',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
        {
          id: 'id2',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
        {
          id: 'id3',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
        {
          id: 'id4',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
        {
          id: 'id5',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
        {
          id: 'id6',
          title: 'Need an architectural design of a 4 story building',
          hire_date: 'May 2, 2018',
          client_name: 'Mariam Ramsey',
        },
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  onDetail = () => {
    this.context.navigate('c_more_job_detail');
  };

  onPressed = () => {};

  render() {
    const {itemDatas} = this.state;

    return (
      <View style={styles.container}>
        <FlatList data={itemDatas} renderItem={this.renderItem} />
      </View>
    );
  }

  renderItem = ({item}) => {
    return <JobListItem item={item} onPress={this.onDetail} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NCMoreOpenJobsScreen;
