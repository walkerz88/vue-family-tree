Vue component to display family tree.

## Installation
### npm
```
npm install vue-family-tree --save
```
## Demo
https://walkerz88.github.io/vue-family-tree/
## Usage
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
import VueFamilyTree from 'vue-family-tree';

export default {
  name: 'App',
  components: {
    VueFamilyTree
  },
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
### Props
Prop    | Type | Default | Description
---     | ---- | ------- | -----------
tree | Array | [] | JSON of your tree
enable-drag | Boolean | true | Enable or disable drag
wrapper-styles | Object | If enable-drag is true: `{position: 'relative', width: '100%', height: '600px'}` else `null` | Wrapper css parameters
drag-cursor | String | `grabbing` | CSS cursor name when drag is active
mouse-change-diff | Number | 2 | How many pixels mouse should move, to change cursor and prevent mouse events

### Events
Event | Description
--- | ---
card-click | Click on card (You will receive full data from card object)