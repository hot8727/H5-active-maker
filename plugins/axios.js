import axios from 'axios';
import { Toast } from 'element-ui';

// axios 配置
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'bizType': 'edu',
    'channelId': 'HJBX',
    'OS': 1
};
// http request 拦截器
let url = '';
axios.interceptors.request.use(
    config => {
        config.url = `${config.url}`;
        url = config.url;
        // const lndxLoginData = sessionStorage.getItem('token');
        // const provCode = sessionStorage.getItem('provCode');
        // config.headers.authorization = `bearer ${lndxLoginData}`;
        // config.headers.pCode = provCode;
        // config.headers.cookie = `JSESSIONID=${sessionStorage.getItem('JSESSIONID')}`;
        config.headers.sessionId = sessionStorage.getItem('JSESSIONID');
        if (config.method === 'get') {
            // config.params = Date.parse(new Date()) / 1000;
        } else if (config.method === 'post') {
            config.params = {
                timestamp: Date.parse(new Date()) / 1000
            };
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === '1000000') {
            return res;
        } else {
            // if()
            if (url.indexOf('habase') == -1) {
                Toast(res.message);
            }
            return Promise.reject(res);
        }
    },
    error => {
        return Promise.reject(error);
    }
);
export default  ({ $axios }) => {  // store
    $axios.defaults = axios.defaults;
    $axios.interceptors.request = axios.interceptors.request;
    $axios.interceptors.response = axios.interceptors.response;
};

