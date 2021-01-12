<template>
  <div class="vue-family-tree__branch">
    <div class="vue-family-tree__row">
      <div
        v-for="(block, index) in tree"
        :key="index"
        class="vue-family-tree__col"
        :class="{'vue-family-tree__col_couple': block.firstPerson && block.secondPerson}"
      >
        <div class="vue-family-tree__content">
          <div :class="{
            'vue-family-tree__couple': block.firstPerson && block.secondPerson,
            'vue-family-tree__couple_children': block.children && block.children.length
          }">
            <div
              v-if="block.firstPerson"
              class="vue-family-tree__person"
            >
              <div class="vue-family-tree__card">
                <slot
                  name="card"
                  :item="block.firstPerson"
                >
                  <Card
                    :image="block.firstPerson.image"
                    :name="block.firstPerson.name"
                    :source="block.firstPerson"
                    @click="$emit('card-click', $event)"
                  />
                </slot>
              </div>
            </div>
            <div
              v-if="block.secondPerson"
              class="vue-family-tree__person"
            >
              <div class="vue-family-tree__card">
                <slot
                  name="card"
                  :item="block.secondPerson"
                >
                  <Card
                    :image="block.secondPerson.image"
                    :name="block.secondPerson.name"
                    :source="block.secondPerson"
                    @click="$emit('card-click', $event)"
                  />
                </slot>
              </div>
            </div>
          </div>
        </div>
        <VueFamilyTreeBranch
          v-if="block.children"
          :tree="block.children"
          @card-click="$emit('card-click', $event)"
        >
          <template v-slot:card="{item}">
            <slot
              name="card"
              :item="item"
            />
          </template>
        </VueFamilyTreeBranch>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card';

export default {
  name: 'VueFamilyTreeBranch',
  components: {
    Card
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

<style lang="scss" scoped>
  .vue-family-tree {
    &__branch {
      position: relative;
      .vue-family-tree__branch {
        padding-top: 16px;
        .vue-family-tree__col {
          padding-top: 16px;
          &:before {
            content: '';
            position: absolute;
            top: 0;
            width: 100%;
            height: 16px;
            right: 0;
            border-top: 1px solid #ddd;
          }
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            height: 16px;
            width: 1px;
            background-color: #ddd;
          }
          &:first-child {
            &:before {
              width: 82px;
              border-left: 1px solid #ddd;
            }
            &:after {
              display: none;
            }
          }
          &:last-child {
            &:before {
              width: 82px;
              border-right: 1px solid #ddd;
              left: 0;
              right: auto;
            }
            &:after {
              display: none;
            }
          }  
          &:first-child:last-child {
            padding-top: 0;
            &:before {
              display: none;
            }
            &:after{
              display: none;
            }
          }
          &_couple {
            &:after {
              left: calc(50% - 68px);
            }
            &:first-child {
              &:before {
                width: calc(50% + 68px);
              }
            }
            &:last-child {
              &:before {
                width: calc(50% - 68px);
              }
            }
            &:first-child:last-child {
              padding-left: 146px;
            }
          }
        }
      }
    }
    &__row {
      display: flex;
      justify-content: center;
    }
    &__col {
      position: relative;
      & + .vue-family-tree__col {
        padding-left: 16px;
      }
    }
    &__content {
      display: flex;
      justify-content: center;
    }
    &__couple {
      position: relative;
      display: inline-flex;
      &:before {
        content: '';
        position: absolute;
        top: 50px;
        left: 50%;
        margin-left: -16px;
        height: 1px;
        width: 32px;
        background-color: #ddd;
      }
      .vue-family-tree__person {
        &:first-child {
          padding-right: 16px;
        }
        &:last-child {
          padding-left: 16px;
        }
      }
      &_children {
        .vue-family-tree__person {
          &:last-child {
            &:before {
              content: '';
              position: absolute;
              top: 50px;
              left: 0;
              width: 1px;
              height: calc(100% - 34px);
              background-color: #ddd;
            }
            &:after {
              content: '';
              position: absolute;
              top: 48px;
              left: -3px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #ddd;
            }
          }
        }
      }
    }
    &__person {
      position: relative;
      z-index: 10;
    }
  }
</style>