import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
dynamic(() => import('react-apexcharts'), {
    ssr: false,
})
declare global {
    interface Window {
        android: any;
        webkit:any
    }
}
function Demo() {
    // const getDataFromNative = (params) => {
    //     //params: 原生调用Vue时传值（params）给Vue
    //
    //     console.log('得到原生传值结果:' + params)
    //     // return dic; //回调给原生，可写可不
    //
    // }
    const [ dataCheckIn, setDataCheckIn ] = useState<any>('dddd')

    function javacalljs(){
        document.getElementById('showmsg').innerHTML = '9999JAVA调用了JS的无参函数'

    }

    function javacalljswith(arg){
        document.getElementById('showmsg').innerHTML = '0000000-'+arg

    }



    function receiveDataFromApp(data) {
        setDataCheckIn(data)
        // console.log('Received data from App: ' + data)
        // alert( 'Received data from App: ' + data)
        // 处理传递的值
    }


    useEffect(() => {
        // window?.getDataFromNative = getDataFromNative
    }, [])


    const callBack = () => {
        alert( 'Received data from App: ' + dataCheckIn)
        // console.log('window', window)

    }


    return (
        <div className={'flex flex-col flex-gap20'}>
            <div>demo</div>
            <h3 id="showmsg">调用js显示结果</h3>

            <button onClick={() => {
                window?.android?.jsCallAndroid()
            }}>js调用原生-午餐</button>

            <button onClick={() => {
                window?.android?.jsCallAndroidArgs('Js传过来的参数')
            }}>js调用原生-传参</button>


            <button onClick={() => {
                window.webkit.messageHandlers.jsCallAndroid()
            }}>js调用原生-ios午餐</button>

            <button onClick={() => {
                window.webkit.messageHandlers.jsCallAndroidArgs.postMessage('iiiios')

            }}>js调用原生-ios传参</button>
        </div>
    )
}

export default Demo
