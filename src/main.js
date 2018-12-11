import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex';
import Fetch from './helper/Fetch';

import './assets/style/reset.less';
import './assets/font/iconfont.css';

import { setTitle, isRepeat } from './helper/tool';

import iview from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iview);

Vue.prototype.setting = setting;
Vue.prototype.Fetch = Fetch;
Vue.config.productionTip = false;

//图片预加载
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  error: require('./assets/img/error.png'),
  loading: require('./assets/img/loading.gif')
});

//通过eventBus传值
window.eventBus = new Vue();

// 设置title
setTitle(setting.name || '后台管理系统');

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // 登录超时
    Fetch.overTime = msg => {
      if (isRepeat('overtime')) return false;
      window.localStorage.removeItem('token');
      this.$router.push('/login');
    };
    Fetch.otherLogin = msg => {
      this.$Message.error(msg);
      window.localStorage.removeItem('token');
      this.$router.push('/login');
    };
    // 500
    Fetch.systemError = msg => {
      this.$Message.error(msg);
    };
    // other error
    Fetch.otherError = msg => {
      this.$Message.error('网络异常');
    };
  }
});
