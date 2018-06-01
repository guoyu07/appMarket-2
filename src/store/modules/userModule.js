import *  as types from '../types.js'
const state = {
    userInfo:{},
  // 解决跳转新页面后返回，table分页仍在当前页、刷新在第一页的问题
    appPage:1,
    rightPage:1,
    devicePage:1,
  // 推送的消息数量
    count:0
}
const mutations = {
    [types.GET_USER](state,obj){
        state.userInfo = obj
    },
    [types.SET_PAGE1](state,page){
        state.appPage = page
    },
    [types.SET_PAGE2](state,page){
        state.rightPage = page
    },
    [types.SET_PAGE3](state,page){
        state.devicePage = page
    },
    [types.SET_COUNT](state,num){
        state.count = num 
    },

}
const actions = {
    getUser({commit},obj){
        commit(types.GET_USER,obj)
    },
    setPage1({commit},page){
        commit(types.SET_PAGE1,page)
    },
    setPage2({commit},page){
        commit(types.SET_PAGE2,page)
    },
    setPage3({commit},page){
        commit(types.SET_PAGE3,page)
    },
    setCount({commit},num){
        commit(types.SET_COUNT,num)
    }
}

const getters = {
    userInfo: (state) =>{return state.userInfo},
    appPage: (state) =>{return state.appPage},
    rightPage: (state) =>{return state.rightPage},
    devicePage: (state) =>{return state.devicePage},
    count: (state) =>{return state.count},
}
export default {
    state,
    mutations,
    actions,
    getters
}