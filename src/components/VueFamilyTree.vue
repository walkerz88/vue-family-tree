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
      overflow: draggable ? 'hidden' : null,
      cursor: dragAndDrop.mouseCursor,
      ...wrapperStyles,
    }"
  >
    <VueFamilyBranch
      ref="tree"
      :item="familyTree"
      :editable="editable"
      :style="{
        position: draggable ? 'absolute' : null,
        top: `${position.y}px`,
        left: `${position.x}px`
      }"
      :prevent-mouse-events="preventMouseEvents"
      @add-partner="addPartner"
    />
  </div>
</template>

<script>
import VueFamilyBranch from './components/VueFamilyBranch';

export default {
  name: 'VueFamilyTree',
  components: {
    VueFamilyBranch
  },
  props: {
    tree: {
      type: Array,
      default () {
        return []
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    wrapperStyles: {
      type: Object,
      default () {
        return this.draggable ? {
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
  mounted () {
    if (this.draggable) {
      this.centerTree();
    }
  },
  methods: {
    dragstart (event) {
      if (this.draggable) {
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
      if (this.draggable) {
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
      if (this.draggable) {
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
      return this.$refs.tree.$el.getBoundingClientRect();
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
    addPartner (item) {
      if (this.editable) {
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
}
</script>