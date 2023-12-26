import React, { useEffect, useState } from 'react'
import { Card, Space } from '@arco-design/web-react'
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
import ApexLinesChart from '@/components/Chart/line-chart'
import { array_column } from '@/utils/function'
function Overview() {
    const [ checkInChartData, setCheckInChartData ] = useState<any>([])
    const [ appUserChartData, setAppUserChartData ] = useState<any>([])
    const [ addedWiFiChartData, setAddedWiFiChartData ] = useState<any>([])
    const [ mPointsChartData, setMPointsChartData ] = useState<any>([])

    const [ issuedStickersChartData, setIssuedStickersChartData ] = useState<any>([])

    const [ date1, setDate1 ] = useState<string>('day')
    const [ date3, setDate3 ] = useState<string>('day')
    const [ date4, setDate4 ] = useState<string>('day')
    const [ date5, setDate5 ] = useState<string>('day')
    const [ date6, setDate6 ] = useState<string>('day')
    const [ data1, setData1 ] = useState<any>([])
    const [ data3, setData3 ] = useState<any>([])
    const [ data4, setData4 ] = useState<any>([])
    const [ data5, setData5 ] = useState<any>([])
    const [ data6, setData6 ] = useState<any>([])

    const fetchData = () => {
        ChartTotal({}).then((res) => {
            const { code } = res
            const data = res?.data ?? {}
            if (code == 200) {
                // setTotalData(data)
                setCheckInChartData( [ {
                    lineName: 'Check In',
                    totalNum: data?.totalCheckNum,
                } ])
                setAppUserChartData( [ {
                    lineName: 'App User',
                    totalNum: data?.totalMemberNum,
                } ])
                setAddedWiFiChartData( [ {
                    lineName: 'New Added Wifi ',
                    totalNum: data?.totalWiFiNum,
                } ])

                setMPointsChartData( [
                    {
                        lineName: 'Issued mPoints',
                        totalNum: data?.totalIssuedPointsNum,
                    },
                    {
                        lineName: 'Burned mPoints',
                        totalNum: Math.abs(data?.totalBurnedPointsNum),
                    },
                    {
                        lineName: 'Remaining mPoints',
                        totalNum: data?.totalIssuedPointsNum + data?.totalBurnedPointsNum,
                    }
                ])
                setIssuedStickersChartData( [ {
                    lineName: 'Issued Stickers',
                    totalNum: data?.totalStickerNum,
                } ])


            }
        })

        ChartCheckIn({ group: date1 }).then((res) => {
            if (res?.code == 200) {
                setData1([ {
                    name: 'Check In',
                    data: formatData({ data: res?.data, type: date1, dataType: 'growth' })
                } ])
            }
        })
        ChartMember({ group: date3 }).then((res) => {
            if (res?.code == 200) {
                setData3([ {
                    name: 'App User',
                    data: formatData({ data: res?.data, type: date3 })
                } ])
            }
        })
        ChartWifi({ group: date4 }).then((res) => {
            if (res?.code == 200) {
                setData4([ {
                    name: 'New Added WiFi',
                    data: formatData({ data: res?.data, type: date4 })
                } ])
            }
        })
        ChartPoint({ group: date5 }).then((res) => {
            if (res?.code == 200) {
                const issuedData = formatData({ data: res?.data?.issued, type: date5 })
                const burnedDataYTT = formatData({ data: res?.data?.burned, type: date5, isPositiveValue: true })
                const tempBalanceData = {}
                const tempIssuedData = array_column(issuedData, null, 'x')
                const tempBurnedData = array_column(burnedDataYTT, null, 'x')
                let burnedData = []
                let balanceData = []
                for (const key in tempIssuedData) {
                    const value = tempIssuedData[key]
                    if(!tempBurnedData?.[key]){
                        tempBurnedData[key] = { x: key, y: 0 }
                    }
                    tempBalanceData[key] ={ x: key, y: value?.y - tempBurnedData?.[key]?.y }
                }
                issuedData.map((item, index) => {
                    burnedData = [ ...burnedData, tempBurnedData?.[item?.x] ]
                    balanceData = [ ...balanceData, tempBalanceData?.[item?.x] ]
                })

                setData5([
                    {
                        name: 'Issued mPoints',
                        data: issuedData
                    },
                    {
                        name: 'Burned mPoints',
                        data: burnedData
                    },
                    {
                        name: 'Remaining mPoints',
                        data: balanceData
                    },
                ])
            }
        })
        ChartSticker({ group: date6 }).then((res) => {
            if (res?.code == 200) {
                setData6([ {
                    name: 'Issued Stickers',
                    data: formatData({ data: res?.data, type: date6 })
                } ])
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
                    // console.log('Check In dateeee',formatData({ data: res?.data, type: dateeee, dataType: 'growth' }));
                    setData1([ {
                        name: 'Check In',
                        data: formatData({ data: res?.data, type: dateeee, dataType: 'growth' })
                    } ])
                }
            })
        } else if (type === 3) {
            setDate3(dateeee)
            ChartMember({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData3([ {
                        name: 'App User',
                        data: formatData({ data: res?.data, type: dateeee })
                    } ])
                }
            })
        } else if (type === 4) {
            setDate4(dateeee)
            ChartWifi({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData4([ {
                        name: 'New Added WiFi',
                        data: formatData({ data: res?.data, type: dateeee })
                    } ])
                }
            })
        } else if (type === 5) {
            setDate5(dateeee)
            ChartPoint({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData5([
                        {
                            name: 'Issued mPoints',
                            data: formatData({ data: res?.data?.issued, type: dateeee })
                        },
                        {
                            name: 'Burned mPoints',
                            data: formatData({ data: res?.data?.burned, type: dateeee, isPositiveValue: true })
                        },
                    ])
                }
            })
        } else if (type === 6) {
            setDate6(dateeee)
            ChartSticker({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setData6([ {
                        name: 'Issued Stickers',
                        data: formatData({ data: res?.data, type: dateeee })
                    } ])
                }
            })
        }
    }
    const formatData = ({ data, type, dataType = 'accumulated', isPositiveValue=false }) => {
        let numTotal = 0
        const xData = (data ?? [])?.map((item) => {
            numTotal = isPositiveValue ?Math.abs(numTotal) +Math.abs(item?.num) : numTotal + item?.num
            return {
                x: dateConversion(item?.date, type),
                y: dataType === 'growth' ? (isPositiveValue ?Math.abs(item?.num) : item?.num) : numTotal
            }
        })

        return xData
    }

    const dateConversion = (date = '', type = 'day') => {
        // const getWeekNumber = (date = '2023-12-26') => {
        //     const d = new Date(date)
        //     const onejan = new Date(d.getFullYear(), 0, 1)
        //     const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7)
        //     return week
        // }
        // console.log('getWeekNumber',getWeekNumber());
        return date
        let data = ''
        if (type === 'day') {
            data = date.replaceAll('-', '.')
        } else if (type === 'week') {
            data = 'Week' + date.substr(5, 2) + ',' + date.substr(0, 4)
        } else if (type === 'month') {
            const year = date.substr(0, 4)
            const dateMonth = date.slice(5)
            const month = {
                month1: 'Jan ' + year,
                month2: 'Feb ' + year,
                month3: 'Mar ' + year,
                month4: 'Apr ' + year,
                month5: 'May ' + year,
                month6: 'Jun ' + year,
                month7: 'Jul ' + year,
                month8: 'Aug ' + year,
                month9: 'Sep ' + year,
                month10: 'Oct ' + year,
                month11: 'Nov ' + year,
                month12: 'Dec ' + year,
            }
            data = month?.['month' + dateMonth]
        } else {
            data = date
        }
        return data
    }

    useEffect(() => {
        fetchData()
    }, [])
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
            <ApexLinesChart
                title={'Check in Growth Quantity'}
                totalDataList={checkInChartData}
                chartDataList={data1}
                lineColors={[ 'rgb(73, 146, 255)' ]}
                dateType={date1}
                setDateType={setDate1}
                onChange={(value) => fetchChartData(1, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of App User'}
                totalDataList={appUserChartData}
                chartDataList={data3}
                lineColors={[ 'rgb(253, 221, 96)' ]}
                dateType={date3}
                setDateType={setDate3}
                onChange={(value) => fetchChartData(3, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of New Added WiFi'}
                totalDataList={addedWiFiChartData}
                chartDataList={data4}
                lineColors={[ 'rgb(255, 110, 118)' ]}
                dateType={date4}
                setDateType={setDate4}
                onChange={(value) => fetchChartData(4, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of Issued mPoints'}
                totalDataList={mPointsChartData}
                chartDataList={data5}
                // lineColors={[ 'rgb(88, 217, 249)' ]}
                dateType={date5}
                setDateType={setDate5}
                onChange={(value) => fetchChartData(5, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of Issued Stickers'}
                totalDataList={issuedStickersChartData}
                chartDataList={data6}
                lineColors={[ 'rgb(255, 138, 69)' ]}
                dateType={date6}
                setDateType={setDate6}
                onChange={(value) => fetchChartData(6, value)}
            />

        </Space>
    )
}

export default Overview
