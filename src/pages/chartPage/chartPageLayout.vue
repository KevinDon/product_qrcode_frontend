<template>
  <div>
    <el-container>
      <el-header style="margin:0;position: fixed;width: 100%;z-index: 1000;">
        <el-menu mode="horizontal"
                 :default-active="topNavListActiveIndex"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <el-menu-item v-for="item,index in topNavList"
                        :key="item.name"
                        :index="item.path">
            {{item.title}}
          </el-menu-item>
          <el-submenu index="lang" style="float:right;">
            <template slot="title" class="el-dropdown-link">
              {{$t('system.lang.title')}}
            </template>
            <el-menu-item index="lang-en" disabled>{{$t('system.lang.english')}}</el-menu-item>
            <el-menu-item index="lang-zh" disabled>{{$t('system.lang.chinese')}}</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-header>
      <router-view name="chart"></router-view>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "chartPageLayout",

    data() {
      return {
        topNavList: [
          {path: '/chart/sku_vp_list', title: 'SKU访问量排行', name: 'sku_vp_list'},
          {path: '/chart/sku_rank_list', title: 'SKU位置排行', name: 'sku_rank_list'},
        ],
        topNavListActiveIndex: '/chart/sku_vp_list',
      }
    },
    methods: {}
  };
</script>

<style lang="stylus">
  .el-header
    padding 0 !important

  .aside
    & > .main
      position: fixed
      top 64px
      left: 1.5em;
      padding: auto
      margin: auto
      z-index 1000
    &-toggle
      &-btn
        position: fixed
        z-index: 1000
        transition all .3s
    min-height: calc(100vh - 60px)
    &-show
      background #eee
      width 350px !important
      transition all .3s
      .aside
        &-toggle
          &-btn
            top 50vh
            left 332px
    &-hide
      width: 0 !important
      transition all .5s
      .aside
        &-toggle
          &-btn
            top 50vh
            left 0
      .main
        display none;


</style>
