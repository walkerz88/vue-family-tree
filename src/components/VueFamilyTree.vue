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
    <pre>{{ familyTree }}</pre>
    <VueFamilyBranch
      ref="tree"
      :item="familyTree"
      :root-person-id="rootPersonId"
      :gutters="gutters"
      :card-width="cardWidth"
      :card-height="cardHeight"
      :line-color="lineColor"
      :line-width="lineWidth"
      :line-border-radius="lineBorderRadius"
      :editable="editable"
      :style="{
        position: draggable ? 'absolute' : null,
        top: `${position.y}px`,
        left: `${position.x}px`
      }"
      :prevent-mouse-events="preventMouseEvents"
      @set-root-person="$emit('set-root-person', $event)"
    />
  </div>
</template>

<script>
import VueFamilyBranch from './components/VueFamilyBranch';
import { cloneDeep } from 'lodash/fp';

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
    rootPersonId: Number,
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
    lineWidth: {
      type: Number,
      default: 1
    },
    lineColor: {
      type: String,
      default: '#b7b7b7'
    },
    lineBorderRadius: {
      type: Number,
      default: 10
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
      let array = cloneDeep(this.tree);
      if (array && Array.isArray(array) && array.length) {

        // Find grand parents person
        const rootPerson = array.find(item => (item.id === this.rootPersonId));

        array = array.map(item => {
          if (item.ppid === rootPerson.id) {
            item.ppid = item.pid;
            item.pid = rootPerson.id;
          }
          return item;
        });

        if (rootPerson.partner_id) {
          array = array.map(item => {
            if (item.id === rootPerson.partner_id) {
              item.partner_id = rootPerson.id;
              item.partner_status = rootPerson.partner_status;
            }
            return item;
          });
          delete rootPerson.partner_id;
          delete rootPerson.partner_status;
        }

        // Connect parents by partner_id
        array.forEach(item => {
          if (item.pid && item.ppid) {
            let foundPpId = array.find(i => i.id === item.ppid);
            foundPpId.partner_id = item.pid;
          }
        });

        obj = {
          ...rootPerson,
          ...findRelations(rootPerson)
        }
      }

      function findRelations (person, type) {
        let rel = {};

        // Partners
        let partners = [];

        if (['partners'].indexOf(type) === -1) {
          partners = array.filter(item => item.partner_id === person.id);

          if (partners && partners.length) {
            // Sort partners: married first (no partner_status)
            partners.sort(item => item.partner_status ? 1 : -1);
            partners = partners.map(item => {
              return {
                ...item,
                ...findRelations(item, 'partners')
              }
            });
            rel.partners = partners;
          }
        }

        // Parents
        let parents = [];

        if (['partners', 'childrens', 'siblings'].indexOf(type) === -1) {
          parents = array.filter(item => item.id === person.pid || item.id === person.ppid);
          
          if (parents && parents.length) {
            parents = parents.map(item => {
              return {
                ...item,
                ...findRelations(item, 'parents')
              }
            });
            rel.parents = parents;
          } 
        }

        // Siblings
        let siblings = [];

        if (['partners', 'siblings', 'childrens'].indexOf(type) === -1) {
          if (person.ppid) {
            siblings = array.filter(item => item.id !== person.id && item.pid === person.pid && item.ppid === person.ppid);
          } else if (person.pid) {
            siblings = array.filter(item => item.id !== person.id && item.pid === person.pid);
          }

          if (siblings && siblings.length) {
            siblings = siblings.map(item => {
              return {
                ...item,
                ...findRelations(item, 'siblings')
              }
            });
            rel.siblings = siblings;
          } 
        }

        // 
        // let childrens = [];
        // 

        /*if (!prevPerson || (person.pid && person.pid !== prevPerson.pid)) {
          

          parents = array.filter(item => item.id === person.pid || item.id === person.ppid);
          partners = array.filter(item => item.partner_id === person.id);
          childrens = array.filter(item => item.pid === person.id);
        }*/

        /* if (childrens && childrens.length) {
          childrens = childrens.map(item => {
            return {
              ...item,
              ...findRelations(item, 'childrens')
            }
          });
          rel.childrens = childrens;
        }

        */

        return rel;
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