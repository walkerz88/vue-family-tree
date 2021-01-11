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
```js
import Vue from 'vue'
import App from './App.vue'
import VueFamilyTree from './components/VueFamilyTree.vue'

Vue.component('VueFamilyTree', VueFamilyTree);

new Vue({
  render: h => h(App),
}).$mount('#app')

```
## Now you can use component
```html
<template>
  <div id="app">
    <VueFamilyTree
      :tree="tree"
      @card-click="cardClick"
    />
  </div>
</template>
```
```js
<script>
export default {
  name: 'App',
  data () {
    return {
      tree: [{
        firstPerson: {
          name: 'John Walker',
          image: 'https://picsum.photos/300/300?random=1'
        },
        secondPerson: {
          name: 'Jannet Grem',
          image: 'https://picsum.photos/300/300?random=2'
        },
        children: [{
          firstPerson: {
            name: 'Katia'
          },
          secondPerson: {
            name: 'Oleg'
          },
          children: [{
            firstPerson: {
              name: 'Gleb'
            },
            secondPerson: {
              name: 'Viktoriya'
            },
            children: [{
              firstPerson: {
                name: 'Rim'
              },
              secondPerson: {
                name: 'Natasha'
              }
            },
            {
              firstPerson: {
                name: 'Leonid'
              }
            }]
          },
          {
            firstPerson: {
              name: 'Olga'
            },
            secondPerson: {
              name: 'Nikita'
            }
          }]
        },
        {
          firstPerson: {
            name: 'Vitia'
          },
          secondPerson: {
            name: 'Dasha'
          }
        },
        {
          firstPerson: {
            name: 'Antonio Wild',
            image: 'https://picsum.photos/300/300?random=3'
          },
          secondPerson: {
            name: 'Olivia Olson'
          },
          children: [{
            firstPerson: {
              name: 'Kristina Wild'
            }
          },
          {
            firstPerson: {
              name: 'Alexey Wild'
            }
          },
          {
            firstPerson: {
              name: 'Viktor Wild'
            }
          }]
        }]
      }]
    }
  },
  methods: {
    cardClick (item) {
      console.log(item);
    }
  }
}
</script>

```