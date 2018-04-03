<template>
  <div id="homepage">
    <Row>
      <Col span="16">
        <div class="left-content">
          <!-- 监内人员分布 -->
          <div class="distribution">
            <h2>监内人员分布</h2>
            <div class="lists">
              <Row>
                <Col span="6">
                  <div class="item">
                    <span class="big-icon">
                      <Icon type="ribbon-b" size="80" color="#12539c"></Icon>
                    </span>
                    <div class="num">
                      <p>51</p>
                      <p class="tip">监内民警</p>
                    </div> 
                  </div>
                </Col>
                <Col span="6">
                  <div class="item">
                    <span class="big-icon">
                      <Icon type="person-stalker" size="80" color="#83313c"></Icon>
                    </span>
                    <div class="num">
                      <p>51</p>
                      <p class="tip">监内职工</p>
                    </div>
                  </div>
                </Col>
                <Col span="6">
                  <div class="item">
                    <span class="big-icon">
                      <Icon type="android-car" size="80" color="#0c5751"></Icon>
                    </span>
                    <div class="num">
                      <p>51</p>
                      <p class="tip">监内车辆</p>
                    </div>
                    
                  </div>
                </Col>
                <Col span="6">
                  <div class="item">
                    <span class="big-icon">
                      <Icon type="android-person-add" size="80" color="#b9803e"></Icon>
                    </span>
                    <div class="num">
                      <p>51</p>
                      <p class="tip">外来访客</p>
                    </div>
                  </div>
                </Col>
              </Row> 
            </div>
          </div>

          <!-- 监内人员图表 -->
          <div class="charts">
            <h2>监内人员图表</h2>
            <div style="height:200px">

            </div>
          </div>

           <!-- 监内点名巡更 -->
          <div class="charts">
            <h2>监内点名巡更</h2>
            <div style="height:200px">

            </div>
          </div>
          
        </div>
      </Col>
      <Col span="8">
        <div class="right-content">
          <h2>用户列表</h2>
          <div class="query_wrap">
            <Input v-model="query" size="large" placeholder="请输入编号或姓名" style="width:200px"></Input>
            <Button type="success" size="large" style="float:right">查询</Button>
          </div>
          <div class="checkbox_wrap">
            <p>当前选中：<span>监内民警</span></p>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    size='large'
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                    
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="技术部" size='large'></Checkbox>
                <Checkbox label="维修部" size='large'></Checkbox>
                <Checkbox label="一监区" size='large'></Checkbox>
                <Checkbox label="二监区" size='large'></Checkbox>
                <Checkbox label="三监区" size='large'></Checkbox>
                <Checkbox label="四监区" size='large'></Checkbox>
            </CheckboxGroup>
          </div>
            
          
        </div>
      </Col>
    </Row>
    
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      query:'',
      indeterminate: false,
      checkAll: false,
      checkAllGroup: []
    }
  },
  created(){
    document.title = '首页-监狱管理平台'
  },
  computed: {
    token(){
      return this.$store.state.token
    }
  },
  methods: {
    handleCheckAll () {
        if (this.indeterminate) {
            this.checkAll = false;
        } else {
            this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
            this.checkAllGroup = ['技术部', '维修部', '一监区', '二监区', '三监区', '四监区'];
        } else {
            this.checkAllGroup = [];
        }
    },
    checkAllGroupChange (data) {
        if (data.length === 6) {
            this.indeterminate = false;
            this.checkAll = true;
        } else if (data.length > 0) {
            this.indeterminate = true;
            this.checkAll = false;
        } else {
            this.indeterminate = false;
            this.checkAll = false;
        }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#homepage {
  h2 {
    font-size: 18px;
    font-weight: 700;
    padding:10px;
    background:#eee;
  }
  .left-content {
    border: 1px solid #ccc;

    .distribution {
      .lists {
        padding: 10px;
        .item {
          cursor: pointer;
        }
        .big-icon {
          width: 100px;
          height: 100px;
          float: left;
          text-align: center;
          padding-top: 10px;
        }
        .num {
          float: left;
          text-align: center;
          font-size: 20px;
          margin-top: 20px;
          .tip {
            font-size:16px;
          }
        }
      }
    }

    .charts {
      margin-top: 20px;
    }
  }

  .right-content {
    border: 1px solid #ccc;
    margin-left: 20px;

    .query_wrap {
      margin-top: 10px;
      padding: 10px;
      background: #eee;
    }
    .checkbox_wrap{
      padding: 10px;
      p {
        font-size: 14px;
        font-weight: 700;
        padding:5px 0;
      }
    }
  }
}

</style>


