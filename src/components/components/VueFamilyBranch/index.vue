<template>
  <div class="vue-family-branch">
    <div
      v-if="item.parents && Array.isArray(item.parents) && item.parents.length && item.id === rootPersonId"
      class="vue-family-row"
      :style="{
        position: 'absolute',
        top: `-${102 + 48}px`,
        left: `-${(256 + 32) * (item.parents.length - 1) / 2 }px`
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
          :root-person-id="rootPersonId"
          :image="item.image"
          :name="item.name"
          :date-of-birth="item.dateOfBirth"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          :source="item"
          @set-root-person="$emit('set-root-person', $event)"
        />
      </div>
      <template v-if="item.partners && item.partners.length && !item.partner_id">
        <div
          v-for="(partner, index) in item.partners"
          :key="`partner_${index}`"
          :style="{
            // left: `${(256 + 32) * (index + 1)}px`
          }"
          class="vue-family-col vue-family-col_partner"
        >
          <span
            class="vue-family-line"
            :style="{
              width: `${(256 * index + 32 * (index + 1))}px`,
              left: `-${(256 * index + 32 * (index + 1))}px`,
              top: `${102 / 2 + 10 * index}px`,
              borderBottomStyle: getPartnerLineStyle(partner.partner_relation)
            }"
          />
          <VueFamilyBranch
            :item="partner"
            :editable="editable"
            :preventMouseEvents="preventMouseEvents"
            @set-root-person="$emit('set-root-person', $event)"
          />
        </div>
      </template>
      <template v-if="item.siblings && Array.isArray(item.siblings) && item.siblings.length && item.id === rootPersonId">
        <div
          v-for="(partner, index) in item.siblings"
          :key="`sibling_${index}`"
          :style="{
            // left: `${(256 + 32) * (index + 1)}px`
          }"
          class="vue-family-col vue-family-col_sibling"
        >
          <!-- <span
            class="vue-family-line"
            :style="{
              width: `${(256 * index + 32 * (index + 1))}px`,
              left: `-${(256 * index + 32 * (index + 1))}px`,
              top: `${102 / 2 + 10 * index}px`,
              borderBottomStyle: getPartnerLineStyle(partner.partner_relation)
            }"
          /> -->
          <VueFamilyBranch
            :item="partner"
            :editable="editable"
            :preventMouseEvents="preventMouseEvents"
            @set-root-person="$emit('set-root-person', $event)"
          />
        </div>
      </template>
    </div>
    <div
      v-if="item.childrens && Array.isArray(item.childrens) && item.childrens.length && !item.partner_id"
      class="vue-family-row"
      :style="{
        position: 'absolute',
        top: `${102 + 48}px`,
        left: `${(256 + 32) * item.childrens.length / 2 }px`
      }"
    >
      <div class="vue-family-col vue-family-col_childrens"
        v-for="(children, index) in item.childrens"
        :key="index"
      >
        <VueFamilyBranch
          :item="children"
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
    rootPersonId: Number,
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
    },
    getPartnerLineStyle (relation) {
      let style = 'solid';
      switch(relation) {
        case 'ex': style = 'dashed'; break;
        default: style = 'solid';
      }
      return style;
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-family-row {
  display: flex;
  /* position: absolute;
  top: 0;
  left: 0; */
}
.vue-family-col {
  position: relative;
  & + .vue-family-col {
    margin-left: 32px;
  }
  /* position: absolute;
  top: 0;
  left: 0; */
}
.vue-family-line {
  height: 1px;
  border-bottom: 1px solid rgb(156, 156, 156);
  position: absolute;
  z-index: -1;
}
</style>