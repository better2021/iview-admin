// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import installPlugin from '@/plugin'
import axios from '@/libs/api.request'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

Vue.use(iView)

// 注册admin内置插件
installPlugin(Vue)
// 生产环境关掉提示
Vue.config.productionTip = false
// 全局注册应用配置
Vue.prototype.$config = config
// 全局注册api请求
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
