<template>
   <Layout>
      <Sider hide-trigger>
          <div id="aside_menu">
              <Menu :active-name="activeName" ref="leftMenu"  v-on:on-select="handleRoute" theme="dark" width="100%" :open-names="openName" :accordion='accordion'>
                  <MenuItem name="/index/homepage">
                      <Icon type="android-home"></Icon>
                          首页
                  </MenuItem>
                  <MenuItem name="/index/appManage" auth='21' class='isMenu'>
                          <Icon type="ios-keypad"></Icon>
                          应用管理
                  </MenuItem>
                  <Submenu name="userManage">
                      <template slot="title">
                          <Icon type="android-people"></Icon>
                          用户管理
                      </template>
                      <MenuItem name="/index/webUser"  auth='31' class='isMenu'>平台用户</MenuItem>
                      <MenuItem name="/index/phoneUser" auth='32' class='isMenu'>手机用户</MenuItem>
                  </Submenu>
                  <MenuItem name="/index/rightsManage"  auth='41' class='isMenu'>
                          <Icon type="android-settings"></Icon>
                          权限管理
                  </MenuItem>
                  <MenuItem name="/index/deviceManage"  auth='51' class='isMenu'>
                          <Icon type="android-phone-portrait"></Icon>
                          设备管理
                  </MenuItem>
                  <Submenu name="journaling">
                      <template slot="title">
                          <Icon type="stats-bars"></Icon>
                          日志报表
                      </template>
                      <MenuItem name="/index/reportForm" auth='61' class='isMenu'>报表</MenuItem>
                      <Submenu name="log">
                          <template slot="title">
                              日志
                          </template> 
                          <MenuItem name="/index/adminLog" auth='62' class='isMenu'>管理员日志</MenuItem>
                          <MenuItem name="/index/userLog" auth='63' class='isMenu'>用户日志</MenuItem>
                      </Submenu>
                  </Submenu>
              </Menu>
          </div>
      </Sider>
  </Layout>
</template>

<script>
import staticRoute from "../router/staticRoute"
export default {
  data(){
    return {
      activeName: "/index/homepage",
      openName: [],
      accordion: true,
    }
  },
  computed: {

  },
  created(){
      this.activeName = window.localStorage.getItem('currentMenu')
  },
  mounted(){
      // 根据权限渲染菜单
      this.renderMenu()
  },
  methods: {
    // 点击菜单栏跳转路由
    handleRoute(name){
      this.$router.push({path: name})
      window.localStorage.setItem('currentMenu',name)
    },

    // 渲染菜单
    renderMenu(){
        let authList = JSON.parse(window.localStorage.getItem('authList'))
        // console.log(authList)
        var allMenu = $(".isMenu")
        if(authList.length == 0){
            $("#aside_menu").hide()
        }else{
            for(var i = 0; i < allMenu.length; i++){
                // console.log(allMenu[i].getAttribute("auth"))
                let code = authList.indexOf(Number(allMenu[i].getAttribute("auth")))
                // console.log(code)
                if(code == -1){
                    allMenu.eq(i).hide()
                }
            }
        }
    },

    
  },
  watch: {
      '$route': function(){
          let authList = window.localStorage.getItem('authList')
            // console.log(authList) // 用户权限
            let routes = staticRoute[0].children.filter(item=>{
                return authList.indexOf(item.auth)!== -1
            })
            let route = routes.map(item=>{
                return item.path
            })
            console.log(this.$route) // 用户权限所有路径
          if(route.indexOf(this.$route.path)==-1){
              this.activeName = this.$route.path
          }

          var obj = 
          {
              "code": 0, //0 成功 -1失败  1登录超时
              "msg": "成功",
              "result":{
                  "total":2, // 总条数
                  "totalPage": 1, // 总页码
                  "pageCount":1, // 当前页码
                  "pageSize":10, // 每页条数
                  "data":[
                      {},
                      {},
                  ],
              }
          }
          //  请求方式：get请求   响应类型：JSON 
          
      }
  }

}
</script>

<style lang="scss" scoped type="text/css">
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
  
/* for Chrome */
::-webkit-scrollbar {
    display: none;
}

</style>


