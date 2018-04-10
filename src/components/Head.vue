<template>
  <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">应用市场后台管理系统</div>
      </Menu>
      
      <div id="right_wrap">
          <!-- 信息 -->
          <span class="messages">
              <Icon type="ios-email-outline"></Icon>
              <span id="num">2</span>
          </span>

          <!-- 用户名 -->
          <span @mouseover="tipsShow" @mouseleave="tipsHide">
            <span class="user_wrap">
                <span class="username">13333333333</span>
                <Icon type="ios-arrow-down"></Icon>
            </span>
            <div class='tips'>
                <p><Icon type="card"></Icon><span>账号信息</span></p>
                <p @click="showModal"><Icon type="gear-b"></Icon><span>修改密码</span></p>
                <p @click='logout'><Icon type="log-out"></Icon><span>退出登录</span></p>
            </div>
          </span>

      </div>

    <!-- 修改密码模态框 -->
      <Modal
        title="修改密码"
        v-model="modifyPassword"
        @on-ok='modifyPass'
        @on-cancle='cancleModifyPass'
        :mask-closable="false">
        <Form ref="passwdForm" :model="passwdForm" :rules="ruleValidate" :label-width="85">
        <FormItem label="原密码" prop="passwd">
            <Input type="password" v-model="passwdForm.passwd" style="width:350px" placeholder='原密码'></Input>
        </FormItem>
        <FormItem label="新密码" prop="passwdCheck">
            <Input type="password" v-model="passwdForm.passwdCheck" style="width:350px" placeholder='新密码'></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="passwdConfirm">
            <Input type="password" v-model="passwdForm.passwdConfirm" style="width:350px" placeholder='确认新密码'></Input>
        </FormItem>
    </Form>
    </Modal>
  </Header>
</template>

<script>
export default {
  data(){
      return {
          modifyPassword:false,
          passwdForm: {
              passwd: '',
              passwdCheck: '',
              passwdConfirm: ''
          },
          ruleValidate: {
             passwd: [
                { required: true, message: '请输入原密码', trigger: 'blur' }
             ],
             passwdCheck: [
                { required: true, message: '请输入新密码', trigger: 'blur' }
             ],
             passwdConfirm: [
                { required: true, message: '请确认新密码', trigger: 'blur' }
             ],
          }
      }
  },
  methods: {
      // 鼠标移入
      tipsShow() {
          $(".tips").stop().slideDown(100)
      },
      // 鼠标移出
      tipsHide() {
          $(".tips").stop().slideUp(100)
      },
      showModal() {
          this.modifyPassword = true
          this.passwdForm.passwd = ''
          this.passwdForm.passwdCheck = ''
          this.passwdForm.passwdConfirm = ''
      },
      // 确定修改密码
      modifyPass() {
          console.log(111)
      },
      // 取消修改密码
      cancleModifyPass() {
          console.log(222)
      },
      // 退出登录
      logout() {
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
#right_wrap{
    position: absolute;
    top:0;
    right:30px;
    color:#fff;
    z-index:1000;
    .messages{
        position:relative;
        font-size:24px;
        cursor:pointer;

        span {
            position:absolute;
            color:red;
            font-size:14px;
            right:-7px;
            top:-27px;
        }
    }
    .user_wrap{
        font-size:16px;
        float: right;
        margin-left:20px;
        cursor:pointer;
    }
    .tips{
        display: none;
        position: absolute;
        z-index:1000;
        right: 10px;
        top:64px;
        color:#000;
        border:1px solid #ccc;
        border-radius: 5px;
        box-shadow: 1px 1px 3px 1px #ccc;
        p {
            height: 30px;
            line-height:30px;
            font-size:14px;
            color:grey;
            padding:0 15px;
            cursor:pointer;
            span {
                margin-left:10px;
            }
        }

    }
    

}


</style>


