// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import routes from './router/index'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import publicMethod from './components/common/public'
import area from './components/common/area'
import VueI18n from 'vue-i18n'
import crypto from 'crypto'
import $ from 'jquery'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(publicMethod)
Vue.use(area)
Vue.use(VueI18n)
Vue.use(crypto)

//var md5 = crypto.createHash("md5");
const router = new VueRouter({
	mode:'history',
  routes
})

const i18n = new VueI18n({
  locale: 'en', // set locale
})
//if (lang === 'en') {
//locale.use(enLocale);
//} else {
//locale.use(zhLocale);
//}

//const i18n = new VueI18n({
//locale: lang, // set locale
//messages: messages // set locale messages
//});

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
