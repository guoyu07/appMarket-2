<template>
  <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">应用市场后台管理系统</div>
      </Menu>
      
      <div id="login-user">
          <div id="login-avatar">
              <img src="../assets/img/avatar.jpg" alt="">
          </div>
          <span>合肥开元</span>
      </div>
      
      <div id="login-out" title="退出" @click='logout'>
          <Icon type="log-out"></Icon>
      </div>
  </Header>
</template>

<script>
export default {
  data(){
      return {
          
      }
  },
  methods: {
      logout(){
          window.localStorage.clear();
          this.$router.push('/login')
      }
  }
}
</script>


<style lang="scss" scoped type="text/css">
.layout-logo {
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 30px;
}
#login-user {
    position: absolute;
    z-index: 900;
    right: 70px;
    top: 6px;
    width: 100px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

    span {
        position: absolute;
        right: 0;
        top: -5px;
        color:#fff;
    }
}
#login-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}

#login-out {
    position: absolute;
    right: 20px;
    font-size: 20px;
    top: 0px;
    color: #fff;
    z-index: 900;
    cursor: pointer;
}
</style>


