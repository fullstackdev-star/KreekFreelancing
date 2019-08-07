import React from 'react';
import {
  Image,
  LogBox,
  View,
} from 'react-native';

import RestAPI from '../DB/RestAPI';
import RNPaystack from 'react-native-paystack';

import {GStyles, Global, Helper} from '../utils/Global/index';

const img_logo = require('../assets/images/img_logo.png');

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('SplashScreen start');

    this.init();
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillUnmount() {}

  // crn_dev
  init = () => {
    LogBox.ignoreAllLogs();

    RNPaystack.init({
      publicKey: Global.PAY_STACK_PUB_KEY,
    });

    global.isDebug = true;
    global.isLocal = false;
    global.isWork = false;
    global.roleId = 0; //unknown 1: freelancer, 2: client
    global.pushId = '';

    global.userToken = global.isDebug
      ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGUyYTg0YjNjYzNhNTdiMzYxNzg4ZjA0MzZjZWJkN2JiM2JlZjlhYzcwMDMzN2UzOWYyNzYzNDVkNDgwMGUyMGI5ZjE0YzNlYWY4YTIyNmMiLCJpYXQiOjE2MDA4MjI2MDMsIm5iZiI6MTYwMDgyMjYwMywiZXhwIjoxNjMyMzU4NjAzLCJzdWIiOiIzNzciLCJzY29wZXMiOltdfQ.fsQtGm3erJZ-PlDMopFE6Uk6OytVN0FfalrYZp9yXz1H5EjTfT3epcVeTtjGy9Ov2JaUHgKCgl7hnHhO6H67oGCKNGlEeu-raXAmvKY392g7BX9Nhw7k567JhLEwMq9gRP-PI7VQtgypNRo88oE51OXFi805ZjBdFKYrYZ_0CH3XLbp27ZCm9wBRAI1DKNftoF8f97qxJvTUID_a7z8FI15-UurJUYsGw3A5tG-d_xgYN_pGptLX2af6kES6oGwSFPTVEHMi-71bmZpAYex408PEQtkQi-gNtv-B4jdbHSMlhaFIb3J0O7y1ltBzAutJ6NlY2KOk7O6OLdAplSvLRlf1GM6a_yIuKNcmTkRggVLjrasHNmckPKtMlbej0UNuQjpC5uJAy8MtgI2CK7SD2MgNHKfajuemL1SI8MbRO1WW6V90q6WILaVt2dyp6MibRuHwLSOn7SPHeS0jJG_KhXuqiQgO_OYe7DGaVYvg_jcdXnLP6zhOsA91RRhSvtKtWBXAWzLPZMCJaYBuL4YA2wst6bp8dhEWMTN1hj2wrfQg4mNr-CQrAetzf4TOYq-CbIWcr0o3NfXmZuIEi6w0cSIoF2uEMzxyZ7VIJBj9fGqNuRxDrC7GCqBQvBXcg1k2YPVPUjsQejsIV5VHZMLcX0he-iis8JKfBu5_QvSirvY'
      : '';
    // global.userToken = global.isDebug
    //   ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODE3MWM5MTIzYTM3MDA2MmFmM2M2YWNmMDhiYTE5NTllNWJkN2UwYmQ0NThhOTczOGFmMGQxNWUxZTE2ZDY2MzIwY2ZhZWU3NWFmYzFhMmEiLCJpYXQiOjE2MDA4MjI3MDEsIm5iZiI6MTYwMDgyMjcwMSwiZXhwIjoxNjMyMzU4NzAxLCJzdWIiOiIzOTMiLCJzY29wZXMiOltdfQ.WknG5XP_chY4BRUJaPxLSU3ObFuzmagR9rlPRFu59W1J5PjZqTDgo7KXEDPOdVjRKwgl2fi9ivPwHnfJ58BfqXEOWt_1DzLDMEg0f-4wT_C5a0TlvksGzwzZ60Lylloi_x3qjUC2dg_etVdflmzTypLjiUzYTL2aG7oJc55A0rADqUTfEf78WRoRQ1d2MA4pTEdzSoDMrk2F1YKdINDGOdnmmrVwMdNi2EnwroDwDx-y8uN5P6m5qtOkdm9n7UKy6_0Dnq54kPt0TIhwIFoySh17GB4D2ujsOC-1OV7YB9Mv9yhfgW_-MvrJrbdxgxSXKbj_-tiXmBUMcL_3LylFYSNgDzaJZNOg_vEWvd1kLWYHF2FlvtQj1faCVlV8xmo6Z3VKGO6GW2N6nnC11dk9Fj5sAzGVAn5E-PqKhAqMdQ4hDpYF1iGYTF_T1dXyG8_-ETwNg9W2GvjzuUow6oLOsNvPxx-ZFZFnFjJ1-txhybq9DlhFIH2CSg95tXB_0c9iZo7Wu3ex4V-taJDnc1I7lVTnS6DnRDQZh5Mhk7iaN0OvWVq21jvym9XQ6BwAi8lmFrQybxKlY1U5iUBVNMt-c9DBdFqLxglbjkofvZyaCQy1N7mrIvxra3PiQDMdn3IuKaAumW0PY0A1FrzcJoDi2kMBoIkqEX4QG8llOvIVJuE'
    //   : '';
  };

  onRefresh = () => {
    if (global.isWork) {
      this.props.navigation.navigate('work');
    } else {
      let isError = false;
      let retCount = 0;
      const TOTAL_RET_COUNT = 2;

      RestAPI.get_all_country_list((json, err) => {
        retCount++;
        if (err !== null) {
          isError = true;
        } else {
          if (json.status === 1) {
            global.country_list = json.data.country_list;
            if (!isError && retCount == TOTAL_RET_COUNT) {
              this.goNextPage();
            }
          } else {
            isError = true;
          }
        }

        if (isError && retCount == TOTAL_RET_COUNT) {
          Helper.alertServerDataError();
        }
      });

      RestAPI.get_all_skill_list((json, err) => {
        retCount++;
        if (err !== null) {
          isError = true;
        } else {
          if (json.status === 1) {
            global.skill_list = json.data.skill_list;
            if (!isError && retCount == TOTAL_RET_COUNT) {
              this.goNextPage();
            }
          } else {
            isError = true;
          }
        }

        if (isError && retCount == TOTAL_RET_COUNT) {
          Helper.alertServerDataError();
        }
      });
    }
  };

  goNextPage = () => {
    // crn_dev
    this.props.navigation.navigate('start');
    // this.props.navigation.navigate('f_main_tab_navigator');    
  };

  render() {
    return (
      <View style={GStyles.centerContainer}>
        <Image
          source={img_logo}
          style={{width: 192, height: 74, resizeMode: 'contain'}}
        />
      </View>
    );
  }
}


export default SplashScreen;
