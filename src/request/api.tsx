import { get, post } from './http';
const apiGet = (url: string, p: any) =>
  get(url, p)
    .then((res: any) => {
      return res;
    })
    .catch((ee: any) => {
      return ee;
    });
const apiPost = (url: string, p: any) =>
  post(url, p)
    .then((res: any) => {
      return res;
    })
    .catch((ee: any) => {
      return ee;
    });
export const userLogin = (p: any) => apiPost('/user/login', p);

export const ChartToday = (p: any) => apiGet('/stats/today', p);
export const ChartTotal = (p: any) => apiGet('/stats/total', p);
export const ChartGroup = (p: any) => apiGet('/stats/group', p);
