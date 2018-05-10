import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'
Vue.use(Router)
export default new Router({
    mode:'hash',
    routes: routeConfig,

})