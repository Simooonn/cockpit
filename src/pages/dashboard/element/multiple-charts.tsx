import React, { useState, useEffect } from 'react';
import { Card, Button } from '@arco-design/web-react';
import styles from '@/pages/dashboard/style/overview.module.less';
import {
  ChartCheckIn,
  ChartMember,
  ChartPoint,
  ChartSticker,
  ChartTotal,
  ChartWifi,
} from '@/request/api';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const MultipleChart: React.FC = () => {
  const [totalData, setTotalData] = useState<any>({});
  const [date1, setDate1] = useState<string>('month');
  const [date3, setDate3] = useState<string>('month');
  const [date4, setDate4] = useState<string>('month');
  const [date5, setDate5] = useState<string>('month');
  const [date6, setDate6] = useState<string>('month');
  const [data1, setData1] = useState<any>([]);
  const [data3, setData3] = useState<any>([]);
  const [data4, setData4] = useState<any>([]);
  const [data5, setData5] = useState<any>([]);
  const [data6, setData6] = useState<any>([]);
  const eChartsRef1: any = React.createRef();
  // const eChartsRef2: any = React.createRef();
  const eChartsRef3: any = React.createRef();
  const eChartsRef4: any = React.createRef();
  const eChartsRef5: any = React.createRef();
  const eChartsRef6: any = React.createRef();

  const optionsDate = [
    { code: 'week', name: 'Week' },
    { code: 'month', name: 'Month' },
  ];

  const fetchData = () => {
    ChartTotal({}).then((res) => {
      const { code } = res;
      const data = res?.data ?? {};
      if (code == 200) {
        setTotalData(data);
      }
    });

    ChartCheckIn({ group: date1 }).then((res) => {
      if (res?.code == 200) {
        setData1(res?.data ?? []);
      }
    });
    ChartMember({ group: date3 }).then((res) => {
      if (res?.code == 200) {
        setData3(res?.data ?? []);
      }
    });
    ChartWifi({ group: date4 }).then((res) => {
      if (res?.code == 200) {
        setData4(res?.data ?? []);
      }
    });
    ChartPoint({ group: date5 }).then((res) => {
      if (res?.code == 200) {
        setData5(res?.data ?? []);
      }
    });
    ChartSticker({ group: date6 }).then((res) => {
      if (res?.code == 200) {
        setData6(res?.data ?? []);
      }
    });
  };

  const fetchChartData = (type = 1, dateeee = 'month') => {
    if (type === 1) {
      setDate1(dateeee);
      ChartCheckIn({
        group: dateeee,
      }).then((res) => {
        const { code } = res;
        if (code == 200) {
          setData1(res?.data ?? []);
        }
      });
    } else if (type === 3) {
      setDate3(dateeee);
      ChartMember({
        group: dateeee,
      }).then((res) => {
        const { code } = res;
        if (code == 200) {
          setData3(res?.data ?? []);
        }
      });
    } else if (type === 4) {
      setDate4(dateeee);
      ChartWifi({
        group: dateeee,
      }).then((res) => {
        const { code } = res;
        if (code == 200) {
          setData4(res?.data ?? []);
        }
      });
    } else if (type === 5) {
      setDate5(dateeee);
      ChartPoint({
        group: dateeee,
      }).then((res) => {
        const { code } = res;
        if (code == 200) {
          setData5(res?.data ?? []);
        }
      });
    } else if (type === 6) {
      setDate6(dateeee);
      ChartSticker({
        group: dateeee,
      }).then((res) => {
        const { code } = res;
        if (code == 200) {
          setData6(res?.data ?? []);
        }
      });
    }
  };

  const dateConversion = (date = '', type = 'day') => {
    let data = '';
    if (type === 'day') {
      data = date.replaceAll('-', '.');
    } else if (type === 'week') {
      data = 'Week' + date.substr(5, 2) + ',' + date.substr(0, 4);
    } else if (type === 'month') {
      const year = date.substr(0, 4);
      const dateMonth = date.slice(5);
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
      };
      data = month?.['month' + dateMonth];
    } else {
      data = date;
    }
    return data;
  };

  // const initChart1 = () => {
  //     const myChart = eCharts.init(eChartsRef1.current, 'dark', {
  //         renderer: 'svg',
  //     })
  //     const data = initChartData(data1, date1, 'growth')
  //     myChart.setOption(
  //         initLineOption(
  //             'rgb(73, 146, 255)',
  //             'Check in Growth Quantity',
  //             'Check In',
  //             data[0],
  //             data[1],
  //             data[2]
  //         )
  //     )
  // }

  // const initChart3 = () => {
  //     const myChart = eCharts.init(eChartsRef3.current, 'dark', {
  //         renderer: 'svg',
  //     })
  //     const data = initChartData(data3, date3)
  //     console.log('data', data)
  //     myChart.setOption(
  //         initLineOption(
  //             'rgb(253, 221, 96)',
  //             'Accumulated number of App User',
  //             'App User',
  //             data[0],
  //             data[1],
  //             data[2]
  //         )
  //     )
  // }

  // const initChart4 = () => {
  //     const myChart = eCharts.init(eChartsRef4.current, 'dark', {
  //         renderer: 'svg',
  //     })
  //     const data = initChartData(data4, date4)
  //     myChart.setOption(
  //         initLineOption(
  //             'rgb(255, 110, 118)',
  //             'Accumulated number of New Added WiFi',
  //             'New Added WiFi',
  //             data[0],
  //             data[1],
  //             data[2]
  //         )
  //     )
  // }

  // const initChart5 = () => {
  //     const myChart = eCharts.init(eChartsRef5.current, 'dark', {
  //         renderer: 'svg',
  //     })
  //     const data = initChartData(data5, date5)
  //     myChart.setOption(
  //         initLineOption(
  //             'rgb(88, 217, 249)',
  //             'Accumulated number of Issued mPoints',
  //             'Issued mPoints',
  //             data[0],
  //             data[1],
  //             data[2]
  //         )
  //     )
  // }

  // const initChart6 = () => {
  //     const myChart = eCharts.init(eChartsRef6.current, 'dark', {
  //         renderer: 'svg',
  //     })
  //     const data = initChartData(data6, date6)
  //     myChart.setOption(
  //         initLineOption(
  //             'rgb(255, 138, 69)',
  //             'Accumulated number of Issued Stickers',
  //             'Issued Stickers',
  //             data[0],
  //             data[1],
  //             data[2]
  //         )
  //     )
  // }

  // useEffect(() => {
  //     initChart1()
  // }, [ data1 ])
  // useEffect(() => {
  //     initChart3()
  // }, [ data3 ])
  // useEffect(() => {
  //     initChart4()
  // }, [ data4 ])
  // useEffect(() => {
  //     initChart5()
  // }, [ data5 ])
  // useEffect(() => {
  //     initChart6()
  // }, [ data6 ])
  // useEffect(() => {
  //     fetchData()
  //     initChart00()
  // }, [])

  /** ApexChart */
  const [chartOptions, setChartOptions] = useState<any | null>('');
  const [selectedInterval, setSelectedInterval] = useState('Day');

  const intervals = [
    'Day',
    '3 Day',
    'Week',
    '3 Week',
    'Month',
    '3 Month',
    'Year',
  ];

  const updateData = (interval: string) => {
    setSelectedInterval(interval);
  };

  const showSeriesSum = () => {
    if (!chartOptions || !chartOptions.series) {
      return null;
    }

    const sums = chartOptions.series.map((series) =>
      series.data.reduce(
        (seriesTotal, dataPoint) => seriesTotal + dataPoint.y,
        0
      )
    );

    return sums.map((sum, index) => (
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
          {chartOptions.series[index].name}
        </span>
        <span
          style={{ fontSize: '12px', color: '#e3e3e3', fontWeight: 'bold' }}
        >
          Total $
        </span>
        <span
          style={{ fontSize: '17px', color: '#e3e3e3', fontWeight: 'bold' }}
        >
          {sum}
        </span>
      </div>
    ));
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !chartOptions) {
      import('react-apexcharts').then(({ default: ReactApexChart }) => {
        const newChartOptions = generateChartOptions(selectedInterval);
        setChartOptions(newChartOptions);
      });
    }
  }, [selectedInterval]);

  const generateChartOptions = (interval: string) => {
    const series = [
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
      {
        name: 'New Added WiFi',
        data: [
          { x: 'Jan 2023', y: 2000 },
          { x: 'Feb 2023', y: 2500 },
          { x: 'Mar 2023', y: 2000 },
          { x: 'Apr 2023', y: 2900 },
          { x: 'May 2023', y: 2000 },
          { x: 'Jun 2023', y: 2800 },
          { x: 'Jul 2023', y: 2700 },
          { x: 'Aug 2023', y: 2800 },
          { x: 'Sep 2023', y: 2000 },
          { x: 'Oct 2023', y: 2500 },
          { x: 'Nov 2023', y: 2500 },
          { x: 'Dec 2023', y: 2700 },
          { x: 'Jan 2024', y: 2000 },
          { x: 'Feb 2024', y: 2300 },
        ],
      },
      {
        name: 'Issued mPoints',
        data: [
          { x: 'Jan 2023', y: 3800 },
          { x: 'Feb 2023', y: 3000 },
          { x: 'Mar 2023', y: 3200 },
          { x: 'Apr 2023', y: 3000 },
          { x: 'May 2023', y: 3800 },
          { x: 'Jun 2023', y: 3000 },
          { x: 'Jul 2023', y: 3400 },
          { x: 'Aug 2023', y: 3000 },
          { x: 'Sep 2023', y: 3400 },
          { x: 'Oct 2023', y: 3200 },
          { x: 'Nov 2023', y: 3400 },
          { x: 'Dec 2023', y: 3700 },
          { x: 'Jan 2024', y: 3500 },
          { x: 'Feb 2024', y: 3200 },
        ],
      },
    ];

    return {
      series,
      options: {
        chart: {
          height: 600,
          type: 'rangeArea',
          animations: {
            speed: 600,
          },
          toolbar: {
            tools: {
              pan: false,
              selection: true,
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
              month: "MMM 'yy",
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
        colors: ['#4EE29B', '#00AEF5', '#F27935', '#B192FF'],
        opacity: [1, 1, 1, 1],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.65,
            opacityTo: 0.05,
            stops: [-30, 250],
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
        markers: {
          show: false,
          size: 3,
          strokeWidth: 1,
          strokeColor: '#010127',
          hover: {
            sizeOffset: 3,
            size: 5,
          },
        },
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
    };
  };

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
                onClick={() => updateData(interval)}
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
          {showSeriesSum()}
        </div>
        <div style={{ width: '100%', maxWidth: '100%' }}>
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
            type="area"
            height={500}
          />
        </div>
      </div>
    </Card>
  );
};

export default MultipleChart;
