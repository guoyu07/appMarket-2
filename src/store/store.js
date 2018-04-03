import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
// import MenuModule from './modules/menuModule.js'
// import userModule from './modules/userModule.js'
Vue.use(Vuex);
// console.log(process.env.NODE_ENV)
export default new Vuex.Store({
    // modules:{
    //     menus:MenuModule,
    //     user:userModule
    // },
    state: {
        user: {},
        token: '',
        title: '',
        menuActiveName: '',
        imageUrl: '',
    },
    // getters:{
    //     accessToken: state => {return state.token},
    // },
    // mutations: {
    //     [types.LOGIN](state, data){
    //         state.token = data;
    //         window.localStorage.setItem('token',data)
    //     },
    //     [types.LOGOUT](state){
    //         state.token = ''
    //         window.localStorage.removeItem('token')
    //     },
    //     [types.TITLE](state, data){
    //         state.title = data;
    //     },
    //     menuActiveName_mutation( state, text) {
    //         state.menuActiveName = text
    //     },
    //     set_HeadImg ( state , imageUrl) {
    //         state.imageUrl = imageUrl
    //     },
    // },
    // actions:{
    //     setToken({commit},token){
    //         commit(types.LOGIN,token)
    //     },
    //     removeToken({commit}){
    //         commit(types.LOGOUT)
    //     },
    //     menuActiveName ( { commit }, text) {
    //         commit( 'menuActiveName_mutation', text)
    //     },
    //     setHeadImg ( { commit }, imageUrl) {
    //         commit( 'set_HeadImg', imageUrl)
    //     }
    // }
})