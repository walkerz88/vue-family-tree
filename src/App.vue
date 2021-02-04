<template>
  <div id="app">
    <VueFamilyTree
      ref="tree"
      :tree="tree"
      :root-person-id="rootPersonId"
      :gutters="options.gutters"
      :card-width="options.cardWidth"
      :card-height="options.cardHeight"
      :wrapperStyles="{
        position: 'relative',
        width: '100%',
        height: '100%'
      }"
      editable
      @update-tree="updateTree"
      @set-root-person="setRootPerson"
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
      rootPersonId: 2,
      options: {
        gutters: 32,
        cardWidth: 256,
        cardHeight: 102
      },
      tree: [
        {
          id: 1,
          image: 'https://picsum.photos/id/1/200/300',
          name: 'John Walkerz'
        },
        {
          id: 2,
          pid: 1,
          ppid: 5,
          image: 'https://picsum.photos/id/100/200/300',
          name: 'Oleg Walkerz'
        },
        {
          id: 3,
          pid: 1,
          ppid: 5,
          image: 'https://picsum.photos/id/400/200/300',
          name: 'Irina Walkerz'
        },
        {
          id: 6,
          pid: 1,
          ppid: 5,
          image: 'https://picsum.photos/id/400/200/300',
          name: 'Kristian Walkerz'
        },
        {
          id: 4,
          partner_id: 2,
          image: 'https://picsum.photos/id/500/200/300',
          name: 'Oleg Wife'
        },
        {
          id: 5,
          partner_id: 1,
          image: 'https://picsum.photos/id/600/200/300',
          name: 'John Wife'
        }
        /* {
          id: 1,
          pid: 3,
          ppid: 5,
          image: 'https://picsum.photos/id/1/200/300',
          name: 'Jareb Walker',
          dateOfBirth: '09.12.1985'
        },
        {
          id: 7,
          pid: 3,
          ppid: 5,
          image: 'https://picsum.photos/id/800/200/300',
          name: 'Jareb Walker Brother',
          dateOfBirth: '08.07.1990'
        },
        {
          id: 4,
          partner_id: 1,
          partner_relation: 'ex',
          image: 'https://picsum.photos/id/200/200/300',
          name: 'Katia Ruski',
          dateOfBirth: '09.12.1990'
        },
        {
          id: 2,
          partner_id: 1,
          image: 'https://picsum.photos/id/100/200/300',
          name: 'Anna Koska',
          dateOfBirth: '09.12.1985'
        },
        {
          id: 3,
          image: 'https://picsum.photos/id/700/200/300',
          name: 'Oleg Walker',
          dateOfBirth: '04.07.1964'
        },
        {
          id: 5,
          partner_id: 3,
          image: 'https://picsum.photos/id/400/200/300',
          name: 'Janna Dark',
          dateOfBirth: '11.07.1944'
        },
        {
          id: 6,
          pid: 1,
          ppid: 2,
          image: 'https://picsum.photos/id/500/200/300',
          name: 'Antonio Walker',
          dateOfBirth: '18.02.1994'
        }, */
      ]
    }
  },
  methods: {
    setRootPerson (id) {
      this.rootPersonId = id;
      this.$refs.tree.centerTree();
    },
    updateTree (tree) {
      this.tree = tree;
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  box-sizing: border-box;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
