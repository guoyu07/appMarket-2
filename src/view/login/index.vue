<template>
    <div id="login">
         <!-- :style="{backgroundImage: 'url(' + bg + ')'}" -->
         
        <div id="login_form">
            <h1>应用市场管理平台</h1>
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
                <a class="forgetpwd" @click="forgetpwd">忘记密码？</a>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="width:100%" size="large">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
  created(){
    document.title = '登录-应用市场管理平台'
  },
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
          },
          isShow:false
      }
  },

  methods: {
      // 点击登录
      handleSubmit(){
          console.log(this)
          // 判断是否填写用户名密码
          if(this.formValidate.user.trim()=='' || this.formValidate.password.trim()==''){
              alert("请输入用户名或密码")
              return
          }else{
              // 发送登录请求
              
              // 获取用户权限并本地保存
              window.localStorage.setItem("authList",JSON.stringify([11,21,22,23,24,31,32,41,42,51,52,61,62,63,64]))

              window.localStorage.setItem("user",this.formValidate.user)
              window.localStorage.setItem("password",this.formValidate.password)

              // 跳转到首页
              this.$router.push({path: '/index/homepage'})
              window.localStorage.setItem('currentMenu','/index/homepage')
          }
      },
      // 点击刷新验证码
      refreshAuth(){

      },
      forgetpwd(){
        this.$Message.warning({
            content: '请联系管理员！',
            duration:5,
        })
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
            .forgetpwd{
                float: right;
                margin-top: -20px;
                margin-bottom: 15px;
                cursor: pointer;
                color: #0148bb;
            }
        }
    }
</style>




