import React, { ReactNode, useEffect, useState } from 'react'
import {
    Card,
    Grid,
    Select,
    Skeleton,
    Space,
    Typography,
} from '@arco-design/web-react'
import locale from '@/locale'
import useLocale from '@/utils/useLocale'
import * as eCharts from 'echarts'
import {
    ChartCheckIn, ChartMember, ChartPoint, ChartSticker, ChartWifi,
} from '@/request/api'
import styles from '@/pages/dashboard/style/overview.module.less'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from '@/pages/minerMap'
const ApoApiURL = 'https://api.thegraph.com/subgraphs/name/simooonn/metablox-cockpit'
const ApoClient = new ApolloClient({
    uri: ApoApiURL,
    cache: new InMemoryCache(),
})
const { Row, Col } = Grid
const { Title } = Typography
const Option = Select.Option
const TimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
function Overview() {
    const t = useLocale(locale)
    // const eChartsRef: any = React.createRef();
    // const [todayData, setTodayData] = useState<any>({});
    const [ totalData, setTotalData ] = useState<any>({})
    const [ date1, setDate1 ] = useState<string>('month')
    const [ date3, setDate3 ] = useState<string>('month')
    const [ date4, setDate4 ] = useState<string>('month')
    const [ date5, setDate5 ] = useState<string>('month')
    const [ date6, setDate6 ] = useState<string>('month')
    const [ data1, setData1 ] = useState<any>({})
    const [ data3, setData3 ] = useState<any>({})
    const [ data4, setData4 ] = useState<any>({})
    const [ data5, setData5 ] = useState<any>({})
    const [ data6, setData6 ] = useState<any>({})
    const eChartsRef1: any = React.createRef()
    // const eChartsRef2: any = React.createRef();
    const eChartsRef3: any = React.createRef()
    const eChartsRef4: any = React.createRef()
    const eChartsRef5: any = React.createRef()
    const eChartsRef6: any = React.createRef()

    const optionsDate = [
    // { code: 'day', name: 'Day' },
        { code: 'week', name: 'Week' },
        { code: 'month', name: 'Month' },
    ]

  type StatisticItemType = {
    icon?: ReactNode;
    title?: ReactNode;
    count?: ReactNode;
    loading?: boolean;
    unit?: ReactNode;
  };
  function StatisticItem(props: StatisticItemType) {
      const {
      // icon,
          title, count, loading, unit } = props
      return (
          <div className={styles.item}>
              {/*<div className={styles.icon}>{icon}</div>*/}
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
      )
  }


  const fetchData = () => {

      ChartCheckIn({
          group: date1,
      // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
          const { code } = res
          const data = res?.data ?? {}
          if (code == 200) {
              setData1(data)
          }
      })
      ChartMember({
          group: date3,
          // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
          const { code } = res
          const data = res?.data ?? {}
          if (code == 200) {
              setData3(data)
          }
      })
      ChartWifi({
          group: date4,
          // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
          const { code } = res
          const data = res?.data ?? {}
          if (code == 200) {
              setData4(data)
          }
      })
      ChartPoint({
          group: date5,
          // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
          const { code } = res
          const data = res?.data ?? {}
          if (code == 200) {
              setData5(data)
          }
      })
      ChartSticker({
          group: date6,
          // loc:(0 - new Date().getTimezoneOffset() / 60)
      }).then((res) => {
          const { code } = res
          const data = res?.data ?? {}
          if (code == 200) {
              setData6(data)
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
              const data = res?.data ?? {}
              if (code == 200) {
                  setData1(data)
              }
          })
      }
      else if(type === 3){
          setDate3(dateeee)
          ChartMember({
              group: dateeee,
          }).then((res) => {
              const { code } = res
              const data = res?.data ?? {}
              if (code == 200) {
                  setData3(data)
              }
          })
      }
      else if(type === 4){
          setDate4(dateeee)
          ChartWifi({
              group: dateeee,
          }).then((res) => {
              const { code } = res
              const data = res?.data ?? {}
              if (code == 200) {
                  setData4(data)
              }
          })
      }
      else if(type === 5){
          setDate5(dateeee)
          ChartPoint({
              group: dateeee,
          }).then((res) => {
              const { code } = res
              const data = res?.data ?? {}
              if (code == 200) {
                  setData5(data)
              }
          })
      }
      else if(type === 6){
          setDate6(dateeee)
          ChartSticker({
              group: dateeee,
          }).then((res) => {
              const { code } = res
              const data = res?.data ?? {}
              if (code == 200) {
                  setData6(data)
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

  const initChart1 = () => {
      const myChart = eCharts.init(eChartsRef1.current, 'dark', {
          renderer: 'svg',
      })
      const xData = (data1?.time ?? [])?.map(ittt => {
          return dateConversion(ittt, date1)
      })
      const yData = data1?.check ?? []
      xData.pop()
      yData.pop()
      myChart.setOption(initLineOption( 'rgb(73, 146, 255)', 'Check in Growth Quantity', 'Check In', xData, yData))
  }

  const initChart3 = () => {
      let nnum = data3?.memberBase
      const myChart = eCharts.init(eChartsRef3.current, 'dark', {
          renderer: 'svg',
      })

      const xData = (data3?.time ?? [])?.map(ittt => {
          return dateConversion(ittt, date3)
      })
      const yData = (data3?.member ?? [])?.map(ittt => {
          nnum = nnum + ittt
          return nnum
      })
      xData.pop()
      yData.pop()
      myChart.setOption(initLineOption( 'rgb(253, 221, 96)', 'Accumulated number of App User', 'App User', xData, yData))
  }

  const initChart4 = () => {
      let nnum = data4?.wiFiBase
      const myChart = eCharts.init(eChartsRef4.current, 'dark', {
          renderer: 'svg',
      })

      const xData = (data4?.time ?? [])?.map(ittt => {
          return dateConversion(ittt, date4)
      })
      const yData = (data4?.wifi ?? [])?.map(ittt => {
          nnum = nnum + ittt
          return nnum
      })
      xData.pop()
      yData.pop()
      myChart.setOption(initLineOption( 'rgb(255, 110, 118)', 'Accumulated number of New Added WiFi', 'New Added WiFi', xData, yData))
  }

  const initChart5 = () => {
      let nnum = data5?.pointBase
      const myChart = eCharts.init(eChartsRef5.current, 'dark', {
          renderer: 'svg',
      })

      const xData = (data5?.time ?? [])?.map(ittt => {
          return dateConversion(ittt, date5)
      })
      const yData = (data5?.point ?? [])?.map(ittt => {
          nnum = nnum + ittt
          return nnum
      })
      xData.pop()
      yData.pop()
      myChart.setOption(initLineOption( 'rgb(88, 217, 249)', 'Accumulated number of Issued mPoints', 'Issued mPoints', xData, yData))
  }

  const initChart6 = () => {
      let nnum = data6?.stickerBase
      const myChart = eCharts.init(eChartsRef6.current, 'dark', {
          renderer: 'svg',
      })

      const xData = (data6?.time ?? [])?.map(ittt => {
          return dateConversion(ittt, date6)
      })
      const yData = (data6?.sticker ?? [])?.map(ittt => {
          nnum = nnum + ittt
          return nnum
      })
      xData.pop()
      yData.pop()
      myChart.setOption(initLineOption( 'rgb(255, 138, 69)', 'Accumulated number of Issued Stickers', 'Issued Stickers', xData, yData))
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
          {/*<Row>*/}
          {/*  <Col span={24}>*/}
          {/*    <Card>*/}
          {/*      /!*<Typography.Title heading={6}>Total</Typography.Title>*!/*/}
          {/*      <Row>*/}
          {/*        <Col flex={1}>*/}
          {/*          <StatisticItem*/}
          {/*              // icon={<IconContent />}*/}
          {/*              title={'Total Miners'}*/}
          {/*              count={totalData?.totalWiFiNum ?? ''}*/}
          {/*              loading={false}*/}
          {/*              unit={''}*/}
          {/*          />*/}
          {/*        </Col>*/}



          {/*      </Row>*/}
          {/*    </Card>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
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
