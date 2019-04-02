import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import ChartRouter from '@/pages/chartPage/router.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'PageHome',
      component: PageHome
    }, {
      path: '/test',
      name: 'PageTest',
      meta: {
        title: 'Echart + Vue + ElementUI Demo'
      },
      component: () => import('@/components/EchartTest')
    }, ChartRouter
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    console.log(to);
    document.title = to.meta.title
  }
  next()
});

export default router
