<template>
  <div id="tree">
    <!-- 一级菜单 -->
    <ul v-for='(item,index) in data' :key="index" style='padding:10px'>
      <ul>
        <span v-if='item.children&&item.children.length!=0'>
           <span v-if='!item.expand' class='icon_cls' @click='item.expand=!item.expand' ><Icon type="arrow-right-b"></Icon></span> 
           <span v-else class='icon_cls' @click='item.expand=!item.expand' ><Icon type="arrow-down-b"></Icon></span> 
        </span>
        <Checkbox v-model='item.checked' @on-change='handleCheck(item.checked,item.children)'></Checkbox>{{item.title}}</ul>
        <!-- 二级菜单 -->
      <ul  class='ml-20' v-show='item.expand'>
          <li  v-for='(item1,index) in data[0].children' :key="index">
            <span v-if='item1.children&&item1.children.length!=0'>
              <span v-if='!item1.expand' class='icon_cls' @click='item1.expand=!item1.expand' ><Icon type="arrow-right-b"></Icon></span> 
              <span v-else class='icon_cls' @click='item1.expand=!item1.expand' ><Icon type="arrow-down-b"></Icon></span> 
            </span>
            <Checkbox v-model='item1.checked' @on-change='handleCheck1(item1.checked,item1.id,item,item1.children)'></Checkbox>
            {{item1.title}}
            <!-- 三级菜单 -->
            <ul class='ml-20' v-show='item1.expand'>
              <li v-for='(item2,index) in item1.children' :key='index'>
                <span v-if='item2.children&&item2.children.length!=0'>
                  <span v-if='!item2.expand' class='icon_cls' @click='item2.expand=!item2.expand' ><Icon type="arrow-right-b"></Icon></span> 
                  <span v-else class='icon_cls' @click='item2.expand=!item2.expand' ><Icon type="arrow-down-b"></Icon></span> 
                </span>
                <Checkbox v-model='item2.checked'  @on-change='handleCheck1(item2.checked,item2.id,item,item2.children)'></Checkbox>
                {{item2.title}}
                <!-- 四级菜单 -->
                <ul v-show='item2.expand'>
                  <li class='ml-20' v-for='(item3,index) in item2.children' :key='index'>
                    <Checkbox v-model='item3.checked'  @on-change='handleCheck1(item3.checked,item3.id,item)'></Checkbox>
                    {{item3.title}}
                  </li>  
                </ul>
              </li>
            </ul>
          </li>
      </ul>
      
    </ul>
  </div>
</template>

<script>
import {setValue} from '../util/util.js'
export default {
  props:['data'],
  data(){
    return {

     
    }
  },
  methods:{
    
    handleCheck(checked,children){
      console.log(111)
      setValue(children,'checked',checked)
    },
    handleCheck1(checked,id,item,children){
      console.log(checked)
      console.log(children)
      if(children){
        setValue(children,'checked',checked)
      }
      
      if(checked==true){
        if(item.id!=id){
          item.checked = true
          for(var i=0;i<item.children.length;i++){
            if(item.children[i].id!=id){
              for(var j=0;j<item.children[i].children.length;j++){
                if(item.children[i].children[j].id!=id){
                  for(var k=0;k<item.children[i].children[j].children.length;k++){
                    if(item.children[i].children[j].children[k].id==id){
                      console.log(item.children[i].children[j])
                      item.children[i].children[j].checked=true
                      item.children[i].checked=true
                    }
                  }
                }else{
                  item.children[i].checked=true
                }
              }
            }
          }
          
        }
      }else{
        if(children){
          children.forEach(item => {
            item.checked = false
            if(item.children&&item.children.length!=0){
              item.children.forEach(ele=> {
                ele.checked=false
                if(ele.children&&ele.children.length!=0){
                  ele.children.forEach(element=>{
                    element.checked=false
                  })
                }
              })
            }
          });
        }
        
      }
      
    }
  }
}
</script>

<style  lang="scss" scoped type="text/css">
  .ml-10{
    margin-left:10px
  }
  .ml-20{
    margin-left:20px
  }
  .ml-30{
    margin-left:30px
  }
  .icon_cls{
    display:inline-block;
    width:10px;
    height:10px;
    cursor:pointer;
    
  }
</style>


