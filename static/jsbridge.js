/**
 * 初始化的状态   -1： 还没开始初始化， 0： 正在初始化， 1： 初始化完成
 */
let initStatue = -1;
let timerId = null;

/**
 * JSBridge 初始化代码
 * 注意事项：在执行完初始化代码后，不要马上调用接口，需要延迟执行，等待window.bridge创建完成。
 */
function setupWebViewJavascriptBridge (callback) {
    initStatue = 0;
    const bridge = window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge;
    if (bridge) {
        return callback(bridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
            callback(bridge);
        }, false);
    }
    const callbacks = window.WVJBCallbacks || window.WKWVJBCallbacks;
    if (callbacks) {
        return callbacks.push(callback);
    }
    if (window.WKWebViewJavascriptBridge) {
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
    } else {
        const WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    }
}

/**
 * 初始化
 */
setupWebViewJavascriptBridge((bridge) => {
    window.bridge = bridge;
    bridge.init((message, responseCallback) => {
        responseCallback(`hello, ${message}`);
    });
    bridge.registerHandler('callNativeFunctionAtJS', (data, responseCallback) => {
        console.log(`data from Java = ${data}`);
        responseCallback('registerHandler is ok');
    });
});
/**
 * 检查bridge是否准备就绪
 * @description bridge不是立即注册成功，所以需要循环监测
 */
function checkInitState () {
    return new Promise((resolve) => {
        if (initStatue === -1) {
            setupWebViewJavascriptBridge((bridge) => {
                window.bridge = bridge;
                initStatue = 1;
                resolve(window.bridge);
            });
        } else if (initStatue === 0) {
            if (window.bridge || window.WebViewJavascriptBridge) {
                clearInterval(timerId);
                initStatue = 1;
                resolve(window.bridge || window.WebViewJavascriptBridge);
            } else {
                timerId = setInterval(() => {
                    clearInterval(timerId);
                    initStatue = 1;
                    resolve(window.bridge || window.WebViewJavascriptBridge);
                }, 200);
            }
        } else {
            resolve(window.bridge || window.WebViewJavascriptBridge);
        }
    }).then(bridge => {
        return bridge;
    }).catch(error => {
        console.log('checkInitStateFail');
        throw new Error(error);
    });
}

/* eslint-disable */
export function callNativeFun(fun, data) {
    return checkInitState().then(bridge => {
        return new Promise((resolve, reject) => {
            if (bridge) {
                bridge.callHandler(fun, data, (response) => {
                    // console.log(response);
                    resolve(response);
                });
            } else {
                reject({code:9999, msg:'Outside the client'});
            }
        }).catch(error=>{
            throw new Error(error);
        });
    }).catch(error=>{
        // console.log(error);
        throw new Error(error);
    });
}
// this.$bridge.setPrintData(data);
/* export function setPrintData(data) { // 设置打印内容
    // const d = {actionId: 'setPrintData', data: data};
    callNativeFun(data);
    // window.WebViewJavascriptBridge.callHandler('onPrint', data, function (responseData) {
    //     console.log(responseData);
    //     // do something
    // });
} */
export default {
    install(Vue, options) {
        Vue.prototype.$bridge = {
            fun: callNativeFun
        }
    }
}
