<template>
  <div id="webUser">
    <h1><span>当前位置 > </span>用户管理 > 平台用户</h1>

    <div class="bottom_wrap">

        <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="55">
          <FormItem label="用户名">
            <Input v-model="searchData.content"  placeholder="用户名/手机号"></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="searchData.state"  style="width:100px">
                <Option value="-1">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchTable">筛选</Button>
          </FormItem>
        </Form>
      </div>

      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 平台用户列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary" style="margin-right:15px" @click="addUser"><Icon type="plus"></Icon> 添加用户</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected()?startUseModal = true:''">启用</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected()?forbiddenUseModal = true:''">禁用</Button>
                </div>
           </div>
           <div style="position:relative">
                <Table border :loading='loading' :columns="columns" :data="webUserData" @on-selection-change="selectUserChange" no-data-text="暂无数据"></Table>            
                <Page :total="totalPage" :current='searchData.pageNo' @on-change='changePage' show-total class="page_wrap"></Page>
           </div>
           
      </div>
      
      
    </div>

    <!-- 添加用户模态框 -->
    <Modal
        title="添加用户"
        v-model="addUserModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Form  ref='formValidate'  :rules="ruleValidate" :model="addUserData"  :label-width="80" style="width:70%;margin:10px auto 70px">
          <FormItem label="用户名" prop="userName">
            <Input v-model="addUserData.userName"  placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="初始密码" prop="pwd">
            <Input v-model="addUserData.pwd"  placeholder="初始密码"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="addUserData.phone"  placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="角色名称" prop="roleId">
            <Select v-model="addUserData.roleId">
                <Option value="1">管理员</Option>
                <Option value="2">普通用户</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" prop="state">
            <Select v-model="addUserData.state">
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="addUserModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAdd">确定</Button>
        </div>
    </Modal>

    <!-- 编辑用户模态框 -->
    <Modal
        title="编辑用户"
        v-model="editUserModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Form  ref='formValidate1'  :rules="ruleValidate1" :model="editUserData"  :label-width="80" style="width:70%;margin:10px auto 70px">
          <FormItem label="用户名" prop="userName">
            <Input v-model="editUserData.userName"  placeholder="请输入用户名" disabled></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd">
            <Input v-model="editUserData.pwd"  placeholder="请输入密码" type="password"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="editUserData.phone"  placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="角色名称" prop="roleId">
            <Select v-model="editUserData.roleId">
                <Option :value="item.roleId" v-for="item in roleData" :key="item.roleId">{{item.roleName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" prop="state">
            <Select v-model="editUserData.state">
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="editUserModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmEdit">确定</Button>
        </div>
    </Modal>

    <!-- 启用模态框 -->
    <Modal
        title="启用"
        v-model="startUseModal"
        @on-ok="confirmUse"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定启用该用户吗？</p>
    </Modal>
    <!-- 禁用模态框 -->
    <Modal
        title="禁用"
        v-model="forbiddenUseModal"
        @on-ok="confirmForbidden"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定禁用该用户吗？</p>
    </Modal>
  </div>
</template>

<script>
import {breakTips,regTest} from '../../util/util'
export default {
// created-----------------------------------------------------------------------------
  created(){
    document.title = "用户管理-平台用户"
    this.searchTable()
    this.queryRole()
  },

// data--------------------------------------------------------------------------------
  data(){
    const nameValidate = (rule,value,callback)=>{
        if(value==''){
          callback(new Error('请输入用户名'))      
        }else{
          callback()
        }
        // // 查重
        // this.axios.get('/userPerm/checkUserName',{
        //   params:{
        //     userName:value,
        //     userType:'1'
        //   }
        // }).then(res=>{
        //     if(res.success==1){

        //     }
        // })
    }
    const phoneValidate = (rule,value,callback) =>{
       if(value==''){
          callback(new Error('请输入手机号'))      
        }else if(!regTest(value,'phone')){
          callback(new Error('请输入正确的手机号'))
        }else{
          callback()
        }
    }
    return {
      roleData:[
        {
          roleId:1,
          roleName:"管理员"
        },
        {
          roleId:2,
          roleName:"普通员工"
        },
      ],
      loading:false,
      addUserModal: false,
      editUserModal: false,
      startUseModal:false,
      forbiddenUseModal:false,
      totalPage:1,
      currentPage:1,
      ruleValidate:{
        userName:[
          { required: true, validator: nameValidate, trigger: 'blur' },
        ],
        pwd:[
          { required: true, message:'请输入密码' , trigger: 'blur' },
        ],
        phone:[
          { required: true, validator:phoneValidate , trigger: 'blur' },
        ],
        roleId:[
          { required: true, message:'请选择角色名称' , trigger: 'change' },
        ],
        state:[
          { required: true, message:'请选择状态' , trigger: 'change' },
        ],
      },
       ruleValidate1:{
        userName:[
          { required: true, message:'请输入用户名' , trigger: 'blur' },
        ],
        pwd:[
          { required: true, message:'请输入密码' , trigger: 'blur' },
        ],
        phone:[
          { required: true, validator:phoneValidate , trigger: 'blur' },
        ],
        roleId:[
          { type:"number", required: true, message:'请选择角色名称' , trigger: 'change' },
        ],
        state:[
          { required: true, message:'请选择状态' , trigger: 'change' },
        ],
      },
      searchData: {
        content:"",
        state: '-1',
        pageNo:1,
        pageSize:10
      },
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: 70,
            align: 'center',
            title: "序号"
        },
        {
            title: "用户名",
            key: 'userName',
        },
        {
            title: '手机号',
            key: 'phone'
        },
        {
            title: '注册时间',
            key: 'registerDate'
        },
        {
            title: '角色名称',
            key: 'roleName'
        },
        {
            title: '状态',
            key: 'state',
            render:(h,params)=>{
              return h('div',params.row.state=='1'?'启用':'禁用')
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                // 请求用户数据
                                this.axios.get("/userPerm/qryUserInfoById",{
                                  params:{
                                    id:params.row.id
                                  }
                                })
                                .then(res=>{
                                  if(res.success=='1' && res.data){
                                    const data = res.data
                                    
                                    this.editUserData.userName = data.userName
                                    this.editUserData.id = data.id
                                    this.editUserData.pwd = data.pwd
                                    this.editUserData.phone = data.phone
                                    this.editUserData.roleId = data.roleId
                                    this.editUserData.state = data.state

                                    this.tmpwd = data.pwd
                                  }
                                })
                                this.editUserModal = true  
                            }
                        }
                    }, '编辑')
                ]);
            }
        }
      ],
      webUserData: [],
      selectedUserData: [],
      addUserData: {
        userName: '',
        pwd: '111111',
        phone:"",
        roleId: '1',
        state: '1',
        userType:'1'
      },
      editUserData: {
        id:"",
        userName: '',
        pwd:'',
        phone:"",
        roleId: '',
        state: ''
      },
      tmpwd:""
    }
  },

// methods-----------------------------------------------------------------------------
  methods: {
    // 查询用户角色
    queryRole(){
      this.axios.get("/userPerm/qryRoleList").then(res=>{
        if(res&&res.success==1){

        }
      })
    },

    // 表格查询
    searchTable(){
      this.loading = true
      this.axios.get("/userPerm/listUsers",{
          params:this.searchData
      }).then(res => {
        console.log(res)
        if(res && res.success==1 && res.data){
          this.loading = false
          const data = res.data
          this.totalPage = data.total
          this.webUserData = data.list
          
        }
      })
    },

    // 改变页码
    changePage(current){

      console.log(current)
      this.searchData.pageNo = current
      this.searchTable()

    },

    // 选中数据改变
    selectUserChange(selection){
      this.selectedUserData = selection
    },

    // 判断是否选中用户
    isSelected(){
      if(this.selectedUserData.length==0){
          this.$Message.warning('请至少选择一位用户！');
          breakTips()
          return false
      }else{
          return true
      }
    },

    // 点击添加用户按钮
    addUser(){
       this.$refs['formValidate'].resetFields();
       this.addUserModal=true      
    },

    // 确定启用
    confirmUse(){

    },

    // 确定禁用
    confirmForbidden() {

    },

    // 确定添加用户
    confirmAdd(){
      this.$refs['formValidate'].validate((valid) => {
            if(valid) {
              this.axios.get("/userPerm/addUser",{
                  params:this.addUserData
              }).then(res=>{
                if(res.success==1){
                  this.$Message.success("添加成功！")
                  this.addUserModal = false
                  this.searchTable()
                }
              })
            }
      })
    },

    // 确定编辑
    confirmEdit(){

      this.$refs['formValidate1'].validate((valid) => {

            if(valid) {
              // 若密码修改了，则传参密码
              if(this.editUserData.pwd != this.tmpwd){
                this.axios.get('/userPerm/updateUser',{params:this.editUserData})
                .then(res=>{
                  if(res.success==1){
                    this.$Message.success("编辑成功！")
                    this.editUserModal = false
                    this.searchTable()
                  }
                })
              }else{
                this.axios.get('/userPerm/updateUser',{params:{
                  id:this.editUserData.id,
                  userName:this.editUserData.userName,
                  phone:this.editUserData.phone,
                  roleId:this.editUserData.roleId,
                  state:this.editUserData.state
                }})
                .then(res=>{
                  if(res.success==1){
                    this.$Message.success("编辑成功！")
                    this.editUserModal = false
                    this.searchTable()
                  }
                })
              }

              
            }
      })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #webUser {
    .search_wrap {
            background:#fff;
            padding:20px 20px 0 20px;
        }
        .table_wrap{
             background:#fff;
             padding:0 0 20px 0;
            .actions{
                padding:20px;
                .btns_wrap{
                    float:right;
                }
            }
            .applists{
                float: left;
                margin-top:5px;
            }
        }
  }
</style>


