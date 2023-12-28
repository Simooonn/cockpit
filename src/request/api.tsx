import { get } from './http'
const apiGet = (url: string, p: any) =>
    get(url, p)
        .then((res: any) => {
            return res
        })
        .catch((ee: any) => {
            return ee
        })
export const minerMapView = (p: any) => apiGet('/mapview/page', p)
// export const ChartToday = (p: any) => apiGet('/stats/today', p);
export const ChartTotal = (p: any) => apiGet('/stat/total/num', p)
export const ChartCheckIn = (p: any) => apiGet('/stat/check', p)
export const ChartMember = (p: any) => apiGet('/stat/member', p)
export const ChartWifi = (p: any) => apiGet('/stat/wifi', p)
export const ChartPoint = (p: any) => apiGet('/stat/point', p)
export const ChartSticker = (p: any) => apiGet('/stat/sticker', p)
