import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
//导入字体图标
import "./assets/icon/iconfont.css";
//导入axios
import axios from "axios";

axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/";

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
