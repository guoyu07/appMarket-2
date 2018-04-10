import Vue from 'vue'
import app from './app.vue'
import axios from  './api/axios_api.js'
import iView from 'iview';
import vuescroll from 'vue-scroll'
import 'minireset.css'
import 'iview/dist/styles/iview.css';
import router from './router/index.js'
import './my-theme/index.less';
import store from './store/store'
import * as types from './store/types.js'

// console.log(process.argv)
// console.log(process.version)

Vue.use(iView)
Vue.use(vuescroll)
Vue.prototype.axios = axios
axios.defaults.withCredentials=true;

let authList = window.localStorage.getItem('authList')
console.log(authList)
if (authList) {
    store.commit(types.ADD_MENU, JSON.parse(authList))
    router.addRoutes(store.state.menus.items)
  }
router.beforeEach((to, from, next) => {
    var user = window.localStorage.getItem("user")
    var password = window.localStorage.getItem("password")
    if(to.path === '/login'){
        window.localStorage.clear()
    }
    if(user && password){
        console.log(1111)
        next()
        if(to.path=='/'){
            console.log(222)
            next({path:'/index/homepage'})
        }
    }else{
        if(to.path=='/login'){
            console.log(222)
            next()
        }else{
            console.log(333)
            next({path:'/login'})
        }
        
    }
})

var vm = new Vue({
    el:"#app",
    router,
    render: h => h(app),
    store
})


