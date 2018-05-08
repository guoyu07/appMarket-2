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
            <router-link class="messages" v-bind:to="{path:'/index/messages'}" style="color:#fff"  title="消息">
                <Icon type="ios-email-outline"></Icon>
                <div id="num">2</div>
            </router-link>

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
            <Input type="text" v-model="accountForm.pwd" style="width:350px" placeholder='密码'></Input>
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
      return {
          modifyAccountModal:false,
          accountForm: {
              userName: '13333333333',
              phone: '13333333333',
              pwd: '123456'
          },
          ruleValidate: {
             pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
             ],
             phone: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
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
          this.modifyAccountModal = true
          this.accountForm.pwd = '123456'
          this.accountForm.phone = '13333333333'
      },
      // 确定修改密码
      modifyAccount() {
          console.log(111)
          this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                }
            })
      },

      // 退出登录
      logout() {
          window.localStorage.clear();
          this.$router.push('/login')
      },

      // Websocket显示消息数量
      sendWebSocket(){
          var ws = new WebSocket("wss://echo.websocket.org");
            ws.onopen = function(evt) { 
            console.log("Connection open ..."); 
            ws.send("Hello WebSockets!");
            };

            ws.onmessage = function(evt) {
            console.log( "Received Message: " + evt.data);
            ws.close();
            };

            ws.onclose = function(evt) {
            console.log("Connection closed.");
            };      
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


