import React from 'react'
import styles from '@/pages/dashboard/style/overview.module.less'

import dynamic from 'next/dynamic'
import { Card, Button } from '@arco-design/web-react'
import { capitalizeFirstLetter } from '@/utils/function'
const ApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})
function ApexLinesChart({
    title = 'Check in Growth Quantity',
    totalDataList = [],
    chartDataList = [],
    dateType = 'day',
    setDateType=null,
    lineColors=null,
    onChange = null
}:{
    title?:string;
    totalDataList?:any;
    chartDataList?:any;
    dateType?:string;
    setDateType?:any;
    lineColors?:any;
    onChange?:any;
}) {
    const dateTypeList = [
        'day',
        // '3 Day',
        'week',
        // '3 Week',
        'month',
        // '3 Month',
        // 'Year',
    ]

    const xFormat = {
        day: 'dd MMM yyyy',
        week: 'dd MM yyyy',
        month: 'MMM yyyy',
    }

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
                    // datetimeFormatter: {
                    //     year: 'yyyy',
                    //     month: 'MM \'yyyy',
                    //     day: 'dd',
                    // },
                },
                axisBorder: {
                    show: true,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0,
                },
                // tooltip: {
                //     enabled: true,
                // },
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
            colors: lineColors ?? [ '#00AEF5', '#F27935', '#B192FF', '#4EE29B' ],
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
                x: {
                    show: true,
                    format: xFormat[dateType],
                    formatter: undefined,
                },
            },
            noData: {
                text: 'Loading...',
                style: {
                    fontSize: '20px',
                    color: '#eaeaea',
                },
            },
        },
        series: chartDataList ??[],
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
                        {title}
                    </p>
                    <div style={{ display: 'flex' }}>
                        {dateTypeList.map((item, index) => (
                            <Button
                                type="secondary"
                                key={index}
                                style={dateType === item ?{
                                    fontSize: '12px',
                                    margin: 'auto 3px',
                                    borderRadius: '10px',
                                    backgroundColor: '#a031e4',

                                }
                                    :{
                                        fontSize: '12px',
                                        margin: 'auto 3px',
                                        borderRadius: '10px',
                                    }}
                                // onClick={() => setDateType(item)}
                                onClick={() => onChange(item)}
                                className={styles.filterButton}
                            >
                                {capitalizeFirstLetter(item)}
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
                    {totalDataList?.map((data, index) => (
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
                                {data?.lineName}
                            </span>
                            <span style={{ fontSize: '12px', color: '#e3e3e3', fontWeight: 'bold' }}>Total </span>
                            <span style={{ fontSize: '17px', color: '#e3e3e3', fontWeight: 'bold' }}>{data?.totalNum?.toLocaleString()}</span>
                        </div>
                    ))}
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

export default ApexLinesChart
