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
                        <span>{{accountForm.userName}}</span>
                        <Icon type="ios-arrow-down" v-if='iconShow'></Icon>
                        <Icon type="ios-arrow-up" v-else></Icon>
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
                <Input type="password" v-model="accountForm.pwd" style="width:350px" placeholder='密码'></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="modifyAccountModal=false">取消</Button>
            <Button type="primary" size="large" @click="modifyAccount">确定</Button>
        </div>
        <div class="demo-spin-container">
                <Spin fix v-if='loading'></Spin>
        </div>
    </Modal>
  </Header>
</template>

<script>
import env from '../js/env.js'
import {regTest} from '../util/util.js'
import {mapGetters, mapActions} from 'vuex'
export default {
  
// created-----------------------------------------------------------------------------------
  created(){
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
      this.userId = userInfo['userId']
      this.accountForm.userName = userInfo['userName']
      
      this.queryCount()
      this.sendWebSocket()
      this.querySelf()
  },
  computed:{
    ...mapGetters(['count'])
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
          iconShow:true,
          loading:false,
          tmpPhone:'',
          tmpPwd:'',
          websock:null,
          userId:'',
          modifyAccountModal:false,
          accountForm: {
              id:'',
              userName: '',
              phone: '',
              pwd: ''
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
      ...mapActions(['setCount']),
     // 查询本账号信息
     querySelf(){
         this.loading = true
          this.axios.get("/userPerm/qryUserInfoById",{
                params:{
                id:this.userId
                }
            }).then(res=>{
                this.loading = false
                if(res&&res.success==1){
                    const data = res.data
                    this.accountForm.id = data.id
                    this.accountForm.userName = data.userName
                    this.accountForm.pwd = data.pwd
                    this.accountForm.phone = data.phone
                    this.tmpPhone = data.phone
                    this.tmpPwd = data.pwd
                    window.localStorage.setItem("roleId",data.roleId)
                }
            })
                                
     },
     //  查询未读消息数量
      queryCount(){
          this.axios.get('/notification/getUnreadCnt',{
              params:{
                  userId:this.userId,
              }
          }).then(res=>{
              if(res&&res.success==1){
                  this.setCount(res.data)
              }
          }) 
      },
      // 鼠标移入
      tipsShow() {
          $(".tips").stop().slideDown(100)
          this.iconShow = false
      },
      // 鼠标移出
      tipsHide() {
          $(".tips").stop().slideUp(100)
          this.iconShow = true
      },
      showModal() {
          this.$refs['formValidate'].resetFields()
          this.querySelf()
          this.modifyAccountModal = true
      },
      // 确定修改密码
      modifyAccount() {
          this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.loading = true
                    if(this.tmpPwd == this.accountForm.pwd){
                      this.axios.get("/userPerm/updateUser",{params:{
                          id:this.accountForm.id,
                          userName:this.accountForm.userName,
                          phone:this.accountForm.phone,
                          flag:1,
                          userType:'1'
                      }}).then(res=>{
                          this.loading = false
                            if(res&&res.success=='1'){
                                this.modifyAccountModal = false
                                this.$Modal.warning({
                                    title: '',
                                    content: "账号信息修改成功，请重新登陆！",
                                    top:300,
                                    onOk: () => {
                                        this.$router.push({path:'/login'})
                                    }
                                });
                            }else{
                                this.modifyAccountModal = false
                            }
                       })
                         
                    }else{
                        this.axios.get("/userPerm/updateUser",{params:{
                            ...this.accountForm,
                            flag:1,
                            userType:'1'
                        }}).then(res=>{
                            this.loading = false
                            if(res&&res.success=='1'){
                                this.modifyAccountModal = false
                                this.$Modal.warning({
                                    title: '',
                                    content: "账号信息修改成功，请重新登陆！",
                                    top:300,
                                    onOk: () => {
                                        this.$router.push({path:'/login'})
                                    }
                                });
                            }else{
                                this.modifyAccountModal = false
                            }
                        })
                         
                    }
                    
                }
            })
      },

      // 退出登录
      logout() {
          this.axios.post("/loginout").then(res=>{
              if(res&&res.success==1){
                 this.$Message.success(res.msg)
                 window.localStorage.clear();
                 this.$router.push('/login')
                 this.closeWebSocket()
              }
          }) 
          
      },

      // Websocket显示消息数量
      sendWebSocket(){
          this.websocket = new WebSocket("ws://"+env.apiPath.slice(7,-1)+"/websocket/socketServer.do?token="+localStorage.getItem('token'));
          this.websocket.onopen = function(evt) { 
            console.log("打开连接....."); 
            this.send("111");
          };
          var that = this
          this.websocket.onmessage = function(evt) {
            var data = JSON.parse(evt.data)

            var a = that.count
            if(data.code=='1'||data.code=='2'){
                that.setCount(++a)
            }
            if(data.code=='3'){
                that.$Modal.warning({
                    title: '',
                    content: data.msg,
                    top:300,
                    onOk: () => {
                        that. queryCount()
                        that.$router.push({path:'/login'})
                    }
                });
                
            }
          }; 
      },

      // 关闭websocket
      closeWebSocket(){
         this.websocket.onclose = function(evt) {
            console.log("连接关闭");
         };
      },

      //
      viewMsg(){
          this.$router.push({path:'/index/messages'})
      }

  }
}
</script>


<style lang="scss" scoped type="text/css">
.big_title {
    color: #fff;
    font-size: 22px;
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
            position: absolute;
            color: #fff;
            font-size: 12px;
            left: 12px;
            top: 0px;
            background: red;
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            border-radius: 50%;
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
        background:#fff;
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


