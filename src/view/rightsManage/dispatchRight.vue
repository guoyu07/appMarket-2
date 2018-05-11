<template>
  <div id="dispatchRight">
    <h1><span>当前位置 > </span><a href="#/index/rightsManage">权限管理</a><span> > </span><span class="title_active">分配权限</span></h1>
    <div class="bottom_wrap clearfix">
        <div class="btn_wrap">
            <Button type="primary" style="margin-right:15px" @click="selectAll">全选</Button>
            <Button type="primary" style="margin-right:15px" @click="closeAll">全部折叠</Button>
        </div>
        <div class="tree_wrap">
            <div class="title">应用管理</div>
            <div class="inner">
                <Tree :data="rightsData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">用户管理</div>
            <div class="inner">
                <Tree :data="rightsData" show-checkbox multiple></Tree>
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
                <Tree :data="rightsData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
        <div class="tree_wrap">
            <div class="title">日志报表</div>
            <div class="inner">
                <Tree :data="rightsData" show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
        </div>
      
      
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
// created----------------------------------------------------------------------------------------------
  created(){
    document.title="权限管理-分配权限";
    // 获取用户id
    this.roleId = this.$route.query.roleId
    console.log(this.roleId)
  },

// data-------------------------------------------------------------------------------------------------
  data(){
    return {
      roleId:"",
      rightsData:[
        {
            title: '一级菜单',
            selected: false, // 一级菜单是否选中
            children: [
                {
                    title: '儿子菜单一',
                    checked: true, // 子菜单是否选中
                    children: [
                        {
                            title: '孙子菜单一',
                            name:123    // 菜单唯一标识
                            // checked: true
                        },
                        {
                            title: '孙子菜单二',
                            // checked: false
                        }
                    ]
                },
                {
                    title: '儿子菜单二',
                    checked: false,
                    children: [
                        {
                            title: '孙子菜单一',
                            checked: true
                        },
                        {
                            title: '孙子菜单二'
                        }
                    ]
                }
            ]
        }
      ]
    }
  },

// methods----------------------------------------------------------------------------------------------
   methods:{
       // 权限树查询
       queryTree(){
           this.axios.post('/userPerm/listRoles/getPermissionTree',qs.stringify({
               id:this.roleId
           }))
           .then(res=>{
               if(res&&res.success=='1'){

               }
           })
       },

       // 全选
       selectAll(){

       },

       // 全部折叠
       closeAll(){

       },
   }

}
</script>

<style lang="scss" scoped type="text/css">
    #dispatchRight{
        .bottom_wrap{
            background:#fff;
            margin:20px;
            min-height:600px;
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
    }
</style>


