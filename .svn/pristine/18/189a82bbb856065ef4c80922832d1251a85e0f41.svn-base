<template>
  <el-container>
    <el-aside class="aside" :class="!!asideShow?'aside-show':'aside-hide'">
      <div class="aside-toggle-btn">
        <el-button icon="el-icon-d-arrow-left" circle
                   v-if="!!asideShow"
                   v-on:click="asideToggleHandler(!asideShow)">

        </el-button>
        <el-button icon="el-icon-d-arrow-right" circle
                   v-else
                   @click="asideToggleHandler(!asideShow)">

        </el-button>
      </div>

      <side-filter @listenFilterSubmit="filterSubmit" v-loading.fullscreen.lock="fullscreenLoading"></side-filter>
    </el-aside>
    <el-container>
      <el-main id="main-box">
        <h1>SKU Vp List</h1>
        <div class="chart-box" v-show.sync="showSkuDailyChart">
          <div class="chart" id="chartDaily"></div>
        </div>
        <div class="chart-box" v-show.sync="showSkuMonthlyChart">
          <div class="chart" id="chartMonthly"></div>
        </div>
        <div class="chart-box" v-show.sync="showSkuWeeklyChart">
          <div class="chart" id="chartWeekly"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // 引入 ECharts 全模块 todo 日后精简
  import ChartsApi from "@/api/test.api";
  import ChartDataHandler from './chartDataHandler';


  // // 引入 ECharts 主模块
  // var echarts = require('echarts/lib/echarts');
  // // 引入柱状图
  // require('echarts/lib/chart/line');
  // // 引入提示框和标题组件
  // require('echarts/lib/component/legend');
  // require('echarts/lib/component/grid');
  // require('echarts/lib/component/tooltip');
  // require('echarts/lib/component/title');
  // require('echarts/lib/component/dataZoom');

  const echarts = require('echarts/echarts.all');

  let chartOptions = {
    title: {text: '日访问量统计图'},
    tooltip: {trigger: 'axis'},
    legend: {},
    grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {yAxisIndex: false},
      }
    },
    dataZoom: [{type: 'slider', start: 65, end: 85}],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {type: 'value'},
    series: [],
  };

  export default {
    name: "chartSkuVpList",
    components: {
      sideFilter: () => import('./chartPageFilters.vue')
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        fullscreenLoading: false,
        asideShow: true,
        queryForm: [],
        dailyChart: null,
        monthlyChart: null,
        weeklyChart: null,
        chartData: [],
        chartSelected: ['chart_sku_vp_daily', 'chart_sku_vp_monthly', 'chart_sku_vp_weekly'],
      }
    },
    mounted: function () {
      let vm = this;
      vm.dailyChart = echarts.init(document.getElementById('chartDaily'), 'canvas', 'auto', 'auto');
      vm.monthlyChart = echarts.init(document.getElementById('chartMonthly'), 'canvas', 'auto', 'auto');
      vm.weeklyChart = echarts.init(document.getElementById('chartWeekly'), 'canvas', 'auto', 'auto');
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          vm.screenWidth = window.screenWidth;
        })()
      }
    },
    methods: {

      asideToggleHandler: function (val) {
        let vm = this;
        console.log('切换侧栏');
        vm.asideShow = val;
        setTimeout(
          () => {
            ChartDataHandler.chartResizeHandle(vm.dailyChart);
            ChartDataHandler.chartResizeHandle(vm.monthlyChart);
            ChartDataHandler.chartResizeHandle(vm.weeklyChart);
          }, 500
        )
      },
      filterSubmitHandle: async function (form) {
        let vm = this;
        let _params = [];

        //  处理sku查询语句
        if (form.skuSelected.length > 0) {
          let _skuIns = [];
          form.skuSelected.forEach(item => {
            if (item != undefined) {
              _skuIns.push({'sku-eq': item.sku})
            }
          });
          _params.push(_skuIns)
        }

        let _beginDate, _endDate;
        //  处理date查询
        // if (form.dateSelected.length > 0) {
        _beginDate = form.dateSelected[0];
        _endDate = form.dateSelected[1];
        // }
        //  处理chart查询
        if (form.chartSelected.length > 0) {
          vm.chartSelected = form.chartSelected;
          if (vm.showSkuDailyChart) {
            let queryParams = [..._params];
            queryParams.push([{'dy-gte-and': _beginDate}]);
            queryParams.push([{'dy-lte-and': _endDate}]);
            await ChartsApi.statvisitqrcodeskuday(queryParams).then(data => {
              vm.daliyChartOptions = ChartDataHandler.skuDailyChangHandle(vm.dailyChart, data, vm);
            });
          }

          if (vm.showSkuMonthlyChart) {
            let queryParams = [..._params];
            queryParams.push([{'first_day-gte-and': _beginDate}]);
            queryParams.push([{'last_day-lte-and': _endDate}]);
            await ChartsApi.statvisitqrcodeskumonth(queryParams).then(data => {
              vm.monthlyChartOptions = ChartDataHandler.skuMonthlyChangeHandle(vm.monthlyChart, data, vm);
            });

          }
          if (vm.showSkuWeeklyChart) {
            let queryParams = [..._params];
            queryParams.push([{'first_day-gte-and': _beginDate}]);
            queryParams.push([{'last_day-lte-and': _endDate}]);
            await ChartsApi.statvisitqrcodeskuweek(queryParams).then(data => {
              vm.weeklyChartOptions = ChartDataHandler.skuWeeklyChangeHandle(vm.weeklyChart, data, vm);
            });
          }
        }
      },
      //  筛选器刷新
      filterSubmit: async function (form) {
        let vm = this;
        console.log('筛选器刷新', form);

        vm.fullscreenLoading = true;
        await vm.filterSubmitHandle(form).then(res => {
          vm.fullscreenLoading = false;
          vm.$message.success(vm.$i18n.t('message.success'))
        }).catch(e => {
          vm.fullscreenLoading = false;
          vm.$message.error(e)
        })

      },
      //  每日数据处理
      changeChartSkuDailyHandler: function (data) {
        let vm = this;
        !!!vm.dailyChart || vm.dailyChart.clear();  //  保存实例

        let _legend = [], _day = [], _series = {}, _seriesData = [];
        data.forEach((item, index) => {
          _legend.push(item['sku'])
          _day.push(item['dy'])
          if (_series[item['sku']] != undefined && _series[item['sku']]['data'] != undefined) {
            _series[item['sku']]['data'].push(item['num'])
          } else {
            var _data = [item['num']]
            _series[item['sku']] = {
              name: item['sku'],
              type: 'line',
              stack: 'total',
              smooth: true,
              label: {show: true, position: 'top'},
              encode: {
                x: 'dy', y: 'num'
              },
              data: _data
            }
          }
        })
        Object.keys(_series).forEach(function (key) {
          _seriesData.push(_series[key])
        });

        vm.chartData = {
          title: {text: '日访问量统计图'},
          tooltip: {trigger: 'axis'},
          legend: {data: Array.from(new Set(_legend))},
          grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
          toolbox: {
            feature: {
              saveAsImage: {},
              dataZoom: {yAxisIndex: false},
            }
          },
          dataZoom: [{type: 'slider', start: 65, end: 85}],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Array.from(new Set(_day))
          },
          yAxis: {type: 'value'},
          series: _seriesData
        };
        vm.dailyChart.setOption(vm.chartData);
      },
      chartResizeHandle() {

      }
    },
    computed: {
      showSkuDailyChart: function () {
        return this.chartSelected.indexOf('chart_sku_vp_daily') >= 0
      },
      showSkuMonthlyChart: function () {
        return this.chartSelected.indexOf('chart_sku_vp_monthly') >= 0
      },
      showSkuWeeklyChart: function () {
        return this.chartSelected.indexOf('chart_sku_vp_weekly') >= 0
      }
    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          let vm = this;
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            console.log(vm.screenWidth);
            // vm.init();
            ChartDataHandler.chartResizeHandle(vm.dailyChart);
            ChartDataHandler.chartResizeHandle(vm.monthlyChart);
            ChartDataHandler.chartResizeHandle(vm.weeklyChart);
            vm.timer = false
          }, 500)
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .chart
    &-box
      margin: 3em 0;
    width: 100%
    height: 500px

  .el-checkbox-group
    text-align: left;
</style>
