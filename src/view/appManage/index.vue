<template>
  <div id="appManage">
    <h1><span>当前位置 > </span>应用管理</h1>
    
    <div class="bottom_wrap">

      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="55">
          <FormItem label="应用名">
            <Input v-model="searchData.content"  placeholder="请输入应用名"></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="searchData.state"  style="width:100px">
                <Option value="-1">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click='queryAppTable'>筛选</Button>
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
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected('1')?handleClick('1'):''">启用</Button>
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected('2')?handleClick('2'):''">禁用</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected('3')?handleClick('3'):''">黑名单</Button>
                    <Button type="primary" class='isDisabled'  @click="isSelected('4')?handleClick('4'):''" >白名单</Button>
                </div>
           </div>

           <div style="position:relative">
                <Table border :columns="columns" :loading="loading" :data="appData" @on-selection-change="selectAppChange" no-data-text="暂无数据"></Table>            
                <Page :total="totalPage" :current='searchData.pageNo'  @on-change='changePage' show-total class="appPage page_wrap"></Page>
           </div>
           
      </div>
      
    </div>
    
    <!-- 启用、禁用、黑白名单 模态框 -->
    <Modal
        :title="title"
        v-model="actionModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">{{content}}</p>
        <div slot="footer">
            <Button  size="large" @click="actionModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAction(flag)">确定</Button>
        </div>
    </Modal>
  
    <!-- 下发模态框 -->
    <Modal
        title="用户"
        v-model="dispatchModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <div style="margin-bottom:20px">
            <Input type="text" placeholder="用户名/手机号" v-model="searchUserData.content" style="width:250px;margin-right:20px"></Input>
            <Button type="primary" @click="queryUserTable">筛选</Button>
        </div>
        <Table border ref="selection"  :loading='loading2' :columns="columns2" :data="userData" @on-selection-change="selectUserChange" no-data-text="暂无数据"></Table>
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
import {mapGetters} from 'vuex'

export default {
// components---------------------------------------------------------------------------------
  components:{
    Action
  },
// computed-----------------------------------------------------------------------------------
  computed:{
    ...mapGetters(['appPage'])
  },
// created------------------------------------------------------------------------------------
  created(){
    document.title = "应用管理";

    // 使用vuex解决版本升级、详情、编辑后返回页码的问题
    this.searchData.pageNo = this.appPage
    this.queryTable()
  },

// data---------------------------------------------------------------------------------------
  data(){
    return{
      perms:null,
      loading:false,
      totalPage:1,
      searchData: {
        content: "",
        state: "-1",
        pageNo:1,
        pageSize:10,
        orderStr:'0'
      },
      flag:'1',
      title:"",
      content:"",
      // 应用表格
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            // type: 'index',
            width: 70,
            align: 'center',
            title: "序号",
            render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
        },
        {
            title: "类型",
            key: 'isBlacklist',
            render:(h,params)=>{
              return h('div',params.row.isBlacklist=='0'?'黑名单':'白名单')
            }
        },
        {
            title: '应用名',
            key: 'name'
        },
        {
            title: '版本号',
            key: 'versionNumber'
        },
        {
            title: '应用标签',
            key: 'tag',
            render:(h,params)=>{
                return h('div',params.row.tag=='1'?'工作':'生活')
            }
        },
        {
            key: 'downCnt',
            renderHeader:(h,params)=>{
                return h('div',[
                    h('strong','下载次数'),
                    h('div',{
                        style:{
                            position:"relative",
                            display:'inline-block'
                        },
                        on:{
                            click: (event) => {
                         
                                $(window.event.target).css("color",'#63c185')
                                $(window.event.target).siblings().css("color",'#555')
                                if(window.event.target.className.indexOf('ivu-icon-arrow-up-b')!=-1){
                                    this.searchData.orderStr = '1'
                                    this.searchData.pageNo = 1
                                    this.queryTable()
                                }else if(window.event.target.className.indexOf('ivu-icon-arrow-down-b')!=-1){
                                    this.searchData.orderStr = '2'
                                    this.searchData.pageNo = 1
                                    this.queryTable()
                                }
                                
                            }
                        }
                    },[
                        h('Icon',{
                            props:{
                                type:"arrow-up-b",
                            },
                            style:{
                                position:'absolute',
                                left:'5px',
                                top:'-15px',
                                cursor:'pointer'
                            },
                            
                        }),
                        h('Icon',{
                            props:{
                                type:"arrow-down-b"
                            },
                            style:{
                                position:'absolute',
                                left:'5px',
                                bottom:'-5px',
                                cursor:'pointer'
                            }
                        }),
                    ])
                ])
            }
        },
        {
            key: 'updateDate',
            renderHeader:(h,params)=>{
                return h('div',[
                    h('strong','更新时间'),
                    h('div',{
                        style:{
                            position:"relative",
                            display:'inline-block',
                        },
                        on:{
                            click: (event) => {
                            
                                $(window.event.target).css("color",'#63c185')
                                $(window.event.target).siblings().css("color",'#555')
                                if(window.event.target.className.indexOf('ivu-icon-arrow-up-b')!=-1){
                                    this.searchData.orderStr = '3'
                                    this.searchData.pageNo = 1
                                    this.queryTable()
                                }else if(window.event.target.className.indexOf('ivu-icon-arrow-down-b')!=-1){
                                    this.searchData.orderStr = '4'
                                    this.searchData.pageNo = 1
                                    this.queryTable()
                                }
                                
                            }
                        }
                    },[
                        h('Icon',{
                            props:{
                                type:"arrow-up-b",
                            },
                            style:{
                                position:'absolute',
                                left:'5px',
                                top:'-15px',
                                cursor:'pointer'
                            },
                            
                        }),
                        h('Icon',{
                            props:{
                                type:"arrow-down-b"
                            },
                            style:{
                                position:'absolute',
                                left:'5px',
                                bottom:'-5px',
                                cursor:'pointer'
                            }
                        }),
                    ])
                ])
            }
        },
        {
            title: '状态',
            key: 'state',
            width:70,
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
                            id:params.row.id,
                            pageNo:this.searchData.pageNo
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
                            id:params.row.id,
                            pageNo:this.searchData.pageNo
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
                            id:params.row.id,
                            pageNo:this.searchData.pageNo
                        }
                    }),
                    h('a', {
                        style: {
                            // marginRight: '10px',
                            color:params.row.isBlacklist=="1"?'#ccc':'#63c185',
                            cursor:params.row.isBlacklist=="1"?'not-allowed':'pointer'
                        },
                        on: {
                            click: () => {
                                if(params.row.isBlacklist=='1'){
                                    return
                                }
                                this.$refs.selection.selectAll(false);
                                this.searchUserData.content = ''
                                this.searchUserData.appId = params.row.id
                                this.queryUserTable()
                                this.dispatchModal = true
                            }
                        }
                    }, '下发')
                ]);
            }
        }
      ],
      appData: [],
      // 模态框
      actionModal:false,
      dispatchModal: false,
      // 复选框选中数据
      selectedAppData: [],
      selectedState:null,
      selectedIsBlacklist:null,
      startRow:1,
      selectedUserData: [],
      loading2:false,
      searchUserData:{
        content: '',
        state: '1',
        appId:"" 
      },
      // 下发用户表格
      columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
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
      userData: [],
      userIds:"",
      
    }
  },

// methods------------------------------------------------------------------------------------
  methods:{

     // 查询表格
     queryTable(){
         this.loading = true
         this.axios.get('/app/listApps',{params:this.searchData})
         .then(res=>{
             if(res && res.success=='1' && res.data){
                 this.loading = false
                 const data = res.data
                 this.totalPage = data.total
                 this.appData = data.list
                 this.startRow = data.startRow
             }else{
                 this.loading = false                 
             }
         })
     },

     // 点击筛选
     queryAppTable(){
         this.searchData.pageNo = 1
         this.queryTable()
     },

     // 页码改变
     changePage(current){
         this.searchData.pageNo = current
         this.queryTable()
     },

     // 查询用户表格
     queryUserTable(){
         this.loading2 = true
         this.axios.get('/app/listUsers',{params:this.searchUserData})
         .then(res=>{
             if(res&&res.success=='1'){
                 this.loading2 = false 
                 const data = res.data
                 // 默认选中数据
                 data.forEach(item=>{
                     item.blackFlag=='1'?item._checked=true:item._checked=false
                     item.blackFlag=='1'?this.selectedUserData.push(item):''
                 })
                  this.userIds = this.selectedUserData.map(item=>{
                     return item.id
                  }).join(";")
                 this.userData = data
             }
         })
     },

    // 选中应用改变
     selectAppChange(selection){
        if(selection.length==0){
            this.selectedAppData = ''
        }else{
            this.selectedAppData = selection.map(item=>{
            return item.id
            }).join(";")
            this.selectedState = selection.map(item=>{
            return item.state
            })
            this.selectedIsBlacklist = selection.map(item=>{
            return item.isBlacklist
            })
        }
     },

     // 判断是否选中应用
     isSelected(flag){
      if(this.selectedAppData.length==0){
          this.$Message.warning('请至少选择一项应用！');
          breakTips()
          return false
      }else if(flag=='1'){
        if(this.selectedState.indexOf("1")!=-1){
          this.$Message.warning('含有已是启用状态的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='2'){
        if(this.selectedState.indexOf("2")!=-1){
          this.$Message.warning('含有已是禁用状态的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='3'){
        if(this.selectedIsBlacklist.indexOf("0")!=-1){
          this.$Message.warning('含有已是黑名单的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='4'){
        if(this.selectedIsBlacklist.indexOf("1")!=-1){
          this.$Message.warning('含有已是白名单的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }
     },

     // 按钮点击判断
     handleClick(type){
        this.actionModal = true
        switch (type){
            case '1':
                this.title = '启用';
                this.content = '确定启用该应用吗？';
                this.flag = "1";
                break;
            case '2':
                this.title = '禁用';
                this.content = '确定禁用该应用吗？';
                this.flag = "2";
                break;
            case '3':
                this.title = '黑名单';
                this.content = '确定将该应用的类型修改为黑名单吗？';
                this.flag = "4";
                break;
            case '4':
                this.title = '白名单';
                this.content = '确定将该应用的类型修改为白名单吗？';
                this.flag = "3";
                break;
        }

        
     },

     // 确定启用/禁用/黑名单/白名单
     confirmAction(flag){
          this.axios.get('/app/changeState',{
              params:{
                  appIds:this.selectedAppData,
                  flag:flag
              }
          })
          .then(res=>{
              if(res && res.success=='1'){
                  this.$Message.success("操作成功！")
                  this.actionModal = false
                  this.queryTable()
              }
          })
     },

     // 确定下发
     confirmDispatch(){
        if(this.selectedUserData.length==0){
            this.$Message.warning('请至少选择一位用户！');
            return
        }
        this.axios.get('/app/assignApp',{params:{
            appId:this.searchUserData.appId,
            userIds:this.userIds
        }}).then(res=>{
            if(res && res.success=='1'){
                this.$Message.success("操作成功！")
                this.dispatchModal = false
                this.queryTable()
            }else{
                this.$Message.error("操作失败！")
            }
        })
     },

     // 选中用户改变
     selectUserChange(selection){
         this.selectedUserData = selection
         console.log(this.selectedUserData)
         this.userIds = this.selectedUserData.map(item=>{
             return item.id
         }).join(";")
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
