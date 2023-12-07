import React, { useEffect, useState } from 'react'
import {
    Card,
    Select,
    Space,
} from '@arco-design/web-react'
import * as eCharts from 'echarts'
import {
    ChartCheckIn, ChartMember, ChartPoint, ChartSticker, ChartWifi,
} from '@/request/api'
import styles from '@/pages/dashboard/style/overview.module.less'
import App from '@/pages/minerMap'
import { array_column } from '@/utils/function'
import moment from 'moment'
const Option = Select.Option
function Overview() {
    // const [todayData, setTodayData] = useState<any>({});
    const [ totalData, setTotalData ] = useState<any>({})
    const [ date1, setDate1 ] = useState<string>('month')
    const [ date3, setDate3 ] = useState<string>('month')
    const [ date4, setDate4 ] = useState<string>('month')
    const [ date5, setDate5 ] = useState<string>('month')
    const [ date6, setDate6 ] = useState<string>('month')
    const [ data1, setData1 ] = useState<any>([])
    const [ data3, setData3 ] = useState<any>([])
    const [ data4, setData4 ] = useState<any>([])
    const [ data5, setData5 ] = useState<any>([])
    const [ data6, setData6 ] = useState<any>([])
    const eChartsRef1: any = React.createRef()
    // const eChartsRef2: any = React.createRef();
    const eChartsRef3: any = React.createRef()
    const eChartsRef4: any = React.createRef()
    const eChartsRef5: any = React.createRef()
    const eChartsRef6: any = React.createRef()

    const optionsDate = [
        { code: 'week', name: 'Week' },
        { code: 'month', name: 'Month' },
    ]

    const fetchData = () => {
        ChartCheckIn({ group: date1 }).then((res) => {
            if (res?.code == 200) {
                setData1(res?.data ?? [])
            }
        })
        ChartMember({ group: date3, }).then((res) => {
            if (res?.code == 200) {
                setData3(res?.data ?? [])
            }
        })
        ChartWifi({ group: date4, }).then((res) => {
            if (res?.code == 200) {
                setData4(res?.data ?? [])
            }
        })
        ChartPoint({ group: date5, }).then((res) => {
            if (res?.code == 200) {
                setData5(res?.data ?? [])
            }
        })
        ChartSticker({ group: date6, }).then((res) => {
            if (res?.code == 200) {
                setData6(res?.data ?? [])
            }
        })
    }

    const fetchChartData = (type = 1, dateeee = 'month') => {
        if(type === 1){
            setDate1(dateeee)
            ChartCheckIn({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData1(res?.data??[])
                }
            })
        }
        else if(type === 3){
            setDate3(dateeee)
            ChartMember({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData3(res?.data??[])
                }
            })
        }
        else if(type === 4){
            setDate4(dateeee)
            ChartWifi({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData4(res?.data??[])
                }
            })
        }
        else if(type === 5){
            setDate5(dateeee)
            ChartPoint({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData5(res?.data??[])
                }
            })
        }
        else if(type === 6){
            setDate6(dateeee)
            ChartSticker({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData6(res?.data??[])
                }
            })
        }
    }

    const dateConversion = (date = '', type='day') => {
        return date
        let data = ''
        if(type === 'day'){
            data = date.replaceAll('-', '.')
        }
        else if(type === 'week'){
            data = date.substr(0, 4)+',Week'+date.substr(4, 2)
        }
        else if(type === 'month'){
            const month = {
                month1: 'Jan.',
                month2: 'Feb.',
                month3: 'Mar.',
                month4: 'Apr.',
                month5: 'May.',
                month6: 'Jun.',
                month7: 'Jul.',
                month8: 'Aug.',
                month9: 'Sep.',
                month10: 'Oct.',
                month11: 'Nov.',
                month12: 'Dec.',
            }
            data = month?.['month'+date]
        }
        else {
            data = date
        }
        return data
    }


    const initLineOption = (color, chartTitle, lineTitle, xData, yData) => {
        return {
            color: [
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
                    return value.max <= 5 ? 5: null
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
                    areaStyle: {
                        opacity: 0.2,
                    }
                },
            ],
        }
    }

    const initChartData = (data, type, dataType = 'accumulated') => {
        let nnum = 0
        let thisDate
        if(type === 'day'){
            thisDate = moment().utcOffset(0).format('YYYY-MM-DD')
        }
        else if(type === 'week'){
            thisDate = moment().utcOffset(0).startOf('week').format('YYYY-MM-DD')
        }
        else if(type === 'month'){
            thisDate = moment().utcOffset(0).format('YYYY-MM')
        }
        else {
            thisDate = ''
        }
        let chartData
        if(data?.length >= 2){
            const num = data?.[data?.length-2]?.num != 0? Math.ceil(data?.[data?.length-1]?.num/data?.[data?.length-2]?.num * 1.2 *data?.[data?.length-1]?.num ) : 0
            chartData = [ ...data, { date: thisDate, num: num } ]
            // console.log('num', num)
        }
        else{
            chartData = data
        }
        // console.log('chartData', chartData)
        const xData = (chartData ?? [])?.map(ittt => {
            return dateConversion(ittt?.date, type)
        })
        if(dataType === 'growth'){
            return [ xData, array_column(chartData, 'num') ]
        }
        else {
            return [ xData, array_column(chartData, 'num')?.map(ittt => {
                nnum = nnum + ittt
                return nnum
            }) ]

        }
    }

    const initChart1 = () => {
        const myChart = eCharts.init(eChartsRef1.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data1, date1, 'growth')
        myChart.setOption(initLineOption( 'rgb(73, 146, 255)', 'Check in Growth Quantity', 'Check In', data[0], data[1]))
    }

    const initChart3 = () => {
        const myChart = eCharts.init(eChartsRef3.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data3, date3)
        myChart.setOption(initLineOption( 'rgb(253, 221, 96)', 'Accumulated number of App User', 'App User', data[0], data[1]))
    }

    const initChart4 = () => {
        const myChart = eCharts.init(eChartsRef4.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data4, date4)
        myChart.setOption(initLineOption( 'rgb(255, 110, 118)', 'Accumulated number of New Added WiFi', 'New Added WiFi', data[0], data[1]))
    }

    const initChart5 = () => {
        const myChart = eCharts.init(eChartsRef5.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data5, date5)
        myChart.setOption(initLineOption( 'rgb(88, 217, 249)', 'Accumulated number of Issued mPoints', 'Issued mPoints', data[0], data[1]))
    }

    const initChart6 = () => {
        const myChart = eCharts.init(eChartsRef6.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data6, date6)
        myChart.setOption(initLineOption( 'rgb(255, 138, 69)', 'Accumulated number of Issued Stickers', 'Issued Stickers', data[0], data[1]))
    }

    useEffect(() => {
        initChart1()
    }, [ data1 ])
    useEffect(() => {
        initChart3()
    }, [ data3 ])
    useEffect(() => {
        initChart4()
    }, [ data4 ])
    useEffect(() => {
        initChart5()
    }, [ data5 ])
    useEffect(() => {
        initChart6()
    }, [ data6 ])
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <Card>
                <div className={styles.title} style={{ fontSize: '18px', fontWeight: 'bold' }}>Miner Map</div>
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
                        onChange={(value) => fetchChartData(1, value)}
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

            <Card>
                <div className="flex flex-row-reverse" style={{ marginRight: '8vw' }}>
                    <Select
                        // placeholder='Day'
                        style={{ width: 100 }}
                        size={'large'}
                        bordered={false}
                        defaultValue={'month'}
                        onChange={(value) => fetchChartData(3, value)}
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
                        onChange={(value) => fetchChartData(4, value)}
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
                        onChange={(value) => fetchChartData(5, value)}
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
                        onChange={(value) => fetchChartData(6, value)}
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
    )
}

export default Overview
