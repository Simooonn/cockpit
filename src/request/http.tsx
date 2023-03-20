import axios from 'axios';
import { api_url, clearAccount, getJWTToken } from '@/utils/function';

//Call apiURL of back-end interface
const ApiUrl =
  process.env.NEXT_APP_API_URL === 'false'
    ? api_url()
    : process.env.NEXT_APP_API_URL;

//Image link domain name
// const ImgUrl = process.env.REACT_APP_MODE === 'production' ? '' : ''

// Login Route
const LOGIN = '/login';

// let hide = null

//Create an axis instance, where you can set the default configuration of the request
const instance = axios.create({
  timeout: 10000, // Set request timeout for 10s
  // baseURL: '/api'
  baseURL: ApiUrl, //Set the baeUrl of different environments according to the reverse proxy configured by yourself
});

// Set the post request header uniformly in the document. The following will talk about several 'Content Type' of post requests
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
// instance.defaults.withCredentials = true; // 允许携带cookie

//Here I simply list some common http status code information, and you can adjust the configuration yourself
// const httpCode = {
//   400: 'Request parameter error',
//   401: 'Insufficient permission, please log in again',
//   403: 'The server denied this access',
//   404: 'Request resource not found',
//   500: 'Internal Server Error',
//   501: 'The method used in the request is not supported by the server',
//   502: 'Bad Gateway',
//   504: 'gateway timeout',
// };

/** Add request interceptor **/
instance.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization =
      getJWTToken() === null ? '' : 'Bearer ' + getJWTToken();
    // config.headers.Authorization = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleSIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIweDA4ODMwOTA3ZjJlMmQyMGE1Y2IzN2VlOWUwYThiZGY4YzA2ZTM1MDgiLCJjaGFpbl9pZCI6IjUifQ.WhLg77Nuud77faL_fTpJ-3-bAA2oJtQkRb4uMiS2GFMuaX6CmDL_Oadra1tQEeIUkk2ABYqUuxBu7L2T90n-V5jycLVc5_B12BWOKaVbdML5_sarO9YzYlhbhI8poWWmMYBHlHz3kdhas9y-LIQYiXM_ZUlg6Prr7dQkl0Baz__0S3-5b2JJjQ-m4rYfRyzI0ipnvQuPnEjPyLTxzwgtEXOVu9p5ckNOtKE2UCBSu-XWIhp9QByVnRgmevJ62pdNDSh1X_MvnKp5TJ4jGZKJAZZSFT_v_fF6W5t-_nd9lnYLPyIpUo9bB77MyWvkktBS4g5R7_MdU4sksLfCd0aFyg"

    // config.headers = {
    //     "Cookie": `user-auth-token=${dbGetJWTToken()};`
    // }
    // config.headers['user-auth-token'] = dbGetJWTToken();
    // hide = message.loading({content: 'Loading...', duration: 0});

    /* // Here: What can be done before sending a request according to business requirements: for example, my interface is used to export files. Because the returned stream is binary, you need to set the request response type as blob, which can be set here.
     if (config.url.includes('pur/contract/export')) {
         config.headers['responseType'] = 'blob'
     }
     // Here is the file upload, and the binary stream is sent, so you need to set the 'Content Type' of the request header
     if (config.url.includes('pur/contract/upload')) {
         config.headers['Content-Type'] = 'multipart/form-data'
     }*/
    return config;
  },
  (error) => {
    // What to do with request errors
    return Promise.reject(error);
  }
);

/** Add Response Interceptor  **/
instance.interceptors.response.use(
  (response) => {
    console.log('response', response.data.code);
    // hide()
    if (response.status === 200) {
      if (response.data.code === 403) {
        clearAccount();
        window.location.href = LOGIN;
      }
      return Promise.resolve(response.data);
    } else {
      // message.error('Response timeout')
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    // hide()
    if (error.response) {
      // Prompt the user according to the http status code of the failed request
      // let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
      // message.error(tips)
      // if (error.response.status === 400) {
      //     return Promise.reject(error.response.data)
      // }
      if (error.response.status === 401) {
        // If the token or login fails, you can jump to the login page. According to the actual situation, you can do the corresponding things here according to different response error results. Take 401 judgment as an example
        // Jump to the login page for the framework
        // this.props.history.push(LOGIN);
        clearAccount();
        window.location.href = LOGIN;
      }
      if (error.response.status === 500) {
        error.response.data.msg = 'Internal Server Error';
      } else {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    } else {
      // message.error('Request timeout, please refresh and try again')
      return Promise.reject('Request timeout, please refresh and try again');
    }
  }
);

/* Uniformly encapsulate get requests */
export const get = (url: string, params: any, config: any = {}): any => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((response) => {
        // response.code = 1000;
        resolve(response);
      })
      .catch((error) => {
        // error.code = -1;
        reject(error);
      });
  });
};

/* Uniformly encapsulate post requests  */
export const post = (url: string, data: any, config: any = {}): any => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        // response.code = 1000;
        resolve(response);
      })
      .catch((error) => {
        // error.code = -1;
        reject(error);
      });
  });
};
