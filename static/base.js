// 本地存储相关，fallback为cookie读写
const LS = {
    gc (objName) {
        const arrStr = document.cookie.split('; ');
        for (let i = 0; i < arrStr.length; i++) {
            const temp = arrStr[i].split('=');
            if (temp[0] === objName) {
                return unescape(temp[1]);
            }
        }
    },
    sc (objName, objValue, objHours) {
        let str = `${objName}=${escape(objValue)}`;
        (objHours == null) && (objHours = 24);
        if (objHours > 0) {
            const date = new Date();
            const ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += `; expires=${date.toGMTString()}`;
        }
        document.cookie = `${str};` + 'path=/';
    },
    dc (objName) {
        const arrStr = document.cookie.split('; ');
        for (let i = 0; i < arrStr.length;) {
            const temp = arrStr[i].split('=');
            if (temp[0] === objName) {
                arrStr.splice(i, 1);
            } else {
                i++;
            }
        }
        document.cookie = arrStr.join('; ');
    },
    setData (key, val, besession) {
        // var storage = besession ? window.sessionStorage : window.localStorage;
        if (besession && window.sessionStorage) {
            window.sessionStorage.setItem(key, val);
        } else if (window.localStorage) {
            window.localStorage.setItem(key, val);
        } else {
            this.sc(key, val);
        }
    },
    getData (key, besession) {
        // var storage = besession ? window.sessionStorage : window.localStorage;
        if (besession && window.sessionStorage) {
            return window.sessionStorage.getItem(key);
        } else if (window.localStorage) {
            return window.localStorage.getItem(key);
        } else {
            return this.gc(key);
        }
    },
    delData (key, besession) {
        // var storage = besession ? window.sessionStorage : window.localStorage;
        if (besession && window.sessionStorage) {
            return window.sessionStorage.removeItem(key);
        } else if (window.localStorage) {
            return window.localStorage.removeItem(key);
        } else {
            return this.dc(key);
        }
    },
    clearData (besession) {
        // var storage = besession ? window.sessionStorage : window.localStorage;
        if (besession && window.sessionStorage) {
            return window.sessionStorage.clear();
        } else if (window.localStorage) {
            return window.localStorage.clear();
        } else {
            document.cookie = '';
        }
    }
};
/**
 * 获取对象的原始类型
 * @param
 * @return {String}
 */
function getObjectType (obj) {
    const type = Object.prototype.toString.call(obj);
    return type.replace(/(^\[object\s)(\w+)(\]$)/, '$2');
}

/**
 * 本地存储 JSON数据
 * @param {String}  keyword 存储键值
 * @param {JSON}   data    存储数据
 * @param {Boolean} isLocal 是否存在本地磁盘。true:存localStorage；false:存sessionStorage
 */
export function setLocalData (keyword, data, isLocal) {
    const dataType = getObjectType(data);
    let setValue = '';
    // 如果传入的data 为null，则删除对应的数据
    if (data == null) {
        LS.delData(keyword, !isLocal);
        return;
    }
    // JSON或Array 转为字符串存储
    if (dataType === 'Object' || dataType === 'Array') {
        setValue = JSON.stringify(data);
    } else {
        setValue = data;
    }
    LS.setData(keyword, setValue, !isLocal);
}
/**
 * 获取本地数据
 * @param  {String}  keyword 存储键值
 * @param  {Boolean} isLocal 是否存在本地磁盘。true:存localStorage；false:存sessionStorage
 * @return 优先转为JSON 格式数据，转换失败，则直接以字符串形式返回。
 */
export function getLocalData (keyword, isLocal) {
    const v = LS.getData(keyword, !isLocal);
    if (v == null) {
        return null;
    }
    let data = null;
    // 优先转为JSON 格式数据，转换失败，则直接以字符串形式返回。
    try {
        data = JSON.parse(v);
    } catch (err) {
        data = v;
    }
    return data;
}
/**
 * 删除本地数据
 * @param  {String}  keyword 存储键值
 * @param  {Boolean} isLocal 是否存在本地磁盘。true:存localStorage；false:存sessionStorage
 */
export function deleteLocalData (keyword, isLocal) {
    if (getObjectType(keyword) !== 'String') {
        LS.clearData(!isLocal);
    } else {
        LS.delData(keyword, !isLocal);
    }
}
export function getCookie (name) {
    return LS.gc(name);
}
export function setCookie (name, value, hours) {
    return LS.sc(name, value, hours);
}
export function delCookie (name) {
    return LS.dc(name);
}

export default {
    setLocalData,
    getLocalData,
    deleteLocalData,
    getCookie,
    setCookie,
    delCookie
};
