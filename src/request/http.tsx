import axios from 'axios';
import { api_url, clearAccount, getToken } from '@/utils/function';
import Router from "next/router";

//Call apiURL of back-end interface
const ApiUrl =
  process.env.NEXT_APP_API_URL === 'false'
    ? api_url()
    : process.env.NEXT_APP_API_URL;

//Image link domain name
// const ImgUrl = process.env.REACT_APP_MODE === 'production' ? '' : ''
// console.log('location.port1',window.location.port);

// Login Route
const LOGIN = '/login';

// let hide = null

//Create an axis instance, where you can set the default configuration of the request
const instance = axios.create({
  timeout: 100000, // Set request timeout for 10s
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
    config.headers.token = getToken() === null ? '' : getToken();

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
    // hide()
    if (response.status === 200) {
      if (response.data.code === 401 || response.data.code === 403) {
        console.log('response400', response);
        // clearAccount();
        // Router.push(LOGIN);
      } else {
        console.log('response200', response);
      }

      return Promise.resolve(response.data);
    } else {
      console.log('response！200', response);
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
        console.log('error.response400', error.response);

        // If the token or login fails, you can jump to the login page. According to the actual situation, you can do the corresponding things here according to different response error results. Take 401 judgment as an example
        // Jump to the login page for the framework
        // this.props.history.push(LOGIN);
        // clearAccount();
        // Router.push(LOGIN);
      } else if (error.response.status === 500) {
        console.log('error.response500', error.response);

        error.response.data.msg = 'Internal Server Error';
      } else {
        console.log('error.response1else', error.response);

        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    } else {
      console.log('error.response2', error.response);

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
