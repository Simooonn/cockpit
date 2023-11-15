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
export const userChangePassword = (p: any) =>
  apiPost('/user/change-password', p);
export const getUserInfo = (p: any = {}) => apiGet('/user/info', p);
export const updateUserInfo = (p: any = {}) => apiPost('/user/update', p);
export const userLoginOut = (p: any) => apiPost('/user/logout', p);

export const uploadFile = (p: any) =>
  apiPost('/file/upload', p, { content_type: 'multipart/form-data' });
export const getDiCtData = (p?: any) => apiGet('/dict/list', p);

export const getCreditsList = (p: any) => apiGet('/credits/page', p);
export const addMerchantCredits = (p: any) => apiPost('/credits/add', p);

export const getMerchantReviewList = (p: any) =>
  apiGet('/merchant/store/application/page', p);
export const merchantReview = (p: any) =>
  apiPost('/merchant/store/application/review', p);
export const getMerchantList = (p: any) => apiGet('/merchant/page', p);
export const getStoreList = (p: any) => apiGet('/merchant/store/page', p);
export const addStore = (p: any) => apiPost('/merchant/store/create', p);
export const updateStore = (p: any) => apiPost('/merchant/store/update', p);
export const bindMiner = (p: any) => apiPost('/merchant/store/bind', p);
export const unbindMiner = (p: any) => apiPost('/merchant/store/unbind', p);
export const transferMiner = (p: any) => apiPost('/merchant/store/transfer', p);

export const merchantApplicationEdit = (p: any) => apiPost('/merchant/edit', p);
export const getCreditRewordList = (p: any) =>
  apiGet('/merchant/credit/page', p);
export const getBalanceList = (p: any) => apiGet('/merchant/balance/page', p);
export const getBalanceRecords = (p: any) => apiGet('/merchant/credit/page', p);
export const updateMerchantCredit = (p: any) =>
  apiPost('/merchant/credit/update', p);

export const getTokenList = (p: any) => apiGet('/merchant/token/page', p);

export const getMiningList = (p: any) => apiGet('/miner/page', p);
export const MiningCreate = (p: any) => apiPost('/miner/create', p);
export const MiningUpdate = (p: any) => apiPost('/miner/update', p);
export const MiningDelete = (p: any) => apiPost('/miner/delete', p);
export const MiningImportCheck = (p: any) => apiPost('/miner/import/parse', p);
export const MiningImport = (p: any) => apiPost('/miner/import', p);

export const getUserList = (p: any) => apiGet('/member/page', p);
export const addUser = (p: any) => apiPost('/merchant/user_add', p);
// export const editUser = (p: any) => apiPost('/merchant/user_edit', p);
export const getCheckingHistory = (p: any) =>
  apiGet('/member/checking/page', p);
export const getWiFIConnections = (p: any) =>
  apiGet('/miner/wifi/status/page', p);
export const getContactList = (p: any) => apiGet('/miner/wifi/guest/page', p);
export const getUserFeedbacks = (p: any) =>
  apiGet('/merchant/user_feedbacks', p);
export const closeUserFeedback = (p: any) =>
  apiPost('/merchant/close_user_feedback', p);

export const getStickerSeriesList = (p: any) =>
  apiGet('/sticker/series/page', p);
export const addStickerSeries = (p: any) =>
  apiPost('/sticker/series/create', p);
export const editStickerSeries = (p: any) =>
  apiPost('/sticker/series/update', p);
export const publishStickerSeries = (p: any) =>
  apiPost('/sticker/series/publish', p);
export const closeStickerSeries = (p: any) =>
  apiPost('/sticker/series/close', p);
export const delStickerSeries = (p: any) =>
  apiPost('/sticker/series/delete', p);
export const getStickerList = (p: any) => apiGet('/sticker/page', p);
export const addSticker = (p: any) => apiPost('/sticker/create', p);
export const editSticker = (p: any) => apiPost('/sticker/update', p);
export const delSticker = (p: any) => apiPost('/sticker/delete', p);

export const getDictionaryTypeList = (p: any) => apiGet('/dict/type/page', p);
export const addDictionaryType = (p: any) => apiPost('/dict/type/create', p);
export const editDictionaryType = (p: any) => apiPost('/dict/type/update', p);
export const delDictionaryType = (p: any) => apiPost('/dict/type/delete', p);
export const getDictionaryList = (p: any) => apiGet('/dict/data/page', p);
export const addDictionary = (p: any) => apiPost('/dict/data/create', p);
export const editDictionary = (p: any) => apiPost('/dict/data/update', p);
export const delDictionary = (p: any) => apiPost('/dict/data/delete', p);

export const getSystemParameterList = (p: any) => apiGet('/param/page', p);
export const addSystemParameter = (p: any) => apiPost('/param/create', p);
export const editSystemParameter = (p: any) => apiPost('/param/update', p);
export const delSystemParameter = (p: any) => apiPost('/param/delete', p);

export const getSignInLogs = (p: any) => apiGet('/loginLog/page', p);
export const delSignInLogs = (p: any) => apiPost('/loginLog/delete', p);
export const clearSignInLogs = (p: any) => apiPost('/loginLog/clear', p);
export const getOperateLogs = (p: any) => apiGet('/operLog/page', p);
export const delOperateLogs = (p: any) => apiPost('/operLog/delete', p);
export const clearOperateLogs = (p: any) => apiPost('/operLog/clear', p);

export const AdministratorsList = (p: any) => apiGet('/user/page', p);
export const AdministratorsCreate = (p: any) => apiPost('/user/create', p);
export const AdministratorsUpdate = (p: any) => apiPost('/user/update', p);
export const AdministratorsDelete = (p: any) => apiPost('/user/delete', p);
export const AdministratorsResetPassword = (p: any) =>
  apiPost('/user/reset-password', p);

export const minerMapView = (p: any) => apiGet('/mapview/page', p);

export const CronFuncList = (p: any) => apiGet('/cron/func/list', p);
export const CronTaskList = (p: any) => apiGet('/cron/page', p);
export const CronTaskCreate = (p: any) => apiPost('/cron/create', p);
export const CronTaskUpdate = (p: any) => apiPost('/cron/update', p);
export const CronTaskExec = (p: any) => apiPost('/cron/exec', p);
export const CronTaskDelete = (p: any) => apiPost('/cron/delete', p);

export const ChartToday = (p: any) => apiGet('/stats/today', p);
export const ChartTotal = (p: any) => apiGet('/stats/total', p);
export const ChartGroup = (p: any) => apiGet('/stats/group', p);
export const ChartLineCheckAndShare = (p: any) => apiGet('/stats/checkAndShare', p);
export const ChartLine = (p: any) => apiGet('/stats/memberAndMerchant', p);


export const LiteMinerList = (p: any) => apiGet('/user/wifi/page', p);
export const LiteMinerDelete = (p: any) => apiPost('/user/wifi/delBy', p);


export const ExportFileOfDay = (p: any) => apiGet('/stats/day', p);


export const getMemberPointRankingList = (p: any) => apiGet('/stats/memberPointRanking', p);
export const getMemberStickerRankingList = (p: any) => apiGet('/stats/memberStickerRanking', p);
export const getMemberCheckinRankingList = (p: any) => apiGet('/stats/memberCheckinRanking', p);
export const getMemberAddWiFiRankingList = (p: any) => apiGet('/stats/memberAddWiFiRanking', p);

