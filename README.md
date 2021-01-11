Vue component to display family tree.

## Installation
### npm
```
npm install vue-family-tree --save
```
## Demo
https://walkerz88.github.io/vue-family-tree/
## Usage
Because of recursion, you should import component globaly into vue.
```
import Vue from 'vue'
import App from './App.vue'
import VueFamilyTree from './components/VueFamilyTree.vue'

Vue.component('VueFamilyTree', VueFamilyTree);

new Vue({
  render: h => h(App),
}).$mount('#app')

```