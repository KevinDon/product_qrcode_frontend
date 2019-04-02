import httpAxios from '@/lib/axiosRequest'

export default {
  async statvisitqrcodeskuday(form) {
    console.log(form);
    return await httpAxios.post('/v1/statvisitqrcodeskuday/', {
        "pager": {"size": 10000, "page": 1}
        , "order": ["dy", "sku"]
        , "filter": form
      }
    ).then(res => {
      if (res.status !=200){
        throw res.msg
      }
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
  },

  async statvisitqrcodeskumonth(form) {
    console.log(form);
    return await httpAxios.post('/v1/statvisitqrcodeskumonth/', {
        "pager": {"size": 10000, "page": 1}
        , "order": ["yr", "mo", "sku"]
        , "filter": form
      }
    ).then(res => {
      if (res.status !=200){
        throw res.msg
      }
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
  },

  async statvisitqrcodeskuweek(form) {
    return await httpAxios.post('/v1/statvisitqrcodeskuweek/', {
        "pager": {"size": 10000, "page": 1}
        , "order": ["yr", "wk", "sku"]
        , "filter": form
      }
    ).then(res => {
      if (res.status !=200){
        throw res.msg
      }
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
  },


  async statvisitqrcodeskus(form) {
    return await httpAxios.post('/v1/statvisitqrcodeskus/', {
        "pager": {"size": 10000, "page": 1}
        , "order": ["sku", "location"]
      }
    ).then(res => {
      if (res.status !=200){
        throw res.msg
      }
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
  },

  async adminLoginSubApi(form) {
    httpAxios.get('', {
      params: {
        action: 'test',
        account: form.account || '',
        password: form.password || ''
      }
    }).then(res => {
      if (res.code === 1) {
        //  登录成功,返回管理员信息
        window.$store.commit('NOTICE_SUCCESS', res.msg);
        window.$store.dispatch('adminLoginSuccess', res.data);
        return true;
      } else {
        window.$store.commit('NOTICE_ERROR', res.msg);
        return false;
      }
    })
  },
}
