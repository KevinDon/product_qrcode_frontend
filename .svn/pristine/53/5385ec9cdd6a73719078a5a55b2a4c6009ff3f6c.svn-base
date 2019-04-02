let charPageRouter = {
  path: '/chart',
  name: 'chart router',
  component: () => import('./chartPageLayout'),
  children: [
    {
      path: 'sku_vp_list',
      name: 'chart sku vp list',
      components: {
        chart: () => import('./chartSkuVpList')
      }
    },
    {
      path: 'sku_rank_list',
      name: 'chart sku rank list',
      components: {
        chart: () => import('./chartSkuRankList')
      }
    },{
      path: '',
      components: {
        chart: () => import('./chartSkuVpList')
      }
    },
  ]
};
export default charPageRouter
