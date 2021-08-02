/**
 输出功能函数：
 transitionEndEvent, // 动画结束的兼容性事件判断
 parseLocation, // url解析 注意这是一个结果，不是一个函数
 findParentsNode,    // 查找一个DOM节点的父级元素  _t,  nodeName  dataType具有该data-属性为 1 的nodeName节点
 escapeObject, // 编码与反编码
 isMobile, // 判断移动端
 //isIos,
 //isAndroid,
 //isMobile: isMobile || isIos || isAndroid,
 //isWeibo,
 //isQQ,
 //isWeiXin,
 //isQQBrower
 getTk // 获取token

 strToHexCharCode,//转16进制码
 URLParser, // 采用正则表达式的url解析
 clearAllCookie, //清楚所有cookie
 getAesString, //AES加密方法
 HJQdownload // 和家亲下载方法
 setCookie, // 设置cookie
 iosRefresh, //ios 防缓存刷新机制
 isGrayH5, //是否在灰度环境中
 onerror // 前端异常错误捕获
 *
// import AE from './axiosInstance';
// import httpHostMeta from './httpHostMeta';

// const $fnAxios = AE.ajax();
// const $axios = AE.axios;
export default (function () {
    // 动画结束的兼容性事件判断
    // const transitionEndEvent = (function whichTransitionEvent () {
    //     let t;
    //     let el = document.createElement('fakeelement');
    //     const transitions = {
    //         'transition': 'transitionend',
    //         'OTransition': 'oTransitionEnd',
    //         'MozTransition': 'transitionend',
    //         'WebkitTransition': 'webkitTransitionEnd'
    //     };
    //     for (t in transitions) {
    //         if (el.style[t] !== undefined) {
    //             el = null;
    //             return transitions[t];
    //         }
    //     }
    // })();
    // url解析 注意这是一个结果，不是一个函数
    const parseLocation = (function (location = window.location) {
        const result = {
            search: {},
            hash: '',
            pathname: null,
            path: '',
            host: ''
        };
        result.pathname = location.pathname.split('/').slice(1);
        result.path = result.pathname[0];
        result.hash = location.hash.substr(1);
        const _searchAr = location.search.substr(1).split('&');
        _searchAr.forEach((item) => {
            if (item) {
                const item_ar = item.split('=');
                result.search[item_ar[0]] = item_ar[1] || null;
            }
        });
        result.host = `${location.protocol}//${location.host}`;
        return result;
    })(location);
    // 查找一个DOM节点的父级元素
    const findParentsNode = function (_t, nodename, dataType) {
        const c1 = _t.nodeType === 1,
            c2 = _t.nodeName.toLowerCase() === nodename,
            c3 = c1 && c2 && (dataType ? _t.dataset[dataType] === '1' : true);
        if (c3) {
            return _t;
        } else if (_t.nodeType === 9) {
            return null;
        } else {
            return findParentsNode(_t.parentNode, nodename, dataType);
        }
    };
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = (function _isMobile () {
        const isIos = userAgent.match(/(iphone|ipod|ios)/i);
        const isAndroid = userAgent.match(/(android)/i);
        const isMobile = userAgent.match(/applewebkit.*mobile.*/i);
        const isWeibo = userAgent.match(/(weibo)/i);
        const isWeiXin = userAgent.match(/(micromessenger)/i);
        const isQQ = userAgent.match(/(qq)/i);
        const isQQBrower = userAgent.match(/(qqbrowser)/i);
        const isHJQ = userAgent.match(/(uniapp)/i);
        const isLeadon = userAgent.match(/(leadeon)/i) || window.location.search.includes('leadeon=1');
        const oldXYRJ = userAgent.indexOf('xiaoyirenjia') === 0;// 老板小移人家
        /* 结果不是布尔值，而是一个数组 */
        return {
            isIos,
            isAndroid,
            isMobile: isMobile || isIos || isAndroid,
            isWeibo,
            isQQ,
            isWeiXin,
            isQQBrower,
            isHJQ,
            isLeadon,
            oldXYRJ
        };
    })();
    const UA = isMobile;
    // const getTk = function (pid, sid, API_HOST) {
    //     const tokenPath = '/auth/user/getToken/';
    //     const API_HOST_G = API_HOST ? `${API_HOST + tokenPath}` : httpHostMeta.ajaxPath(tokenPath);
    //     return $fnAxios.get(`${`${API_HOST_G + sid}/${pid}`}`);
    // };
    const strToHexCharCode = function (str) {
        if (str === '') {
            return '';
        }
        const hexCharCode = [];
        hexCharCode.push('0x');
        for (let i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join('');
    };
    const URLParser = function (u = location.href) {
        let path = '';
        let query = '';
        let hash = '';
        let params;
        if (u.indexOf('#') > 0) {
            hash = u.substr(u.indexOf('#') + 1);
            u = u.substr(0, u.indexOf('#'));
        }
        if (u.indexOf('?') > 0) {
            path = u.substr(0, u.indexOf('?'));
            query = u.substr(u.indexOf('?') + 1);
            params = query.split('&');
        } else {
            path = u;
        }
        return {
            getAllPath () {
                return path;
            },
            getHost () {
                const hostexp = /\/\/([\w.-]*)/;
                const match = hostexp.exec(path);
                if (match !== null && match.length > 1) {
                    return match[1];
                }
                return '';
            },
            getPath () {
                const pathexp = /\/\/[\w.-]*(?:\/([^?]*))/;
                const match = pathexp.exec(path);
                if (match !== null && match.length > 1) {
                    return match[1];
                }
                return '';
            },
            getHash () {
                return hash;
            },
            getParams () {
                return params;
            },
            getParamsMap () {
                const paramsMap = new Map();
                for (const p of params || []) {
                    const pAr = p.split('=');
                    paramsMap.set(pAr[0], pAr[1]);
                }
                return paramsMap;
            },
            getQuery () {
                return query;
            },
            setHash (value) {
                if (query.length > 0) {
                    query = `?${query}`;
                }
                if (value.length > 0) {
                    query = `${query}#${value}`;
                }
                return path + query;
            },
            setParam (name, value) {
                if (!params) {
                    params = [];
                }
                params.push(`${name}=${value}`);
                for (let i = 0; i < params.length; i++) {
                    if (query.length > 0) {
                        query += '&';
                    }
                    query += params[i];
                }
                if (query.length > 0) {
                    query = `?${query}`;
                }
                if (hash.length > 0) {
                    query = `${query}#${hash}`;
                }
                return path + query;
            },
            getParam (name) {
                if (params) {
                    for (let i = 0; i < params.length; i++) {
                        const firstEqIndex = params[i].indexOf('=');
                        const key = params[i].substr(0, firstEqIndex);
                        const text = params[i].substr(firstEqIndex + 1);
                        if (decodeURIComponent(key) === name) {
                            return decodeURIComponent(text);
                        }
                    }
                }
                // console.log('Query letiable %s not found', name);
                return null;
            },
            hasParam (name) {
                if (params) {
                    for (let i = 0; i < params.length; i++) {
                        const pair = params[i].split('=');
                        if (decodeURIComponent(pair[0]) === name) {
                            return true;
                        }
                    }
                }
                // console.log('Query letiable %s not found', name);
                return false;
            },
            removeParam (name) {
                query = '';
                if (params) {
                    const newparams = [];
                    for (let i = 0; i < params.length; i++) {
                        const pair = params[i].split('=');
                        if (decodeURIComponent(pair[0]) !== name) {
                            newparams.push(params[i]);
                        }
                    }
                    params = newparams;
                    for (let j = 0; j < params.length; j++) {
                        if (query.length > 0) {
                            query += '&';
                        }
                        query += params[j];
                    }
                }
                if (query.length > 0) {
                    query = `?${query}`;
                }
                if (hash.length > 0) {
                    query = `${query}#${hash}`;
                }
                return path + query;
            },
            setParams (newParams) {
                if (!params) {
                    params = [];
                }
                const keys = Object.keys(newParams);
                for (let i = 0; i < keys; i++) {
                    params.push(`${keys[0]}=${newParams.keys[0]}`);
                }
                for (let i = 0; i < params.length; i++) {
                    if (query.length > 0) {
                        query += '&';
                    }
                    query += params[i];
                }
                if (query.length > 0) {
                    query = `?${query}`;
                }
                if (hash.length > 0) {
                    query = `${query}#${hash}`;
                }
                return path + query;
            }
        };
    };
    const setCookie = function (c, v, p, maxage) {
        document.cookie = `${c}=${v};path=${p}${maxage ? (`;max-age=${maxage}`) : ''}`;
    };
    const clearAllCookie = function (v = '', path = '/', maxage = 0) {
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                document.cookie = `${keys[i]}=${v};path=${path};max-age=${maxage}`;
            }
        }
    };
    // const HJQdownload = function () {
    //     const iosUrl = 'https://itunes.apple.com/cn/app/zhi-hui-guan-jia-da-zao-zhuan/id1147452377';
    //     return new Promise((resolve, reject) => {
    //         if (isMobile.isIos) {
    //             resolve(iosUrl, [iosUrl]);
    //         } else {
    //             $axios({
    //                 method: 'post',
    //                 url: `${window.location.protocol}//${window.location.host}/appconfig/app/getAppDownInfo`,
    //                 data: {},
    //                 headers: {
    //                     'Content-Type': 'application/json;charset=UTF-8'
    //                 }
    //             }).then((o) => {
    //                 const resData = o.data;
    //                 if ('1000000' === resData.code) {
    //                     const officialUrl = resData.data.appDownInfoResult.officialUrl;
    //                     const otherUrl = resData.data.appDownInfoResult.otherUrl && resData.data.appDownInfoResult.otherUrl.split(',');
    //                     resolve(officialUrl, otherUrl);
    //                 } else {
    //                     reject(resData.message);
    //                 }
    //             }).catch(() => {
    //                 reject('获取数据失败！<br>请刷新！');
    //             });
    //         }
    //     });
    // };
    const iosRefresh = function (start = () => {
    }) {
        window.onpagehide = function () {
            window.localStorage.setItem('persisted', '1');
        };
        window.onpageshow = function () {
            const persisted = window.localStorage.getItem('persisted');
            const UA = window.navigator.userAgent.toLocaleLowerCase();
            const isIos = /iphone|ipad|ipod/.test(UA);
            if (isIos) {
                if (persisted === '1') {
                    window.localStorage.setItem('persisted', '0');
                    window.onpagehide = null;
                    location.reload();
                } else {
                    start();
                }
            } else {
                start();
            }
        };
    };
    const isGrayH5 = location.href.includes('grayh5');
    const devLog = function (v, k = 'log') {
        if (typeof parseLocation.search.d !== 'undefined') {
            alert(`${k}:${JSON.stringify(v)}`);
        }
    };
    return {
        userAgent,
        // transitionEndEvent,
        parseLocation,
        findParentsNode,
        isMobile,
        UA,
        // getTk,
        strToHexCharCode,
        URLParser,
        clearAllCookie,
        // HJQdownload,
        setCookie,
        iosRefresh,
        isGrayH5,
        devLog
    };
})();
