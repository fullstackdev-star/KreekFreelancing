import {Alert, Dimensions} from 'react-native';
import Moment from 'moment';

import RestAPI from '../../DB/RestAPI';
import ModalIndicator from '../../components/ModalIndicator';
import Constants from '../../DB/Constants';
import FileItem from '../../components/elements/FileItem';

const ic_membership_free = require('../../assets/images/ic_membership_free.png');
const ic_membership_basic = require('../../assets/images/ic_membership_basic.png');
const ic_membership_professional = require('../../assets/images/ic_membership_professional.png');
const ic_membership_business = require('../../assets/images/ic_membership_business.png');
const ic_membership_executive = require('../../assets/images/ic_membership_executive.png');

const Global = {
  PAY_STACK_PUB_KEY: 'pk_test_dbd30ba86e6fe5dd0cf839208fff9be36b36e260',
  base_url: 'http://wichz.com/api/',
  user_token: '',

  email: '',
  first_name: '',
  last_name: '',
  username: '',
  avatar_url: '',
  created_at: 0,
  user_loc_lat: 0.0,
  user_loc_lng: 0.0,
  user_current_address: '',
  acc_tmp_lat: 0.0,
  acc_tmp_lng: 0.0,

  discounts_likes_list: [],
  cards_likes_list: [],

  category_list: [],
  search_hotkeys: [],
  search_word: '',
  selected_discount: {},
  previou_of_detail: '',

  bank_list: [],
  selected_card: {},

  selected_notification: {},
};

const Helper = {
  getWindowWidth: function () {
    return Dimensions.get('window').width;
  },

  getWindowHeight: function () {
    return Dimensions.get('window').height;
  },

  getContentWidth: function () {
    return Dimensions.get('window').width * 0.88;
  },

  alertNetworkError: function () {
    Alert.alert('Error', 'Network error.');
    console.log('=======> error_url:', global._url);
  },

  alertServerDataError: function () {
    Alert.alert(Constants.errorTitle, 'Failed to get data from server');
    console.log('=======> error_url:', global._url);
  },

  isValid: function (value) {
    if (value == undefined) {
      return false;
    }
    if (value == null) {
      return false;
    }
    if (value == '') {
      return false;
    }
    if (value == 0) {
      return false;
    }

    return true;
  },

  getMembershipImage: function (membershipPlan) {
    let membershipImage = ic_membership_free;

    switch (membershipPlan) {
      case 'Basic':
        membershipImage = ic_membership_free;
        break;
      case 'Basic+':
        membershipImage = ic_membership_basic;
        break;
      case 'Professional':
        membershipImage = ic_membership_professional;
        break;
      case 'Business':
        membershipImage = ic_membership_business;
        break;
      case 'Executive':
        membershipImage = ic_membership_executive;
        break;
      default:
        membershipImage = ic_membership_free;
        break;
    }

    return membershipImage;
  },

  getDateString4Input: function (inputDateString) {
    let date = Moment(inputDateString, 'MMM DD, YYYY').toDate();
    return Moment(date).format('YYYY-MM-DD');
  },

  getDateString4Server: function (serverDateString) {
    if (!serverDateString) return '';

    let serverDate = Moment(serverDateString);
    return serverDate.format('MMM DD, YYYY');
  },

  getPastTimeString: function (serverDateString) {
    if (!serverDateString) return '';

    let serverDate = Moment(serverDateString).toDate();
    let nowDate = Moment();

    let pastTime = Moment.duration(nowDate.diff(serverDate)).humanize();

    return pastTime;
  },

  getPackageId4Name: function (name) {
    let packgeId = 0;
    global.package_list.forEach((item) => {
      if (item.name == name) {
        packgeId = item.id;
      }
    });
    return packgeId;
  },

  validateEmail: function (email) {
    // const rex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const rex = /\A(?=[a-z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254}\z)(?=[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}\z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(email);
  },

  getMonth4DateString: function (monthYearString) {
    stringArray = monthYearString.split('/');
    if (stringArray.length == 2) {
      return stringArray[0];
    }
    return '';
  },

  getYear4DateString: function (monthYearString) {
    stringArray = monthYearString.split('/');
    if (stringArray.length == 2) {
      return stringArray[1];
    }
    return '';
  },

  capitalizeString: function (str) {
    if (str) {
      if (str.length > 1) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
    }
    return '';
  },

  getSkillName4Id: function (skillId) {
    let skillName = null;

    global.skill_list.forEach((item) => {
      if (item.id == skillId) {
        skillName = item.name;
      }
    });

    return skillName;
  },

  getFileName4Uri: function (uri) {
    let fileName = '';

    if (uri) {
      let localUri = uri;
      let uriParts = uri.split('/');
      fileName = uriParts[uriParts.length - 1];
    }

    return fileName;
  },

  getFileExt4Uri: function (uri) {
    let fileExt = '';

    if (uri) {
      let uriParts = uri.split('.');
      fileExt = uriParts[uriParts.length - 1];
    }

    return fileExt;
  },

  getFilePath4Uri: function (uri) {
    let filePath = '';

    if (uri) {
      filePath = uri.slice(7);
    }

    return filePath;
  },
};

export default Global;
export {Helper};
