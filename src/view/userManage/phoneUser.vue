<template>
  <div id="webUser">
    <h1><span>当前位置 > </span>用户管理 > 手机用户</h1>

    <div class="bottom_wrap">

        <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="55">
          <FormItem label="用户名">
            <Input v-model="searchData.userName"  placeholder="用户名/手机号"></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="searchData.state"  style="width:100px">
                <Option value="0">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary">筛选</Button>
          </FormItem>
        </Form>
      </div>

      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 手机用户列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected()?startUseModal = true:''">启用</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected()?forbiddenUseModal = true:''">禁用</Button>
                </div>
           </div>
           
           <div style="position:relative">
                <Table border :columns="columns" :data="phoneUserData" @on-selection-change="selectUserChange" no-data-text="暂无数据"></Table>            
                <Page :total="2" show-total class="page_wrap"></Page>
                <Spin fix v-if='loading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>loading...</div>
                </Spin>
           </div>
           
      </div>
      
      
    </div>


    <!-- 编辑用户模态框 -->
    <Modal
        title="编辑用户"
        v-model="editUserModal"
        @on-ok="confirmEdit"
        class-name="vertical-center-modal">
        <Form  :model="editUserData"  :label-width="90" style="width:70%;margin:0 auto">
          <FormItem label="用户名">
            <Input v-model="editUserData.userName"  placeholder="请输入用户名" disabled></Input>
          </FormItem>
          <FormItem label="姓名">
            <Input v-model="editUserData.name"  placeholder="请输入姓名" disabled></Input>
          </FormItem>
          <FormItem label="密码">
            <Input v-model="editUserData.pwd"  placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="性别">
            <Select v-model="editUserData.sex">
                <Option value="0">男</Option>
                <Option value="1">女</Option>
            </Select>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="editUserData.state">
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem label="警务通号码">
            <Input v-model="editUserData.policeservnum"  placeholder="" disabled></Input>
          </FormItem>
        </Form>
    </Modal>

    <!-- 启用模态框 -->
    <Modal
        title="启用"
        v-model="startUseModal"
        @on-ok="confirmUse"
        class-name="vertical-center-modal">
        <p class="modalp">确定启用该用户吗？</p>
    </Modal>
    <!-- 禁用模态框 -->
    <Modal
        title="禁用"
        v-model="forbiddenUseModal"
        @on-ok="confirmForbidden"
        class-name="vertical-center-modal">
        <p class="modalp">确定禁用该用户吗？</p>
    </Modal>
  </div>
</template>

<script>
import {breakTips} from '../../util/util'
export default {
// created--------------------------------------------------------------------------------------
  created(){
    document.title = "用户管理-手机用户"
  },

// data------------------------------------------------------------------------------------------
  data(){
    return {
      loading:false,
      editUserModal: false,
      startUseModal:false,
      forbiddenUseModal:false,
      searchData: {
        userName:"",
        state: '0'
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
            title: "姓名",
            key: 'name',
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
            title: '性别',
            key: 'sex'
        },
        {
            title: '角色名称',
            key: 'roleName'
        },
        {
            title: '状态',
            key: 'state'
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
                                this.editUserModal = true
                                
                            }
                        }
                    }, '编辑')
                ]);
            }
        }
      ],
      phoneUserData: [
        {
          name:'小雪',
          userName:"开元",
          phone:"13333333333",
          sex: '女',
          roleName: '普通用户',
          state:'启用'
        }
      ],
      selectedUserData: [],
      editUserData: {
        userName: '开元',
        name: '小雪',
        pwd:"123123",
        sex: '1',
        state: '1',
        policeservnum: '1234r3fdcdss'
      }
    }
  },

// methods---------------------------------------------------------------------------------------
  methods: {
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

    // 确定启用
    confirmUse(){
    },

    // 确定禁用
    confirmForbidden() {

    },

    // 确定添加用户
    confirmAdd(){

    },

    // 确定编辑
    confirmEdit(){

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


