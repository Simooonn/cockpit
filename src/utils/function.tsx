import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Message } from '@arco-design/web-react'
// import db from "@@/utils/db/browserDb";
// import {dexieDB} from "@@/utils/db/indexDB";
// const dbStore = db;
// // dayjs.extend(utc);
//
// /* Check whether it is a mobile access */
// export function _isMobile() {
//   return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
// }

/**
 *  Hiding string
 *
 *  str         String to be processed
 *  start_len    The first few reserved
 *  end_len      Reserved last few digits
 *  symbol         Replaced string
 *  replace_len      How many characters to replace with the previously defined characters(Not transmitted or <=0, will be replaced with an equal number of characters)
 * */
export function hideStr(
    str = '',
    start_len = 1,
    end_len = 1,
    symbol = '*',
    replace_len = -1
) {
    const len = replace_len <= 0 ? str.length - start_len - end_len : replace_len
    let replace_symbol = ''
    for (let i = 0; i < len; i++) {
        replace_symbol += symbol
    }
    return (
        str.substring(0, start_len) +
    replace_symbol +
    str.substring(str.length - end_len)
    )
}

/* Json String to Object */
export function json_to_obj(_data_: any) {
    if (typeof _data_ === 'object') {
        return _data_
    }
    if (!_data_ || typeof _data_ !== 'string') {
        return {}
    }

    const pattern = '&quot;'
    if (_data_.indexOf(pattern) !== -1) {
        _data_ = _data_.replace(new RegExp(pattern, 'gm'), '"')
    }
    return JSON.parse(_data_)

    /*if(type === 'local'){
    return eval('(' + _data_ + ')');
  }
  else{
    const json_str = _data_.replace(new RegExp('&quot;', "gm"), '"');
    return JSON.parse(json_str);
  }*/
}

/* The list array is sorted according to the fields of the objects in it */
export function arrListSort(arrList: any[], key = 'id') {
    const handle = (property: any) => {
        return function (a: any, b: any) {
            const val1 = a[property]
            const val2 = b[property]
            return val1 - val2
        }
    }
    return arrList.sort(handle(key))
}

/* Judge whether it is empty */
export function empty(value: any): boolean {
    return (
        typeof value === 'undefined' ||
    value === null ||
    value === false ||
    value.length === 0
    )
}

export function array_column(
    array: any[],
    field: string | null,
    fid = 'id'
): any {
    if (field !== null) {
        return array.map((v) => v[field])
    } else {
        const obj: any = {}
        array.map((v) => {
            obj[v[fid]] = v
            return v
        })
        return obj
    }
}
//
// function key2Lower(obj) {
//   const newO = {};
//   for (const key in obj) {
//     newO[key.toLowerCase()] = obj[key];
//   }
//   return newO;
// }
// function key2Upper(obj) {
//   const newO = {};
//   for (const key in obj) {
//     newO[key.toUpperCase()] = obj[key];
//   }
//   return newO;
// }

// export function explode(str,separator){
//   return str.split(separator)
// }
// export function implode(array,separator){
//   return array.join(separator)
// }
//
//
// /* The seconds are optimized and displayed as days,hours,minutes */
// export function timeToFriendly(time = 0) {
//   let days = parseInt((time / ( 60 * 60 * 24)).toString());
//   let hours = parseInt(((time % ( 60 * 60 * 24)) / ( 60 * 60)).toString());
//   let minutes = parseInt(((time % (60 * 60)) / ( 60)).toString());
//   return days + " Days, " + hours + " Hours, " + minutes + " Minutes";
// }
//
export function conversionUtcDate(date, type = 'local') {
    if (date === null) {
        return ''
    }
    dayjs.extend(utc)
    if (type === 'local') {
    // Pass in local to convert UTC time to local time
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
    } else if (type === 'UTC') {
    // Convert the time to UTC when it is passed in to UTC
        return dayjs(date).utc().format()
    }
    return date
}

//取得[n,m]范围随机数
export function randomNum(n: number, m: number): number {
    let result = Math.random() * (m + 1 - n) + n
    while (result > m) {
        result = Math.random() * (m + 1 - n) + n
    }
    return Math.ceil(result)
}

function md5(value: any) {
    return value
}

const localStorageKey = 'localStorageData'

/* set localStorage */
export function setLocal(key = '', value: any) {
    const vv: any = {}
    vv[localStorageKey] = typeof value === 'undefined' ? 'undefined' : value
    key = md5(key)
    return localStorage.setItem(key, JSON.stringify(vv))
}

/* delete localStorage */
function deleteLocal(key = '') {
    key = md5(key)
    return localStorage.removeItem(key)
}

function clearLocal() {
    return localStorage.clear()
}

export const clearAccount = () => {
    return clearLocal()
}

/* get localStorage */
export function getLocal(key = '') {
    //When the incoming key is incorrect, an empty string is returned directly
    if (typeof key !== 'string' || key === '') {
        return ''
    }

    if (typeof window !== 'undefined') {
        key = md5(key)
        //When the obtained data is null or does not contain the specified string, null is returned directly
        const result = localStorage.getItem(key)
        if (result === null || result.indexOf(localStorageKey) === -1) {
            return null
        }

        //The json string is parsed into an object
        const data = json_to_obj(result)[localStorageKey]
        let undef
        return data === 'undefined' ? undef : data
    } else {
        return ''
    }
}

/* set JWTToken  */
export function setJWTToken(value: any) {
    return setLocal('JWTToken', value)
}

/* get JWTToken */
export function getJWTToken() {
    return getLocal('JWTToken')
}
/* set Token */
export function setToken(value: any) {
    return setLocal('token', value)
}

/* get Token */
export function getToken() {
    return getLocal('token')
}

/* getLocalUser */
export function getLocalUser() {
    return getLocal('user')
}

/* setLocalUser */
export function setLocalUser(value: any) {
    return setLocal('user', value)
}

/* delLocalUser */
export function delLocalUser() {
    return deleteLocal('user')
}

/* getLocalDictData */
export function getLocalDictData() {
    return getLocal('DictData')
}

/* setLocalDictData */
export function setLocalDictData(value: any) {
    const data: any = {}
    for (const kk in value) {
        data[value[kk].type] = value[kk].list
    }
    return setLocal('DictData', data)
}

/* set MinerMapData  */
export function setMinerMapData(value: any) {
    return setLocal('MinerMapData', value)
}

/* get MinerMapData */
export function getMinerMapData() {
    return empty(getLocal('MinerMapData')) ? [] : getLocal('MinerMapData')
}

export function copy_text(content: string) {
    content = content === null ? '' : content
    if (typeof navigator.clipboard != 'undefined' && window.isSecureContext) {
        navigator.clipboard.writeText(content)
        if (content === '') {
            return false
        } else {
            return true
        }
    } else {
        const input = document.createElement('input')
        input.setAttribute('readonly', 'readonly')
        input.setAttribute('value', content)
        document.body.appendChild(input)
        input.select()
        const re = document.execCommand('copy')
        document.body.removeChild(input)
        if (re) {
            return true
        } else {
            return false
        }
    }
}

export function api_url() {
    if (typeof window !== 'undefined') {
        let wUrl
        const port = window.location.port
        if (window.location.origin.indexOf('explorer.metablox.io') != -1) {
            if (port == '80' || port == '443' || port == '') {
                //prod
                wUrl = 'https://api.metablox.io'
            } else {
                //stg
                wUrl = 'https://apistage.metablox.io'
            }
        }
        else if (window.location.origin.indexOf('cockpit.metablox.io') != -1) {
            //stg
            wUrl = 'https://apistage.metablox.io'
        }
        else if (window.location.origin.indexOf('54.185.72.94') != -1) {
            //test - QA
            wUrl = 'https://apitest.metablox.io'
        }
        else if (window.location.origin.indexOf('54.189.68.105') != -1) {
            //dev
            wUrl = 'https://apidev.metablox.io/'
        }
        else {
            wUrl = ''
        }
        return wUrl + '/v1/explorer'
    } else {
        return '/v1/explorer'
    }
}

export function time_to_rfc3339(time) {
    return new Date(time).toISOString()
}

// 正则替换小数点
export const limitNumber = (value) => {
    if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(/[^0-9]/g, '') : 0
    } else if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(/[^0-9]/g, '') : 0
    } else {
        return 0
    }
}

export const data_dictionary = (key: string) => {
    return getLocalDictData()?.[key] ?? []
}

export const beforeUploadFile = (
    file,
    allowSize = 2,
    allowType: string | string[] = '*'
) => {
    return new Promise((resolve, reject) => {
        if (allowType !== '*' && !allowType.includes(file.type)) {
            Message.error('File type not supported')
            return reject('File type not supported')
        }
        const isAllowSize = file.size < allowSize * 1024 * 1024
        if (!isAllowSize) {
            const msg = `The file size exceeds the limit. Please select a file that is within ${allowSize}MB for uploading.`
            Message.error(msg)
            return reject(msg)
        }
        return resolve(true)
    })
}

export function getDay(day) {
    const today = new Date()
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds) //注意，这行是关键代码
    const tYear = today.getFullYear()
    let tMonth = today.getMonth()
    let tDate = today.getDate()
    tMonth = doHandleMonth(tMonth + 1)
    tDate = doHandleMonth(tDate)
    return tYear + '-' + tMonth + '-' + tDate
}

export function getUTCDay(day) {
    const today = new Date()
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds) //注意，这行是关键代码
    const tYear = today.getFullYear()
    let tMonth = today.getMonth()
    let tDate = today.getDate()
    tMonth = doHandleMonth(tMonth + 1)
    tDate = doHandleMonth(tDate)
    return tYear + '-' + tMonth + '-' + tDate
}

export function doHandleMonth(month) {
    let m = month
    if (month.toString().length == 1) {
        m = '0' + month
    }
    return m
}

export function capitalizeFirstLetter(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function array_values(obj:object){
    const keys = Object.keys(obj)
    return keys.reduce((acc, key) => {
        acc.push(obj[key])
        return acc
    }, [])
}

export {}
