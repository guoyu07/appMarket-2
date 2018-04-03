<template>
    <div id="login">
         <!-- :style="{backgroundImage: 'url(' + bg + ')'}" -->
         
        <div id="login_form">
            <h1>应用市场管理后台登录</h1>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="user">
                    <Input type="text" v-model="formValidate.user" placeholder="用户名" size="large">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formValidate.password" placeholder="密码" size="large">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <!-- <FormItem prop="authcode">
                    <Input type="password" v-model="formValidate.authcode" placeholder="验证码" size="large">
                    </Input>
                    <img src="../../assets/img/Main.jpg" alt="" title="点击刷新验证码" id="img_authcode" @click="refreshAuth">
                </FormItem> -->
                <FormItem>
                    <Button type="success" @click="handleSubmit('formValidate')" style="width:100%" size="large">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return {
          bg: require('../../assets/img/bg-login.png'),
          formValidate: {
            user: '',
            password: '',
            authcode: ''
          },
          ruleValidate: {
              user: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
          }
      }
  },

  methods: {
      // 点击登录
      handleSubmit(){
          if(this.formValidate.user.trim()=='' || this.formValidate.password.trim()==''){
              alert("请输入用户名或密码")
              return
          }else{
              window.localStorage.setItem("user",this.formValidate.user)
              window.localStorage.setItem("password",this.formValidate.password)
          }
          // 跳转到首页
          this.$router.push({path: '/index/homepage'})
      },
      // 点击刷新验证码
      refreshAuth(){

      }
  }

}
</script>

<style lang='scss' scoped  type="text/css">
    #login {
        width:100%;
        height:100%;
        position: relative;

        #login_form {
            h1 {
                text-align: center;
                margin-bottom: 15px;
            }
            width: 350px;
            background: rgba(0,0,0,.4);
            border-radius: 5px;
            padding: 25px 30px 5px 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);

            #img_authcode {
                width: 135px;
                height: 34px;
                position: absolute;
                top: 1px;
                right: 2px;
            }
        }
    }
</style>




