import React, { useEffect, useState } from 'react'
import { Card, Select, Space } from '@arco-design/web-react'
import * as eCharts from 'echarts'
import {
    ChartCheckIn,
    ChartMember,
    ChartPoint,
    ChartSticker,
    ChartTotal,
    ChartWifi,
} from '@/request/api'
import styles from '@/pages/dashboard/style/overview.module.less'
import App from '@/pages/minerMap'
import { array_column } from '@/utils/function'
import { VChart } from '@visactor/react-vchart'
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
        ChartTotal({}).then((res) => {
            const { code } = res
            const data = res?.data ?? {}
            if (code == 200) {
                setTotalData(data)
            }
        })

        ChartCheckIn({ group: date1 }).then((res) => {
            if (res?.code == 200) {
                setData1(res?.data ?? [])
            }
        })
        ChartMember({ group: date3 }).then((res) => {
            if (res?.code == 200) {
                setData3(res?.data ?? [])
            }
        })
        ChartWifi({ group: date4 }).then((res) => {
            if (res?.code == 200) {
                setData4(res?.data ?? [])
            }
        })
        ChartPoint({ group: date5 }).then((res) => {
            if (res?.code == 200) {
                setData5(res?.data ?? [])
            }
        })
        ChartSticker({ group: date6 }).then((res) => {
            if (res?.code == 200) {
                setData6(res?.data ?? [])
            }
        })
    }

    const fetchChartData = (type = 1, dateeee = 'month') => {
        if (type === 1) {
            setDate1(dateeee)
            ChartCheckIn({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData1(res?.data ?? [])
                }
            })
        } else if (type === 3) {
            setDate3(dateeee)
            ChartMember({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData3(res?.data ?? [])
                }
            })
        } else if (type === 4) {
            setDate4(dateeee)
            ChartWifi({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData4(res?.data ?? [])
                }
            })
        } else if (type === 5) {
            setDate5(dateeee)
            ChartPoint({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData5(res?.data ?? [])
                }
            })
        } else if (type === 6) {
            setDate6(dateeee)
            ChartSticker({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData6(res?.data ?? [])
                }
            })
        }
    }

    const dateConversion = (date = '', type = 'day') => {
        let data = ''
        if (type === 'day') {
            data = date.replaceAll('-', '.')
        } else if (type === 'week') {
            data = 'Week' + date.substr(5, 2) + ',' + date.substr(0, 4)
        } else if (type === 'month') {
            const year = date.substr(0, 4)
            const dateMonth = date.slice(5)
            const month = {
                month1: 'Jan. ' + year,
                month2: 'Feb. ' + year,
                month3: 'Mar. ' + year,
                month4: 'Apr. ' + year,
                month5: 'May. ' + year,
                month6: 'Jun. ' + year,
                month7: 'Jul. ' + year,
                month8: 'Aug. ' + year,
                month9: 'Sep. ' + year,
                month10: 'Oct. ' + year,
                month11: 'Nov. ' + year,
                month12: 'Dec. ' + year,
            }
            data = month?.['month' + dateMonth]
        } else {
            data = date
        }
        return data
    }

    const initLineOption = (
        color,
        chartTitle,
        lineTitle,
        xData,
        yDataSolid,
        yDataDashed
    ) => {
        return {
            color: [ color ],
            backgroundColor: '#ffffff00',
            title: {
                text: chartTitle,
            },
            // legend: {
            //     left: 'center',
            //     // lineStyle: {
            //     //     color: 'inherit',
            //     // },
            // },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let value = ''
                    let axisValueLabel = ''
                    if (params?.length > 1) {
                        value = params[1].data
                        axisValueLabel = params[1].axisValueLabel
                    } else {
                        value = params[0].data
                        axisValueLabel = params[0].axisValueLabel
                    }
                    //自定义模板
                    return ` 
                        <div>${axisValueLabel}</div>
                        <span style="display:inline-block;margin-right:4px;
						border-radius:10px;width:10px;height:10px;
						background-color:${color};"></span>
                        <span>${lineTitle}</span>
                        <span>${value}</span>
                        `
                },
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData,
            },
            yAxis: {
                type: 'value',
                max: function (value) {
                    return value.max <= 5 ? 5 : null
                },
            },
            series: [
                {
                    // name: lineTitle,
                    data: yDataDashed,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                        type: 'dashed',
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
                {
                    name: lineTitle,
                    data: yDataSolid,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
            ],
        }
    }

    const initChartData = (data, type, dataType = 'accumulated') => {
        let nnum = 0
        const xData = (data ?? [])?.map((ittt) => {
            return dateConversion(ittt?.date, type)
        })
        // xData = [...xData]  +'(Estimated)'
        let yData = []
        if (dataType === 'growth') {
            yData = array_column(data, 'num')
        } else {
            yData = array_column(data, 'num')?.map((ittt) => {
                nnum = nnum + ittt
                return nnum
            })
        }

        const yDataSolid = [ ...yData ]
        yDataSolid.pop()
        let yData1 = [ ...yData ]
        yData1.pop()
        yData1.pop()
        yData1 = yData1.map((item) => {
            return ''
        })
        const yDataDashed = [
            ...yData1,
            yData[yData?.length - 2],
            yData[yData?.length - 1],
        ]

        return [ xData, yDataSolid, yDataDashed, yData ]
    }

    const initChart1 = () => {
        const myChart = eCharts.init(eChartsRef1.current, 'dark', {
            renderer: 'svg',
        })
        const data = initChartData(data1, date1, 'growth')
        myChart.setOption(
            initLineOption(
                'rgb(73, 146, 255)',
                'Check in Growth Quantity',
                'Check In',
                data[0],
                data[1],
                data[2]
            )
        )
    }

    const initChart3 = () => {
        const myChart = eCharts.init(eChartsRef3.current, 'dark', {
            renderer: 'svg',
        })
        const data = initChartData(data3, date3)
        console.log('data', data)
        myChart.setOption(
            initLineOption(
                'rgb(253, 221, 96)',
                'Accumulated number of App User',
                'App User',
                data[0],
                data[1],
                data[2]
            )
        )
    }

    const initChart4 = () => {
        const myChart = eCharts.init(eChartsRef4.current, 'dark', {
            renderer: 'svg',
        })
        const data = initChartData(data4, date4)
        myChart.setOption(
            initLineOption(
                'rgb(255, 110, 118)',
                'Accumulated number of New Added WiFi',
                'New Added WiFi',
                data[0],
                data[1],
                data[2]
            )
        )
    }

    const initChart5 = () => {
        const myChart = eCharts.init(eChartsRef5.current, 'dark', {
            renderer: 'svg',
        })
        const data = initChartData(data5, date5)
        myChart.setOption(
            initLineOption(
                'rgb(88, 217, 249)',
                'Accumulated number of Issued mPoints',
                'Issued mPoints',
                data[0],
                data[1],
                data[2]
            )
        )
    }

    const initChart6 = () => {
        const myChart = eCharts.init(eChartsRef6.current, 'dark', {
            renderer: 'svg',
        })
        const data = initChartData(data6, date6)
        myChart.setOption(
            initLineOption(
                'rgb(255, 138, 69)',
                'Accumulated number of Issued Stickers',
                'Issued Stickers',
                data[0],
                data[1],
                data[2]
            )
        )
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
        initChart00()
    }, [])

    /* vChart start */
    const spec: any = {
        type: 'area',
        data: {
            values: [
                { x: '2023.12.10', country: 'USA', y: 100 },
                { x: '2023.12.11', country: 'USA', y: 200 },
                { x: '2023.12.12', country: 'USA', y: 150 },
                { x: '2023.12.13', country: 'USA', y: 800 },
                { x: '2023.12.14', country: 'USA', y: 399 },
                { x: '2023.12.15', country: 'USA', y: 180 },
                { x: '2023.12.16', country: 'USA', y: 99 },
                { x: '2023.12.17 (prediction)', country: 'USA', y: 180, latest: true },
                { x: '2023.12.10', country: 'China', y: 80 },
                { x: '2023.12.11', country: 'China', y: 280 },
                { x: '2023.12.12', country: 'China', y: 150 },
                { x: '2023.12.13', country: 'China', y: 300 },
                { x: '2023.12.14', country: 'China', y: 389 },
                { x: '2023.12.15', country: 'China', y: 120 },
                { x: '2023.12.16', country: 'China', y: 199 },
                {
                    x: '2023.12.17 (prediction)',
                    country: 'China',
                    y: 180,
                    latest: true,
                },
                { x: '2023.12.10', country: 'Canada', y: 80 },
                { x: '2023.12.11', country: 'Canada', y: 90 },
                { x: '2023.12.12', country: 'Canada', y: 100 },
                { x: '2023.12.13', country: 'Canada', y: 110 },
                { x: '2023.12.14', country: 'Canada', y: 320 },
                { x: '2023.12.15', country: 'Canada', y: 120 },
                { x: '2023.12.16', country: 'Canada', y: 699 },
                {
                    x: '2023.12.17 (prediction)',
                    country: 'Canada',
                    y: 180,
                    latest: true,
                },
            ],
        },
        xField: 'x',
        yField: 'y',
        seriesField: 'country',
        title: {
            visible: true,
            text: 'Stacked line chart',
        },
        line: {
            style: {
                curveType: 'monotone',
                smooth: true,
                lineDash: (data) => {
                    if (data.latest) {
                        return [ 5, 5 ]
                    }
                    return [ 0 ]
                },
            },
        },
        dataZoom: [
            {
                orient: 'bottom',
                start: 0,
                end: 1,
                minSpan: 0.1,
                maxSpan: 0.5,
                filterMode: 'axis',
            },
        ],
    // point: {
    //     style: {
    //         size: 0,
    //         fill: 'white',
    //         stroke: null,
    //         lineWidth: 2
    //     },
    //     state: {
    //         myCustomState: {
    //             size: 10
    //         }
    //     }
    // },
    }

    const onChartReady = (instance, isInitial: boolean) => {
        instance.on('click', { level: 'mark', type: 'bar' }, (e) => {
            console.log('bar click', e.datum.month)
        })
    }
    /* vChart end */

    /* eChart start */
    const eChartsRef00: any = React.createRef()
    const initLineOption00 = (
        color,
        chartTitle,
        lineTitle,
        xData,
        yData10,
        yData11,
        yData20,
        yData21,
        yData30,
        yData31
    ) => {
        return {
            color: [ color ],
            backgroundColor: '#ffffff00',
            title: {
                text: chartTitle,
            },

            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let value = ''
                    let axisValueLabel = ''
                    if (params?.length > 1) {
                        value = params[1].data
                        axisValueLabel = params[1].axisValueLabel
                    } else {
                        value = params[0].data
                        axisValueLabel = params[0].axisValueLabel
                    }
                    //自定义模板
                    return `
                        <div>${axisValueLabel}</div>
                        <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>
                        <span>${lineTitle}</span>
                        <span>${value}</span>
                        `
                },
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData,
            },
            yAxis: {
                type: 'value',
                max: function (value) {
                    return value.max <= 5 ? 5 : null
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                },
                {
                    start: 0,
                    end: 100,
                },
            ],
            series: [
                {
                    // name: lineTitle,
                    data: yData10,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                    },

                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
                {
                    name: lineTitle,
                    data: yData11,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                        type: 'dashed',
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },

                {
                    // name: lineTitle,
                    data: yData20,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                    },

                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
                {
                    name: lineTitle,
                    data: yData21,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                        type: 'dashed',
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },

                {
                    // name: lineTitle,
                    data: yData30,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                    },

                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
                {
                    name: lineTitle,
                    data: yData31,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                        type: 'dashed',
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    },
                },
            ],
        }
    }

    const initChart00 = () => {
        const myChart = eCharts.init(eChartsRef00.current, 'dark', {
            renderer: 'svg',
        })
        const data = [
            [
                '2023.12.14',
                '2023.12.15',
                '2023.12.16',
                '2023.12.17',
                '2023.12.18',
                '2023.12.19',
                '2023.12.20',
            ],
            [ 3, 12, 30, 3, 12, 30 ],
            [ , , , , , 30, 20 ],
            [ 5, 10, 50, 20, 5, 50 ],
            [ , , , , , 50, 80 ],
            [ 20, 50, 100, 50, 38, 150 ],
            [ , , , , , 150, 180 ],
        ]
        myChart.setOption(
            initLineOption00(
                'rgb(73, 146, 255)',
                'Tests',
                'Check In',
                data[0],
                data[1],
                data[2],
                data[3],
                data[4],
                data[5],
                data[6]
            )
        )
    }

    /* eChart end */

    return (
        <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <Card>
                <div
                    className={styles.title}
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                >
          Miner Map
                </div>
                <App></App>
            </Card>
            <Card>
                <VChart spec={spec} onReady={onChartReady} />
            </Card>

            <Card>
                <div
                    ref={eChartsRef00}
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
                        onChange={(value) => fetchChartData(1, value)}
                    >
                        {optionsDate.map((option, index) => (
                            <Option key={index} value={option.code}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '25vw',
                            fontSize: '16px',
                            color: '#fff',
                        }}
                    >
                        {totalData?.totalCheckNum && `Total : ${totalData?.totalCheckNum} `}
                    </div>
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
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '25vw',
                            fontSize: '16px',
                            color: '#fff',
                        }}
                    >
                        {totalData?.totalMemberNum &&
              `Total : ${totalData?.totalMemberNum} `}
                    </div>
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
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '25vw',
                            fontSize: '16px',
                            color: '#fff',
                        }}
                    >
                        {totalData?.totalWiFiNum && `Total : ${totalData?.totalWiFiNum} `}
                    </div>
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
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '25vw',
                            fontSize: '16px',
                            color: '#fff',
                        }}
                    >
                        {totalData?.totalPointsNum &&
              `Total : ${totalData?.totalPointsNum} `}
                    </div>
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
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '25vw',
                            fontSize: '16px',
                            color: '#fff',
                        }}
                    >
                        {totalData?.totalStickerNum &&
              `Total : ${totalData?.totalStickerNum} `}
                    </div>
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
