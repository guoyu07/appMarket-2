<template>
  <div id="dispatchRight">
    <h1><span>当前位置 > </span><a href="#/index/rightsManage">权限管理</a><span> > </span><span class="title_active">分配权限</span></h1>
    <div class="bottom_wrap clearfix">
        <div class="btn_wrap">
            <Button type="primary" style="margin-right:15px" @click="selectAll(true)">全选</Button>
            <Button type="primary" style="margin-right:15px" @click="selectAll(false)">取消全选</Button>
            <Button type="primary" style="margin-right:15px" @click="openAll(true)">全部展开</Button>
            <Button type="primary" style="margin-right:15px" @click="openAll(false)">全部折叠</Button>
        </div>
        <div class="tree_wrap" >
            <div class="title">应用管理</div>
            <div class="inner">
                <Tree :data="appData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">用户管理</div>
            <div class="inner">
                <Tree :data="userData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">权限管理</div>
            <div class="inner">
                <Tree :data="rightsData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">设备管理</div>
            <div class="inner">
                <Tree :data="deviceData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">日志报表</div>
            <div class="inner">
                <Tree :data="logData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
      
      
    </div>
    <!-- 底部按钮 -->
    <div class="wrap btn_wrap_b">
        <Button size="large" style="margin-right:20px" @click="$router.push({path:'/index/rightsManage'})">取消</Button>
        <Button type="primary" size="large" @click='submit'>提交</Button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import vue from 'vue'
export default {
// created----------------------------------------------------------------------------------------------
  created(){
    document.title="权限管理-分配权限";
    // 获取用户id
    this.roleId = this.$route.query.roleId
    this.queryTree()
  },

// data-------------------------------------------------------------------------------------------------
  data(){
    return {
      roleId:"",
      data:[],
      appData:[],
      userData:[],
      rightsData:[],
      deviceData:[],
      logData:[],
    }
  },

// methods----------------------------------------------------------------------------------------------
   methods:{
       // 权限树查询
       queryTree(){
           this.axios.get('userPerm/getPermissionTree',{params:{
               roleId:this.roleId
                } 
           })
           .then(res=>{
               if(res&&res.success=='1'){
                   const data = res.data
                   this.data = data
                   this.appData = [data[0]]
                   this.userData = [data[1]]
                   this.rightsData = [data[2]]
                   this.deviceData = [data[3]]
                   this.logData = [data[4]]
               }
           })
       },

       // 全选
       selectAll(flag){
              this.appData[0].checked = flag
            //   this.userData[0].checked = flag
            //   this.rightsData[0].checked = flag
            //   this.deviceData[0].checked = flag
            //   this.logData[0].checked = flag
       },

       // 全部展开
       openAll(flag){
           this.appData[0].expand = flag
           this.userData[0].expand = flag
           this.userData[0].children[0].expand = flag
           this.userData[0].children[1].expand = flag
           this.rightsData[0].expand = flag
           this.deviceData[0].expand = flag
           this.logData[0].expand = flag
           this.logData[0].children[0].expand = flag
           this.logData[0].children[1].expand = flag
           this.logData[0].children[1].children[0].expand = flag
           this.logData[0].children[1].children[1].expand = flag
           this.logData[0].children[1].children[2].expand = flag
       },

       //确定提交权限
       submit(){

       }
   }

}
</script>

<style lang="scss" scoped type="text/css">
    #dispatchRight{
        .bottom_wrap{
            background:#fff;
            margin:20px;
            min-height:475px;
            .btn_wrap{
                margin-bottom:20px;
            }
            .tree_wrap{
                width:20%;
                float:left;
                position:relative;
                padding:0 10px 0 0;
                .inner{
                    border:1px solid #ccc;
                }
                .title{
                    text-align:center;
                    height:40px;
                    line-height:40px;
                    background:#63c185;
                }
            }
        }
        .btn_wrap_b {
            padding:20px;
            margin:0 20px;
            text-align:center;
            background:#fff;
        } 
    }
</style>


