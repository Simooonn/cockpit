import { get, post } from './http';
const apiGet = (url: string, p: any) =>
  get(url, p)
    .then((res: any) => {
      return res;
    })
    .catch((ee: any) => {
      return ee;
    });
const apiPost = (url: string, p: any, config: any = {}) =>
  post(url, p, config)
    .then((res: any) => {
      return res;
    })
    .catch((ee: any) => {
      return ee;
    });

export const userLogin = (p: any) => apiPost('/user/login', p);
export const getUserInfo = (p: any = {}) => apiGet('/user/info', p);
export const userLoginOut = (p: any) => apiPost('/user/logout', p);

export const uploadFile = (p: any) =>
  apiPost('/file/upload', p, { content_type: 'multipart/form-data' });
export const getDiCtData = (p?: any) => apiGet('/dict/list', p);
export const minerMapView = (p: any) => apiGet('/mapview/page', p);
export const ChartToday = (p: any) => apiGet('/stats/today', p);
export const ChartTotal = (p: any) => apiGet('/stats/total', p);
export const ChartGroup = (p: any) => apiGet('/stats/group', p);

