<template>
  <Header>
      <!-- <Menu mode="horizontal" theme="dark" active-name="1"> -->
          <Row>
                <Col span="4">
                    <div class="big_title">应用市场管理平台</div>
                </Col>
      <!-- </Menu> -->
      <Col span="20">
      <div id="right_wrap">
          <!-- 信息 -->
            <span class="messages" @click='viewMsg' style="color:#fff"  title="消息">
                <Icon type="ios-email-outline"></Icon>
                <div id="num" v-if="count!=0">{{count}}</div>
            </span>

          <!-- 用户名 -->
          <span @mousemove="tipsShow" @mouseleave="tipsHide">
            <span class="user_wrap">
                <span class="username"></span>
                <Icon type="ios-arrow-down"></Icon>
            </span>
            <div class='tips'>
                <p @click="showModal"><Icon type="gear-b"></Icon><span>账号信息管理</span></p>
                <p @click='logout'><Icon type="log-out"></Icon><span>退出登录</span></p>
            </div>
          </span>

      </div>
      </Col>
      </Row>

    <!-- 修改密码模态框 -->
      <Modal
        title="账号信息管理"
        v-model="modifyAccountModal"
        :mask-closable="false">
        <Form ref="formValidate" :model="accountForm"  :label-width="85" :rules="ruleValidate">
        <FormItem label="用户名">
            <Input type="text" v-model="accountForm.userName" style="width:350px" placeholder='用户名' disabled></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input type="text" v-model="accountForm.phone" style="width:350px" placeholder='手机号'></Input>
        </FormItem>
        <FormItem label="密码" prop="pwd">
            <Input  v-model="accountForm.pwd" style="width:350px" placeholder='密码'></Input>
        </FormItem>
    </Form>
    <div slot="footer">
        <Button  size="large" @click="modifyAccountModal=false">取消</Button>
        <Button type="primary" size="large" @click="modifyAccount">确定</Button>
    </div>
    </Modal>
  </Header>
</template>

<script>
import env from '../js/env.js'
import {regTest} from '../util/util.js'
export default {
// created-----------------------------------------------------------------------------------
  created(){
      this.sendWebSocket()
  },

// created-----------------------------------------------------------------------------------
  mounted(){
    $(".username").html(window.localStorage.getItem("userName"))
  },

// data--------------------------------------------------------------------------------------
  data(){
      const phoneValidate = (rule,value,callback) =>{
       if(value==''){
          callback(new Error('请输入手机号'))      
        }else if(!regTest(value,'phone')){
          callback(new Error('请输入正确的手机号'))
        }else if(value==this.tmpPhone){
            console.log(111)
          callback()
        }else{
          this.axios.get("/userPerm/checkUserPhone",{params:{
            phone:value,
            userType:'1'
          }}).then(res=>{
            if(res&&res.success=='1'){
              callback()
            }else{
              callback(new Error('手机号码已存在！'))
            }
          })
        }
    }
      return {
          tmpPhone:'13333333333',
          tmpPwd:'123456',
          websock:null,
          count:1,
          modifyAccountModal:false,
          accountForm: {
              id:'',
              userName: '13333333333',
              phone: '13333333333',
              pwd: '123456'
          },
          ruleValidate: {
             pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
             ],
             phone: [
                { required: true, validator:phoneValidate, trigger: 'blur' }
             ]
          }
      }

  },

// methods-----------------------------------------------------------------------------------
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
          this.$refs['formValidate'].resetFields()
          this.modifyAccountModal = true
          // 获取本地存储的用户信息
          this.accountForm.pwd = '123456'
          this.accountForm.phone = '13333333333'
      },
      // 确定修改密码
      modifyAccount() {
          this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if(this.tmpPwd == this.accountForm.pwd){
                      this.axios.get("/userPerm/updateUser",{params:{
                          id:this.accountForm.id,
                          userName:this.accountForm.userName,
                          phone:this.accountForm.phone,
                      }}).then(res=>{
                            if(res&&res.success=='1'){
                                this.$Message.success("操作成功！")
                                // 修改本地存储的用户信息
                                this.modifyAccountModal = false
                            }else{
                                this.$Message.error("操作失败！")
                                this.modifyAccountModal = false
                            }
                       })  
                    }else{
                        this.axios.get("/userPerm/updateUser",{params:accountForm})
                        .then(res=>{
                            if(res&&res.success=='1'){
                                this.$Message.success("操作成功！")
                                // 修改本地存储的用户信息
                                this.modifyAccountModal = false
                            }else{
                                this.$Message.error("操作失败！")
                                this.modifyAccountModal = false
                            }
                        })
                    }
                }
            })
      },

      // 退出登录
      logout() {
          window.localStorage.clear();
          this.$router.push('/login')
          this.closeWebSocket()
      },

      // Websocket显示消息数量
      sendWebSocket(){
          this.websock = new WebSocket("ws://"+env.apiPath.slice(7,-1)+"/websocket/socketServer.do?token="+localStorage.getItem('token'));
          this.websock.onopen = function(evt) { 
            console.log("打开连接....."); 
            this.send("111");
          };

          this.websock.onmessage = function(evt) {
            console.log( "收到信息 ");
            if(evt.data){
                this.count++
            }
            // this.close();
          };
            
        //   ws.onclose = function(evt) {
        //     console.log("连接关闭");
        //   };      
      },

      // 关闭websocket
      closeWebSocket(){
         this.websock.onclose = function(evt) {
            console.log("连接关闭");
         };
      },

      //
      viewMsg(){
          this.$router.push({path:'/index/messages'})
          this.count = 0
      }

  }
}
</script>


<style lang="scss" scoped type="text/css">
.big_title {
    color: #fff;
    font-size: 26px;
    width: 100%;
    background: #63c185;
    text-align: center;
}
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

        #num {
            position:absolute;
            color:red;
            font-size:14px;
            right:-5px;
            top:-25px;
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
        width:140px;
        position: absolute;
        z-index:1000;
        right: 0;
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


