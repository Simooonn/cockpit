import setupMock from '@/utils/setupMock'
// const getMiningList = () => {
//   const list = [
//     {
//       id: 1,
//       sn: 'sn1',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       sn: 'sn2',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       sn: 'sn3',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       sn: 'sn4',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 5,
//       sn: 'sn5',
//       status: 1,
//       content: '宁静提交于 2021-11-05，需要您在 2011-11-07之前审批',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 6,
//       sn: 'sn6',
//       status: 1,
//       content: '您的产品使用期限即将截止，如需继续使用产品请前往购…',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 7,
//       sn: 'sn7',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
//
// const getUserList = () => {
//   const list = [
//     {
//       id: 1,
//       did: 'did1',
//       email: 'aa@11.com',
//       phone: '7378389393',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       did: 'did2',
//       email: 'aa@11.com',
//       phone: '7378389393',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       did: 'did3',
//       email: 'aa@11.com',
//       phone: '7378389393',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       did: 'did4',
//       email: 'aa@11.com',
//       phone: '7378389393',
//       status: 1,
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
//
// const getCheckingHistory = () => {
//   const list = [
//     {
//       id: 1,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
//
// const getWiFIConnections = () => {
//   const list = [
//     {
//       id: 1,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       WifiSSID: 'wifi_ssid1',
//       MacAddress: 'mac_address1',
//       ConnectionTime: '2023-03-30T18:09:23Z',
//       DisconnectionTime: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       WifiSSID: 'wifi_ssid1',
//       MacAddress: 'mac_address1',
//       ConnectionTime: '2023-03-30T18:09:23Z',
//       DisconnectionTime: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       WifiSSID: 'wifi_ssid1',
//       MacAddress: 'mac_address1',
//       ConnectionTime: '2023-03-30T18:09:23Z',
//       DisconnectionTime: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       WifiSSID: 'wifi_ssid1',
//       MacAddress: 'mac_address1',
//       ConnectionTime: '2023-03-30T18:09:23Z',
//       DisconnectionTime: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
//
// const getContactList = () => {
//   const list = [
//     {
//       id: 1,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       phone: '3938388478',
//       MacAddress: 'MacAddress1',
//       createdAt: '2023-03-30T18:09:23Z',
//       LastVisit: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       phone: '3938388478',
//       MacAddress: 'MacAddress1',
//       createdAt: '2023-03-30T18:09:23Z',
//       LastVisit: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       phone: '3938388478',
//       MacAddress: 'MacAddress1',
//       createdAt: '2023-03-30T18:09:23Z',
//       LastVisit: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       user_name: 'Simon1',
//       email: 'aa@11.com',
//       phone: '3938388478',
//       MacAddress: 'MacAddress1',
//       createdAt: '2023-03-30T18:09:23Z',
//       LastVisit: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
// const getUserFeedbacks = () => {
//   const list = [
//     {
//       id: 1,
//       email: 'aa@11.com',
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       email: 'aa@11.com',
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       email: 'aa@11.com',
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       email: 'aa@11.com',
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
// const getDictionaryList = () => {
//   const list = [
//     {
//       id: 1,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
// const getSystemParameterList = () => {
//   const list = [
//     {
//       id: 1,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       key: 'Simon1',
//       value: 'aa@11.com',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
// const getSignInLogs = () => {
//   const list = [
//     {
//       id: 1,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };
// const getOperateLogs = () => {
//   const list = [
//     {
//       id: 1,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 2,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//     {
//       id: 3,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//
//     {
//       id: 4,
//       content: 'content1',
//       createdAt: '2023-03-30T18:09:23Z',
//     },
//   ];
//
//   return {
//     code: 200,
//     msg: 'success',
//     data: { list: list, total: list.length },
//   };
// };

setupMock({
    setup: () => {
    // //mining
    // Mock.mock(new RegExp('/merchant/mining_list'), () => {
    //   return getMiningList();
    // });
    // Mock.mock(new RegExp('/merchant/mining_update'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    // Mock.mock(new RegExp('/merchant/mining_delete'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    //
    // //user_list
    // Mock.mock(new RegExp('/merchant/user_list'), () => {
    //   return getUserList();
    // });
    // // Mock.mock(new RegExp('/merchant/user_add'), () => {
    // //   return  {code:200,msg:'success',data:[]};
    // // });
    // Mock.mock(new RegExp('/merchant/user_edit'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    //
    // //checkInHistory
    // Mock.mock(new RegExp('/merchant/checkInHistory'), () => {
    //   return getCheckingHistory();
    // });
    //
    // //wifiConnections
    // Mock.mock(new RegExp('/merchant/wifiConnections'), () => {
    //   return getWiFIConnections();
    // });
    //
    // //contactList
    // Mock.mock(new RegExp('/merchant/contactList'), () => {
    //   return getContactList();
    // });
    //
    // //user_feedbacks
    // Mock.mock(new RegExp('/merchant/user_feedbacks'), () => {
    //   return getUserFeedbacks();
    // });
    // Mock.mock(new RegExp('/merchant/close_user_feedback'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    //
    // //dictionary_list
    // Mock.mock(new RegExp('/merchant/dictionary_list'), () => {
    //   return getDictionaryList();
    // });
    // Mock.mock(new RegExp('/merchant/dictionary_add'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    // Mock.mock(new RegExp('/merchant/dictionary_edit'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    // Mock.mock(new RegExp('/merchant/dictionary_del'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    //
    // //systemParameter_list
    // Mock.mock(new RegExp('/merchant/systemParameter_list'), () => {
    //   return getSystemParameterList();
    // });
    // Mock.mock(new RegExp('/merchant/systemParameter_add'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    // Mock.mock(new RegExp('/merchant/systemParameter_edit'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    // Mock.mock(new RegExp('/merchant/systemParameter_del'), () => {
    //   return { code: 200, msg: 'success', data: [] };
    // });
    //
    // Mock.mock(new RegExp('/merchant/signInLogs'), () => {
    //   return getSignInLogs();
    // });
    // Mock.mock(new RegExp('/merchant/operateLogs'), () => {
    //   return getOperateLogs();
    // });
    },
})
