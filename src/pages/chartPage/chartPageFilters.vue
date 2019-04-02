<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="main">
    <el-dialog title="SKU 选择" :visible.sync="dialogSkuSelect" :modal="false" top="5vh" z-index="2048">
      <el-row :gutter="24" style="height: 70vh;z-index:2048">
        <el-col :span="14">
          <el-input placeholder="输入SKU搜索" v-model="skuSearch" class="input-with-select" @change="" size="mini">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-table
            class="compact"
            ref="multipleTable"
            :v-loading="skuListTableLoading"
            :data="skuListTableFiltered"
            style="width: 100%;margin-top:.5em;"
            max-height="600"
            :select-on-indeterminate="false"
            :header-row-style="{height:'32px'}"
            @selection-change="dialogSkuListTableSelectionChange"
            @select="dialogSkuListTableRowSelectedHandle"
            @row-dblclick="dialogSkuListTableSelect"
          >
            <el-table-column
              type="selection"
              @filter-method="dialogSkuFilterFunc"
              width="55">
            </el-table-column>
            <el-table-column
              prop="sku"
              label="SKU">
            </el-table-column>
            <el-table-column
              prop="location"
              label="location"
              width="150">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10">
          <el-table
            class="compact"
            :v-loading="skuListTableLoading"
            :data="skuListSelected"
            style="width: 100%"
            max-height="600">
            <el-table-column
              prop="sku"
              label="Selected SKU">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogSkuSelectCancelHandle" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogSkuSelectSubmitHandle" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin:1em auto">
      <el-row style="margin: auto;">
        <el-col :offset="6" :span="12">
          SKU筛选({{skuListData.length||0}}{{addSelectSkuCounter>0?'+'+addSelectSkuCounter:''}})
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-search" @click="dialogSkuGetHandle" size="mini" circle></el-button>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <el-table
        class="compact"
        :data="skuListData"
        style="width: 300px;margin: auto;"
        max-height="450">
        <el-table-column
          prop="sku"
          label="SKU">
        </el-table-column>
        <el-table-column
          fixed="left"

          width="32">
          <template slot-scope="scope">
            <el-button
              @click="deleteSkuSelectRow(scope)"
              type="text" style="color:red"
              size="mini" icon="el-icon-circle-close-outline">

            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin:1em auto">
      <div>时间选择</div>
      <el-date-picker
        v-model="dateSelected"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        style="width: 300px;margin: auto;"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-row>

    <el-row style="margin:1em auto">
      <div>表格选择</div>
      <el-checkbox-group v-model="chartSelected" size="mini"
      >
        <el-checkbox v-for="chartMode in chartModes"
                     :label="chartMode.name"
                     :key="chartMode.name"
        >
          {{chartMode.label}}
        </el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-button type="success" size="mini"
                 :disabled="skuListData.length < 1" @click="filterRefreshHandle">刷新
      </el-button>
    </el-row>
  </div>
</template>

<script>
  import Moment from 'moment';
  import ChartApi from '@/api/test.api.js';

  export default {
    name: "chartPageFilters",
    props: {},
    data() {
      return {
        maxSelect: 20,
        skuSearch: '',
        dialogSkuSelect: false,
        chartSelected: ["chart_sku_vp_daily", "chart_sku_vp_monthly", "chart_sku_vp_weekly"],
        chartModes: [
          {label: '日统计表', name: 'chart_sku_vp_daily'},
          {label: '月统计表', name: 'chart_sku_vp_monthly'},
          {label: '周统计表', name: 'chart_sku_vp_weekly'}
        ],
        skuListSelected: [],
        skuListTable: [],
        skuListData: [],
        skuListTableLoading: false,
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        dateSelected: [
          Moment().subtract(1, 'years').format('YYYY-MM-DD'), Moment().format('YYYY-MM-DD')
        ]
      }
    },
    methods: {
      //  显示sku 选择弹出框
      dialogSkuGetHandle: async function () {
        let vm = this;
        vm.dialogSkuSelect = true;
        vm.skuListTableLoading = true;
        await ChartApi.statvisitqrcodeskus().then(data => {
          vm.skuListTable = data;
          vm.skuListTableLoading = false;
          vm.skuListSelected = [];
        });
        // console.log(skuData);
      },
      //  双击选中SKu row
      dialogSkuListTableSelect: function (row, col, event) {
        let vm = this;
        console.log('双击row', row);

        vm.dialogSkuListTableRowSelectedHandle(vm.$refs.multipleTable.selection, row)
      },
      dialogSkuListTableSelectionChange(val) {
        console.log('选择改变', val);
        // this.skuListSelected = val;
        let vm = this;
        vm.skuListSelected.forEach(item => {
          vm.$refs.multipleTable.toggleRowSelection(item, true)
        })
      },
      dialogSkuListTableRowSelectedHandle(selection, row) {
        let vm = this;
        let rowExist = vm.skuListSelected.filter(val => row.id == val.id);


        if (rowExist.length < 1) {
          console.log('没有重复就加入', rowExist.length < 1, rowExist);
          if (vm.skuListSelected.length < vm.maxSelect) {
            vm.skuListSelected.push(row);
            vm.$refs.multipleTable.toggleRowSelection(row, true);
          } else {
            vm.$message.warning(`可选择的SKU不可超过${vm.maxSelect}个`);
            vm.$refs.multipleTable.toggleRowSelection(row, false);
            return false;
          }
        } else {
          vm.skuListSelected.splice(vm.skuListSelected.indexOf(row), 1);
          vm.$refs.multipleTable.toggleRowSelection(row, false)

          console.log('重复了就去掉', rowExist.length > 0, rowExist);
        }
      },
      dialogSkuSelectCancelHandle: function(){
        let vm = this;
        vm.skuListSelected = [];
        vm.dialogSkuSelect = false;
      },
      dialogSkuSelectSubmitHandle: function () {
        let vm = this;
        if (vm.skuListData.length + vm.addSelectSkuCounter > 20) {
          vm.$message.warning('选择的SKU超过20个');
          return false;
        }
        vm.skuListTable = [];
        // vm.skuListData = [...vm.skuListSelected];
        vm.skuListSelected.forEach(item => {
          let _repeated = false;
          for (var index in vm.skuListData) {
            if (vm.skuListData[index]['id'] == item['id']) {
              _repeated = true;
              break;
            }
          }
          if (false == !!_repeated) {
            vm.skuListData.push(item)
          }
        })
        vm.skuListSelected = [];
        vm.dialogSkuSelect = false;

      },
      filterRefreshHandle: function () {
        let form = {
          skuSelected: this.skuListData,
          dateSelected: this.dateSelected,
          chartSelected: this.chartSelected,
        };
        // console.log(form);
        this.$emit('listenFilterSubmit', form)
      },
      dialogSkuFilterFunc: function (value, row, col) {
        console.log(value, '123');
      },
      deleteSkuSelectRow: function (row) {
        console.log(row);
        this.skuListData.splice(row.$index, 1);
      }
    }, computed: {
      skuListTableFiltered: function () {
        let vm = this;
        let res = !!vm.skuSearch ? vm.skuListTable.filter(item => item.sku.match(new RegExp(vm.skuSearch, 'i'))) : vm.skuListTable;
        return res;
      },
      addSelectSkuCounter: function () {
        let vm = this;
        let _skuList = [];
        vm.skuListSelected.forEach(item => {
          let _repeated = false;
          for (var index in vm.skuListData) {
            if (vm.skuListData[index]['id'] == item['id']) {
              _repeated = true;
              break;
            }
          }
          if (false == !!_repeated) {
            _skuList.push(item)
          }
        })
        return _skuList.length || 0
      }
    }
  }
</script>

<style lang="stylus">
  .el-checkbox__label
    display inline-block !important

  .compact
    .el-table__row td
      padding 3px
    thead
      th
        padding 3px
        background rgba(5, 28, 31, 0.04)

  th .el-checkbox__input
    display none
</style>
