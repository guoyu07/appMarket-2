<template>
  <div id="dispatchRight">
    <h1><span>当前位置 > </span><a href="#/index/rightsManage">权限管理</a><span> > </span><span class="title_active">分配权限</span></h1>
    <div class="bottom_wrap clearfix">
        <div class="btn_wrap">
            <Button type="primary" style="margin-right:15px">全选</Button>
            <Button type="primary" style="margin-right:15px">全部折叠</Button>
        </div>
        <div class="tree_wrap">
            <Tree :data="rightsData" show-checkbox multiple></Tree>
            <div class="treeM"></div>
        </div>
        <div class="tree_wrap">
            <Tree :data="rightsData" show-checkbox multiple></Tree>
            <div class="treeM"></div>
        </div>
        <div class="tree_wrap">
            <Tree :data="rightsData" show-checkbox multiple></Tree>
            <div class="treeM"></div>
        </div>
        <div class="tree_wrap">
            <Tree :data="rightsData" show-checkbox multiple></Tree>
            <div class="treeM"></div>
        </div>
        <div class="tree_wrap">
            <Tree :data="rightsData" show-checkbox multiple></Tree>
            <div class="treeM"></div>
        </div>
      
      
    </div>
  </div>
</template>

<script>
export default {
  created(){
    document.title="权限管理-分配权限";
  },
  data(){
    return {
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

}
</script>

<style lang="scss" scoped type="text/css">
    #dispatchRight{
        .bottom_wrap{
            .btn_wrap{
                margin-bottom:20px;
            }
            .tree_wrap{
                width:20%;
                float:left;
                position:relative;
                // text-align:center
                .treeM{
                    width: 90%;
                    height: 35px;
                    background: rgba(0,0,0,.1);
                    position: absolute;
                    top: 0;
                    left: 13px;
                }
            }
        }
    }
</style>


