import React, { useEffect, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Message } from '@arco-design/web-react'
// import ImgMetablox from '@/assets/miner/metablox.png'
// import ImgShareWifi from '@/assets/miner/share-wifi.png'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { Cluster } from '@googlemaps/markerclusterer/dist/cluster'
import { ClusterStats } from '@googlemaps/markerclusterer/dist/renderer'
import { ChartTotal, minerMapView } from '@/request/api'

const initMinerMapData = (data: any) => {
    if (!data) {
        return []
    }
    return data.map((elem) => {
        let arrAddress = []
        let mInfo
        if (elem?.merchantInfo) {
            mInfo = { ...elem.merchantInfo, name: elem?.merchantInfo?.storeName }
        } else if (elem?.shareWiFiInfo) {
            mInfo = elem.shareWiFiInfo
        } else if (elem?.memberInfo) {
            mInfo = { ...elem.memberInfo, name: 'Metablox Wifi' }
        } else {
            mInfo = { name: '' }
        }
        mInfo.country && (arrAddress = [ ...arrAddress, mInfo.country ])
        mInfo.province && (arrAddress = [ ...arrAddress, mInfo.province ])
        mInfo.city && (arrAddress = [ ...arrAddress, mInfo.city ])
        mInfo.streetName && (arrAddress = [ ...arrAddress, mInfo.streetName ])
        mInfo.floor && (arrAddress = [ ...arrAddress, mInfo.floor ])

        return {
            minerId: elem.minerId,
            // logo0: elem.logo,
            // logo: logo,
            lat: elem.latitude,
            lng: elem.longitude,
            name: mInfo.name,
            address: arrAddress.join(),
        }
    })
}

const App = () => {
    const [ totalData, setTotalData ] = useState<any>({})

    // setup map
    const mapRef = useRef<any>()

    const createMapOptions = (maps) => {
        return {
            mapId: '1075f7ed7a304773',
            minZoom: 2,
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
            Message.error(res?.code)
            return false
        }
        data = res?.data?.list ?? []
        const totalPageNum = Math.ceil(res?.data?.total / formData.size)
        if (totalPageNum > 1) {
            for (let i = 2; i <= totalPageNum; i++) {
                const re0 = await minerMapView({ ...formData, page: i })
                if (re0?.code !== 200) {
                    Message.error(re0?.code)
                    return false
                }
                data = [ ...data, ...(re0?.data?.list ?? []) ]
            }
        }
        return data
    }

    const initMarkers = async ({ mapData, map, maps }) => {
        const infowindow = new maps.InfoWindow({
            content: '',
        })
        // 创建自定义标记的图标
        const icon = {
            url: '/wifi-location1.png',
            // scaledSize: maps.Size('2.4px', '3.5px')
        }
        // Add some markers to the map.
        const markers = initMinerMapData(mapData)?.map((miner) => {
            const position = {
                lat: miner?.lat ?? 0,
                lng: miner?.lng ?? 0,
            }
            // const markerTag = document.createElement('div')
            // markerTag.className = 'advanced-marker-tag'
            // if(miner.logo0 !== ''){
            //     const markerTag1 = document.createElement('img')
            //     markerTag1.className = 'advanced-marker-tag-img'
            //     markerTag1.src = miner.logo
            //     markerTag.append(markerTag1)
            // }

            const marker = new maps.Marker({
                position,
                icon,
                // label: 'aaaaaaaaa',
            })

            // const marker = new maps.marker.AdvancedMarkerElement({
            //     map,
            //     position,
            //     // content: markerTag,
            // })

            // markers can only be keyboard focusable when they have click listeners
            // open info window when marker is clicked
            // marker.addListener('click', () => {
            //     const contentString =
            // '<div id="content" style="width: 300px;margin-right: 10px;margin-bottom: 15px;">' +
            // '<div id="siteNotice">' +
            // '</div>' +
            // '<h1 id="firstHeading" class="firstHeading">' +
            // miner.name +
            // '</h1>' +
            // '<div id="bodyContent">' +
            // '<p>' +
            // miner.address +
            // '</p>' +
            // '</div>' +
            // '</div>'
            //     infowindow.setContent(contentString)
            //     infowindow.open(map, marker)
            // })

            return marker
        })

        const renderer = {
            render: function ({ count, position }: Cluster, stats: ClusterStats) {
                // create svg url with fill color
                /*  const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".8" r="70" />
  </svg>`);*/
                const svg = window.btoa(`
<svg fill="#CE44FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
          <circle cx="120" cy="120" opacity=".9" r="70" />
          <circle cx="120" cy="120" opacity=".3" r="90" />
          <circle cx="120" cy="120" opacity=".2" r="110" />
        </svg>
`)

                // create marker using svg icon
                return new maps.Marker({
                    position,
                    icon: {
                        url: `data:image/svg+xml;base64,${svg}`,
                        scaledSize: new maps.Size(50, 50),
                    },
                    label: {
                        text: String(count),
                        color: 'rgba(255,255,255,1)',
                        fontSize: '12px',
                    },
                    // adjust zIndex to be above other markers
                    zIndex: Number(maps.Marker.MAX_ZINDEX) + count,
                })
            },
        }

        // Add a marker clusterer to manage the markers.
        new MarkerClusterer({ markers, map, renderer })
    }

    //Create a button and function to locate the current location on the map
    const createMyLocationButton = ({ map, maps }) => {
        //Create my location button
        const locButton = document.createElement('button')
        locButton.classList.add('custom-map-control-button')
        const locButton1 = document.createElement('div')
        locButton1.classList.add('custom-map-control-button1')
        const locButton2 = document.createElement('div')
        locButton2.classList.add('my-location')
        locButton1.append(locButton2)
        locButton.append(locButton1)
        map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(locButton)

        //bind click event
        locButton.addEventListener('click', () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position: GeolocationPosition) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }

                        map.setZoom(15)
                        map.setCenter(pos)
                        new maps.Marker({ position: pos, map })
                    },
                    (error) => {
                        Message.error(error.message)
                    }
                )
            } else {
                Message.error('Browser doesn\'t support Geolocation')
            }
        })
    }

    useEffect(() => {
        // fetchMapMarkers();
        ChartTotal({}).then((res) => {
            const { code } = res
            const data = res?.data ?? {}
            if (code == 200) {
                setTotalData(data)
            }
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
                            'marker',
                            // 'visualization',
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
                        createMyLocationButton({ map: map, maps: maps })

                        const MapData = await initMapData()
                        initMarkers({ mapData: MapData, map: map, maps: maps })
                    }}
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
