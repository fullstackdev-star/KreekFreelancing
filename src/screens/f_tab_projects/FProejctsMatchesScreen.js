import React from 'react';
import {Alert, FlatList, SafeAreaView} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {GStyles, Helper} from '../../utils/Global/index';
import JobItem from '../../components/elements/JobItem';

import RestAPI from '../../DB/RestAPI';
import Constants from '../../DB/Constants';

const FLATLIST_WIDTH = Helper.getContentWidth();

class FProejctsMatchesScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('FProejctsMatchesScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh('init');
  }

  componentWillUnmount() {}

  init = () => {
    this.state = {
      isFetching: false,
      totalCount: 0,
      curPage: 1,

      itemDatas: [],
    };
  };

  onRefresh = (type) => {
    if (type == 'pull') {
      this.setState({isFetching: true});
    } else {
      showPageLoader(true);
    }
    const params = {
      page_number: '1',
      count_per_page: Constants.COUNT_PER_PAGE,
    };

    RestAPI.get_matched_project_list(params, (json, err) => {
      if (type == 'pull') {
        this.setState({isFetching: false});
      } else {
        showPageLoader(false);
      }

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          this.setState({itemDatas: json.data.project_list});
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  onJobDetail = (projectId) => {
    global._projectId = projectId;
    this.props.navigation.navigate('fc_projects_detail');
  };

  onFavorite = (isChecked, item) => {
    let {itemDatas} = this.state;

    const params = {
      project_id: item.id,
      is_favorite: isChecked,
    };
    showPageLoader(true);
    RestAPI.update_favorite_project(params, (json, err) => {
      showPageLoader(false);

      if (err !== null) {
        Helper.alertNetworkError();
      } else {
        if (json.status === 1) {
          item.is_favorite = isChecked;
          this.setState(itemDatas);
        } else {
          Helper.alertServerDataError();
        }
      }
    });
  };

  render() {
    const {isFetching, itemDatas} = this.state;

    return (
      <SafeAreaView style={GStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.onRefresh('pull');
          }}
          refreshing={isFetching}
          data={itemDatas}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{width: FLATLIST_WIDTH}}
        />
      </SafeAreaView>
    );
  }

  _renderItem = ({item}) => {
    return (
      <JobItem
        item={item}
        onPress={this.onJobDetail}
        onFavorite={this.onFavorite}
      />
    );
  };
}

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();
  return (
    <FProejctsMatchesScreen {...props} navigation={navigation} route={route} />
  );
}
