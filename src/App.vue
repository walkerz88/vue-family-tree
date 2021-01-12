<template>
  <div id="app">
    <div class="text-center">
      <h1 class="title">VueFamilyTree</h1>
      <label>
        <input type="checkbox" v-model="customCard">
        Custom cards
      </label>
    </div>
    <VueFamilyTree
      :tree="tree"
      @card-click="cardClick"
    >
      <template
        v-if="customCard"
        v-slot:card="{item}"
      >
        <div class="custom-card">
          <div
            :style="{backgroundImage: item.image ? `url(${item.image})` :  null}"
            class="custom-card__image"
          />
          <div class="custom-card__info">
            <div class="custom-card__name">
              {{ item.name }}
            </div>
            <div
              v-show="item.age"
              class="custom-card__age"
            >
              Age: {{ item.age }}
            </div>
          </div>
        </div>
      </template>
    </VueFamilyTree>
  </div>
</template>

<script>
import VueFamilyTree from './components/VueFamilyTree';
export default {
  name: 'App',
  components: {
    VueFamilyTree
  },
  data () {
    return {
      customCard: false,
      tree: [{
        firstPerson: {
          name: 'John Walker',
          image: 'https://picsum.photos/300/300?random=1'
        },
        secondPerson: {
          name: 'Jannet Grem',
          image: 'https://picsum.photos/300/300?random=2',
          age: 23
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
          },
          children: [{
            firstPerson: {
              name: 'Michael'
            },
            secondPerson: {
              name: 'Maria'
            }
          }]
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.text-center {
  text-align: center;
  margin-bottom: 32px;
}

.custom-card {
  display: flex;
  align-items: center;
  width: 220px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 6px 2px rgba(#000, 0);
  transition: box-shadow .2s ease;
  &:hover {
    box-shadow: 0 0 6px 2px rgba(#000, .1);
  }
  &__image {
    flex: 0 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #dedede;
    background-size: cover;
    background-position: 50%;
  }
  &__info {
    padding-left: 16px;
  }
  &__name {
    font-weight: 600;
  }
  &__age {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
