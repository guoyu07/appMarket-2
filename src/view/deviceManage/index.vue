<template>
  <div id="deviceManage">
    <h1><span>当前位置 > </span>设备管理</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData">
          <FormItem label="">
            <Input v-model="searchData.search"  placeholder="用户名/IME"></Input>
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
                    <Icon type="navicon-round"></Icon> 设备列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary"  @click="addModal=true"><Icon type="plus"></Icon> 添加设备</Button>
                </div>
           </div>
           <Table border :columns="columns" :data="deviceData" no-data-text="暂无数据"></Table>            
           <Page :total="2" show-total class="page_wrap"></Page>
      </div>
    </div>


    <!-- 添加设备模态框 -->
    <Modal
        title="添加设备"
        v-model="addModal"
        @on-ok="confirmAdd"
        class-name="vertical-center-modal">
       <Form :model="addDeviceData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="用户名">
            <Select v-model="addDeviceData.userName"  style="width:100px">
                <Option value="0">小雪</Option>
                <Option value="1">张三</Option>
                <Option value="2">小明</Option>
            </Select>
          </FormItem>
          <FormItem label="设备平台">
            <Select v-model="addDeviceData.plat"  style="width:100px">
                <Option value="0">Andriod</Option>
            </Select>
          </FormItem>
          <FormItem label="设备类型">
            <Select v-model="addDeviceData.deviceType"  style="width:100px">
                <Option value="0">手机</Option>
            </Select>
          </FormItem>
          <FormItem label="设备归属">
            <Select v-model="addDeviceData.belong"  style="width:100px">
                <Option value="0">企业</Option>
                <Option value="1">个人</Option>
            </Select>
          </FormItem>
          <FormItem label="资产编号">
            <Input v-model="addDeviceData.number"  placeholder="请输入资产编号"></Input>
          </FormItem>
          <FormItem label="设备名称">
            <Input v-model="addDeviceData.deviceName"  placeholder="请输入设备名称"></Input>
          </FormItem>
          <FormItem label="IMEI">
            <Input v-model="addDeviceData.imei"  placeholder="请输入IMEI"></Input>
          </FormItem>
          <FormItem label="设备型号">
            <Input v-model="addDeviceData.model"  placeholder="请输入设备型号"></Input>
          </FormItem>
        </Form>
    </Modal>

  </div>
</template>

<script>
export default {
  created(){
    document.title = "设备管理"
  },
  data(){
    return {
      searchData:{
        search:''
      },
      columns: [
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: '设备名称',
            key: 'deviceName'
        },
        {
            title: '设备型号',
            key: 'deviceType'
        },
        {
            title: 'IMEI',
            key: 'imei'
        },
        {
            title: '归属',
            key: 'belong'
        },
        {
            title: '系统版本',
            key: 'system'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.$router.push({path:'/index/deviceDetail'})
                                
                            }
                        }
                    }, '详情')
                  ]);
            }
        }
      ],
      deviceData: [
        {
            deviceName: 'Q787',
            deviceType: "ZXH-Q787",
            imei:'1234455',
            belong:'企业',
            system: '7.0',
        }
        
      ],
      addModal: false,
      addDeviceData: {
          userName:'',
          plat:'0',
          deviceType: '0',
          belong:'0',
          number: '',
          deviceName:'',
          imei:"",
          model:''
      }

    }
  },

  methods: {
      // 确认添加
      confirmAdd(){

      },

  }
}
</script>

<style lang="scss" scoped type="text/css">
  #deviceManage {
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