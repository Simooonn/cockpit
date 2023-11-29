import React, { ReactNode, useEffect, useState } from 'react';
import {
  Card,
  Divider,
  Grid, Message,
  Select,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from '@arco-design/web-react';
import { useSelector } from 'react-redux';
import locale from '@/locale';
import useLocale from '@/utils/useLocale';
import * as eCharts from 'echarts';
import {
  ChartGroup,
  ChartToday,
  ChartTotal, minerMapView, userLogin,
} from '@/request/api';
import styles from '@/pages/dashboard/style/overview.module.less';
import {array_column, getDay, getToken, setJWTToken, setMinerMapData, setToken} from "@/utils/function";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import App  from "@/pages/minerMap";
const ApoApiURL = 'https://api.thegraph.com/subgraphs/name/simooonn/metablox-cockpit';
const ApoClient = new ApolloClient({
  uri: ApoApiURL,
  cache: new InMemoryCache(),
});
const { Row, Col } = Grid;
const { Title } = Typography;
const Option = Select.Option;
const timestamp = Date.parse(Date())/1000;

const TimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
function Overview() {
  console.log('timestamp',timestamp);

  const t = useLocale(locale);
  // const eChartsRef: any = React.createRef();
  const [todayData, setTodayData] = useState<any>({});
  const [todayHeartbeat, setTodayHeartbeat] = useState<any>('');
  const [totalData, setTotalData] = useState<any>({});
  const [totalHeartbeat, setTotalHeartbeat] = useState<any>('');
  const [registerTotalCount, setRegisterTotalCount] = useState('');
  const [date1, setDate1] = useState<'month' | 'week' | 'day'>('month');
  const [date2, setDate2] = useState<'month' | 'week' | 'day'>('month');
  const [date3, setDate3] = useState<'month' | 'week' | 'day'>('month');
  const [date4, setDate4] = useState<'month' | 'week' | 'day'>('month');
  const [date5, setDate5] = useState<'month' | 'week' | 'day'>('month');
  const [date6, setDate6] = useState<'month' | 'week' | 'day'>('month');
  const [data1, setData1] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const [data3, setData3] = useState<any>({});
  const [data4, setData4] = useState<any>({});
  const [data5, setData5] = useState<any>({});
  const [data6, setData6] = useState<any>({});
  const eChartsRef1: any = React.createRef();
  // const eChartsRef2: any = React.createRef();
  const eChartsRef3: any = React.createRef();
  const eChartsRef4: any = React.createRef();
  const eChartsRef5: any = React.createRef();
  const eChartsRef6: any = React.createRef();

  const optionsDate = [
    // { code: 'day', name: 'Day' },
    { code: 'week', name: 'Week' },
    { code: 'month', name: 'Month' },
  ];

  type StatisticItemType = {
    icon?: ReactNode;
    title?: ReactNode;
    count?: ReactNode;
    loading?: boolean;
    unit?: ReactNode;
  };
  function StatisticItem(props: StatisticItemType) {
    const {
      // icon,
      title, count, loading, unit } = props;
    return (
      <div className={styles.item}>
        {/*<div className={styles.icon}>{icon}</div>*/}
        <div>
          <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
            <div className={styles.title}>{title}</div>
            <div className={styles.count}>
              {count}
              <span className={styles.unit}>{unit}</span>
            </div>
          </Skeleton>
        </div>
      </div>
    );
  }

  type PublicOpinionCardProps = {
    key1: number;
    title: string;
    count: number;
    loading?: boolean;
  };
  function PublicOpinionCard(props: PublicOpinionCardProps) {
    const { key1, title, count, loading } = props;
    const bgColor = {
      'bg-1': 'linear-gradient(180deg, #D25F00 0%, #BE5703 100%)',
      'bg-2': 'linear-gradient(180deg, #C51D23 0%, #921116 100%)',
      'bg-3': 'linear-gradient(180deg, #119284 0%, #0A6057 100%)',
      'bg-4': 'linear-gradient(180deg, #284991 0%, #122b62 100%)',
      'bg-5': 'linear-gradient(180deg, #3d492e 0%, #263827 100%)',
      'bg-6': 'linear-gradient(180deg, #312565 0%, #201936 100%)',
    };

    return (
      <div
        style={{
          background: bgColor['bg-' + key1],
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        <div className={styles.statistic}>
          <Statistic
            title={
              <Title heading={6} className={styles.title}>
                {title}
              </Title>
            }
            loading={loading}
            value={count}
            groupSeparator
          />
        </div>
      </div>
    );
  }

  const fetchData = () => {
    ChartToday({
      loc:TimeZone
    }).then((res) => {
      const { code } = res;
      const data = res?.data ?? {};
      if (code == 200) {
        setTodayData(data);
      }
    });

    ChartTotal({
      loc:TimeZone
    }).then((res) => {
      const { code } = res;
      const data = res?.data ?? {};
      if (code == 200) {
        setTotalData(data);
      }
    });

    // getDayHeartbeat().then((res) => {
    //   const data = {
    //     time:[],
    //     count:[],
    //   }
    //   for (const resKey in res) {
    //     data.time = [...data.time,res[resKey]?.time]
    //     data.count = [...data.count,res[resKey]?.count]
    //   }
    //   setData2(data);
    // });

    ChartGroup({
      group: date1,
      loc:TimeZone
      // loc:(0 - new Date().getTimezoneOffset() / 60)
    }).then((res) => {
      const { code } = res;
      const data = res?.data ?? {};
      if (code == 200) {
        setData1(data);
        setData3(data);
        setData4(data);
        setData5(data);
        setData6(data);
      }
    });
  };

  const fetchChartData = (type = 1) => {
    if(type === 1){
      ChartGroup({
        group: date1,
        loc:TimeZone
        // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
        const { code } = res;
        const data = res?.data ?? {};
        if (code == 200) {
          setData1(data);
        }
      });
    }
    // else if(type === 2){
    //   ChartGroup({
    //     group: date2,
    //     loc:TimeZone
    //     // loc:(0 - new Date().getTimezoneOffset() / 60)
    //   }).then((res) => {
    //     const { code } = res;
    //     const data = res?.data ?? {};
    //     if (code == 200) {
    //       setData2(data);
    //     }
    //   });
    // }
    else if(type === 3){
      ChartGroup({
        group: date3,
        loc:TimeZone
        // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
        const { code } = res;
        const data = res?.data ?? {};
        if (code == 200) {
          setData3(data);
        }
      });
    }
    else if(type === 4){
      ChartGroup({
        group: date4,
        loc:TimeZone
        // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
        const { code } = res;
        const data = res?.data ?? {};
        if (code == 200) {
          setData4(data);
        }
      });
    }
    else if(type === 5){
      ChartGroup({
        group: date5,
        loc:TimeZone
        // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
        const { code } = res;
        const data = res?.data ?? {};
        if (code == 200) {
          setData5(data);
        }
      });
    }
    else if(type === 6){
      ChartGroup({
        group: date6,
        loc:TimeZone
        // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
        const { code } = res;
        const data = res?.data ?? {};
        if (code == 200) {
          setData6(data);
        }
      });
    }
  };

  const dateConversion = (date = '',type='day') => {
    let data = ''
    if(type === 'day'){
      data = date.replaceAll('-','.')
    }
    else if(type === 'week'){
      data = date.substr(0,4)+',Week'+date.substr(4,2)
    }
    else if(type === 'month'){
      const month = {
        month1:'Jan.',
        month2:'Feb.',
        month3:'Mar.',
        month4:'Apr.',
        month5:'May.',
        month6:'Jun.',
        month7:'Jul.',
        month8:'Aug.',
        month9:'Sep.',
        month10:'Oct.',
        month11:'Nov.',
        month12:'Dec.',
      }
      data = month?.['month'+date]
    }
    else {
      data = date
    }
    return data
  }

  // const initChartMiners = () => {
  //   const myChart = eCharts.init(eChartsRef.current, 'dark', {
  //     renderer: 'svg',
  //   });
  //   const option = {
  //     // color:[
  //     //   "rgb(73, 146, 255)",
  //     //   "rgb(124, 255, 178)",
  //     //   "rgb(253, 221, 96)",
  //     //   "rgb(255, 110, 118)",
  //     //   "rgb(88, 217, 249)",
  //     //   "rgb(5, 192, 145)",
  //     //   "rgb(255, 138, 69)",
  //     // ],
  //     title: {
  //       text: 'Total WiFi',
  //       // subtext: 'Fake Data',
  //       // left: 'center'
  //     },
  //     backgroundColor: '#ffffff00',
  //     tooltip: {
  //       //     trigger: 'item'
  //     },
  //     legend: {
  //       left: 'center',
  //     },
  //     label: {
  //       show: true,
  //       formatter(param) {
  //         // correct the percentage
  //         return param.name + ' (' + param.percent + '% , '+param.value+')';
  //       }
  //     },
  //     series: [
  //       {
  //         name: 'Miners',
  //         type: 'pie',
  //         radius: '50%',
  //         data: [
  //           {
  //             value: totalData?.totalMetabloxMinerNum ?? 0,
  //             name: 'OpenRoaming WiFi',
  //             color: '#ffffff',
  //             background: '#ffffff',
  //           },
  //           {
  //             value: totalData?.totalLiteMinerNum ?? 0,
  //             name: 'Community WiFi',
  //           },
  //           // {
  //           //   value: 12,
  //           //   name: 'Public Free WiFi',
  //           // },
  //         ],
  //         emphasis: {
  //           itemStyle: {
  //             // shadowBlur: 10,
  //             // shadowOffsetX: 0,
  //             // shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           },
  //         },
  //       },
  //     ],
  //   };
  //   myChart.setOption(option);
  // };

  const initLineOption = (color,chartTitle,lineTitle,xData,yData) => {
    return {
      color:[
        color,
      ],
      backgroundColor: '#ffffff00',
      title: {
        text: chartTitle,
      },
      legend: {
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
      },
      yAxis: {
        type: 'value',
        max: function (value) {
          return value.max <= 5 ? 5: null;
        }
      },
      series: [
        {
          name: lineTitle,
          data: yData,
          type: 'line',
          smooth: 0.3,
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          areaStyle:{
            opacity: 0.2,
          }
        },
      ],
    };


  }

  const initChart1 = () => {
    const myChart = eCharts.init(eChartsRef1.current, 'dark', {
      renderer: 'svg',
    });
    const xData = (data1?.time ?? [])?.map(ittt=>{
      return dateConversion(ittt,date1)
    })
    const yData = data1?.check ?? []
    xData.pop()
    yData.pop()
    myChart.setOption(initLineOption( "rgb(73, 146, 255)",'Check in Growth Quantity','Check In',xData,yData))
  };

  // const initChart2 = () => {
  //   const myChart = eCharts.init(eChartsRef2.current, 'dark', {
  //     renderer: 'svg',
  //   });
  //
  //   const xData = (data2?.time ?? [])?.map(ittt=>{
  //     return '2023.'+ittt.replace('-','.')
  //   })
  //   const yData = data2?.count ?? []
  //   myChart.setOption(initLineOption( "rgb(124, 255, 178)",'Heartbeat trading Growth Quantity','Heartbeat trading',xData,yData))
  // };
  //
  const initChart3 = () => {
    let nnum = data3?.memberBase
    const myChart = eCharts.init(eChartsRef3.current, 'dark', {
      renderer: 'svg',
    });

    const xData =  (data3?.time ?? [])?.map(ittt=>{
      return dateConversion(ittt,date3)
    })
    const yData = (data3?.member ?? [])?.map(ittt=>{
      nnum = nnum + ittt
      return nnum
    })
    myChart.setOption(initLineOption( "rgb(253, 221, 96)",'Accumulated number of App User','App User',xData,yData))
  };

  const initChart4 = () => {
    let nnum = data4?.wiFiBase
    const myChart = eCharts.init(eChartsRef4.current, 'dark', {
      renderer: 'svg',
    });

    const xData = (data4?.time ?? [])?.map(ittt=>{
      return dateConversion(ittt,date4)
    })
    const yData = (data4?.wifi ?? [])?.map(ittt=>{
      nnum = nnum + ittt
      return nnum
    })
    myChart.setOption(initLineOption( "rgb(255, 110, 118)",'Accumulated number of New Added WiFi','New Added WiFi',xData,yData))
  };

  const initChart5 = () => {
    let nnum = data5?.pointBase
    const myChart = eCharts.init(eChartsRef5.current, 'dark', {
      renderer: 'svg',
    });

    const xData = (data5?.time ?? [])?.map(ittt=>{
      return dateConversion(ittt,date5)
    })
    const yData = (data5?.point ?? [])?.map(ittt=>{
      nnum = nnum + ittt
      return nnum
    })
    myChart.setOption(initLineOption( "rgb(88, 217, 249)",'Accumulated number of Issued mPoints','Issued mPoints',xData,yData))
  };

  const initChart6 = () => {
    let nnum = data6?.stickerBase
    const myChart = eCharts.init(eChartsRef6.current, 'dark', {
      renderer: 'svg',
    });

    const xData = (data6?.time ?? [])?.map(ittt=>{
      return dateConversion(ittt,date6)
    })
    const yData = (data6?.sticker ?? [])?.map(ittt=>{
      nnum = nnum + ittt
      return nnum
    })
    myChart.setOption(initLineOption( "rgb(255, 138, 69)",'Accumulated number of Issued Stickers','Issued Stickers',xData,yData))
  };

  const initMapData = async () => {
    //init miner map data
    const formData = {
      latitude: 0,
      longitude: 0,
      page: 1,
      size: 1000,
    }
    let data = [];
    const res = await minerMapView(formData);
    if (res?.code !== 200) {
      Message.error(res?.code);
      return false;
    }
    data = res?.data?.list??[]
    const totalPageNum = Math.ceil(res?.data?.total/formData.size)
    if(totalPageNum > 1){
      for (let i = 2; i <= totalPageNum; i++) {
        const re0 = await minerMapView({...formData,page:i});
        if (re0?.code !== 200) {
          Message.error(re0?.code);
          return false;
        }
        data = [...data,...(re0?.data?.list??[])]
      }
    }
    setMinerMapData(data);
    return true
  }

  const getHeartbeatTotalCount = async () => {
    const tokensQuery = `
  query MyQuery {
  heartbeatSummaries {
    totalCount
  }
}
`;
    ApoClient.query({
      query: gql(tokensQuery),
    })
        .then((data) => {
          setTotalHeartbeat(data?.data?.heartbeatSummaries?.[0]?.totalCount ?? 0)
        })
        .catch((err) => {
          console.log('Error fetching heartbeatSummaries: ', err);
        });
  };

  const getTodayHeartbeat = async () => {
    const date1 = getDay(0);
    const tokensQuery = `
    query MyQuery($id: String) {
     heartbeatDailySummary(id:$id) {
    id
    count
  }
}
`;
    ApoClient.query({
      query: gql(tokensQuery),
      variables: {
        id: date1,
        // id: '2023-3-21',
      },
    })
        .then((rr) => {
          setTodayHeartbeat(rr?.data?.heartbeatDailySummary?.count ?? 0);
          return rr.data;
        })
        .catch((err) => {
          console.log('Error fetching heartbeatDailySummary: ', err);
        });
  };
  const getRegisterTotalCount = async () => {
    const tokensQuery = `
  query MyQuery {
  registeredSummaries {
    totalCount
  }
}
`;
    ApoClient.query({
      query: gql(tokensQuery),
    })
        .then((data) => {
          setRegisterTotalCount(
              data?.data?.registeredSummaries?.[0]?.totalCount ?? 0
          );
        })
        .catch((err) => {
          console.log('Error fetching registeredSummaries: ', err);
        });
  };

  const getDayHeartbeat = async () => {
    const day1 = getDay(-16);
    const day2 = getDay(0);
    const tokensQuery = `
    query MyQuery($id_gte: String,$id_lt: String) {
     heartbeatDailySummaries(first:1000,where: {id_gte: $id_gte, id_lt: $id_lt}
  ) {
    id
    count
  }
}
`;
    return ApoClient.query({
      query: gql(tokensQuery),
      variables: {
        id_gte: day1,
        id_lt: day2,
      },
    })
        .then((rr) => {
          const dataList = [];
          const res = rr.data?.heartbeatDailySummaries;
          for (const rrKey in res) {
            dataList.push({
              name: 'Heartbeat',
              time: res[rrKey]?.id.slice(5),
              count: parseInt(res[rrKey]?.count),
            });
          }
          return dataList;
        })
        .catch((err) => {
          console.log('Error fetching getRegisterTotalCount: ', err);
          return [];
        });
  };


  // useEffect(() => {
  //   initChartMiners();
  // }, [totalData]);
  useEffect(() => {
    initChart1();
  }, [data1]);
  // useEffect(() => {
  //   initChart2();
  // }, [data2]);
  useEffect(() => {
    initChart3();
  }, [data3]);
  useEffect(() => {
    initChart4();
  }, [data4]);
  useEffect(() => {
    initChart5();
  }, [data5]);
  useEffect(() => {
    initChart6();
  }, [data6]);
  useEffect(() => {
      fetchChartData(1);
  }, [date1]);
  useEffect(() => {
    fetchChartData(2);
  }, [date2]);
  useEffect(() => {
    fetchChartData(3);
  }, [date3]);
  useEffect(() => {
    fetchChartData(4);
  }, [date4]);
  useEffect(() => {
    fetchChartData(5);
  }, [date5]);
  useEffect(() => {
    fetchChartData(6);
  }, [date6]);
  useEffect(() => {
    // const password = '@#dappley792&*'
    // const password = 'dappley792'
    // userLogin({ username: 'admin', password: password }).then(
    //     async (res) => {
    //       const { code, msg, data } = res;
    //       if (code == 200) {
    //         setToken(data?.token);
            fetchData();
            // initMapData()
    //       }
    //     }
    // );
    // getHeartbeatTotalCount()
    // getTodayHeartbeat()
    // getRegisterTotalCount()
  }, []);


  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row>
        <Col span={24}>
          <Card>
            {/*<Typography.Title heading={6}>Total</Typography.Title>*/}
            <Row>

              {/*</Col>*/}
              {/*<Divider type="vertical" className={styles.divider} />*/}
              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*    // icon={<IconCalendar />}*/}
              {/*    title={'Check In'}*/}
              {/*    count={totalData?.totalCheckNum ?? ''}*/}
              {/*    loading={false}*/}
              {/*    unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}

              {/*<Divider type="vertical" className={styles.divider} />*/}
              <Col flex={1}>
                <StatisticItem
                  // icon={<IconContent />}
                  title={'Daily User growth'}
                  count={todayData?.todayMemberNum ?? ''}
                  loading={false}
                  unit={''}
                />
              </Col>
              <Divider type="vertical" className={styles.divider} />
              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*      // icon={<IconContent />}*/}
              {/*      title={'Total Added WiFi'}*/}
              {/*      count={totalData?.totalWiFiNum ?? ''}*/}
              {/*      loading={false}*/}
              {/*      unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}
              {/*<Divider type="vertical" className={styles.divider} />*/}
              <Col flex={1}>
                <StatisticItem
                    // icon={<IconContent />}
                    title={'Total Miners'}
                    count={totalData?.totalWiFiNum ?? ''}
                    loading={false}
                    unit={''}
                />
              </Col>

              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*    // icon={<IconContent />}*/}
              {/*    title={'Issued mPoints'}*/}
              {/*    count={totalData?.totalPointsNum ?? ''}*/}
              {/*    loading={false}*/}
              {/*    unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}
              {/*<Divider type="vertical" className={styles.divider} />*/}

              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*      // icon={<IconContent />}*/}
              {/*      title={'Issued Stickers'}*/}
              {/*      count={totalData?.totalStickerNum ?? ''}*/}
              {/*      loading={false}*/}
              {/*      unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}
              {/*<Divider type="vertical" className={styles.divider} />*/}

              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*      // icon={<IconContent />}*/}
              {/*      title={'Heartbeat trading'}*/}
              {/*      count={totalHeartbeat}*/}
              {/*      loading={false}*/}
              {/*      unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}
              {/*<Divider type="vertical" className={styles.divider} />*/}

              {/*<Col flex={1}>*/}
              {/*  <StatisticItem*/}
              {/*      // icon={<IconContent />}*/}
              {/*      title={'Nodes'}*/}
              {/*      count={registerTotalCount}*/}
              {/*      loading={false}*/}
              {/*      unit={''}*/}
              {/*  />*/}
              {/*</Col>*/}

            </Row>
          </Card>
        </Col>
      </Row>
      {/*<Row>*/}
      {/*  <Col span={24}>*/}
      {/*    <Card>*/}
      {/*      <Typography.Title heading={6}>Change of Today</Typography.Title>*/}
      {/*      <div>*/}
      {/*        <Row gutter={20}>*/}
      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*                key1={2}*/}
      {/*                title={'Added WiFi'}*/}
      {/*                count={todayData?.todayWiFiNum ?? ''}*/}
      {/*                loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}
      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*              key1={1}*/}
      {/*              title={'Check In'}*/}
      {/*              count={todayData?.todayCheckNum ?? ''}*/}
      {/*              loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}

      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*              key1={3}*/}
      {/*              title={'App User'}*/}
      {/*              count={todayData?.todayMemberNum ?? ''}*/}
      {/*              loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}
      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*              key1={4}*/}
      {/*              title={'Issued mPoints'}*/}
      {/*              count={todayData?.todayPointsNum ?? ''}*/}
      {/*              loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}
      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*              key1={5}*/}
      {/*              title={'Issued Stickers'}*/}
      {/*              count={todayData?.todayStickerNum ?? ''}*/}
      {/*              loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}
      {/*          <Col flex={1}>*/}
      {/*            <PublicOpinionCard*/}
      {/*              key1={6}*/}
      {/*              title={'Heartbeat trading'}*/}
      {/*              count={todayHeartbeat}*/}
      {/*              loading={false}*/}
      {/*            />*/}
      {/*          </Col>*/}
      {/*        </Row>*/}
      {/*      </div>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/*<Card>*/}
      {/*  <div className={'flex flex-row justify-between'}>*/}
      {/*    <div*/}
      {/*      ref={eChartsRef}*/}
      {/*      style={{*/}
      {/*        width: '100%',*/}
      {/*        height: 400,*/}
      {/*      }}*/}
      {/*    ></div>*/}
      {/*  </div>*/}
      {/*</Card>*/}
      <Card>
        <div className={styles.title} style={{fontSize:'18px',fontWeight:'bold'}}>Miner Map</div>

        <App></App>
      </Card>
      <Card>
        <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
          <Select
            // placeholder='Day'
            style={{ width: 100 }}
            size={'large'}
            bordered={false}
            defaultValue={'month'}
            onChange={(value) => setDate1(value)}
          >
            {optionsDate.map((option, index) => (
              <Option key={index} value={option.code}>
                {option.name}
              </Option>
            ))}
          </Select>
        </div>
        <div
          ref={eChartsRef1}
          style={{
            width: '100%',
            height: 500,
          }}
        ></div>
      </Card>
      {/*<Card>*/}
      {/*  <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>*/}
      {/*    /!*<Select*!/*/}
      {/*    /!*    // placeholder='Day'*!/*/}
      {/*    /!*    style={{ width: 100 }}*!/*/}
      {/*    /!*    size={'large'}*!/*/}
      {/*    /!*    bordered={false}*!/*/}
      {/*    /!*    defaultValue={'month'}*!/*/}
      {/*    /!*    onChange={(value) => setDate2(value)}*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  {optionsDate.map((option, index) => (*!/*/}
      {/*    /!*      <Option key={index} value={option.code}>*!/*/}
      {/*    /!*        {option.name}*!/*/}
      {/*    /!*      </Option>*!/*/}
      {/*    /!*  ))}*!/*/}
      {/*    /!*</Select>*!/*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*      ref={eChartsRef2}*/}
      {/*      style={{*/}
      {/*        width: '100%',*/}
      {/*        height: 500,*/}
      {/*      }}*/}
      {/*  ></div>*/}
      {/*</Card>*/}
      <Card>
        <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
          <Select
            // placeholder='Day'
              style={{ width: 100 }}
              size={'large'}
            bordered={false}
            defaultValue={'month'}
            onChange={(value) => setDate3(value)}
          >
            {optionsDate.map((option, index) => (
              <Option key={index} value={option.code}>
                {option.name}
              </Option>
            ))}
          </Select>
        </div>
        <div
          ref={eChartsRef3}
          style={{
            width: '100%',
            height: 500,
          }}
        ></div>
      </Card>
      <Card>
        <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
          <Select
              // placeholder='Day'
              style={{ width: 100 }}
              size={'large'}
              bordered={false}
              defaultValue={'month'}
              onChange={(value) => setDate4(value)}
          >
            {optionsDate.map((option, index) => (
                <Option key={index} value={option.code}>
                  {option.name}
                </Option>
            ))}
          </Select>
        </div>
        <div
            ref={eChartsRef4}
            style={{
              width: '100%',
              height: 500,
            }}
        ></div>
      </Card>
      <Card>
        <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
          <Select
              // placeholder='Day'
              style={{ width: 100 }}
              size={'large'}
              bordered={false}
              defaultValue={'month'}
              onChange={(value) => setDate5(value)}
          >
            {optionsDate.map((option, index) => (
                <Option key={index} value={option.code}>
                  {option.name}
                </Option>
            ))}
          </Select>
        </div>
        <div
            ref={eChartsRef5}
            style={{
              width: '100%',
              height: 500,
            }}
        ></div>
      </Card>
      <Card>
        <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
          <Select
              // placeholder='Day'
              style={{ width: 100 }}
              size={'large'}
              bordered={false}
              defaultValue={'month'}
              onChange={(value) => setDate6(value)}
          >
            {optionsDate.map((option, index) => (
                <Option key={index} value={option.code}>
                  {option.name}
                </Option>
            ))}
          </Select>
        </div>
        <div
            ref={eChartsRef6}
            style={{
              width: '100%',
              height: 500,
            }}
        ></div>
      </Card>
    </Space>
  );
}

export default Overview;
