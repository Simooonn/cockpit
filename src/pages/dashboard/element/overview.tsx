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
        let data = ''
        if(type === 'day'){
            data = date.replaceAll('-', '.')
        }
        else if(type === 'week'){
            data = 'Week'+date.substr(5, 2)+','+date.substr(0, 4)
        }
        else if(type === 'month'){
            const year = date.substr(0, 4)
            const dateMonth = date.slice(5)
            const month = {
                month1: 'Jan. '+year,
                month2: 'Feb. '+year,
                month3: 'Mar. '+year,
                month4: 'Apr. '+year,
                month5: 'May. '+year,
                month6: 'Jun. '+year,
                month7: 'Jul. '+year,
                month8: 'Aug. '+year,
                month9: 'Sep. '+year,
                month10: 'Oct. '+year,
                month11: 'Nov. '+year,
                month12: 'Dec. '+year,
            }
            data = month?.['month'+dateMonth]
        }
        else {
            data = date
        }
        return data
    }


    const initLineOption = (color, chartTitle, lineTitle, xData, yDataSolid, yDataDashed) => {
        return {
            color: [
                color,
            ],
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
                    if(params?.length > 1){
                        value = params[1].data
                    }
                    else {
                        value = params[0].data
                    }
                    //自定义模板
                    return ` 
                        <div>${lineTitle}</div>
                        <span style="display:inline-block;margin-right:4px;
						border-radius:10px;width:10px;height:10px;
						background-color:${color};"></span>
                        <span style="margin-right:10%;">${value}</span>
                        <span>${value}</span>
                        `
                    // callback(ticket, html) //返回自定义内容
                    const a = []
                    const b =[]
                    const c =[]
                    // let res = '<div><p>' + params[0].value[0] +'</p></div>'
                    // for (let i = 0; i < params.length; i++) {
                    //     if (params[i].data != undefined) {
                    //         a.push(params[i].marker)
                    //         b.push(params[i].seriesName)
                    //         c.push(params[i].value[1])
                    //     }
                    // }
                    // const seriesMakerList = [ ...new Set(a) ]
                    // const seriesNameList = [ ...new Set(b) ]
                    // const seriesValueList = [ ...new Set(c) ]
                    // for (let i = 0; i <3 ; i++) {
                    //     res += '<p>' +seriesMakerList[i]+ seriesNameList[i] + ':' + seriesValueList[i] + '</p>'
                    // }
                    // return res
                }
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
                    // name: lineTitle,
                    data: yDataDashed,
                    type: 'line',
                    colorBy: 'series',
                    smooth: 0.1,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 2,
                        type: 'dashed'
                    },
                    areaStyle: {
                        color: color,
                        opacity: 0.2,
                    }
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
        let thisDate
        if(type === 'day'){
            thisDate = moment().utcOffset(0).format('YYYY-MM-DD')
        }
        else if(type === 'week'){
            thisDate = moment().utcOffset(0).year()+'-' +moment().utcOffset(0).week()
        }
        else if(type === 'month'){
            thisDate = moment().utcOffset(0).format('YYYY-MM')
        }
        else {
            thisDate = ''
        }
        let chartData
        if(data?.length >= 2){
            // const num = data?.[data?.length-2]?.num != 0? Math.ceil(data?.[data?.length-1]?.num/data?.[data?.length-2]?.num * 1.2 *data?.[data?.length-1]?.num ) : 0
            const num = data?.[data?.length-2]?.num != 0? Math.ceil(1.5 *data?.[data?.length-1]?.num ) : 0
            chartData = [ ...data, { date: thisDate, num: num } ]
            console.log('chartData', chartData)
        }
        else{
            chartData = data
        }
        // console.log('chartData', chartData)
        const xData = (chartData ?? [])?.map(ittt => {
            return dateConversion(ittt?.date, type)
        })
        // xData = [...xData]  +'(Estimated)'
        let yData = []
        if(dataType === 'growth'){
            yData = array_column(chartData, 'num')
        }
        else {
            yData = array_column(chartData, 'num')?.map(ittt => {
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
        const yDataDashed = [ ...yData1, yData[yData?.length-2], yData[yData?.length-1] ]

        return [ xData, yDataSolid, yDataDashed, yData ]
    }

    const initChart1 = () => {
        const myChart = eCharts.init(eChartsRef1.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data1, date1, 'growth')
        myChart.setOption(initLineOption( 'rgb(73, 146, 255)', 'Check in Growth Quantity', 'Check In', data[0], data[1], data[2]))
    }

    const initChart3 = () => {
        const myChart = eCharts.init(eChartsRef3.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data3, date3)
        myChart.setOption(initLineOption( 'rgb(253, 221, 96)', 'Accumulated number of App User', 'App User', data[0], data[1], data[2]))
    }

    const initChart4 = () => {
        const myChart = eCharts.init(eChartsRef4.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data4, date4)
        myChart.setOption(initLineOption( 'rgb(255, 110, 118)', 'Accumulated number of New Added WiFi', 'New Added WiFi', data[0], data[1], data[2]))
    }

    const initChart5 = () => {
        const myChart = eCharts.init(eChartsRef5.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data5, date5)
        myChart.setOption(initLineOption( 'rgb(88, 217, 249)', 'Accumulated number of Issued mPoints', 'Issued mPoints', data[0], data[1], data[2]))
    }

    const initChart6 = () => {
        const myChart = eCharts.init(eChartsRef6.current, 'dark', { renderer: 'svg', })
        const data = initChartData(data6, date6)
        myChart.setOption(initLineOption( 'rgb(255, 138, 69)', 'Accumulated number of Issued Stickers', 'Issued Stickers', data[0], data[1], data[2]))
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
