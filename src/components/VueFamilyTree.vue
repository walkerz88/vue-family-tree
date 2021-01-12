<template>
  <div
    ref="wrapper"
    class="vue-family-tree"
    @mousedown="dragstart"
    @mousemove="drag"
    @mouseup="dragend"
    @mouseleave="dragend"
    @touchstart="dragstart"
    @touchmove="drag"
    @touchend="dragend"
    @touchcancel="dragend"
    @touchleave="dragend"
    :style="{
      overflow: enableDrag ? 'hidden' : null,
      cursor: dragAndDrop.mouseCursor,
      ...wrapperStyles,
    }"
  >
    <VueFamilyTreeBranch
      :tree="tree"
      :style="{
        position: enableDrag ? 'absolute' : null,
        top: `${position.y}px`,
        left: `${position.x}px`
      }"
      @card-click="cardClick"
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
    },
    enableDrag: {
      type: Boolean,
      default: true
    },
    wrapperStyles: {
      type: Object,
      default () {
        return this.enableDrag ? {
          position: 'relative',
          width: '100%',
          height: '600px'
        } : null
      }
    },
    dragCursor: {
      type: String,
      default: 'grabbing'
    },
    mouseChangeDiff: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      dragAndDrop: {
        dragStarted: false,
        dragStartX: 0,
        dragStartY: 0,
        diffX: 0,
        diffY: 0,
        mouseCursor: 'default',
      },
      preventMouseEvents: false,
      position: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    mouseover (region) {
      if (!this.preventMouseEvents) {
        this.$emit('mouseover', region);
      }
    },
    mouseleave (region) {
      if (!this.preventMouseEvents) {
        this.$emit('mouseleave', region);
      }
    },
    cardClick (payload) {
      if (!this.preventMouseEvents) {
        this.$emit('card-click', payload);
      }
    },
    dragstart (event) {
      if (this.enableDrag) {
        if (this.mobilePreventScroll) {
          const breakpoint = this.mobilePreventScroll.breakpoint || 1024;
          const selector = this.mobilePreventScroll.selector || 'body';
          const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
          if (mql.matches) {
            const $el = document.querySelector(selector);
            this.previousMobileOverflowType = $el.style.overflow;
            $el.style.overflow = 'hidden';
          }
        }
        this.dragAndDrop.dragStartX = event.pageX || event.touches[0].pageX;
        this.dragAndDrop.dragStartY = event.pageY || event.touches[0].pageY;
        this.dragAndDrop.dragStarted = true;
      }
      this.$emit('dragstart', event);
    },
    drag (event) {
      if (this.enableDrag) {
        if (this.dragAndDrop.dragStarted) {
          this.dragAndDrop.diffX = (event.pageX || event.touches[0].pageX) - this.dragAndDrop.dragStartX;
          this.dragAndDrop.diffY = (event.pageY || event.touches[0].pageY) - this.dragAndDrop.dragStartY;
          if (this.dragAndDrop.diffX > this.mouseChangeDiff || this.dragAndDrop.diffX < -this.mouseChangeDiff || this.dragAndDrop.diffY > this.mouseChangeDiff || this.dragAndDrop.diffX < -this.mouseChangeDiff) {
            this.preventMouseEvents = true;
            this.dragAndDrop.mouseCursor = this.dragCursor;
          }
          this.position.x += this.dragAndDrop.diffX;
          this.position.y += this.dragAndDrop.diffY;
          this.dragAndDrop.dragStartX = event.pageX || event.touches[0].pageX;
          this.dragAndDrop.dragStartY = event.pageY || event.touches[0].pageY;
          this.$emit('drag', event);
        }
      }
    },
    dragend () {
      if (this.enableDrag) {
        this.dragAndDrop.dragStarted = false;
        this.dragAndDrop.mouseCursor = 'default';
        if (this.mobilePreventScroll) {
          const selector = this.mobilePreventScroll.selector || 'body';
          const $el = document.querySelector(selector);
          $el.style.overflow = this.previousMobileOverflowType;
        }
        setTimeout(() => {
          this.preventMouseEvents = false;
        }, 150);
      }
      this.$emit('dragend', event);
    },
    getTreeClientRect () {
      return this.$refs.tree.getBoundingClientRect();
    },
    getWrapperClientRect () {
      return this.$refs.wrapper.getBoundingClientRect();
    },
    centerTree () {
      return new Promise((resolve, reject) => {
        try {
          const wrapperCenterX = this.getWrapperClientRect().width / 2;
          const wrapperCenterY = this.getWrapperClientRect().height / 2;
          const mapCenterX = this.getTreeClientRect().width / 2;
          const mapCenterY = this.getTreeClientRect().height / 2;
          this.position.x = wrapperCenterX - mapCenterX;
          this.position.y = wrapperCenterY - mapCenterY;
          this.$emit('center-map');
          resolve(true);
        } catch (e) {
          reject (e);
        }
      });
    },
  }
}
</script>