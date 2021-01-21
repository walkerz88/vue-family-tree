<template>
  <div class="tree">
    <VueFamilyBranch
      :item="familyTree"
      editable
      @add-partner="addPartner"
    />
  </div>
</template>

<script>
import VueFamilyBranch from './components/VueFamilyBranch';

export default {
  name: 'tree',
  components: {
    VueFamilyBranch
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
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
        const relTypes = ['partners', 'siblings', 'childrens', 'parents'];

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
      // Find max id in tree
      const indexes = this.tree.map(item => item.id);
      const index = Math.max(...indexes) + 1;
      let tree = this.tree;

      tree.push({
        id: index,
        pid: item.id,
        name: `Партнер ${item.name}`,
        relations_type: 'partners'
      });

      this.$emit('add-partner', {
        item,
        tree
      });

      this.$emit('update-tree', tree);
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