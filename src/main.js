// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'

import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'

import 'font-awesome/css/font-awesome.min.css'
import Mock from './mock';
Mock.bootstrap();

//使用element-ui


// Vue.use(vueEventCalendar, {locale: 'zh'})
Vue.use(vueEventCalendar, {locale: 'zh', color: '#3d9eeb'})
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
