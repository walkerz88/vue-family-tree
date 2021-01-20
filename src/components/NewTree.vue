<template>
  <div class="tree">
    <pre>{{ familyTree }}</pre>
    <Card
      v-for="(item, index) in tree"
      class="tree__card"
      :style="{
        top: item.position ? item.position.top : 0,
        left: item.position ? item.position.left : 0
      }"
      :key="index"
      :ref="`card_${item.id}`"
      :image="item.image"
      :name="item.name"
    />
  </div>
</template>

<script>
import Card from './components/Card';

export default {
  name: 'tree',
  components: {
    Card
  },
  props: {
    tree: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    familyTree () {
      let obj = {}

      let array = this.tree;
      if (array && Array.isArray(array) && array.length) {

        // find first person
        const startPerson = array.find(item => !item.parent_id);
        obj = {
          ...startPerson,
          ...combineRelations(startPerson)
        };
      }

      function findRelations (person, type) {
        let rel = array.filter(item => item.pid === person.id && item.relations_type === type);

        rel = rel.map(item => {
          return {
            ...item,
          ...combineRelations(item)
          }
        });
        return rel;
      }

      function combineRelations (item) {
        let rels = {}
        const relTypes = ['partners', 'siblings', 'parents', 'childrens'];

        relTypes.forEach(type => {
          const value = findRelations(item, type);

          if (value && Array.isArray(value) && value.length) {
            rels[type] = value;
          }
        });

        return rels;
      }
      
      return obj;
    }
  },
  methods: {
    setPosition (item, top = 0, left = 0) {
        // set position prop for all cards
        /* array.forEach(item => {
          this.$set(item, 'position', {
            top: 0,
            left: 0
          });
        }); */
      item.position.top = top;
      item.position.left = left;
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  position: relative;
  width: 100%;
  height: 600px;
  &__card {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
}
</style>