import *  as types from '../types.js'
const state = {
    userInfo:{}
}
const mutations = {
    [types.GET_USER](state,obj){
        state.userInfo = obj
    }
}
const actions = {
    getUser({commit},obj){
        commit(types.GET_USER,obj)
    }
}

const getters = {
    userInfo: (state) =>{return state.userInfo}
}
export default {
    state,
    mutations,
    actions,
    getters
}