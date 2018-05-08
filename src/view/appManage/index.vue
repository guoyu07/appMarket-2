<template>
  <div id="appManage">
    <h1><span>当前位置 > </span>应用管理</h1>
    
    <div class="bottom_wrap">

      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="55">
          <FormItem label="应用名">
            <Input v-model="searchData.appName"  placeholder="请输入应用名"></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="searchData.type"  style="width:100px">
                <Option value="0">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click='queryTable'>筛选</Button>
          </FormItem>
        </Form>
      </div>

      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 应用列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary" v-has="'addbtn'" style="margin-right:15px" @click="$router.push({path:'/index/addApp'})"><Icon type="plus"></Icon> 添加应用</Button>
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected()?startUseModal = true:''">启用</Button>
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected()?forbiddenUseModal = true:''">禁用</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected()?blackListsModal = true:''">黑名单</Button>
                    <Button type="primary" class='isDisabled'  @click="isSelected()?whiteListsModal = true:''" >白名单</Button>
                </div>
           </div>

           <div style="position:relative">
                <Table border :columns="columns" :loading="loading" :data="appData" @on-selection-change="selectAppChange" no-data-text="暂无数据"></Table>            
                <Page :total="2" show-total class="appPage page_wrap"></Page>
                <Spin fix v-if='loading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>loading...</div>
                </Spin>
           </div>
           
      </div>
      
    </div>
    
    <!-- 启用模态框 -->
    <Modal
        title="启用"
        v-model="startUseModal"
        @on-ok="confirmUse"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定启用该应用吗？</p>
    </Modal>
    <!-- 禁用模态框 -->
    <Modal
        title="禁用"
        v-model="forbiddenUseModal"
        @on-ok="confirmForbidden"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定禁用该应用吗？</p>
    </Modal>
    <!-- 黑名单模态框 -->
    <Modal
        title="黑名单"
        v-model="blackListsModal"
        @on-ok="confirmBlack"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定将该应用的类型修改为黑名单吗？</p>
    </Modal>
    <!-- 白名单模态框 -->
    <Modal
        title="白名单"
        v-model="whiteListsModal"
        @on-ok="confirmWhite"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">确定将该应用的类型修改为白名单吗？</p>
    </Modal>
    <!-- 下发模态框 -->
    <Modal
        title="用户"
        v-model="dispatchModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <div style="margin-bottom:20px">
            <Input type="text" placeholder="姓名/用户名/手机号" v-model="searchUser" style="width:250px;margin-right:20px"></Input>
            <Button type="primary">筛选</Button>
        </div>
        <Table border ref="selection" :columns="columns2" :data="userData" @on-selection-change="selectUserChange" no-data-text="暂无数据"></Table>
        <div slot="footer">
            <Button  size="large" @click="dispatchModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmDispatch">确定</Button>
        </div>
    </Modal>
    <Action></Action>
  </div>
  
</template>


<script>
import {breakTips} from '../../util/util'
import Action from '../../components/Action.vue'
export default {
    components:{
        Action
    },
// created------------------------------------------------------------------------------------
  created(){
    document.title = "应用管理";
  },

// data---------------------------------------------------------------------------------------
  data(){
    return{
      perms:null,
      loading:false,
      searchData: {
        appName: "",
        type: "0"
      },
      // 应用表格
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
            title: "类型",
            key: 'isBlacklist',
        },
        {
            title: '应用名',
            key: 'name'
        },
        {
            title: '版本号',
            key: 'versionId'
        },
        {
            title: '应用标签',
            key: 'tag'
        },
        {
            title: '下载次数',
            key: 'downCnt',
            sortable: true
        },
        {
            title: '更新时间',
            key: 'updateDate',
            sortable: true
        },
        {
            title: '状态',
            key: 'state',
            width:70
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            render: (h, params) => {
                
                return h('div', {
                    attrs: {
                        class:'action_wrap'
                    }
                },[
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '版本升级',
                            id:params.row.name
                        }
                    }),
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '详情',
                            // id:params.row.name
                        }
                    }),
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '编辑',
                            id:params.row.name
                        }
                    }),
                    h('a', {
                        style: {
                            // marginRight: '10px',
                            color:params.row.isBlacklist=="白名单"?'#ccc':'#63c185',
                            cursor:params.row.isBlacklist=="白名单"?'not-allowed':'pointer'
                        },
                        on: {
                            click: () => {
                                if(params.row.isBlacklist=='白名单'){
                                    return
                                }
                                this.$refs.selection.selectAll(false);
                                this.searchUser = ''
                                this.dispatchModal = true
                            }
                        }
                    }, '下发')
                ]);
            }
        }
      ],
      appData: [
        {
          isBlacklist:"白名单",
          name: "微信",
          versionId: "v3.0",
          tag: '工作',
          downCnt: '11',
          updateDate: '2018-04-03 14:14:14',
          state: "启用"

        },
        {
          isBlacklist:"黑名单",
          name: "QQ",
          versionId: "v3.0",
          tag: '生活',
          downCnt: '11',
          updateDate: '2018-04-03 14:14:14',
          state: "启用"

        }
      ],
      // 模态框
      startUseModal:false,
      forbiddenUseModal:false,
      whiteListsModal:false,
      blackListsModal:false,
      dispatchModal: false,
      // 复选框选中数据
      selectedAppData: [],
      selectedUserData: [],
      searchUser: '',  // 下发用户筛选
      // 下发用户表格
      columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
              title: "姓名",
              key: "name"
          },
          {
              title: "用户名",
              key: "userName"
          },
          {
              title: "手机号",
              key: "phone"
          },
      ],
      userData: [
          {
              name: "小雪",
              userName: '开元',
              phone: '18888888888'
          }
      ]
    }
  },

// methods------------------------------------------------------------------------------------
  methods:{
    queryRights(value){
        let isExist=false;
        let buttonpermsStr=localStorage.getItem("buttenpremissions");
        console.log('buttonpermsStr',buttonpermsStr)
        if(buttonpermsStr==undefined || buttonpermsStr==null){
        return false;
        }
        let buttonperms=JSON.parse(buttonpermsStr);
        for(let i=0;i<buttonperms.length;i++){
        if(buttonperms[i].perms.indexOf(value)>-1){
            isExist=true;
            break;
        }
        }
        return isExist;
    },
     // 查询表格
     queryTable(){

     },

     // 判断是否选中应用
     isSelected(){
        if(this.selectedAppData.length==0){
            this.$Message.warning('请至少选择一项应用！');
            // 解决多次连续点击问题
            breakTips()
            return false
        }else{
            return true
        }
     },

     // 确定启用
     confirmUse(){
          this.axios.get('/index',{
              params:{
                  name:"zs",
                  age:'20'
              }
          })
          .then(res=>{

          })
     },

     // 确定禁用
     confirmForbidden(){
        alert(1)
     },

     // 确定黑名单
     confirmBlack(){
        alert(1)
     },

     // 确定白名单
     confirmWhite(){
        alert(1)
     },

     // 确定下发
     confirmDispatch(){
        if(this.selectedUserData.length==0){
            this.$Message.warning('请至少选择一位用户！');
            return
        }

        this.dispatchModal = false
     },

     // 选中应用改变
     selectAppChange(selection){
         this.selectedAppData = selection
         console.log(this.selectedAppData)
     },

     // 选中用户改变
     selectUserChange(selection){
         this.selectedUserData = selection
         console.log(this.selectedUserData)
     },

  }

}
</script>

<style lang='scss' scoped  type="text/css">
    #appManage {
        // padding:0 0 50px 0;
       
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
