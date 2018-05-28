<template>
  <div id="rightsManage">
    <h1><span>当前位置 > </span>权限管理</h1>
    <div class="bottom_wrap">
         <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 角色列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary"  v-has='"perm_add_role"'  @click="addRole"><Icon type="plus"></Icon> 添加角色</Button>
                </div>
           </div>
           
           <div style="position:relative">
                <Table border :columns="columns" :loading="loading" :data="roleData" no-data-text="暂无数据"></Table>            
                <Page :total="totalPage" :current='pageNo' @on-change='changePage' show-total class="page_wrap" @></Page>
           </div>
      </div>
    </div>


    <!-- 添加角色模态框 -->
    <Modal
        title="添加角色"
        v-model="addModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
       <Form ref="formValidate" :rules="ruleValidate" :model="addRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称" prop="mask">
            <Input v-model="addRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述" prop="description">
            <Input v-model="addRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="addModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAdd">确定</Button>
        </div>
        <div class="demo-spin-container">
            <Spin fix v-if='loading2'></Spin>
        </div>
    </Modal>


    <!-- 编辑模态框 -->
    <Modal
        title="编辑角色"
        v-model="editModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Form ref="formValidate1" :rules="ruleValidate"  :model="editRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称" prop="mask">
            <Input v-model="editRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述" prop="description">
            <Input v-model="editRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="editModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmEdit">确定</Button>
        </div>
        <div class="demo-spin-container">
            <Spin fix v-if='loading3'></Spin>
        </div>
    </Modal>
    <!-- 删除模态框 -->
    <Modal
        title="删除角色"
        v-model="deleteModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定删除该角色吗？</p>
        <div slot="footer">
            <Button  size="large" @click="deleteModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmDelete">确定</Button>
        </div>
        <div class="demo-spin-container">
            <Spin fix v-if='loading4'></Spin>
        </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
import {mapActions, mapGetters} from 'vuex'
export default {
// created------------------------------------------------------------------------------
  created(){
    this.authList = JSON.parse(window.localStorage.getItem('authList'))
    if(this.authList.indexOf('perm_edit')==-1&&this.authList.indexOf('perm_del')==-1&&this.authList.indexOf('perm_assign')==-1){
        this.columns = this.columns1
    }
    document.title = "权限管理"
    this.pageNo = this.rightPage
    this.queryTable()
  },

// computed-----------------------------------------------------------------------------
    computed:{
        ...mapGetters(['rightPage'])
    },

// data---------------------------------------------------------------------------------
  data(){
    const maskValidate = (rule,value,callback) => {
        if(value==''){
             callback(new Error('请输入角色名称')) 
        }else if(this.editModal==true){
            this.tmpMask == value?callback():callback(new Error('角色名称已存在'))
        }else{
            this.axios.get('/userPerm/checkRoleName',{params:{roleName:value}}).then(res=>{
                if(res && res.success=='1'){
                    callback()
                }else{
                    callback(new Error('角色名称已存在'))
                }
            })
        }
    }
    return {
      authList:[],
      loading:false,
      loading2:false,
      loading3:false,
      loading4:false,
      pageNo:1,
      totalPage:1,
      startRow:1,
      ruleValidate:{
        mask:[
          { required: true,  validator:maskValidate, trigger: 'blur' },
        ],
        description:[
          { required: true, message:'请输入角色描述' , trigger: 'blur' },
        ],
      },
      columns: [
        {
            // type: 'index',
            align: 'center',
            title: "序号",
            render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
        },
        {
            title: '角色名称',
            key: 'mask'
        },
        {
            title: '角色描述',
            key: 'description'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
                
                const arr = []
                const act1 = h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {

                                this.$refs['formValidate1'].resetFields()
                                this.editModal = true
                                this.editRoleData.id = params.row.id
                                this.editRoleData.mask = params.row.mask
                                this.editRoleData.description = params.row.description
                                this.tmpMask = params.row.mask
                            }
                        }
                    }, '编辑');
                const act2 = h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.deleteModal = true
                                this.delId = params.row.id
                            }
                        }
                    }, '删除');

                const act3 = h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.setPage2(this.pageNo)
                                // console.log(this.rightPage)
                                this.$router.push({path:'/index/dispatchRight',query:{roleId:params.row.id}})
                            }
                        }
                    }, '分配权限');
                if(this.authList.indexOf('perm_edit')>-1){arr.push(act1)}
                if(this.authList.indexOf('perm_del')>-1){arr.push(act2)}
                if(this.authList.indexOf('perm_assign')>-1){arr.push(act3)}
                return h('div', arr);
            }
        }
      ],
      columns1:[
           {
                // type: 'index',
                align: 'center',
                title: "序号",
                render:(h,params)=>{
                return h('div',params.index + this.startRow)
                }
            },
            {
                title: '角色名称',
                key: 'mask'
            },
            {
                title: '角色描述',
                key: 'description'
            },
      ],
      roleData: [],
      deleteModal:false,
      editModal:false,
      addModal: false,
      addRoleData: {
          mask:'',
          description:''
      },
      editRoleData: {
          id:"",
          mask:'',
          description:''
      },
      delId:"",
      tmpMask:""

    }
  },

// methods------------------------------------------------------------------------------
  methods: {
    ...mapActions(['setPage2']),
    // 查询表格
    queryTable(){
      this.loading = true
      this.axios.post("/userPerm/listRoles",{
          pageNo:this.pageNo,
          pageSize:10
      }).then(res=>{
        this.loading = false
        if(res&&res.success==1){
          const data = res.data
          this.totalPage = data.total
          this.roleData = data.list
          this.startRow = data.startRow
          // 解决点击其他菜单栏再返回时页码问题
          this.setPage2(1)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },

    // 改变页码
    changePage(current){
      this.pageNo = current
      this.queryTable()
    },

      // 点击添加角色按钮
      addRole(){
        this.$refs['formValidate'].resetFields() 
        this.addModal=true
      },

      // 确认添加
      confirmAdd(){
        this.$refs['formValidate'].validate((valid) => {
            if(valid) {
                this.loading2 = true
                this.axios.get('/userPerm/addRole',{params:this.addRoleData})
                .then(res=>{
                    this.loading2 = false
                    if(res&&res.success=='1'){
                        this.$Message.success("操作成功！")
                        this.addModal = false
                        this.queryTable()
                    }else{
                        this.$Message.error("操作失败！")
                        this.addModal = false
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
      },

      // 确认编辑
      confirmEdit(){
          this.$refs['formValidate1'].validate((valid) => {
            if(valid) {
                this.loading3 = true
                this.axios.get('/userPerm/upRole',{params:this.editRoleData})
                .then(res=>{
                    this.loading3 = false
                    if(res&&res.success=='1'){
                        this.$Message.success("操作成功！")
                        this.editModal = false
                        this.queryTable()
                    }else{
                        this.$Message.error("操作失败！")
                        this.editModal = false
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
      },

      // 确认删除
      confirmDelete(){
          this.loading4 = true
          this.axios.get('/userPerm/delRole',{
              params:{
                  id: this.delId
              }
          }).then(res=>{
              this.loading4 = false
              if(res&&res.success=='1'){
                  this.$Message.success("操作成功！")
                  this.deleteModal=false
                  this.queryTable()
              }else{
                  this.$Message.error(res.msg)
                  this.deleteModal=false
              }
          })
          .catch(err=>{
                console.log(err)
          })
      }
  }

}
</script>

<style lang="scss" scoped type="text/css">
  #rightsManage {
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