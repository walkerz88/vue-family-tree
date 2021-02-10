<template>
  <div class="vue-family-branch">
    <div
      v-if="item.parents && Array.isArray(item.parents) && item.parents.length"
      class="vue-family-row"
      :style="{
        position: 'absolute',
        top: `${calcParentsPosition().top}px`,
        left: `${calcParentsPosition().left}px`
      }"
    >
      <!-- Parents connector -->
      <div
        class="vue-family-line"
        :style="{
          top: `${calcParentConnector().top}px`,
          left: `${calcParentConnector().left}px`,
          width: `${lineWidth}px`,
          height: `${calcParentConnector().height}px`,
          borderLeftWidth: `${lineWidth}px`,
          borderLeftStyle: 'solid',
          borderColor: lineColor
        }"
      />
      <!-- // Parents connector -->
      <VueFamilyBranch
        :item="item.parents[0]"
        :gutters="gutters"
        :card-width="cardWidth"
        :card-height="cardHeight"
        :line-color="lineColor"
        :line-width="lineWidth"
        :line-border-radius="lineBorderRadius"
        :editable="editable"
        :preventMouseEvents="preventMouseEvents"
        @set-root-person="$emit('set-root-person', $event)"
      />
    </div>
    <div class="vue-family-row">
      <!-- Siblings connector -->
      <span
        v-if="item.siblings && Array.isArray(item.siblings) && item.siblings.length"
        class="vue-family-line"
        :style="{
          top: `-${gutters + lineWidth}px`,
          width: `${calcSiblingsConnector().width}px`,
          height: `${lineWidth}px`,
          borderBottomWidth: `${lineWidth}px`,
          borderBottomStyle: 'solid',
          borderColor: lineColor,
          left: `${this.cardWidth / 2 + gutters}px`
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
            borderWidth: `${lineWidth}px 0 0 ${lineWidth}px`,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: `${lineBorderRadius}px 0 0 0`
          }"
          class="vue-family-line"
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
          :style="{marginLeft: `${gutters}px`}"
          class="vue-family-col"
        >
          <!-- Partners connector -->
          <span
            class="vue-family-line"
            :style="{
              width: `${(cardWidth * index + gutters * (index + 1))}px`,
              left: `-${(cardWidth * index + gutters * (index + 1))}px`,
              top: `${cardHeight / 2 + 10 * index}px`,
              borderWidth: `${lineWidth}px`,
              borderBottomStyle: getPartnerLineStyle(partner.partner_status),
              borderColor: lineColor
            }"
          />
          <!-- // Partners connector -->
          <VueFamilyBranch
            :item="partner"
            :gutters="gutters"
            :card-width="cardWidth"
            :card-height="cardHeight"
            :line-color="lineColor"
            :line-width="lineWidth"
            :line-border-radius="lineBorderRadius"
            :editable="editable"
            :preventMouseEvents="preventMouseEvents"
            @set-root-person="$emit('set-root-person', $event)"
          />
        </div>
      </template>
      <template v-if="item.siblings && Array.isArray(item.siblings) && item.siblings.length">
        <div
          v-for="(sibling, index) in item.siblings"
          ref="siblings"
          :key="`sibling_${index}`"
          :style="{marginLeft: `${gutters}px`}"
          class="vue-family-col"
        >
          <!-- Sibling corner line -->
          <span
            v-show="item.siblings && Array.isArray(item.siblings) && item.siblings.length"
            :style="{
              width: `${gutters}px`,
              height: `${gutters}px`,
              top: `-${gutters}px`,
              left: `${cardWidth / 2 - gutters}px`,
              borderWidth: `${lineWidth}px ${lineWidth}px 0 0`,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderRadius: `0 ${lineBorderRadius}px 0 0`
            }"
            class="vue-family-line"
          />
          <!-- // Sibling corner line -->
          <VueFamilyBranch
            :item="sibling"
            :gutters="gutters"
            :card-width="cardWidth"
            :card-height="cardHeight"
            :line-color="lineColor"
            :line-width="lineWidth"
            :line-border-radius="lineBorderRadius"
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
      <template v-for="(children, index) in item.childrens">
        <VueFamilyBranch
          :key="index"
          :item="children"
          :gutters="gutters"
          :card-width="cardWidth"
          :card-height="cardHeight"
          :line-color="lineColor"
          :line-width="lineWidth"
          :line-border-radius="lineBorderRadius"
          :editable="editable"
          :preventMouseEvents="preventMouseEvents"
          @set-root-person="$emit('set-root-person', $event)"
        />
      </template>
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
    type: String,
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
      default: '#b7b7b7'
    },
    lineWidth: {
      type: Number,
      default: 1
    },
    lineBorderRadius: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      showControls: false,
      siblingsConnector: {
        width: 0
      }
    }
  },
  methods: {
    calcSiblingsConnector () {
      const cardWidth = this.cardWidth;
      const siblings = this.item.siblings;
      const partners = this.item.partners;
      const gutters = this.gutters;
      let width = 0;

      if (siblings && Array.isArray(siblings) && siblings.length) {
        width = cardWidth / 2;

        if (partners && Array.isArray(partners) && partners.length) {
          partners.forEach(() => {
            width += cardWidth + gutters;
          });
        }

        siblings.forEach((sibling, index) => {
          if (index < siblings.length - 1) {
            width += cardWidth + gutters;

            let sibPartners = sibling.partners;

            if (sibPartners && Array.isArray(sibPartners) && sibPartners.length) {
              sibPartners.forEach(() => {
                width += cardWidth + gutters;
              });
            }
          } else {
            width += cardWidth / 2 - gutters;
          }
        });
      }

      return {
        width
      };
    },
    calcParentConnector () {
      const item = this.item;
      const cardWidth = this.cardWidth;
      const cardHeight = this.cardHeight;
      const gutters = this.gutters;

      let top = 0;
      let left = 0;
      let height = 0;

      if (item.parents && item.parents.length > 1) {
        top = cardHeight / 2;
        left = cardWidth + gutters / 2;
        if (item.siblings && item.siblings.length) {
          height = cardHeight / 2 + gutters;
        } else {
          height = cardHeight / 2 + 2 * gutters;
        }
      } else {
        top = cardHeight;
        left = cardWidth / 2;
        if (item.siblings && item.siblings.length) {
          height = gutters;
        } else {
          height = 2 * gutters;
        }
      }

      return {
        top,
        left,
        height
      }
    },
    calcParentsPosition () {
      const item = this.item;
      const parents = item.parents;
      const cardWidth = this.cardWidth;
      const cardHeight = this.cardHeight;
      const gutters = this.gutters;
      let top = -cardHeight - 2 * gutters;
      let left = this.calcSiblingsConnector().width;

      if (left > 0) {
        left = left / 2 + gutters;
      }

      if (parents.length > 1) {
        left = left - cardWidth / 2 - gutters / 2;
      }

      return {
        top,
        left
      }
    },
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
}
.vue-family-col {
  position: relative;
}
.vue-family-line {
  position: absolute;
  z-index: -1;
}
</style>