import Vue from 'vue'
import App from './App.vue'
import VueFamilyTree from './components/VueFamilyTree.vue'

Vue.config.productionTip = false
Vue.component('VueFamilyTree', VueFamilyTree);

new Vue({
  render: h => h(App),
}).$mount('#app')
