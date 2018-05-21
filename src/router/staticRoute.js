// import Login from '../view/login/index.vue'
// import Home from '../view/home/index.vue'
// import Index from '../view/index/index.vue'


const Index = resolve => require.ensure([], () => resolve(require('../view/index/index.vue')), 'Index')

//应用管理
const AppManage = resolve => require.ensure([], () => resolve(require('../view/appManage/index.vue')), 'AppManage')
const AddApp = resolve => require.ensure([], () => resolve(require('../view/appManage/addApp.vue')), 'AddApp')
const AppDetail = resolve => require.ensure([], () => resolve(require('../view/appManage/appDetail.vue')), 'AppDetail')
const EditApp = resolve => require.ensure([], () => resolve(require('../view/appManage/editApp.vue')), 'EditApp')

// 用户管理
const WebUser = resolve => require.ensure([], () => resolve(require('../view/userManage/webUser.vue')), 'WebUser')
const PhoneUser = resolve => require.ensure([], () => resolve(require('../view/userManage/phoneUser.vue')), 'PhoneUser')

// 权限管理
const RightsManage = resolve => require.ensure([], () => resolve(require('../view/rightsManage/index.vue')), 'RightsManage')
const DispatchRight = resolve => require.ensure([], () => resolve(require('../view/rightsManage/dispatchRight.vue')), 'DispatchRight')

// 设备管理
const DeviceManage = resolve => require.ensure([], () => resolve(require('../view/deviceManage/index.vue')), 'DeviceManage')
const DeviceDetail = resolve => require.ensure([], () => resolve(require('../view/deviceManage/deviceDetail.vue')), 'DeviceDetail')

// 日志报表
const ReportForm = resolve => require.ensure([], () => resolve(require('../view/journaling/reportForm.vue')), 'ReportForm')
const FormDetail = resolve => require.ensure([], () => resolve(require('../view/journaling/formDetail.vue')), 'FormDetail')
const AdminLog = resolve => require.ensure([], () => resolve(require('../view/journaling/adminLog.vue')), 'AdminLog')
const UserLog = resolve => require.ensure([], () => resolve(require('../view/journaling/userLog.vue')), 'UserLog')

// 消息
const Messages = resolve => require.ensure([], () => resolve(require('../view/messages/index.vue')), 'Messages')

let staticRoutes = [
    {
        path: '/',
        component: Index,
        children:[
            // {
            //     path:'/index/homepage',
            //     component: Home,
            //     name:'首页',
            //     auth:11
            // },
            {
                path:'/index/appManage',
                component: AppManage,
                name:'应用管理',
                auth:1
            },
            {
                path:'/index/addApp',
                component: AddApp,
                name:'添加应用',
                auth:6
            },
            {
                path:'/index/appDetail',
                component: AppDetail,
                name:'应用详情',
                auth:1
            },
            {
                path:'/index/editApp',
                component: EditApp,
                name:'应用编辑',
                auth:7
            },
            {
                path:'/index/webUser',
                component: WebUser,
                name:'平台用户',
                auth: 11
            },
            {
                path:'/index/phoneUser',
                component: PhoneUser,
                name:'手机用户',
                auth: 12
            },
            {
                path:'/index/rightsManage',
                component: RightsManage,
                name:'权限管理',
                auth: 3
            },
            {
                path:'/index/dispatchRight',
                component: DispatchRight,
                name:'分配权限',
                auth: 32
            },
            {
                path:'/index/deviceManage',
                component: DeviceManage,
                name:'设备管理',
                auth: 4
            },
            {
                path:'/index/deviceDetail',
                component: DeviceDetail,
                name:'设备详情',
                auth: 4
            },
            {
                path:'/index/reportForm',
                component: ReportForm,
                name:'报表',
                auth: 35
            },
            {
                path:'/index/formDetail',
                component: FormDetail,
                name:'报表详情',
                auth: 35
            },
            {
                path:'/index/adminLog',
                component: AdminLog,
                name:'管理员日志',
                auth: 36
            },
            {
                path:'/index/userLog',
                component: UserLog,
                name:'用户日志',
                auth: 37
            },
            
        ]
    },
]

export default staticRoutes;
