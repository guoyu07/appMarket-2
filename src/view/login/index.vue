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
import {mapActions,mapGetters} from 'vuex'
import Trees from '../../components/Trees.vue'

export default {
  computed:{
    ...mapGetters(['isLoadRoutes','menuitems'])
  }, 
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
          isShow:false,
          authList:null,
          count:0
      }
  },

// methods-----------------------------------------------------------------------------------
  methods: {
      // 点击登录
      ...mapActions(['addMenu','loadRoutes',]),
      handleSubmit(name){
        // console.log(this)
        if(this.count>0){
            return
        }
        this.count++;
        // 判断是否填写用户名密码
        this.$refs[name].validate((valid) => {
            if (valid) {
                const msg = this.$Message.loading({
                    content: '正在登陆...',
                    duration: 0
                });
                // 发送登录请求
                this.axios.post('/login',this.loginData)
                .then((res)=>{
                    // console.log(res.data.success=='1')
                    this.count = 0;
                    
                    if(res.success=='1'){
                        this.$Message.destroy(msg)
                        this.$Message.success("登陆成功！")
                        // 本地存储token
                        window.localStorage.setItem("token",res.token)
                        
                        // 用户权限
                        this.authList = res.perms.map(item=>{
                            return item.mask
                        })
                        // 动态添加路由
                        this.addMenu(this.authList)
                        if(!this.isLoadRoutes) {  
                            this.$router.addRoutes(this.menuitems)
                            this.loadRoutes()  
                        }
                        // 获取用户权限并本地保存
                        var obj = {}
                        obj.userName = this.loginData.userName
                        obj.pwd = this.loginData.pwd
                        obj.userId = res.userId
                        window.localStorage.setItem("userInfo",JSON.stringify(obj))
                        window.localStorage.setItem("authList",JSON.stringify(this.authList))              

                        // 跳转到首页
                        this.$router.push({path: '/index/homepage'})
                        window.localStorage.setItem('currentMenu','/index/homepage')
                    }else{
                       this.$Message.destroy(msg)
                       this.$Message.error("登陆失败！") 
                    }
                })             
            }
        })
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
         background:#37a861;         
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




