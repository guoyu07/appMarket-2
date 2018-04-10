<template>
   <Layout>
      <Sider hide-trigger>
          <div id="aside_menu">
              <Menu :active-name="activeName" v-on:on-select="handleRoute" theme="light" width="auto" :open-names="openName" :accordion='accordion'>
                  <MenuItem name="/index/homepage"  auth='11' class='isMenu'>
                      <Icon type="android-home"></Icon>
                          首页
                  </MenuItem>
                  <Submenu name="appManage">
                      <template slot="title">
                          <Icon type="ios-keypad"></Icon>
                          应用管理
                      </template>
                      <MenuItem name="/index/menuManage" auth='21' class='isMenu'>菜单管理</MenuItem>
                      <MenuItem name="/index/roleManage" auth='22' class='isMenu'>角色管理</MenuItem>
                      <MenuItem name="/index/account" auth='23' class='isMenu'>登录账号</MenuItem>
                      <MenuItem name="/index/systemParam"  auth='24' class='isMenu'>系统参数</MenuItem>
                  </Submenu>
                  <Submenu name="userManage">
                      <template slot="title">
                          <Icon type="android-people"></Icon>
                          用户管理
                      </template>
                      <MenuItem name="/index/departManage"  auth='31' class='isMenu'>部门管理</MenuItem>
                      <MenuItem name="/index/policeManage" auth='32' class='isMenu'>民警管理</MenuItem>
                      <MenuItem name="/index/staffManage" auth='33' class='isMenu'>职工管理</MenuItem>
                      <MenuItem name="/index/criminalManage" auth='34' class='isMenu'>罪犯管理</MenuItem>
                  </Submenu>
                  <Submenu name="rightsManage">
                      <template slot="title">
                          <Icon type="android-settings"></Icon>
                          权限管理
                      </template>
                      <MenuItem name="/index/channelManage" auth='41' class='isMenu'>频道管理</MenuItem>
                      <MenuItem name="/index/familyNumber" auth='42' class='isMenu'>亲情号码</MenuItem>
                  </Submenu>
                  <Submenu name="deviceManage">
                      <template slot="title">
                          <Icon type="android-phone-portrait"></Icon>
                          设备管理
                      </template>
                      <MenuItem name="/index/visitorRegister" auth='51' class='isMenu'>访客登记</MenuItem>
                  </Submenu>
                  <Submenu name="journaling">
                      <template slot="title">
                          <Icon type="stats-bars"></Icon>
                          日志报表
                      </template>
                      <MenuItem name="/index/escortManage" auth='61' class='isMenu'>押运管理</MenuItem>
                      <MenuItem name="/index/escortManage" auth='62' class='isMenu'>押运管理</MenuItem>
                      <MenuItem name="/index/escortManage" auth='63' class='isMenu'>押运管理</MenuItem>
                      <MenuItem name="/index/escortManage" auth='64' class='isMenu'>押运管理</MenuItem>
                  </Submenu>
              </Menu>
          </div>
      </Sider>
  </Layout>
</template>

<script>
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
    }
  },
  watch: {
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


