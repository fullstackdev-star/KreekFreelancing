import RNFetchBlob from 'rn-fetch-blob';
import {Helper} from '../utils/Global';

const hostURL = 'https://kreekafrica.com/';

const futch = (url, opts = {}, onProgress) => {
  global._url = url;
  console.log('url : ', url);
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = (e) => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
};

const formDataCall = (subUrl, body, headers, callBack) => {
  futch(
    hostURL + subUrl,
    {
      method: 'post',
      body: body,
      headers: headers,
    },
    (progressEvent) => {
      const progress = progressEvent.loaded / progressEvent.total;
      console.log('progress : ', progress);
    },
  ).then(
    function (resJson) {
      console.log('formDataCall response from server === >>>');
      try {
        console.log('before parsing: ', resJson.response.substring(0, 100));
        res = JSON.parse(resJson.response);
        console.log('after parsing: ', res);
        callBack(res, null);
      } catch (exception) {
        console.error('exception : ', exception);
        console.error('error_subUrl : ', subUrl);
        callBack(null, exception);
      }
    },
    (err) => {
      console.error('parsing err: ', err);
      callBack(null, err);
    },
  );
};

const formFileDataCall = (subUrl, body, callBack) => {
  RNFetchBlob.fetch(
    'POST',
    hostURL + subUrl,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + global.userToken,
    },
    body,
  )
    .then((resJson) => {
      console.log('formDataCall response from server === >>>');
      try {
        console.log('before parsing: ', resJson.data.substring(0, 100));
        // console.log('before parsing: ', resJson.data);
        res = JSON.parse(resJson.data);
        console.log('after parsing: ', res);
        callBack(res, null);
      } catch (exception) {
        console.error('exception:', exception);
        console.error('error_subUrl : ', subUrl);
        callBack(null, exception);
      }
    })
    .catch((err) => {
      console.error('parsing err: ', err);
      callBack(null, err);
    });
};

const RestAPI = {
  get_all_country_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    formDataCall('api/user/get_all_country_list', data, {}, callBack);
  },

  get_all_skill_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    formDataCall('api/user/get_all_skill_list', data, {}, callBack);
  },

  get_city_list_by_country: (country_id, callBack) => {
    const data = new FormData();
    data.append('country_id', country_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_city_list_by_country', data, headers, callBack);
  },

  login: (params, callBack) => {
    const data = new FormData();
    data.append('email', params.email);
    data.append('password', params.password);
    data.append('role', params.role);

    formDataCall('api/user/login', data, {}, callBack);
  },

  signup: (email, pwd, first_name, last_name, role, callBack) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', pwd);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('role', role);

    formDataCall('api/user/signup', data, {}, callBack);
  },

  verify_email: (code, callBack) => {
    const data = new FormData();
    data.append('code', code);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/verify_email', data, headers, callBack);
  },

  resend_email_verification: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/resend_email_verification', data, headers, callBack);
  },

  forget_password: (email, callBack) => {
    const data = new FormData();
    data.append('email', email);

    formDataCall('api/user/forget_password', data, {}, callBack);
  },

  recover_password: (email, code, new_password, callBack) => {
    const data = new FormData();
    data.append('email', email);
    data.append('code', code);
    data.append('new_password', new_password);

    formDataCall('api/user/recover_password', data, {}, callBack);
  },

  get_user_info: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_user_info', data, headers, callBack);
  },

  update_user_info: (params, callBack) => {
    const data = [
      {name: 'first_name', data: params.first_name},
      {name: 'last_name', data: params.last_name},
      {name: 'user_name', data: params.user_name},
      {name: 'company_name', data: params.company_name},
      {name: 'display', data: params.display},
      {name: 'phone_number', data: params.phone_number},
    ];
    if (params.photo) {
      data.push({
        name: 'photo',
        filename: Helper.getFileName4Uri(params.photo),
        type: Helper.getFileExt4Uri(params.photo),
        data: RNFetchBlob.wrap(Helper.getFilePath4Uri(params.photo)),
      });
    }
    if (params.cover_photo) {
      data.push({
        name: 'cover_photo',
        filename: Helper.getFileName4Uri(params.cover_photo),
        type: Helper.getFileExt4Uri(params.cover_photo),
        data: RNFetchBlob.wrap(Helper.getFilePath4Uri(params.cover_photo)),
      });
    }
    console.log('--- crn_dev --- data:', data);

    formFileDataCall('api/user/update_user_info', data, callBack);
  },

  get_portfolio_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_portfolio_list', data, headers, callBack);
  },

  get_experience_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_experience_list', data, headers, callBack);
  },

  get_education_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_education_list', data, headers, callBack);
  },

  get_award_list: (callBack) => {
    const data = new FormData();

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_award_list', data, headers, callBack);
  },

  get_skill_list_by_user: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_skill_list_by_user', data, headers, callBack);
  },

  update_job_profile_info: (title, description, hourly_rate, callBack) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('hourly_rate', hourly_rate);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/update_job_profile_info', data, headers, callBack);
  },

  add_experience: (
    title,
    company,
    start_date,
    end_date,
    is_current_working,
    description,
    callBack,
  ) => {
    const data = new FormData();
    data.append('title', title);
    data.append('company', company);
    data.append('start_date', start_date);
    data.append('end_date', end_date);
    data.append('is_current_working', is_current_working);
    data.append('description', description);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/add_experience', data, headers, callBack);
  },

  get_package_list: (callBack) => {
    const data = new FormData();
    data.append('no', 'no');

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_package_list', data, headers, callBack);
  },

  update_membership: (is_monthly, package_list_id, callBack) => {
    const data = new FormData();
    data.append('is_monthly', is_monthly);
    data.append('package_list_id', package_list_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/update_membership', data, headers, callBack);
  },

  confirm_payment: (params, callBack) => {
    const data = new FormData();
    data.append('paystack_reference', params.paystack_reference);
    data.append('card_number', params.card_number);
    data.append('name_on_card', params.name_on_card);
    data.append('expire_year', params.expire_year);
    data.append('expire_month', params.expire_month);
    data.append('cvv', params.cvv);
    data.append('zip_code', params.zip_code);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/confirm_payment', data, headers, callBack);
  },

  get_all_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_all_project_list', data, headers, callBack);
  },

  get_recent_proposal_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_recent_proposal_list',
      data,
      headers,
      callBack,
    );
  },

  get_filtered_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);
    data.append('fixed_min_value', params.fixed_min_value);
    data.append('fixed_max_value', params.fixed_max_value);
    data.append('hourly_value', params.hourly_value);
    data.append('category_id', params.category_id);
    data.append('job_type', params.job_type);
    data.append('payment_type', params.payment_type);
    data.append('proposal_count', params.proposal_count);
    data.append('skill_id', params.skill_id);
    data.append('country_id', params.country_id);
    data.append('keyword', params.keyword);
    data.append('sortBy', params.sortBy);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_filtered_project_list',
      data,
      headers,
      callBack,
    );
  },

  get_matched_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_matched_project_list',
      data,
      headers,
      callBack,
    );
  },

  get_nearby_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_nearby_project_list',
      data,
      headers,
      callBack,
    );
  },

  get_open_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_open_project_list', data, headers, callBack);
  },

  get_recent_proposal_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_recent_proposal_list',
      data,
      headers,
      callBack,
    );
  },

  get_project_detail: (project_id, callBack) => {
    const data = new FormData();
    data.append('project_id', project_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_project_detail', data, headers, callBack);
  },

  get_client_info: (client_id, callBack) => {
    const data = new FormData();
    data.append('client_id', client_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_client_info', data, headers, callBack);
  },

  submit_proposal: (params, callBack) => {
    const data = new FormData();
    data.append('project_id', params.project_id);
    data.append('proposed_amount', params.proposed_amount);
    data.append('project_duration', params.project_duration);
    data.append('duration_unit', params.duration_unit);
    data.append('is_premium_bid', params.is_premium_bid);
    data.append('proposal_description', params.proposal_description);
    data.append('attachment_list', params.attachment_list);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/submit_proposal', data, headers, callBack);
  },

  get_f_proposal_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_f_proposal_list', data, headers, callBack);
  },

  get_invited_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_invited_project_list',
      data,
      headers,
      callBack,
    );
  },

  get_ongoing_job_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_ongoing_job_list', data, headers, callBack);
  },

  get_canceled_job_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_canceled_job_list', data, headers, callBack);
  },

  get_completed_job_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_completed_job_list', data, headers, callBack);
  },

  get_id_images: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_id_images', data, headers, callBack);
  },

  upload_bill_image: (params, callBack) => {
    const data = [];
    if (params.image) {
      data.push({
        name: 'image',
        filename: Helper.getFileName4Uri(params.image),
        type: Helper.getFileExt4Uri(params.image),
        data: RNFetchBlob.wrap(Helper.getFilePath4Uri(params.image)),
      });
    }
    formFileDataCall('api/user/upload_bill_image', data, callBack);
  },

  upload_id_image: (params, callBack) => {
    const data = [];
    if (params.image) {
      data.push({
        name: 'image',
        filename: Helper.getFileName4Uri(params.image),
        type: Helper.getFileExt4Uri(params.image),
        data: RNFetchBlob.wrap(Helper.getFilePath4Uri(params.image)),
      });
    }
    formFileDataCall('api/user/upload_id_image', data, callBack);
  },

  get_all_client_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_all_client_list', data, headers, callBack);
  },

  get_followed_client_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_followed_client_list', data, headers, callBack);
  },

  get_client_summary: (params, callBack) => {
    const data = new FormData();
    data.append('client_id', params.client_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_client_summary', data, headers, callBack);
  },

  get_professional_summary: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_professional_summary', data, headers, callBack);
  },

  get_open_jobs_by_client: (params, callBack) => {
    const data = new FormData();
    data.append('client_id', params.client_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_open_jobs_by_client', data, headers, callBack);
  },

  get_reviews_by_client: (params, callBack) => {
    const data = new FormData();
    data.append('client_id', params.client_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_reviews_by_client', data, headers, callBack);
  },

  get_followers_by_client: (params, callBack) => {
    const data = new FormData();
    data.append('client_id', params.client_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_followers_by_client', data, headers, callBack);
  },

  get_all_professional_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_all_professional_list', data, headers, callBack);
  },

  get_nearby_professional_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/user/get_nearby_professional_list',
      data,
      headers,
      callBack,
    );
  },

  get_favorite_professional_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/user/get_favorite_professional_list',
      data,
      headers,
      callBack,
    );
  },

  get_all_pending_payments: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_all_pending_payments', data, headers, callBack);
  },

  update_favorite_professional: (params, callBack) => {
    const data = new FormData();
    data.append('user_id', params.user_id);
    data.append('is_favorite', params.is_favorite);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/user/update_favorite_professional',
      data,
      headers,
      callBack,
    );
  },

  update_favorite_project: (params, callBack) => {
    const data = new FormData();
    data.append('project_id', params.project_id);
    data.append('is_favorite', params.is_favorite);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/update_favorite_project',
      data,
      headers,
      callBack,
    );
  },

  update_follow_client: (params, callBack) => {
    const data = new FormData();
    data.append('client_id', params.client_id);
    data.append('is_follow', params.is_follow);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/update_follow_client', data, headers, callBack);
  },

  get_job_profile_info_by_id: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/user/get_job_profile_info_by_id',
      data,
      headers,
      callBack,
    );
  },

  get_experience_list_by_id: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_experience_list_by_id', data, headers, callBack);
  },

  get_portfolio_list_by_id: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_portfolio_list_by_id', data, headers, callBack);
  },

  get_education_list_by_id: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_education_list_by_id', data, headers, callBack);
  },

  get_skill_list_by_id: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_skill_list_by_id', data, headers, callBack);
  },

  get_reviews_by_professional: (params, callBack) => {
    const data = new FormData();
    data.append('professional_id', params.professional_id);
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/user/get_reviews_by_professional',
      data,
      headers,
      callBack,
    );
  },

  get_projet_list_for_reqest: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_projet_list_for_reqest',
      data,
      headers,
      callBack,
    );
  },

  send_request: (params, callBack) => {
    const data = new FormData();
    data.append('project_id', params.project_id);
    data.append('professional_id', params.professional_id);
    data.append('message', params.message);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/send_request', data, headers, callBack);
  },

  get_all_category_list: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_all_category_list', data, headers, callBack);
  },

  send_offer: (params, callBack) => {
    const data = new FormData();
    data.append('project_name', params.project_name);
    data.append('payment_type', params.payment_type);
    data.append('budget', params.budget);
    data.append('category_id', params.category_id);
    data.append('project_description', params.project_description);
    data.append('files', params.files);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/send_offer', data, headers, callBack);
  },

  get_all_invites_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/project/get_all_invites_list', data, headers, callBack);
  },

  get_filtered_invoice_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);
    data.append('keyword', params.keyword);
    data.append('status', params.status);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_filtered_invoice_list', data, headers, callBack);
  },

  pay_invoice: (params, callBack) => {
    const data = new FormData();
    data.append('invoice_id', params.invoice_id);
    data.append('payment_method', params.payment_method);
    data.append('card_number', params.card_number);
    data.append('name_on_card', params.name_on_card);
    data.append('expire_year', params.expire_year);
    data.append('expire_month', params.expire_month);
    data.append('cvv', params.cvv);
    data.append('zip_code', params.zip_code);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/pay_invoice', data, headers, callBack);
  },

  get_c_email_settings: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_c_email_settings', data, headers, callBack);
  },

  update_c_email_settings: (params, callBack) => {
    const data = new FormData();
    data.append(params.option, params.value);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/update_c_email_settings', data, headers, callBack);
  },

  get_f_email_settings: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_f_email_settings', data, headers, callBack);
  },

  update_f_email_settings: (params, callBack) => {
    const data = new FormData();
    data.append(params.option, params.value);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/update_f_email_settings', data, headers, callBack);
  },

  get_favorite_project_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall(
      'api/project/get_favorite_project_list',
      data,
      headers,
      callBack,
    );
  },

  get_room_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);
    data.append('keyword', params.keyword);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/message/get_room_list', data, headers, callBack);
  },

  get_message_list: (params, callBack) => {
    const data = new FormData();
    data.append('opponent_id', params.opponent_id);
    if (params.last_message_id) {
      data.append('last_message_id', params.last_message_id);
    }
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/message/get_message_list', data, headers, callBack);
  },

  get_new_message: (params, callBack) => {
    const data = new FormData();
    data.append('opponent_id', params.opponent_id);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/message/get_new_message', data, headers, callBack);
  },

  send_message: (params, callBack) => {
    const data = new FormData();
    data.append('opponent_id', params.opponent_id);
    data.append('message_type', params.message_type);
    data.append('message', params.message);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/message/send_message', data, headers, callBack);
  },

  get_my_info: (params, callBack) => {
    const data = new FormData();
    data.append('none', params.none);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_my_info', data, headers, callBack);
  },

  get_notification_list: (params, callBack) => {
    const data = new FormData();
    data.append('page_number', params.page_number);
    data.append('count_per_page', params.count_per_page);

    const headers = {
      Authorization: 'Bearer ' + global.userToken,
    };

    formDataCall('api/user/get_notification_list', data, headers, callBack);
  },
};

export default RestAPI;
