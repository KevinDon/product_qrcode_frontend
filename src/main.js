// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
//  element 多语言
// import locale from 'element-ui/lib/locale/lang/en'
//  vue 多语言
import i18n from '@/lang'
// import Mock from 'mockjs'
// import Echart from 'echarts'

Vue.use(ElementUI);
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: {App},
  template: '<App/>'
})
