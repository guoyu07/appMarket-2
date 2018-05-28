import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/router-config'
import env from '../js/env'


let baseURL = env.apiPath

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials=true;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        
        if (window.localStorage.getItem('token')) {
            if(config.method=='post'){
                config.data = {
                    ...config.data,
                    token: window.localStorage.getItem('token'),
                }
            }else if(config.method=='get'){
                config.params = {
                    token: window.localStorage.getItem('token'),
                    ...config.params
                }
            }
            // Object.assign(config.headers, { 'token': window.localStorage.getItem('token') });
        }
        return config;
    },
    err => {
        // return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // 会话超时
        if(response.data.erroCode=='1'||response.data.erroCode=='2'){
            window.localStorage.clear()
            window.location.hash='/login'
        }
        // 
        return response.data;
    },
    error => {
        // return Promise.reject(error)
    });

export default axios;
