<template>
  <div id="app">
    <VueFamilyTree
      :tree="tree"
      editable
      @update-tree="updateTree"
    />
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
      tree: [
        {
          id: 1,
          image: 'https://picsum.photos/300/300?random=1',
          name: 'John Walker',
          dateOfBirth: '10.08.1990'
        },
        {
          id: 2,
          pid: 1,
          relations_type: 'partners',
          image: 'https://picsum.photos/300/300?random=2',
          name: 'Alicia Wild',
          dateOfBirth: '11.08.1990'
        }
      ]
    }
  },
  methods: {
    updateTree (tree) {
      this.tree = tree;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
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
