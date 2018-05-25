<template>
  <div id="homepage">

    <h1><span>当前位置 > </span >首页</h1>
    <div class="bottom_wrap">
      
        <!-- 统计数据部分 -->
        <div class="statistics">

            <!-- 应用 -->
            <div class="app_num">
              <div class="num">
                <p class="number">{{appCnt}}</p>
                <p>{{allSystemType[systemType]}}</p>
              </div>
              <div class="name">
                <p class="right_icon"><span class="mar-20 item">应用</span><Icon type="cube"></Icon></p>
              </div>
            </div>

              <!-- 用户 -->
            <div class="user_num">

              <div class="num" v-for='(item,index) in loginUserData' :key='index'>
                <p class="number">{{item.cnt}}</p>
                <p>{{allLoginState[item.loginState]}}</p>
              </div>
              <div class="name">
                <p class="right_icon right"><span class="mar-20 item">用户</span><Icon type="ios-people"></Icon></p>
              </div>
            </div>

        </div>

        <!-- 图表部分 -->
        <div class="charts_wrap">
            <div class="charts">
              <div class="left">
                <h2>设备报表</h2>
                <div id="chart1" class="chart_bg">
                  <div style="text-align:center;line-height:250px" v-if='isShow1'>暂无数据</div>
                  <div class="demo-spin-container">
                      <Spin fix v-if="loading1"></Spin>
                  </div>
                </div>
              </div>
              <div class="right">
                <h2>客户端统计</h2>
                <div id="chart2" class="chart_bg">
                  <div style="text-align:center;line-height:250px" v-if='isShow2'>暂无数据</div>
                  <div class="demo-spin-container">
                      <Spin fix v-if="loading2"></Spin>
                  </div>
                </div>
              </div>
            </div>

            <div class="charts">
              <div class="left">
                <h2>设备违规统计</h2>
                <div id="chart3" class="chart_bg">
                  <div style="text-align:center;line-height:250px" v-if='isShow3'>暂无数据</div>
                  <div class="demo-spin-container">
                      <Spin fix v-if="loading3"></Spin>
                  </div>
                </div>
              </div>
              <div class="right">
                <h2>应用安装情况</h2>
                <div id="chart4" class="chart_bg">
                  <div style="text-align:center;line-height:250px" v-if='isShow4'>暂无数据</div>
                  <div class="demo-spin-container">
                      <Spin fix v-if="loading4"></Spin>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
var Highcharts = require('highcharts')
// // 在 Highcharts 加载之后加载功能模块
// require('highcharts/modules/exporting')(Highcharts)
import {allSystemType} from '../../util/util.js'
import {mapActions,mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters(['isLoadRoutes','menuitems'])
  }, 
// data------------------------------------------------------------------------------------------ 
  data(){
    return {
      allSystemType:allSystemType,
      allLoginState:{
        '01':'在线用户',
        '02':'已激活用户',
        '03':'未激活用户',
      },
      appCnt:"",
      systemType:"",

      loginUserData:null,
      isShow1:false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
      
    }
  },

// created----------------------------------------------------------------------------------------
  created(){
    console.log(Highcharts)
    document.title = '首页-应用市场管理平台'
    this.queryAppNum()
    this.queryUserState()
  },
  mounted(){
    this.queryDeviceModel()
    this.queryAppVersion()
    this.queryState()
    this.queryInstall()
  },

// methods-----------------------------------------------------------------------------------------
  methods: {
    ...mapActions(['addMenu','loadRoutes',]),
     // 查询应用数量
     queryAppNum(){
       this.axios.get('/statistic/appDistribution').then(res=>{
         if(res && res.success=='1'){
           const data = res.data
           this.systemType = data[0].systemType
           this.appCnt = data[0].cnt
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 查询用户状态
     queryUserState(){
       this.axios.get('/statistic/userStateDistribution').then(res=>{
         if(res && res.success=='1'){
           const data = res.data
            this.loginUserData = data
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 设备型号分布图
     queryDeviceModel(){
       this.loading1 = true
       this.axios.get('/statistic/deviceModelDistribution').then(res=>{
         this.loading1 = false
         if(res && res.success=='1'&&res.data.length!=0){
           const data = res.data.map(item=>{
             const arr = []
             arr.push(item.model)
             arr.push(item.cnt)
             return arr
           })
           this.renderPie({
             ele:"chart1",
            title:"设备型号分布图",
            data:data,
           })
         }else{
           this.isShow1 = true
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 客户端统计图
     queryAppVersion(){
       this.loading2 = true
       this.axios.get('/statistic/appVersionDistribution').then(res=>{
         this.loading2 = false
         if(res && res.success=='1'&&res.data.length!=0){
           const data = res.data.map(item=>{
             const arr = []
             arr.push(item.appVersion||'3.0')
             arr.push(item.cnt)
             return arr
           })
           this.renderPie({
            ele:"chart2",
            title:"Andriod客户端版本分布图",
            data:data
          })
         }else{
           this.isShow2 = true
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 违规设备分布图
     queryState(){
       this.loading3 = true
       this.axios.get('/statistic/stateDistribution').then(res=>{
         this.loading3 = false
         if(res && res.success=='1'&&res.data.length!=0){
              const data = res.data.map(item=>{
                const arr = []
                arr.push(item.isViolation=='0'?'未违规':'违规')
                arr.push(item.cnt)
                return arr
              })
              this.renderPie({
                ele:"chart3",
                title:"违规设备分布图",
                data:data,
              })
         }else{
           this.isShow3 = true
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 应用安装情况
     queryInstall(){
       this.loading4 = true
       this.axios.get('/statistic/installDistribution').then(res=>{
         this.loading4 = false
         if(res && res.success=='1'&&res.data.length!=0){
            const data = res.data.map(item=>{
              const obj =  {}
              obj.name = item.appName
              obj.y = Number(item.percent.split("%")[0])
              return obj
            })
            this.renderColumn({
              ele:"chart4",
              data:[{
                name:'应用名称',
                data:data
              }],
            })
         }else{
           this.isShow4 = true
         }
       })
       .catch(err=>{
          console.log(err)
        })
     },

     // 渲染饼图
     renderPie(options){
        Highcharts.chart(options.ele, {

            colors:['#f45853','#7bd5e9','#73dcb6','#ffbe31','#a15db2','#446cb4','#60b730','#ebee13','#de9667','#1de4c1'],
            credits: {
                enabled: false,
            },
             exporting: {
              enabled: false
            },
            title: {
                text: options.title,
                y:270
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                  size:180,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    center: ['50%','25%']
                },
            },
            series: [{
                type: 'pie',
                name: options.title,
                innerSize: '50%',
                data: options.data
            }]
        });
     },

     // 渲染柱状图
     renderColumn(options){
       Highcharts.chart('chart4', {
            chart: {
                type: 'column'
            },
            colors:['#64c086'],
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '',
                },
                max: 100
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    maxPointWidth: 30,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.2f}%',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
            },
            series: options.data,
            
        });
     }

  }

}
</script>

<style lang="scss" scoped type="text/css">

#homepage {
  .statistics {
    width:1130px;
    height:100px;
    margin:0 auto 20px;
    .num {
        float: left;
        width:150px;
        height:100%;
        text-align:center;
        p{
          color:#fff;
        }
        p.number {
          font-size:34px;
          margin-top:10px;
        }
      }
    .app_num {
      float: left;
      width:380px;
      height:100%;
      border-radius:5px;
      background:#7bd5e9;
    }
    .right_icon{
        height: 100px;
        line-height: 100px;
        margin-left: 50%;
        font-size: 40px;
        color:#fff;
        .item{
          color: rgba(0,0,0,.3);
        }
      }

    .user_num{
      height:100px;
      width:700px;
      background:#73dcb6;
      margin-left:450px;
      border-radius:5px;
      .right {
        margin-left:500px;
      }
    }
    

  }

  .charts_wrap{
    .charts{
      height:350px;
      // display: flex;
      // text-align:justify;
      margin-bottom:30px;
      .left,.right{
        height:100%;
        width:50%;
        border:1px solid #ccc;
        border-radius:5px;
        h2{
          height: 50px;
          line-height:50px;
          text-indent:20px;
          background:#f1f1f1;
          border-bottom:1px solid #ccc;
        }
      }
      .left{
        float:left;
      }
      .right{
        margin-left:51%;
      }
      .chart_bg{
        background:#fff;
        position:relative;
      }
      #chart1,#chart2,#chart3,#chart4{
        width:100%;
        height:300px;
      }
    }
  }

}

</style>


