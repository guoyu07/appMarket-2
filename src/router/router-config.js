const Login = resolve => require.ensure([], () => resolve(require('../view/login/index.vue')), 'Login')
const Index = resolve => require.ensure([], () => resolve(require('../view/index/index.vue')), 'Index')
const Home = resolve => require.ensure([], () => resolve(require('../view/home/index.vue')), 'Home')
const NotFoundPage = resolve => require.ensure([], () => resolve(require('../view/notFoundPage/index.vue')), 'NotFoundPage')
const Messages = resolve => require.ensure([], () => resolve(require('../view/messages/index.vue')), 'Messages')

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
                path:'/index/homepage',
                component: Home,
                name:'首页',
            },
            {
                path: '/notfound',
                component: NotFoundPage,
                name:'notfound'
            },
            {
                path:'/index/messages',
                component: Messages,
                name:'消息',
            },
        ]
    },
    // ...generateRoutesFromMenu(MenuModule.state.items)
]
function generateRoutesFromMenu(menu = [], routes = []){
    return routes
 }
export default routes;
