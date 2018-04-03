import * as types from '../types.js'
import routerConfig from '../../router/router-config.js'
const state = {
    items:[],
    isLoadRoutes: false,
    routerConfig
}
const mutations= {
    [types.ADD_MENU](state ,authList){
        if(authList == null || authList.length === 0){
            state.items = []
        }else{
            generateMenuItems(state, authList)
        }
    },
    [types.LOAD_ROUTES](state){
        state.isLoadRoutes = !state.isLoadRoutes
    }
}
const actions = {
    addMenu({commit}, authList){
        commit(types.ADD_MENU, authList)
    },
    loadRoutes({commit}){
        commit(types.LOAD_ROUTES)
    }
}
const menuitems = state => state.items
const isLoadRoutes = state => state.isLoadRoutes
const getters = {
    menuitems,
    isLoadRoutes
}
function generateMenuItems(state, authList){

    // console.log('state.staticRoute', state.staticRoute)
    // console.log('authList', authList)
    var arr = state.routerConfig[0].children
    // 由于角色管理添加的时候有20，30，40等父级菜单，而路由里没有父级菜单，所以
    // 在生成动态路由的时候，讲20，30，40等父级去除，使得路由可以正常使用，不会有找不到对应auth值的情况。
    var newAuthList = []
    if (typeof authList === 'string') {
        authList.split(',').map( item => {
            if (item != [20, 30, 40, 50, 60, 100]) {
                newAuthList.push(item)
            }
            return newAuthList
        })
    } else {
      
        authList.map( item => {
            if (item != [20, 30, 40, 50, 60, 100]) {
                newAuthList.push(item)
            }
                return newAuthList
            }
        )
    }

    // console.log('newAuthList', newAuthList)
    var newArr = []
    for(var i=0;i<arr.length;i++){
      if(newAuthList.indexOf(arr[i].auth.toString())!==-1){
          newArr.push(arr[i])
      }
    }
    // console.log('hehehe',newArr)
    var res = Object.assign({},state.routerConfig[0],{children:newArr})
    // state.items = state.staticRoute
    state.items = [res,state.routerConfig[1],
                       state.routerConfig[2],
                       state.routerConfig[3],
                       state.routerConfig[4],
                       state.routerConfig[5],
                       state.routerConfig[6]] /*解开为动态路由解开 */

    // console.log('state.items', state.items)
    // state.items = state.staticRoute
    return
}
export default {
    state,
    mutations,
    actions,
    getters
}