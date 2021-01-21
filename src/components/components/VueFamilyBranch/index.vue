<template>
  <div class="vue-family-branch">
    <div class="vue-family-row">
      <div class="vue-family-col">
        <VueFamilyCard
          :image="item.image"
          :name="item.name"
          :date-of-birth="item.dateOfBirth"
          editable
          @toggle-controls="$emit('toggle-controls')"
        />
      </div>
      <div class="vue-family-col"
        v-for="(partner, index) in item.partners"
        :key="index"
      >
        <VueFamilyBranch
          :item="partner"
          @add-partner="$emit('add-partner', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueFamilyCard from '../VueFamilyCard';
export default {
  name: 'VueFamilyBranch',
  components: {
    VueFamilyCard
  },
  props: {
    item: Object,
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showControls: false
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
.vue-family-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-family-col {
  & + .vue-family-col {
    margin-left: 70px;
  }
}
</style>