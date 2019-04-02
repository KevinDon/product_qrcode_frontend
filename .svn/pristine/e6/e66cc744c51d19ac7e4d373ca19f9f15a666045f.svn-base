<template>
  <div id="EchartTest">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16">
            <h1>Vue + Element UI + Echart</h1>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="btnTestTrigger">刷新图表</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="12%">
          <h6>SKU 筛选</h6>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>

          <el-checkbox-group v-model="checkedSkus" @change="handleCheckedSkusChange">
            <div v-for="sku in skuList" :key="sku">
              <el-checkbox :label="sku">{{sku}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-aside>
        <el-main>
          <div class="chart" id="chart1"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // 引入 ECharts 全模块
  const echarts = require('echarts/echarts.all');
  import testApi from '@/api/test.api'

  export default {
    name: "EchartTest",
    data() {
      return {
        checkAll: false,
        isIndeterminate: true,
        checkedSkus: [],
        responseData: [],
        //  表单数据+配置
        chartData: {
          tooltip: {
            trigger: 'axis'
          },
          grid: { show: true, left: '3%', width: '80%', bottom: '3%', containLabel: true },
          title: {text: '图表'},
          xAxis: {},
          yAxis: {
            type: 'category',
            // boundaryGap: false,
          },
          series: [],
          // legend: {},
          legend: [
            {
              //  sku 分类
              type: 'scroll',
              orient: 'vertical',
              right: 0,
              top: 20,
              bottom: 20,
              width: '15%',
              data: [],
            },
            {
              //  date 分类
              type: 'scroll',
              orient: '',
              top: 0,
              width: '100%',
              data: [],
            }
          ],
          //  右上角工具箱
          toolbox: {
            feature: {
              dataZoom: {
                //  复位y
                yAxisIndex: false
              },
            }
          },
          //  数据区域筛选配置
          dataZoom: [
            {
              type: 'slider',
              start: 65,
              end: 85
            }
          ],
        },
      }
    },
    computed: {
      //  计算chart表中的sku
      skuList: function () {
        return this.chartData.legend.data;
      }
    },
    methods: {
      //  点击交互
      btnTestTrigger: function () {
        let vm = this;
        new Promise(resolve => {
          let res = testApi.statvisitqrcodeskuday();
          resolve(res)
        }).then(res => {
          let resf = [...res];
          vm.$message({
            type: 'info',
            message: 'click'
          });
          vm.changeChartHandler(resf)
        });


      },
      //  月数据处理
      changeChartHandler: function (data) {
        let vm = this;
        !!!vm.myChart || vm.myChart.clear();  //  保存实例

        let _legend = [], _day = [], _series = {}, _seriesData = [];
        data.forEach((item, index) => {
          _legend.push(item['sku'])
          _day.push(item['dy'])
          if (_series[item['sku']] != undefined && _series[item['sku']]['data'] != undefined){
            _series[item['sku']]['data'].push(item['num'])
          }else{
            var _data = [item['num']]
            _series[item['sku']] = {
              name:item['sku'],
              type:'line',
              stack: 'total',
              smooth: true,
              label: {show: true, position: 'top'},
              encode:{
                x:'dy',y:'num'
              },
              data: _data
            }
          }
        })
        Object.keys(_series).forEach(function(key){
           _seriesData.push(_series[key])
        });

        vm.chartData = {
          title: {text: '日访问量统计图'},
          tooltip: {trigger: 'axis'},
          legend: {data: Array.from(new Set(_legend)) },
          grid: { left: '3%',right: '4%', bottom: '3%',containLabel: true },
          toolbox: {feature: {
            saveAsImage: {},
            dataZoom: { yAxisIndex: false},
          }},
          dataZoom: [{ type: 'slider', start: 65, end: 85 }],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Array.from(new Set(_day))
          },
          yAxis: { type: 'value' },
          series: _seriesData
        };

        vm.initEchartHandle(vm.chartData)
      },

      initEchartHandle: function (data) {
        let vm = this;
        vm.responseData = data;
        try {
          let myChart = echarts.init(document.getElementById('chart1'));
//          console.log(data);
          myChart.setOption(data);
          vm.myChart = myChart;
        } catch (e) {
          console.log(e);
        }
      }
      ,
      handleCheckAllChange(val) {
        let vm = this;
        vm.checkedSkus = val ? this.chartData.xAxis.data : [];
        this.isIndeterminate = false;
      },
      handleCheckedSkusChange(value) {
        let vm = this;
        let checkedCount = value.length;
        this.checkAll = checkedCount === vm.skuList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < vm.skuList.length;
      },
      handleSingleCheckedChange(val) {
        let vm = this;

      },

    }
  }
</script>

<style lang="stylus" scoped>
  #EchartTest
    margin auto

  .chart
    min-width: 600px;
    height: 500px

  .el-checkbox-group
    text-align: left;
</style>
