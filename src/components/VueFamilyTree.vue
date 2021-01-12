<template>
  <div
    ref="wrapper"
    class="vue-family-tree"
  >
    <VueFamilyTreeBranch
      :tree="tree"
      @card-click="$emit('card-click', $event)"
    />
  </div>
</template>

<script>
import VueFamilyTreeBranch from './components/Branch.vue';

export default {
  name: 'VueFamilyTree',
  components: {
    VueFamilyTreeBranch
  },
  props: {
    tree: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>