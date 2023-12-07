import { get, post } from './http'
const apiGet = (url: string, p: any) =>
    get(url, p)
        .then((res: any) => {
            return res
        })
        .catch((ee: any) => {
            return ee
        })
const apiPost = (url: string, p: any, config: any = {}) =>
    post(url, p, config)
        .then((res: any) => {
            return res
        })
        .catch((ee: any) => {
            return ee
        })

export const minerMapView = (p: any) => apiGet('/public/mapview/page', p)
// export const ChartToday = (p: any) => apiGet('/stats/today', p);
export const ChartTotal = (p: any) => apiGet('/stats/total', p)
export const ChartCheckIn = (p: any) => apiGet('/public/stat/check', p)
export const ChartMember = (p: any) => apiGet('/public/stat/member', p)
export const ChartWifi = (p: any) => apiGet('/public/stat/wifi', p)
export const ChartPoint = (p: any) => apiGet('/public/stat/point', p)
export const ChartSticker = (p: any) => apiGet('/public/stat/sticker', p)

