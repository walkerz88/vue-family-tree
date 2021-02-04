<template>
  <div class="vue-family-branch">
    <div
      v-if="item.parents && Array.isArray(item.parents) && item.parents.length && item.id === rootPersonId"
      class="vue-family-row"
      :style="{
        position: 'absolute',
        top: `-${cardHeight + gutters + (item.siblings && item.siblings.length ? gutters : 0)}px`,
        left: `calc(50% - ${cardWidth / 2 * item.parents.length + gutters / 2 * (item.parents.length - 1)}px`
      }"
    >
      <div class="vue-family-col vue-family-col_parents"
        v-for="(parent, index) in item.parents"
        :key="index"
      >
        <VueFamilyBranch
          :item="parent"
          :gutters="gutters"
          :card-width="cardWidth"
          :card-height="cardHeight"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          @set-root-person="$emit('set-root-person', $event)"
        />
      </div>
    </div>
    <div class="vue-family-row">
      <!-- Siblings connector -->
      <span
        v-if="item.siblings && Array.isArray(item.siblings) && item.siblings.length"
        class="vue-family-line"
        :style="{
          top: `-${gutters + 1}px`,
          width: `calc(100% - ${cardWidth + 2 * gutters}px)`,
          height: '1px',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderColor: lineColor,
          left: `calc(${cardWidth}px / 2 + ${gutters}px)`
        }"
      />
      <!-- // Siblings connector -->
      <div class="vue-family-col">
        <!-- Sibling corner line -->
        <span
          v-show="item.siblings && Array.isArray(item.siblings) && item.siblings.length"
          :style="{
            width: `${gutters}px`,
            height: `${gutters}px`,
            top: `-${gutters}px`,
            left: '50%',
            borderWidth: '1px 0 0 1px',
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: '10px 0 0 0'
          }"
          class="vue-family-line vue-family-line_sibling"
        />
        <!-- // Sibling corner line -->
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
          class="vue-family-col vue-family-col_partner"
        >
          <span
            class="vue-family-line"
            :style="{
              width: `${(cardWidth * index + gutters * (index + 1))}px`,
              left: `-${(cardWidth * index + gutters * (index + 1))}px`,
              top: `${cardHeight / 2 + 10 * index}px`,
              borderBottomStyle: getPartnerLineStyle(partner.partner_relation)
            }"
          />
          <VueFamilyBranch
            :item="partner"
            :gutters="gutters"
            :card-width="cardWidth"
            :card-height="cardHeight"
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
          class="vue-family-col vue-family-col_sibling"
        >
          <!-- Sibling corner line -->
          <span
            v-show="item.siblings && Array.isArray(item.siblings) && item.siblings.length"
            :style="{
              width: `${gutters}px`,
              height: `${gutters}px`,
              top: `-${gutters}px`,
              right: '50%',
              borderWidth: '1px 1px 0 0',
              borderStyle: 'solid',
              borderColor: lineColor,
              borderRadius: '0 10px 0 0'
            }"
            class="vue-family-line vue-family-line_sibling"
          />
          <!-- // Sibling corner line -->
          <VueFamilyBranch
            :item="partner"
            :gutters="gutters"
            :card-width="cardWidth"
            :card-height="cardHeight"
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
        top: `${cardHeight + gutters}px`,
        left: `${(cardWidth + gutters) * item.childrens.length / 2 }px`
      }"
    >
      <div class="vue-family-col vue-family-col_childrens"
        v-for="(children, index) in item.childrens"
        :key="index"
      >
        <VueFamilyBranch
          :item="children"
          :gutters="gutters"
          :card-width="cardWidth"
          :card-height="cardHeight"
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
    },
    gutters: {
      type: Number,
      default: 32
    },
    cardWidth: {
      type: Number,
      default: 256
    },
    cardHeight: {
      type: Number,
      default: 102
    },
    lineColor: {
      type: String,
      default: 'rgb(156, 156, 156)'
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
  position: absolute;
  z-index: -1;
}
</style>