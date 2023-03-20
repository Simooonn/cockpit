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
export const getUserInfo = (p: any = {}) => apiGet('/user/info', p);

export const getCreditsList = (p: any) => apiGet('/credits/page', p);
export const addMerchantCredits = (p: any) => apiPost('/credits/add', p);

export const getApplicationList = (p: any) => apiGet('/merchant/page', p);
// export const getApplicationList = (p:any) => apiGet('/list2', p);
export const merchantApplicationReview = (p: any) =>
  apiPost('/merchant/review', p);
export const merchantApplicationEdit = (p: any) => apiPost('/merchant/edit', p);

export const getCreditRewordList = (p: any) =>
  apiGet('/merchant/creditPage', p);

export const getCreditList = (p: any) => apiGet('/merchant/balancePage', p);
export const updateMerchantCredit = (p: any) =>
  apiPost('/merchant/updateCredit', p);

export const getTokenList = (p: any) => apiGet('/merchant/tokenPage', p);
