<template>
    <div id="login">
        <div id="login_form">
            <h1>应用市场管理平台</h1>
             <Form ref="formValidate" :model="loginData" :rules="ruleValidate">
                <FormItem prop="userName">
                    <Input type="text" v-model="loginData.userName" placeholder="用户名" size="large">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="pwd">
                    <Input type="password" v-model="loginData.pwd" placeholder="密码" size="large">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <a class="forgetpwd" @click="forgetpwd">忘记密码？</a>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="width:100%" size="large">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    
// created-----------------------------------------------------------------------------------
  created(){
    document.title = '登录-应用市场管理平台'
  },

// data--------------------------------------------------------------------------------------
  data(){
      return {
          loginData: {
            userName: '',
            pwd: '',
          },
          ruleValidate: {
              userName: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
          },
          isShow:false
      }
  },

// methods-----------------------------------------------------------------------------------
  methods: {
      // 点击登录
      handleSubmit(name){
        console.log(this)
        // 判断是否填写用户名密码
        this.$refs[name].validate((valid) => {
            if (valid) {
                // 发送登录请求
                this.axios.post('/login',qs.stringify(this.loginData))
                .then((res)=>{
                    console.log(res)
                })
                //   this.axios.get('/login',{params:this.loginData})
                //   .then((res)=>{
                //       console.log(res)
                //   })

                // 获取用户权限并本地保存
                window.localStorage.setItem("user",this.loginData.userName)
                window.localStorage.setItem("password",this.loginData.pwd)
                window.localStorage.setItem("authList",JSON.stringify([11,21,22,23,24,31,32,41,42,51,52,61,62,63,64]))                

                // 跳转到首页
                this.$router.push({path: '/index/homepage'})
                window.localStorage.setItem('currentMenu','/index/homepage')
            }
        })
      },


      // 点击刷新验证码
      refreshAuth(){

      },

      // 忘记密码
      forgetpwd(){
        this.$Message.warning({
            content: '请联系管理员！',
            duration:5,
        })
        // 解决多次连续点击问题
        $(".forgetpwd").attr("disabled",true)
        var timer = setTimeout(function(){
            $(".forgetpwd").attr("disabled",false)
            clearTimeout(timer)
        },5000)

      }
  }

}
</script>

<style lang='scss' scoped  type="text/css">
    #login {
        width:100%;
        height:100%;
        position: relative;
        background:-webkit-linear-gradient(#37a861,#40c4d8);
        #login_form {
            h1 {
                text-align: center;
                margin-bottom: 15px;
                color:#64c086
            }
            width: 400px;
            background: #fff;
            border-radius: 5px;
            padding: 25px 50px 5px 50px;
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




