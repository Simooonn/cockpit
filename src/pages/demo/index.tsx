import React, { useState } from 'react'
import styles from '@/pages/dashboard/style/overview.module.less'

import dynamic from 'next/dynamic'
import { Card, Button } from '@arco-design/web-react'
const ApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})
function LineChart() {
    const intervals = [
        'Day',
        // '3 Day',
        'Week',
        // '3 Week',
        'Month',
    // '3 Month',
    // 'Year',
    ]

    const chartDatas = [
        {
            name: 'Check in Growth Quantity',
            short: 'Check In',
            totalKey: 'totalCheckNum',
        },
        {
            name: 'Accumulated number of App User',
            short: 'App User',
            totalKey: 'totalMemberNum',
        },
    ]

    const [ totalData, setTotalData ] = useState(null)

    /** ApexChart */
    const chartOptions: any = {
        options: {
            chart: {
                height: 600,
                type: 'rangeArea',
                animations: {
                    speed: 600,
                },
                // id: 'line-chart',
                // zoom: {
                //     enabled: true // 启用缩放
                // },
                // events: {
                //     // 鼠标滚轮事件，用于缩放图表
                //     zoomed: (chartContext, { xaxis }) => {
                //         const { min, max } = xaxis[0];
                //         // 缩放之后的最小值和最大值
                //         console.log('Zoomed range:', min, max);
                //     }
                // }
                toolbar: {
                    tools: {
                        download: false, // 隐藏下载按钮
                        selection: false, // 显示选择工具（用于缩放）
                        zoom: false, // 隐藏缩放工具
                        zoomin: true, // 隐藏缩小按钮
                        zoomout: true, // 隐藏放大按钮
                        pan: false, // 隐藏平移工具
                        reset: false, // 隐藏重置按钮
                    },
                    autoSelected: 'zoom',
                },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: '#ffffff80',
                    },
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM \'yy',
                    },
                },
                axisBorder: {
                    show: true,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0,
                },
                tooltip: {
                    enabled: true,
                },
            },
            yaxis: {
                lines: {
                    colors: '#ffffff33',
                    opacity: 0.2,
                },
                labels: {
                    style: {
                        colors: '#ffffff80',
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: [ '#00AEF5', '#F27935', '#B192FF', '#4EE29B' ],
            // opacity: [ 1, 1, 1, 1 ],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.65,
                    opacityTo: 0.05,
                    stops: [ -30, 250 ],
                },
            },
            forecastDataPoints: {
                count: 1,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'left',
                inverseOrder: false,
                offsetY: 7,
                labels: {
                    colors: 'white',
                },
                onItemClick: {
                    toggleDataSeries: true,
                },
                onItemHover: {
                    highlightDataSeries: true,
                },
            },
            grid: {
                show: true,
                borderColor: '#ffffff20',
                yasis: {
                    lines: {
                        show: true,
                    },
                },
            },
            // markers: {
            //     show: false,
            //     size: 3,
            //     strokeWidth: 1,
            //     strokeColor: '#010127',
            //     hover: {
            //         sizeOffset: 3,
            //         size: 5,
            //     },
            // },
            tooltip: {
                enabled: true,
                theme: 'dark',
                style: {
                    fontSize: '11px',
                    colors: '#78909C',
                },
            },
            noData: {
                text: 'Loading...',
            },
        },
        series: [
            {
                name: 'Check-in',
                data: [
                    { x: 'Jan 2023', y: 500 },
                    { x: 'Feb 2023', y: 700 },
                    { x: 'Mar 2023', y: 900 },
                    { x: 'Apr 2023', y: 400 },
                    { x: 'May 2023', y: 200 },
                    { x: 'Jun 2023', y: 800 },
                    { x: 'Jul 2023', y: 1100 },
                    { x: 'Aug 2023', y: 1800 },
                    { x: 'Sep 2023', y: 800 },
                    { x: 'Oct 2023', y: 400 },
                    { x: 'Nov 2023', y: 200 },
                    { x: 'Dec 2023', y: 400 },
                    { x: 'Jan 2024', y: 1000 },
                    { x: 'Feb 2024', y: 800 },
                ],
            },
            {
                name: 'App User',
                data: [
                    { x: 'Jan 2023', y: 1300 },
                    { x: 'Feb 2023', y: 1900 },
                    { x: 'Mar 2023', y: 1300 },
                    { x: 'Apr 2023', y: 1700 },
                    { x: 'May 2023', y: 1100 },
                    { x: 'Jun 2023', y: 1600 },
                    { x: 'Jul 2023', y: 1500 },
                    { x: 'Aug 2023', y: 1400 },
                    { x: 'Sep 2023', y: 1900 },
                    { x: 'Oct 2023', y: 1500 },
                    { x: 'Nov 2023', y: 2000 },
                    { x: 'Dec 2023', y: 1500 },
                    { x: 'Jan 2024', y: 1900 },
                    { x: 'Feb 2024', y: 1200 },
                ],
            },
        ],
    }

    const showTotalData = () => {
        if (!totalData) {
            return null
        }

        return chartDatas.map((data, index) => (
            <div
                key={index}
                style={{
                    backgroundColor: '#ffffff15',
                    borderRadius: '10px',
                    border: '1px solid #ffffff10',
                    padding: '10px 30px',
                    marginLeft: '8px',
                }}
            >
                <span
                    style={{
                        fontSize: '12px',
                        color: '#e3e3e380',
                        fontWeight: 'semiBold',
                        display: 'block',
                    }}
                >
                    {data.short}
                </span>
                <span
                    style={{ fontSize: '12px', color: '#e3e3e3', fontWeight: 'bold' }}
                >
          Total $
                </span>
                <span
                    style={{ fontSize: '17px', color: '#e3e3e3', fontWeight: 'bold' }}
                >
                    {totalData[data.totalKey].toLocaleString()}
                </span>
            </div>
        ))
    }

    return (
        <Card style={{ paddingLeft: '10px', paddingRight: '15px' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '22px',
                            marginLeft: '15px',
                        }}
                    >
            Growth Quantity Charts
                    </p>
                    <div style={{ display: 'flex' }}>
                        {intervals.map((interval, index) => (
                            <Button
                                type="secondary"
                                key={index}
                                style={{
                                    fontSize: '12px',
                                    margin: 'auto 3px',
                                    borderRadius: '10px',
                                }}
                                // onClick={() => updateData(interval)}
                                className={styles.filterButton}
                            >
                                {interval}
                            </Button>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '12px',
                        marginTop: '-10px',
                        justifyContent: 'end',
                    }}
                >
                    {showTotalData()}
                </div>
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    <ApexCharts
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="area"
                        height={500}
                    />
                </div>
            </div>
        </Card>
    )
}

export default LineChart
