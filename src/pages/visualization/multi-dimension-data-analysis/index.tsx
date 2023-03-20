import React, {useState, useEffect, ReactNode} from 'react';
import {Typography, Card, Grid, Space, Divider, Skeleton} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '../../../locale/visualization/multi-dimension-data-analysis';
import DataOverview from './data-overview';

import IconCalendar from "@/pages/dashboard/workplace/assets/calendar.svg";
import styles from "@/pages/dashboard/workplace/style/overview.module.less";
import IconContent from "@/pages/dashboard/workplace/assets/content.svg";
import IconComments from "@/pages/dashboard/workplace/assets/comments.svg";
import IconIncrease from "@/pages/dashboard/workplace/assets/increase.svg";
import {IconCaretUp} from "@arco-design/web-react/icon";
import PublicOpinionCard from "@/pages/visualization/multi-dimension-data-analysis/element/card";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import {getDay} from "@/utils/function";
const ApoApiURL = 'https://api.thegraph.com/subgraphs/name/lingcoder/heartbeat'
const ApoClient = new ApolloClient({
    uri: ApoApiURL,
    cache: new InMemoryCache(),
})
const { Row, Col } = Grid;
const { Title } = Typography;

type StatisticItemType = {
    icon?: ReactNode;
    title?: ReactNode;
    count?: ReactNode;
    loading?: boolean;
    unit?: ReactNode;
};

function StatisticItem(props: StatisticItemType) {
    const { icon, title, count, loading, unit } = props;
    return (
        <div className={styles.item}>
            <div className={styles.icon}>{icon}</div>
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

function DataAnalysis() {
    const t = useLocale(locale);
    const item1 = {
        key: 'visitor',
        title: 'Heartbeat contract',
        type: 'line',
        chartType: 'line',
        count: 0,
        diff: 1254,
        increment: false
        // compareTime?: string;
        // loading?: boolean;
    };
    const item2 =   {
        key: 'content',
        type: 'interval',
        chartType: 'interval',
        title: 'Registration contract',
        count: 9765,
        diff: 254,
        increment: false
    };
    const [heartbeatTotalCountLoading, setHeartbeatTotalCountLoading] = useState(false);
    const [heartbeatTotalCount, setHeartbeatTotalCount] = useState(0);
    const [registerTotalCountLoading, setRegisterTotalCountLoading] = useState(false);
    const [registerTotalCount, setRegisterTotalCount] = useState(0);
    const [todayHeartbeatLoading, setTodayHeartbeatLoading] = useState(false);
    const [todayHeartbeat, setTodayHeartbeat] = useState(item1);
    const [todayRegisterLoading, setTodayRegisterLoading] = useState(false);
    const [todayRegister, setTodayRegister] = useState(item2);
    const UTC0Time =  parseInt(((new Date(getDay(0))).getTime()/1000).toString())
    const nowTime =  parseInt(((new Date()).getTime()/1000).toString())

    const getUTCNowTime =  () => {
        const d1 = new Date();
        const d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
        return Date.parse(d2.toString());
    }

    // const local0time = (new Date(new Date().toLocaleDateString())).getTime()/1000;

    const getHeartbeatTotalCount = async () => {
        const tokensQuery = `
  query MyQuery {
  heartbeatSummaries {
    totalCount
  }
}
`
        ApoClient.query({
            query: gql(tokensQuery),
        })
            .then((data) =>  {
                setHeartbeatTotalCount(data?.data?.heartbeatSummaries?.[0]?.totalCount ?? 0)
                setHeartbeatTotalCountLoading(false)
            })
            .catch((err) => {
                console.log('Error fetching getHeartbeatTotalCount: ', err)
            })
    };
    const getRegisterTotalCount = async () => {

        const tokensQuery = `
  query MyQuery {
  heartbeatSummaries {
    totalCount
  }
}
`
        // todo 1  query heartbeatSummaries
        //todo 2 data.heartbeatSummaries
        ApoClient.query({
            query: gql(tokensQuery),
        })
            .then((data) =>  {
                setRegisterTotalCount(data?.data?.heartbeatSummaries?.[0]?.totalCount ?? 0)
                setRegisterTotalCountLoading(false)
            })
            .catch((err) => {
                console.log('Error fetching getRegisteredTotalCount: ', err)
            })
    };
    const getTodayHeartbeat = async () => {
        const d1 = new Date();
        const date1 = d1.getUTCFullYear() +'-'+d1.getUTCMonth()+'-'+d1.getUTCDate()
        const d2 = new Date(getDay(1))
        const date2 = d2.getUTCFullYear() +'-'+d2.getUTCMonth()+'-'+d2.getUTCDate()

//    where: {id_gte: "2023-2-25-0", id_lt: "2023-2-26-0"}
        setTodayHeartbeatLoading(true);
        const tokensQuery = `
    query MyQuery($id_gte: String,$id_lt: String) {
     heartbeateHourlySummaries(first:1000,where: {id_gte: $id_gte, id_lt: $id_lt}
  ) {
    id
    count
  }
}
`
        ApoClient.query({
            query: gql(tokensQuery),
            variables: {
                id_gte: date1,
                id_lt: date2,
            },
        })
            .then((rr) =>  {
                item1.count = rr?.data?.heartbeateHourlySummaries?.[0]?.count ?? 0;
                setTodayHeartbeat(item1)
                setTodayHeartbeatLoading(false)
                return rr.data;
            })
            .catch((err) => {
                console.log('Error fetching getRegisterTotalCount: ', err)
            })

    };
    const getTodayRegister = async () => {
        setTodayRegisterLoading(true);
        const d1 = new Date();
        const date1 = d1.getUTCFullYear() +'-'+d1.getUTCMonth()+'-'+d1.getUTCDate()
        const d2 = new Date(getDay(1))
        const date2 = d2.getUTCFullYear() +'-'+d2.getUTCMonth()+'-'+d2.getUTCDate()

        const tokensQuery = `
    query MyQuery($id_gte: String,$id_lt: String) {
     heartbeateHourlySummaries(first:1000,where: {id_gte: $id_gte, id_lt: $id_lt}
  ) {
    id
    count
  }
}
`

        ApoClient.query({
            query: gql(tokensQuery),
            variables: {
                id_gte: date1,
                id_lt: date2,
            },
        })
            .then((rr) =>  {
                item2.count = rr?.data?.heartbeateHourlySummaries?.[0]?.count ?? 0;
                setTodayRegister(item2)
                setTodayRegisterLoading(false)
                return rr.data;
            })
            .catch((err) => {
                console.log('Error fetching getRegisterTotalCount: ', err)
            })

    };

    useEffect(() => {

        getHeartbeatTotalCount();
        getRegisterTotalCount();
        getTodayHeartbeat();
        getTodayRegister();

    }, []);

    const total1 = {
        title:'Heartbeat contract',
        count:0,
        unit:''
    }

    const total2 = {
        title:'Registration contract',
        count:0,
        unit:''
    }

    return (
        <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <Row>
                <Col span={24}>
                    <Card>
                        <Typography.Title heading={6}>
                            Total
                        </Typography.Title>
                        <Row>
                            <Col flex={1}>
                                <StatisticItem
                                    icon={<IconCalendar />}
                                    title={total1.title}
                                    count={heartbeatTotalCount}
                                    loading={heartbeatTotalCountLoading}
                                    unit={total1.unit}
                                />
                            </Col>
                            <Divider type="vertical" className={styles.divider} />
                            <Col flex={1}>
                                <StatisticItem
                                    icon={<IconContent />}
                                    title={total2.title}
                                    count={registerTotalCount}
                                    loading={registerTotalCountLoading}
                                    unit={total2.unit}
                                />
                            </Col>
                            {/*<Divider type="vertical" className={styles.divider} />*/}
                            {/*<Col flex={1}>*/}
                            {/*  <StatisticItem*/}
                            {/*      icon={<IconIncrease />}*/}
                            {/*      title={total3.title}*/}
                            {/*      count={totalNum3}*/}
                            {/*      loading={totalNum3Loading}*/}
                            {/*      unit={total3.unit}*/}
                            {/*  />*/}
                            {/*</Col>*/}
                        </Row>

                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Typography.Title heading={6}>
                            Today
                        </Typography.Title>
                        <div>
                            <Row gutter={20}>
                                <Col  flex={1}>
                                    <PublicOpinionCard
                                        {...todayHeartbeat}
                                        compareTime={'yesterdays'}
                                        loading={todayHeartbeatLoading}
                                    />
                                </Col>

                                <Col  flex={1}>
                                    <PublicOpinionCard
                                        {...todayRegister}
                                        compareTime={'yesterdays'}
                                        loading={todayRegisterLoading}
                                    />
                                </Col>
                                {/*<Col  flex={1}>*/}
                                {/*  <PublicOpinionCard*/}
                                {/*      {...todayItem3}*/}
                                {/*      compareTime={'yesterdays'}*/}
                                {/*      loading={todayItem3Loading}*/}
                                {/*  />*/}
                                {/*</Col>*/}
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Title heading={6}>
                            Data Overview
                        </Title>
                        <DataOverview
                            heartbeatTotalCount={heartbeatTotalCount}
                            registerTotalCount={registerTotalCount}
                            todayHeartbeat={todayHeartbeat}
                            todayRegister={todayRegister}
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}
export default DataAnalysis;
