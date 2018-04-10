// const Login = resolve => require.ensure([], () => resolve(require('../view/login/index.vue')), 'Login')
// const Index = resolve => require.ensure([], () => resolve(require('../view/index/index.vue')), 'Index')

import Login from '../view/login/index.vue'
import Index from '../view/index/index.vue'
import Home from '../view/home/index.vue'
// 系统配置
import MenuManage from '../view/systemConfig/menuManage/index.vue'
import RoleManage from '../view/systemConfig/roleManage/index.vue'
import Account from '../view/systemConfig/account/index.vue'
import SystemParam from '../view/systemConfig/systemParam/index.vue'
import SystemCache from '../view/systemConfig/systemCache/index.vue'
import AreaManage from '../view/systemConfig/areaManage/index.vue'

// 基础信息
import DepartManage from '../view/basicInfo/departManage/index.vue'
import PoliceManage from '../view/basicInfo/policeManage/index.vue'
import StaffManage from '../view/basicInfo/staffManage/index.vue'
import CriminalManage from '../view/basicInfo/criminalManage/index.vue'
import Policing from '../view/basicInfo/policing/index.vue'

// 通信管理
import ChannelManage from '../view/callManage/channelManage/index.vue'
import Item from '../view/callManage/channelManage/item.vue'
import FamilyNumber from '../view/callManage/familyNumber/index.vue'

// notfound
import NotFoundPage from '../view/notFoundPage/index.vue'

import MenuModule from '../store/modules/MenuModule.js'
let routes = [
    {
        path:'/login',
        component:Login,
        name:'登录'
    },
    {
        path: '/',
        component: Index,
        children:[
            {
                path: '/notfound',
                component: NotFoundPage,
                name:'notfound'
            },
        ]
    },
    // ...generateRoutesFromMenu(MenuModule.state.items)
]
// function generateRoutesFromMenu(routes = []){
//     console.log(menu)
//     console.log(routes)
//     return routes
//  }
export default routes;
