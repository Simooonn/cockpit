import React, { useEffect, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
// import ImgMetablox from '@/assets/miner/metablox.png'
// import ImgShareWifi from '@/assets/miner/share-wifi.png'
import AAAAJSON from '@/assets/aa.json'

import { ChartMember, ChartTotal, minerMapView } from '@/request/api'
const App = () => {
    const darkMapStyle = [
        {
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#212121'
                }
            ]
        },
        {
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#757575'
                }
            ]
        },
        {
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#212121'
                }
            ]
        },
        {
            'featureType': 'administrative',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#757575'
                }
            ]
        },
        {
            'featureType': 'administrative.country',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#9e9e9e'
                }
            ]
        },
        // 这里省略了更多地图样式信息...
    ]
    const [ totalData, setTotalData ] = useState<any>({})
    const [ places, setPlaces ] = useState<{lat:number;lng:number;weight:number}[]>([])
    function isLocationInChina(latitude, longitude) {
        if (latitude >= 18.16 && latitude <= 53.55 && longitude >= 73.66 && longitude <= 135.05) {
            return true
        } else {
            return false
        }
    }
    const data = places?.map((place:any) => {
        if(isLocationInChina(place?.lat, place?.lng)){
            return {
                // lat: place?.latitude,
                // lng: place?.longitude,
                lat: place?.lat,
                lng: place?.lng,
                weight: 1,
            }
        }
        else {
            return {
                // lat: place?.latitude,
                // lng: place?.longitude,
                lat: place?.lat,
                lng: place?.lng,
                weight: 1,
            }
        }

    })

    const heatmapData = {
        positions: data,
        options: {
            radius: 40,
            opacity: 0.8,
            gradient: [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)',
            ]
        },
    }
    // setup map
    const mapRef = useRef<any>()

    const createMapOptions = (maps) => {
        return {
            // mapId: '1075f7ed7a304773',
            minZoom: 2,
            styles: darkMapStyle,
            // maxZoom: 5,
            fullscreenControl: false,
        }
    }

    const initMapData = async () => {
        //init miner map data
        const formData = {
            latitude: 0,
            longitude: 0,
            page: 1,
            size: 1000,
        }
        let data = []
        const res = await minerMapView(formData)
        if (res?.code !== 200) {
            return []
        }
        data = res?.data?.list ?? []
        const totalPageNum = Math.ceil(res?.data?.total / formData.size)
        if (totalPageNum > 1) {
            for (let i = 2; i <= totalPageNum; i++) {
                const re0 = await minerMapView({ ...formData, page: i })
                if (re0?.code !== 200) {
                    return []
                }
                data = [ ...data, ...(re0?.data?.list ?? []) ]
            }
        }
        return data
    }


    const xxxxx = () => {
        minerMapView({
            latitude: 0,
            longitude: 0,
            page: 1,
            size: 1000,
        }).then((res) => {
            const { code, data } = res
            console.log('code', code)
        })

        // const dataaa = MapData?.map((place:any) => ({
        //     lat: place?.latitude,
        //     lng: place?.longitude,
        //     weight: Math.floor(Math.random() * Math.floor(5)),
        // }))
        // setLocal('MapData',dataaa)
        console.log('dataaa22', 'dataaa')
        console.log('MapData', 'MapData')
    }

    useEffect(() => {
        // xxxxx()
        // fetchMapMarkers();
        ChartTotal({}).then((res) => {
            const { code } = res
            const data = res?.data ?? {}
            if (code == 200) {
                setTotalData(data)
            }
        })
        ChartMember({}).then((res) => {
            console.log('aa')
            setPlaces(AAAAJSON)
        })



    }, [])

    return (
        <div className="flex justify-center">
            <div id={'metablox_google_map_dashboard'} style={{ height: '80vh', width: '90%', marginTop: '2vh' }}>
                {totalData?.totalWiFiNum && (
                    <div
                        className="flex flex-row"
                        style={{
                            position: 'absolute',
                            right: '12%',
                            top: '120px',
                            zIndex: 999,
                        }}
                    >
                        <div
                            style={{
                                marginRight: '14px',
                                fontSize: '20px',
                                lineHeight: '30px',
                                fontWeight: '600',
                                color: '#eeeeeee6',
                            }}
                        >
                            Total Miners
                        </div>{' '}
                        <div
                            style={{
                                fontSize: '24px',
                                lineHeight: '30px',
                                fontWeight: '600',
                                color: '#eeeeeee6',
                            }}
                        >
                            {totalData?.totalWiFiNum ?? ''}
                        </div>
                    </div>
                )}
                <GoogleMapReact
                    id={'aaaaaaa'}
                    className={'bbbbbb'}
                    bootstrapURLKeys={{
                        key: process.env.NEXT_GOOGLE_MAP_API_KEY,
                        libraries: [
                            // 'marker',
                            'visualization',
                            'maps',
                            // 'places'
                        ],
                        // v: 'weekly',
                        v: 'beta',
                        language: 'en',
                    }}
                    // defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
                    // defaultZoom={1}
                    zoom={2}
                    center={{ lat: 42.8566, lng: -20.3522 }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={async ({ map, maps }) => {
                        mapRef.current = map
                        /*  方案一
                       const aa =await initMapData()
                        function getPoints(data) {
                            console.log('data',data);
                            return data.map((place) => (new maps.LatLng(place?.latitude, place?.longitude)))
                        }
                        let heatmap = new maps.visualization.HeatmapLayer({
                            data: getPoints(aa),
                            map: map,
                        })
                        //
                        // heatmap.setMap(map)
                        // new maps?.visualization?.HeatmapLayer({
                        //     positions: dataaa,
                        //     options: {
                        //         radius: 20,
                        //         opacity: 1,
                        //     },
                        //     // data: dataaa, // 热力图数据
                        //     // dissipating: true, // 热力图是否散射，默认为true
                        //     // radius: 50, // 热力点半径，默认为20
                        //     // map: map, // 地图对象
                        // })*/
                    }}
                    heatmap={heatmapData}
                    options={createMapOptions}
                    bounds={{
                        north: 90, // 矩形区域的北边界（纬度值）
                        south: -90, // 矩形区域的南边界（纬度值）
                        east: 90, // 矩形区域的东边界（经度值）
                        west: -90// 矩形区域的西边界（经度值）
                    }}
                ></GoogleMapReact>
            </div>
        </div>
    )
}

export default App
