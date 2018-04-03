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
                path:'/index/homepage',
                component: Home,
                name:'首页',
            },
            {
                path:'/index/menuManage',
                component: MenuManage,
                name:'菜单管理',
            },
            {
                path:'/index/roleManage',
                component: RoleManage,
                name:'角色管理',
            },
            {
                path:'/index/account',
                component: Account,
                name:'登录账号',
            },
            {
                path:'/index/systemParam',
                component: SystemParam,
                name:'系统参数',
            },
            {
                path:'/index/systemCache',
                component: SystemCache,
                name:'系统缓存',
            },
            {
                path:'/index/areaManage',
                component: AreaManage,
                name:'区域管理',
            },
            {
                path:'/index/departManage',
                component: DepartManage,
                name:'部门管理',
            },
            {
                path:'/index/policeManage',
                component: PoliceManage,
                name:'民警管理',
            },
            {
                path:'/index/staffManage',
                component: StaffManage,
                name:'职工管理',
            },
            {
                path:'/index/criminalManage',
                component: CriminalManage,
                name:'罪犯管理',
            },
            {
                path:'/index/policing',
                component: Policing,
                name:'警务通',
            },
            {
                path:'/index/channelManage',
                component: ChannelManage,
                name:'频道管理',
            },
            {
                path:'/index/familyNumber',
                component: FamilyNumber,
                name:'亲情号码',
            }
        ]
    },
    {
        path:'/index/channelManage/item',
        name: '成员管理',
        component: Item
    }
]
export default routes;
