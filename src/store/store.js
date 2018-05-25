import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import MenuModule from './modules/MenuModule.js'
import UserModule from './modules/UserModule.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        users:UserModule,
        menus:MenuModule
    }
})