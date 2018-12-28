// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import moment from 'moment/moment';
import VueClipboard from 'vue-clipboard2'
import touch from 'vue-directive-touch';
import VueTouch from 'vue-touch'       
 Vue.use(VueTouch, {name: 'v-touch'})       
  VueTouch.config.swipe = {
    threshold: 100 //手指左右滑动距离
  }

Vue.use(touch);
Vue.use(VueClipboard)

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY.MM.DD';
  return moment(value).format(formatString);
});


Vue.config.productionTip = false;
window.alert = function(name){
  var iframe = document.createElement("IFRAME");
  iframe.style.display="none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
