// 数据总览
import React, { useEffect, useState, useMemo } from 'react';
import {
  Card,
  Typography,
  Grid,
  Statistic,
  Skeleton,
} from '@arco-design/web-react';
import {
  IconUser,
  IconEdit,
  IconHeart,
  IconThumbUp,
} from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from '../../../locale/visualization/multi-dimension-data-analysis';
import styles from './data-overview.module.less';
import MultiAreaLine from '@/components/Chart/multi-area-line';
import {getDay} from "@/utils/function";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
const ApoApiURL = 'https://api.thegraph.com/subgraphs/name/lingcoder/heartbeat'
const ApoClient = new ApolloClient({
  uri: ApoApiURL,
  cache: new InMemoryCache(),
})
const { Title } = Typography;
export default ({heartbeatTotalCount,registerTotalCount,todayHeartbeat,todayRegister}) => {
  const t = useLocale(locale);
  const [overview, setOverview] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const UTC0Time =  parseInt(((new Date(getDay(0))).getTime()/1000).toString())
  const nowTime =  parseInt(((new Date()).getTime()/1000).toString())


  const getDayHeartbeat = async (day = 0) => {
    const tokensQuery = `
    query MyQuery($first: Int,$skip: Int,$blockTimestamp_gte: BigInt,$blockTimestamp_lt: BigInt, $orderBy: BigInt, $orderDirection: String) {
     heartbeateds(first: $first,skip: $skip, orderBy: $orderBy,orderDirection: $orderDirection,where: {blockTimestamp_gte: $blockTimestamp_gte, blockTimestamp_lt: $blockTimestamp_lt}
  ) {
    id
    blockTimestamp
  }
}
`

    const date = getDay(day);
    const skip = 0;
    const first = 1000;
    let queryCount = 0;
    let totalCount = 0;
    let startTime = parseInt(((new Date(date)).getTime()/1000).toString());
    const endTime = startTime + 86399
    if(aaData?.[date.slice(5)]) {
      return     {name:'Heartbeat',time:date.slice(5),count:aaData?.[date.slice(5)]}
    }


    do {
      const res = await ApoClient.query({
        query: gql(tokensQuery),
        variables: {
          first: first,
          skip: skip,
          blockTimestamp_gte: startTime,
          blockTimestamp_lt: endTime,
          orderBy: 'blockTimestamp',
          orderDirection: 'asc',
        },
      })
          .then((rr) =>  {
            return rr.data;
          })
          .catch((err) => {
            console.log('Error fetching getRegisterTotalCount: ', err)
          })
      queryCount = res?.heartbeateds?.length;
      totalCount = totalCount + queryCount - 1;
      if(queryCount > 0){
        startTime = res?.heartbeateds?.[queryCount-1]?.blockTimestamp;
      }
    } while (queryCount === 1000);

    return     {name:'Heartbeat',time:date.slice(5),count:totalCount+1}
  };
  const getDayRegister = async (day = 0) => {
    const tokensQuery = `
    query MyQuery($first: Int,$skip: Int,$blockTimestamp_gte: BigInt,$blockTimestamp_lt: BigInt, $orderBy: BigInt, $orderDirection: String) {
     registereds(first: $first,skip: $skip, orderBy: $orderBy,orderDirection: $orderDirection,where: {blockTimestamp_gte: $blockTimestamp_gte, blockTimestamp_lt: $blockTimestamp_lt}
  ) {
    id
    blockTimestamp
  }
}
`

    const date = getDay(day);
    const skip = 0;
    const first = 1000;
    let queryCount = 0;
    let totalCount = 0;
    let startTime = parseInt(((new Date(date)).getTime()/1000).toString());
    const endTime = startTime + 86399
    if(bbData?.[date.slice(5)]) {
      return     {name:'Registration',time:date.slice(5),count:bbData?.[date.slice(5)]}
    }

    do {
      const res = await ApoClient.query({
        query: gql(tokensQuery),
        variables: {
          first: first,
          skip: skip,
          blockTimestamp_gte: startTime,
          blockTimestamp_lt: endTime,
          orderBy: 'blockTimestamp',
          orderDirection: 'asc',
        },
      })
          .then((rr) =>  {
            return rr.data;
          })
          .catch((err) => {
            console.log('Error fetching getRegisterTotalCount: ', err)
          })
      queryCount = res?.registereds?.length;
      totalCount = totalCount + queryCount - 1;
      if(queryCount > 0){
        startTime = res?.heartbeateds?.[queryCount-1]?.blockTimestamp;
      }
    } while (queryCount === 1000);

    return     {name:'Registration',time:date.slice(5),count:totalCount+1}
  };

  const aaData = {
    '02-22':0,
    '02-23':0,
    '02-24':268,
    '02-25':1617,
    '02-26':3410,
    '02-27':5229,
    '02-28':7478,
    '03-01':12067,
    '03-02':12280,
    '03-03':12199,
    '03-04':12248,
    '03-05':12228,
    '03-06':12227,
    '03-07':12232,
    '03-08':12380,
    '03-09':12206,
    '03-10':12218,
    '03-11':12251,
    '03-12':12222,
    '03-13':12231,
  }

  const bbData = {
    '02-22':0,
    '02-23':0,
    '02-24':120,
    '02-25':288,
    '02-26':292,
    '02-27':289,
    '02-28':632,
    '03-01':369,
    '03-02':0,
    '03-03':0,
    '03-04':0,
    '03-05':0,
    '03-06':0,
    '03-07':0,
    '03-08':0,
    '03-09':0,
    '03-10':0,
    '03-11':0,
    '03-12':0,
    '03-13':0,
  }
  const getData = async () => {
    setLoading(true);
    setLoading(false)
    // const { overviewData, chartData } = data;


    // const overviewData = [totalNum1,totalNum2,totalNum3]
    const dayF20 = await getDayHeartbeat(-20)
    const dayF19 = await getDayHeartbeat(-19)
    const dayF18 = await getDayHeartbeat(-18)
    const dayF17 = await getDayHeartbeat(-17)
    const dayF16 = await getDayHeartbeat(-16)
    const dayF15 = await getDayHeartbeat(-15)
    const dayF14 = await getDayHeartbeat(-14)
    const dayF13 = await getDayHeartbeat(-13)
    const dayF12 = await getDayHeartbeat(-12)
    const dayF11 = await getDayHeartbeat(-11)
    const dayF10 = await getDayHeartbeat(-10)
    const dayF9 = await getDayHeartbeat(-9)
    const dayF8 = await getDayHeartbeat(-8)
    const dayF7 = await getDayHeartbeat(-7)
    const dayF6 = await getDayHeartbeat(-6)
    const dayF5 = await getDayHeartbeat(-5)
    const dayF4 = await getDayHeartbeat(-4)
    const dayF3 = await getDayHeartbeat(-3)
    const dayF2 = await getDayHeartbeat(-2)
    const dayF1 = await getDayHeartbeat(-1)
    const totalNum1 = dayF20.count+dayF19.count+dayF18.count+dayF17.count+dayF16.count
        +dayF15.count+dayF14.count+dayF13.count+dayF12.count+dayF11.count
        +dayF10.count+dayF9.count+dayF8.count+dayF7.count+dayF6.count
        +dayF5.count+dayF4.count+dayF3.count+dayF2.count+dayF1.count;//todayNum1

    const ReDayF20 = await getDayRegister(-20)
    const ReDayF19 = await getDayRegister(-19)
    const ReDayF18 = await getDayRegister(-18)
    const ReDayF17 = await getDayRegister(-17)
    const ReDayF16 = await getDayRegister(-16)
    const ReDayF15 = await getDayRegister(-15)
    const ReDayF14 = await getDayRegister(-14)
    const ReDayF13 = await getDayRegister(-13)
    const ReDayF12 = await getDayRegister(-12)
    const ReDayF11 = await getDayRegister(-11)
    const ReDayF10 = await getDayRegister(-10)
    const ReDayF9 = await getDayRegister(-9)
    const ReDayF8 = await getDayRegister(-8)
    const ReDayF7 = await getDayRegister(-7)
    const ReDayF6 = await getDayRegister(-6)
    const ReDayF5 = await getDayRegister(-5)
    const ReDayF4 = await getDayRegister(-4)
    const ReDayF3 = await getDayRegister(-3)
    const ReDayF2 = await getDayRegister(-2)
    const ReDayF1 = await getDayRegister(-1)
    const totalNum2 = ReDayF20.count+ReDayF19.count+ReDayF18.count+ReDayF17.count+ReDayF16.count
        +ReDayF15.count+ReDayF14.count+ReDayF13.count+ReDayF12.count+ReDayF11.count
        +ReDayF10.count+ReDayF9.count+ReDayF8.count+ReDayF7.count+ReDayF6.count
        +ReDayF5.count+ReDayF4.count+ReDayF3.count+ReDayF2.count+ReDayF1.count;//todayNum1

    const overviewData = [totalNum1,totalNum2]
    const chartData = [
      dayF20,dayF19,dayF18,dayF17,dayF16,dayF15,dayF14,dayF13,dayF12,dayF11,dayF10,dayF9,dayF8,dayF7,dayF6,dayF5,dayF4,dayF3,dayF2,dayF1,
      ReDayF20,ReDayF19,ReDayF18,ReDayF17,ReDayF16,ReDayF15,ReDayF14,ReDayF13,ReDayF12,ReDayF11,ReDayF10,ReDayF9,ReDayF8,ReDayF7,ReDayF6,ReDayF5,ReDayF4,ReDayF3,ReDayF2,ReDayF1,
      // {name:'Registration',time:'03-12',count:0},

    ]
    setLineData(chartData);
    setOverview(overviewData);
  };

  useEffect(() => {
    getData();
  }, []);

  const formatedData = useMemo(() => {
    return [
      {
        title: 'Heartbeat',
        icon: <IconEdit />,
        value: overview[0],
        background: 'rgb(var(--orange-2))',
        color: 'rgb(var(--orange-6))',
      },
      {
        title: 'Registration',
        icon: <IconEdit />,
        value: overview[1],
        background: 'rgb(var(--cyan-2))',
        color: 'rgb(var(--cyan-6))',
      },
      // {
      //   title: 'contextExposure',
      //   value: overview[2],
      //   icon: <IconHeart />,
      //   background: 'rgb(var(--arcoblue-1))',
      //   color: 'rgb(var(--arcoblue-6))',
      // },
      // {
      //   title: 'App Users',
      //   value: overview[2],
      //   icon: <IconUser />,
      //   background: 'rgb(var(--purple-1))',
      //   color: 'rgb(var(--purple-6))',
      // },
    ];
  }, [t, overview]);

  return (
    <Grid.Row justify="space-between">
      {formatedData.map((item, index) => (
        <Grid.Col span={24 / formatedData.length} key={`${index}`}>
          <Card className={styles.card} title={null}>
            <Title heading={6}>{item.title}</Title>
            <div className={styles.content}>
              <div
                style={{ backgroundColor: item.background, color: item.color }}
                className={styles['content-icon']}
              >
                {item.icon}
              </div>
              {loading ? (
                <Skeleton
                  animation
                  text={{ rows: 1, className: styles['skeleton'] }}
                  style={{ width: '120px' }}
                />
              ) : (
                <Statistic value={item.value} groupSeparator />
              )}
            </div>
          </Card>
        </Grid.Col>
      ))}
      <Grid.Col span={24}>
        <MultiAreaLine data={lineData} loading={loading} />
      </Grid.Col>
    </Grid.Row>
  );
};
