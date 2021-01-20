<template>
  <div class="tree">
    <Branch
      :item="familyTree"
      @add-partner="addPartner"
    />
  </div>
</template>

<script>
import Branch from './components/NewBranch';

export default {
  name: 'tree',
  components: {
    Branch
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
    addPartner (item) {
      this.$emit('add-partner', item);
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