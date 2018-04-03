<template>
  <div id="roleManage">
    <!-- 查询条件 -->
    <div class="query_wrap clearfix">
      <Input v-model="query" size="large" placeholder="请输入频道名称" style="width:200px;float:left;"></Input>
      <Button type="success" size="large" style="float:left;margin-left:20px;">查询</Button>
      <Button type="primary" size="large" style="float:left;margin-left:10px;">添加</Button>
      <Button type="info" size="large" style="float:left;margin-left:10px;">发送消息</Button>
    </div>
    <!-- 表格 -->
    <div class="table_wrap">
      <Table border :columns="columns" :data="tableData"></Table>
      <Page :total="2" size="small" show-total></Page>
    </div>

     <!-- 编辑模态框 -->
    <Modal v-model="editModal" title="频道信息修改" :mask-closable='false' class="nofoot" >
        <div class="editForm">
          <Form :model="editForm" :label-width="80">
            <FormItem label="频道名称">
                <Input v-model="editForm.name" placeholder="频道名称"></Input>
            </FormItem>
            <FormItem label="频道类型">
                <Select v-model="editForm.select" style="width:90%">
                    <Option value="1">语音对讲</Option>
                    <Option value="2">位置对讲</Option>
                    <Option value="3">视频对讲</Option>
                    <Option value="4">视频会议</Option>
                    <Option value="5">视频监控</Option>
                </Select>
            </FormItem>
            <FormItem label="进入控制">
                <Select v-model="editForm.select" style="width:90%">
                    <Option value="1">成员进入</Option>
                    <Option value="2">密码进入</Option>
                    <Option value="3">禁止进入</Option>
                    <Option value="4">房主准入</Option>
                    <Option value="5">禁止游客</Option>
                    <Option value="6">系统禁用</Option>
                </Select>
            </FormItem>
            <FormItem label="对讲">
                <Select v-model="editForm.select" style="width:90%">
                    <Option value="1">自由对讲</Option>
                    <Option value="2">排队对讲，不可抢夺</Option>
                    <Option value="3">优先级对讲，高级可抢夺</Option>
                    <Option value="4">优先级对讲，同级可抢夺</Option>
                </Select>
            </FormItem>
            <FormItem label="频道容量">
                <Input v-model="editForm.name" placeholder="频道容量"></Input>
            </FormItem>
            <FormItem label="频道限制">
                <RadioGroup v-model="channelLimit">
                    <Radio label="永久频道"></Radio>
                    <Radio label="临时频道"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="登录限制">
                <RadioGroup v-model="loginLimit">
                    <Radio label="自动登录"></Radio>
                    <Radio label="手动登录"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="离线消息">
                <RadioGroup v-model="message">
                    <Radio label="支持"></Radio>
                    <Radio label="不支持"></Radio>
                </RadioGroup>
            </FormItem>
             <FormItem>
                <Button type="success" size='large'>立即提交</Button>
                <Button style="margin-left: 8px" size='large'>取消</Button>
            </FormItem> 
          </Form>
        </div>
    </Modal>

    <!-- 删除模态框 -->
    <Modal v-model="delModal" title='频道删除' :mask-closable='false'>
      <p style="font-size:16px">确定删除该频道？</p>
    </Modal>

    <!-- 成员管理模态框 -->
    <Modal v-model="disModal" title='成员管理' :mask-closable='false' class='nofoot'>
      <Form :model="disForm">
        <FormItem>
            <Button type="success" size='large'>立即提交</Button>
            <Button style="margin-left: 8px" size='large'>取消</Button>
        </FormItem> 
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      query:'',
      columns:[
        {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
        },
        {
            title: '频道名称',
            key: 'name',
            width: 150,
            fixed: 'left'
        },
        {
            title: '频道类型',
            key: 'address',
            width: 150,
        },
        {
            title: '进入频道',
            key: 'address',
            width: 150,
        },
        {
            title: '对讲控制',
            key: 'address',
            width: 150,
        },
        {
            title: '频道容量（人）',
            key: 'address',
            width: 100,
        },
        {
            title: '频道限制',
            key: 'address',
            width: 150,
        },
        {
            title: '登录限制',
            key: 'address',
            width: 150,
        },
        {
            title: '离线消息',
            key: 'address',
            width: 150,
        },
        {
            title: '室主',
            key: 'address',
            width: 150,
        },
        {
            title: '组织',
            key: 'address',
            width: 150,
        },
        {
            title: '创建时间',
            key: 'address',
            width: 200,
        },
        {
            title: '修改时间',
            key: 'address',
            width: 200,
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 280,
            fixed: 'right',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.edit(params.index)
                            }
                        }
                    }, 2>1?'编辑':'删除'),
                    h('a', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        attrs: {
                            target: '_blank',
                            href: '#/index/channelManage/item'
                        },
                    }, '成员管理'),
                    h('a', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        attrs: {
                            target: '_blank',
                            href: '#/index/channelManage/item'
                        },
                    }, '视频窗口'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.del(params.index)
                            }
                        }
                    }, '删除'),
                ]);
            }
        }
      ],
      tableData: [
        {
            name: '管理员',
            address: '1'
        },
        {
            name: '管理员',
            address: '2'
        },
        {
            name: '管理员1',
            address: '2'
        },
        {
            name: '管理员',
            address: '2'
        },
        {
            name: '管理员1',
            address: '1'
        },
        {
            name: '管理员1',
            address: '2'
        },
      ],
      editModal: false,
      editForm: {
        name: '',
        address: ''
      },
      delModal: false,
      disModal: false,
      disForm: {},
      channelLimit: '',
      loginLimit: '',
      message: ''
    }
  },
  created(){
    document.title = '系统配置-角色管理'      
  },
  mounted(){
    // 合并单元格
    this.mergeCells()
  },
  methods: {
    // 点击编辑
    edit() {
      this.editModal = true;
    },
    // 点击删除
    del() {
      this.delModal = true;
    },
    // 点击分配菜单
    distribute() {
      this.disModal = true;
    },
    // 合并单元格
    mergeCells() {
        var mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
        var columsName = ['name'];//需要合并的列名称
        var columsIndex = [0];//需要合并的列索引值
        var data = this.tableData
        var trArr = $(".ivu-table-tbody").find("tr");//所有行
        for (var k = 0; k < columsName.length; k++)//这里循环所有要合并的列
        {
            for (var i = 1; i < this.tableData.length; i++) { //这里循环表格当前的数据
                var tdCurArr = trArr.eq(i).find("td").eq(columsIndex[k]);//获取当前行的当前列
                var tdPreArr = trArr.eq(i - 1).find("td").eq(columsIndex[k]);//获取上一行的当前列

                if (data[i][columsName[k]] == data[i - 1][columsName[k]]) { //后一行的值与前一行的值做比较，相同就需要合并
                    mark += 1;
                    if (mark > 2) {
                        tdPreArr = trArr.eq(i - mark + 1).find("td").eq(columsIndex[k]);
                    }
                    tdPreArr.each(function () {//上一行增加rowspan属性
                        $(this).attr("rowspan", mark);
                        $(this).css("vertical-align", "middle");
                    });
                    tdCurArr.each(function () {//当前行隐藏
                        $(this).css("display", "none");
                    });
                } else {
                    mark = 1; //一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
                }
            }
        }
    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
  #roleManage {
      border: 1px solid #ccc;
      height:100%;
      
    .query_wrap {
        padding: 15px;
        background:#eee;
      }
    .table_wrap {
        padding: 15px;
      }
    
  }
</style>

