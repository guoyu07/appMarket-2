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
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (window.localStorage.getItem('token')) {
            // config.headers.Authorization = `token ${window.localStorage.getItem('token')}`;
            Object.assign(config.headers, { 'token': window.localStorage.getItem('token') });
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.success==0&&response.data.erroCode=='1'){
            this.$router.push({path:'/login'})
        }
        return response.data;
    },
    error => {
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             // 401 清除token信息并跳转到登录页面
        //             // store.commit(types.LOGOUT);
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        return Promise.reject(error)
    });

export default axios;
