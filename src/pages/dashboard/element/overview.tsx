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
    const [ dateCheckIn, setDateCheckIn ] = useState<string>('day')
    const [ checkInChartData, setCheckInChartData ] = useState<any>([])
    const [ dataCheckIn, setDataCheckIn ] = useState<any>([])

    const [ dateAppUser, setDateAppUser ] = useState<string>('day')
    const [ appUserChartData, setAppUserChartData ] = useState<any>([])
    const [ dataAppUser, setDataAppUser ] = useState<any>([])

    const [ dateAddedWifi, setDateAddedWifi ] = useState<string>('day')
    const [ addedWiFiChartData, setAddedWiFiChartData ] = useState<any>([])
    const [ dataAddedWifi, setDataAddedWifi ] = useState<any>([])

    const [ dateMPoint, setDateMPoint ] = useState<string>('day')
    const [ mPointsChartData, setMPointsChartData ] = useState<any>([])
    const [ dataMPoint, setDataMPoint ] = useState<any>([])

    const [ dateStickers, setDateStickers ] = useState<string>('day')
    const [ stickersChartData, setStickersChartData ] = useState<any>([])
    const [ dataStickers, setDataStickers ] = useState<any>([])

    const dealMPointsData = (data, dateMPoint) => {
        const issuedData = formatData({ data: data?.issued, type: dateMPoint })
        const burnedDataYTT = formatData({ data: data?.burned, type: dateMPoint, isPositiveValue: true })
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
        return [
            {
                name: 'Issued mPoints',
                data: issuedData
            },
            {
                name: 'Remaining mPoints',
                data: balanceData
            },
            {
                name: 'Burned mPoints',
                data: burnedData
            },
        ]
    }

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
                        lineName: 'Remaining mPoints',
                        totalNum: data?.totalIssuedPointsNum + data?.totalBurnedPointsNum,
                    },
                    {
                        lineName: 'Burned mPoints',
                        totalNum: Math.abs(data?.totalBurnedPointsNum),
                    },
                ])
                setStickersChartData( [ {
                    lineName: 'Issued Stickers',
                    totalNum: data?.totalStickerNum,
                } ])


            }
        })

        ChartCheckIn({ group: dateCheckIn }).then((res) => {
            if (res?.code == 200) {
                setDataCheckIn([ {
                    name: 'Check In',
                    data: formatData({ data: res?.data, type: dateCheckIn, dataType: 'growth' })
                } ])
            }
        })
        ChartMember({ group: dateAppUser }).then((res) => {
            if (res?.code == 200) {
                setDataAppUser([ {
                    name: 'App User',
                    data: formatData({ data: res?.data, type: dateAppUser })
                } ])
            }
        })
        ChartWifi({ group: dateAddedWifi }).then((res) => {
            if (res?.code == 200) {
                setDataAddedWifi([ {
                    name: 'New Added WiFi',
                    data: formatData({ data: res?.data, type: dateAddedWifi })
                } ])
            }
        })
        ChartPoint({ group: dateMPoint }).then((res) => {
            if (res?.code == 200) {
                setDataMPoint(dealMPointsData(res?.data, dateMPoint))
            }
        })
        ChartSticker({ group: dateStickers }).then((res) => {
            if (res?.code == 200) {
                setDataStickers([ {
                    name: 'Issued Stickers',
                    data: formatData({ data: res?.data, type: dateStickers })
                } ])
            }
        })
    }

    const fetchChartData = (type = 1, dateeee = 'month') => {
        if (type === 1) {
            setDateCheckIn(dateeee)
            ChartCheckIn({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    // console.log('Check In dateeee',formatData({ data: res?.data, type: dateeee, dataType: 'growth' }));
                    setDataCheckIn([ {
                        name: 'Check In',
                        data: formatData({ data: res?.data, type: dateeee, dataType: 'growth' })
                    } ])
                }
            })
        } else if (type === 3) {
            setDateAppUser(dateeee)
            ChartMember({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setDataAppUser([ {
                        name: 'App User',
                        data: formatData({ data: res?.data, type: dateeee })
                    } ])
                }
            })
        } else if (type === 4) {
            setDateAddedWifi(dateeee)
            ChartWifi({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setDataAddedWifi([ {
                        name: 'New Added WiFi',
                        data: formatData({ data: res?.data, type: dateeee })
                    } ])
                }
            })
        } else if (type === 5) {
            setDateMPoint(dateeee)
            ChartPoint({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setDataMPoint(dealMPointsData(res?.data, dateMPoint))
                }
            })
        } else if (type === 6) {
            setDateStickers(dateeee)
            ChartSticker({
                group: dateeee,
            }).then((res) => {
                const { code } = res
                if (code == 200) {
                    setDataStickers([ {
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
                // x: dateConversion(item?.date, type),
                x: item?.date?.length > 7 ? item?.date : item?.date+'-02',
                y: dataType === 'growth' ? (isPositiveValue ?Math.abs(item?.num) : item?.num) : numTotal,
                curve: [ 0.5, 0, 0.5, 1 ]
            }
        })

        return xData
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
                chartDataList={dataCheckIn}
                lineColors={[ 'rgb(73, 146, 255)' ]}
                dateType={dateCheckIn}
                setDateType={setDateCheckIn}
                onChange={(value) => fetchChartData(1, value)}
            />

            <ApexLinesChart
                title={'Accumulated number of App User'}
                totalDataList={appUserChartData}
                chartDataList={dataAppUser}
                lineColors={[ 'rgb(253, 221, 96)' ]}
                dateType={dateAppUser}
                setDateType={setDateAppUser}
                onChange={(value) => fetchChartData(3, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of New Added WiFi'}
                totalDataList={addedWiFiChartData}
                chartDataList={dataAddedWifi}
                lineColors={[ 'rgb(255, 110, 118)' ]}
                dateType={dateAddedWifi}
                setDateType={setDateAddedWifi}
                onChange={(value) => fetchChartData(4, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of Issued mPoints'}
                totalDataList={mPointsChartData}
                chartDataList={dataMPoint}
                // lineColors={[ 'rgb(88, 217, 249)' ]}
                dateType={dateMPoint}
                setDateType={setDateMPoint}
                onChange={(value) => fetchChartData(5, value)}
            />
            <ApexLinesChart
                title={'Accumulated number of Issued Stickers'}
                totalDataList={stickersChartData}
                chartDataList={dataStickers}
                lineColors={[ 'rgb(255, 138, 69)' ]}
                dateType={dateStickers}
                setDateType={setDateStickers}
                onChange={(value) => fetchChartData(6, value)}
            />
        </Space>
    )
}

export default Overview
