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
      @add-partner="addPartner"
    />
  </div>
</template>

<script>
import VueFamilyTree from './components/NewTree';
export default {
  name: 'App',
  components: {
    VueFamilyTree
  },
  data () {
    return {
      customCard: false,
      index: 1,
      tree: [
        {
          id: 1,
          image: 'https://picsum.photos/300/300?random=1',
          name: 'John Walker'
        }
      ]
    }
  },
  methods: {
    addPartner (item) {
      this.index += 1;
      this.tree.push({
        id: this.index,
        pid: item.id,
        name: `Партнер ${item.name}`,
        relations_type: 'partners'
      });
      console.log(this.tree)
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
