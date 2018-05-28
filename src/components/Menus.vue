<template>
   <Layout>
      <Sider hide-trigger>
          <div id="aside_menu">
              <Menu :active-name="activeName" ref="leftMenu"  v-on:on-select="handleRoute" theme="dark" width="100%" :open-names="openName" :accordion='accordion'>
                  <MenuItem name="/index/homepage">
                      <Icon type="android-home"></Icon>
                          首页
                  </MenuItem>
                  <MenuItem name="/index/appManage" auth='app' class='isMenu'>
                          <Icon type="ios-keypad"></Icon>
                          应用管理
                  </MenuItem>
                  <Submenu name="userManage" auth='user' class='isMenu'>
                      <template slot="title">
                          <Icon type="android-people"></Icon>
                          用户管理
                      </template>
                      <MenuItem name="/index/webUser"  auth='plate_user' class='isMenu'>平台用户</MenuItem>
                      <MenuItem name="/index/phoneUser" auth='phone_user' class='isMenu'>手机用户</MenuItem>
                  </Submenu>
                  <MenuItem name="/index/rightsManage"  auth='perm' class='isMenu'>
                          <Icon type="android-settings"></Icon>
                          权限管理
                  </MenuItem>
                  <MenuItem name="/index/deviceManage"  auth='device' class='isMenu'>
                          <Icon type="android-phone-portrait"></Icon>
                          设备管理
                  </MenuItem>
                  <Submenu name="journaling"  auth='record' class='isMenu'>
                      <template slot="title">
                          <Icon type="stats-bars"></Icon>
                          日志报表
                      </template>
                      <MenuItem name="/index/reportForm" auth='record_report' class='isMenu'>报表</MenuItem>
                      <Submenu name="log" auth='record_log' class='isMenu'>
                          <template slot="title">
                              日志
                          </template> 
                          <MenuItem name="/index/adminLog" auth='record_log_admin' class='isMenu'>管理员日志</MenuItem>
                          <MenuItem name="/index/userLog" auth='record_log_plain' class='isMenu'>用户日志</MenuItem>
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
        var allMenu = $(".isMenu")
        if(authList.length == 0){
            $("#aside_menu").hide()
        }else{
            for(var i = 0; i < allMenu.length; i++){
                // console.log(allMenu[i].getAttribute("auth"))
                let code = authList.indexOf(allMenu[i].getAttribute("auth"))
                // console.log(code)
                if(code == -1){
                    allMenu.eq(i).hide()
                }
            }
        }
    },

    
  },
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


