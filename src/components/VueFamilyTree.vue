<template>
  <div class="family-tree">
    <div class="family-tree__row">
        <div
          v-for="(block, index) in tree"
          :key="index"
          class="family-tree__col"
          :class="{'family-tree__col_couple': block.firstPerson && block.secondPerson}"
        >
        <div class="family-tree__content">
          <div :class="{
            'family-tree__couple': block.firstPerson && block.secondPerson,
            'family-tree__couple_children': block.children && block.children.length
          }">
            <div
              v-if="block.firstPerson"
              class="family-tree__person"
            >
              <div class="family-tree__card">
                <Card
                  :image="block.firstPerson.image"
                  :name="block.firstPerson.name"
                  @click="$emit('card-click', $event)"
                />
              </div>
            </div>
            <div
              v-if="block.secondPerson"
              class="family-tree__person"
            >
              <div class="family-tree__card">
                <Card
                  :image="block.secondPerson.image"
                  :name="block.secondPerson.name"
                  @click="$emit('card-click', $event)"
                />
              </div>
            </div>
          </div>
        </div>
        <VueFamilyTree
          v-if="block.children"
          :tree="block.children"
          @card-click="$emit('card-click', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card';

export default {
  name: 'VueFamilyTree',
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
  .family-tree {
    position: relative;
    .family-tree {
      padding-top: 16px;
      .family-tree__col {
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
          left: 82px;
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
          padding-left: 146px;
          padding-top: 0;
          &:before {
            display: none;
          }
          &:after{
            display: none;
          }
        }
        &_couple {
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
        }
      }
    }
    &__row {
      display: flex;
      justify-content: center;
    }
    &__col {
      position: relative;
      padding: 0 16px;
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
        left: 16px;
        right: 16px;
        height: 1px;
        background-color: #ddd;
      }
      &:after {
        content: '';
        position: absolute;
        top: 47px;
        left: 50%;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        border-radius: 50%;
        background-color: #ddd;
      }
      .family-tree__person {
        &:first-child {
          padding-right: 16px;
        }
        &:last-child {
          padding-left: 16px;
        }
      }
      &_children {
        .family-tree__person {
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
          }
        }
      }
    }
    &__person {
      position: relative;
      padding: 0 16px;
      z-index: 10;
    }
  }
</style>