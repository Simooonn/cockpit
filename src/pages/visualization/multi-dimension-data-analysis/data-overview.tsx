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
import {arrListSort, getDay} from "@/utils/function";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
const ApoApiURL = 'https://api.thegraph.com/subgraphs/name/txq-bug/subgraph-example'
const ApoClient = new ApolloClient({
    uri: ApoApiURL,
    cache: new InMemoryCache(),
})
const { Title } = Typography;
export default () => {
    const t = useLocale(locale);
    const [overview, setOverview] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(false);
    const UTC0Time =  parseInt(((new Date(getDay(0))).getTime()/1000).toString())
    const nowTime =  parseInt(((new Date()).getTime()/1000).toString())
    const date1 = getDay(-30);
    const date2 = getDay(-1)

    const getDayHeartbeat = async () => {

        const tokensQuery = `
    query MyQuery($id_gte: String,$id_lt: String) {
     heartbeatDailySummaries(first:1000,where: {id_gte: $id_gte, id_lt: $id_lt}
  ) {
    id
    count
  }
}
`
        return  ApoClient.query({
            query: gql(tokensQuery),
            variables: {
                id_gte: date1,
                id_lt: date2,
            },
        })
            .then((rr) =>  {
                const dataList = []
                const res = rr.data?.heartbeatDailySummaries;
                for (const rrKey in res) {
                    dataList.push({name:'Heartbeat',time:res[rrKey]?.id.slice(5),count:parseInt(res[rrKey]?.count)})
                }
                return dataList;
            })
            .catch((err) => {
                console.log('Error fetching getRegisterTotalCount: ', err)
                return []
            })

    };
    const getDayRegister = async () => {
        const tokensQuery = `
    query MyQuery($id_gte: String,$id_lt: String) {
     registeredDailySummaries(first:1000,where: {id_gte: $id_gte, id_lt: $id_lt}
  ) {
    id
    count
  }
}
`
        return ApoClient.query({
            query: gql(tokensQuery),
            variables: {
                id_gte: date1,
                id_lt: date2,
            },
        })
            .then((rr) =>  {
                const dataList = []
                const res = rr.data?.registeredDailySummaries;
                for (const rrKey in res) {
                    dataList.push({name:'Registration',time:res[rrKey]?.id.slice(5),count:parseInt(res[rrKey]?.count)})
                }
                return dataList;
            })
            .catch((err) => {
                console.log('Error fetching getRegisterTotalCount: ', err)
                return []
            })
    };

    const getData = async () => {
        setLoading(true);
        setLoading(false)
        // const { overviewData, chartData } = data;

        let totalNum2 = 0;
        let DaysRegister:any = await getDayRegister()
        const tempDaysRegister = {}
        for (const rKey in DaysRegister) {
            tempDaysRegister[DaysRegister[rKey]?.time] = 1
            totalNum2 +=  parseInt(DaysRegister[rKey]?.count ?? '0')
        }

        // const overviewData = [totalNum1,totalNum2,totalNum3]
        let totalNum1 = 0;
        const DaysHeartbeat:any = await getDayHeartbeat()
        for (const hKey in DaysHeartbeat) {
            totalNum1 +=  parseInt(DaysHeartbeat[hKey]?.count ?? '0')
            if(!tempDaysRegister?.[DaysHeartbeat[hKey]?.time] || tempDaysRegister?.[DaysHeartbeat[hKey]?.time] !== 1){
                DaysRegister.push({name:'Registration',time:DaysHeartbeat[hKey]?.time,count:0})
            }
        }

        DaysRegister = arrListSort(DaysRegister,'time')

        const overviewData = [totalNum1,totalNum2]
        const chartData = [...DaysHeartbeat,...DaysRegister]
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
