<template>
   <Layout>
      <Sider hide-trigger>
          <div id="aside_menu">
              <div id="aside_user">
                  <div class="img">
                      <img src="../assets/img/avatar.jpg" alt="" title="我的头像">
                  </div>
                  <p>你好,合肥开元，欢迎登陆</p>
              </div>
              <Menu :active-name="activeName" v-on:on-select="handleRoute" theme="dark" width="auto" :open-names="openName" :accordion='accordion'>
                  <MenuItem name="/index/homepage">
                      <Icon type="android-home"></Icon>
                          首页
                  </MenuItem>
                  <Submenu name="systemConfig">
                      <template slot="title">
                          <Icon type="android-settings"></Icon>
                          系统配置
                      </template>
                      <MenuItem name="/index/menuManage">菜单管理</MenuItem>
                      <MenuItem name="/index/roleManage">角色管理</MenuItem>
                      <MenuItem name="/index/account">登录账号</MenuItem>
                      <MenuItem name="/index/systemParam">系统参数</MenuItem>
                      <MenuItem name="/index/systemCache">系统缓存</MenuItem>
                      <MenuItem name="/index/areaManage">区域管理</MenuItem>
                  </Submenu>
                  <Submenu name="basicInfo">
                      <template slot="title">
                          <Icon type="ios-keypad"></Icon>
                          基础信息
                      </template>
                      <MenuItem name="/index/departManage">部门管理</MenuItem>
                      <MenuItem name="/index/policeManage">民警管理</MenuItem>
                      <MenuItem name="/index/staffManage">职工管理</MenuItem>
                      <MenuItem name="/index/criminalManage">罪犯管理</MenuItem>
                      <MenuItem name="/index/policing">警务通</MenuItem>
                      <MenuItem name="/index/baseStation">基站设备</MenuItem>
                      <MenuItem name="/index/criminalCard">罪犯胸卡</MenuItem>
                      <MenuItem name="/index/visitorCard">访客胸卡</MenuItem>
                      <MenuItem name="/index/patrolTag">巡查标签</MenuItem>
                      <MenuItem name="/index/escortDevice">押运设备</MenuItem>
                  </Submenu>
                  <Submenu name="callManage">
                      <template slot="title">
                          <Icon type="android-globe"></Icon>
                          通信管理
                      </template>
                      <MenuItem name="/index/channelManage">频道管理</MenuItem>
                      <MenuItem name="/index/familyNumber">亲情号码</MenuItem>
                  </Submenu>
                  <Submenu name="visitorManage">
                      <template slot="title">
                          <Icon type="android-people"></Icon>
                          访客管理
                      </template>
                      <MenuItem name="/index/visitorRegister">访客登记</MenuItem>
                  </Submenu>
                  <Submenu name="escort">
                      <template slot="title">
                          <Icon type="android-walk"></Icon>
                          智慧押运
                      </template>
                      <MenuItem name="/index/escortManage">押运管理</MenuItem>
                  </Submenu>
                  <Submenu name="roomManage">
                      <template slot="title">
                          <Icon type="android-options"></Icon>
                          工间管理
                      </template>
                      <MenuItem name="/index/workTask">出工任务</MenuItem>
                      <MenuItem name="/index/rollCall">工间点名</MenuItem>
                  </Submenu>
                  <Submenu name="keepwatch">
                      <template slot="title">
                          <Icon type="ios-recording"></Icon>
                          智慧巡更
                      </template>
                      <MenuItem name="/index/watchLine">巡更线路</MenuItem>
                      <MenuItem name="/index/watchGroup">巡更组</MenuItem>
                      <MenuItem name="/inedx/watchTemp">巡更模板</MenuItem>
                      <MenuItem name="/index/watchTask">巡更任务</MenuItem>
                  </Submenu>
                  <Submenu name="prisonManage">
                      <template slot="title">
                          <Icon type="ios-box"></Icon>
                          监区管理
                      </template>
                      <MenuItem name="/index/reportedRecord">上报记录</MenuItem>
                  </Submenu>
                  <MenuItem name="/index/rvscan">
                      <Icon type="videocamera"></Icon>
                      实时监控
                  </MenuItem>
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
  created(){
          this.activeName = window.localStorage.getItem('currentMenu')
  },
  methods: {
    handleRoute(name){
      this.$router.push({path: name})
      window.localStorage.setItem('currentMenu',name)
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
  #aside_user {
    background: #495060;
    padding-top:10px;

     .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
     }

     p {
         text-align: center;
         color: #fff;
         padding: 10px 0;
     }
    
}
  
/* for Chrome */
::-webkit-scrollbar {
    display: none;
}

</style>


