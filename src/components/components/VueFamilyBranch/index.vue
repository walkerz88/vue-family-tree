<template>
  <div class="vue-family-branch">
    <div
      v-if="item.parents && Array.isArray(item.parents) && item.parents.length"
      class="vue-family-row"
      :style="{
        top: `-${102 + 48}px`,
        left: `-${(256 + 32) * item.parents.length / 2 }px`
      }"
    >
      <div class="vue-family-col vue-family-col_parents"
        v-for="(parent, index) in item.parents"
        :key="index"
      >
        <VueFamilyBranch
          :item="parent"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          @set-root-person="$emit('set-root-person', $event)"
        />
      </div>
    </div>
    <div class="vue-family-row">
      <div class="vue-family-col">
        <VueFamilyCard
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :date-of-birth="item.dateOfBirth"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          @set-root-person="$emit('set-root-person', $event)"
        />
      </div>
      <div 
        v-for="(partner, index) in item.partners"
        :key="index"
        :style="{
          left: `${(256 + 32) * (index + 1)}px`
        }"
        class="vue-family-col vue-family-col_partner"
      >
        <VueFamilyBranch
          :item="partner"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          @set-root-person="$emit('set-root-person', $event)"
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
    },
    preventMouseEvents: {
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
  position: absolute;
  top: 0;
  left: 0;
}
.vue-family-col {
  position: absolute;
  top: 0;
  left: 0;
}
/* .vue-family-row {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & + .vue-family-row {
    margin-top: 70px;
  }
}
.vue-family-col {
  & + .vue-family-col {
    margin-left: 70px;
  }
} */
</style>