// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import {Button} from 'mint-ui';
import store from "./store";
import './mock/mockServer'

Vue.config.productionTip = false

Vue.component(Button.name, Button); // mt-button

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
