<template>
  <div class="branch">
    <div class="row" v-if="item.parents && item.parents.length">
      <div class="row__item"
        v-for="(parent, index) in item.parents"
        :key="index"
      >
        <Branch :item="parent" />
      </div>
    </div>
    <div class="row">
      <div class="row__item">
        <div
          v-show="showControls"
          class="row"
        >
          <div class="row__item">
            <button>
              + Добавить отца
            </button>
          </div>
          <div class="row__item">
            <button>
              + Добавить мать
            </button>
          </div>
        </div>
        <div class="row">
          <div
            v-show="showControls"
            class="row__item"
          >
            <div style="margin-bottom: 16px;">
              <button>
                + Добавить брата
              </button>
            </div>
            <button>
              + Добавить сестру
            </button>
          </div>
          <div class="row__item">
            <button @click.prevent="toggleControls">
              {{ item.name }}
            </button>
          </div>
          <div
            v-show="showControls"
            class="row__item"
          >
            <button @click="addPartner(item)">
              + Добавить жену
            </button>
          </div>
        </div>
        <div
          v-show="showControls"
          class="row"
        >
          <div class="row__item">
            <button>
              + Добавить сына
            </button>
          </div>
          <div class="row__item">
            <button>
              + Добавить дочь
            </button>
          </div>
        </div>
      </div>
      <div class="row__item"
        v-for="(partner, index) in item.partners"
        :key="index"
      >
        <Branch
          :item="partner"
          @add-partner="addPartner"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Branch',
  props: {
    item: Object
  },
  data () {
    return {
      showControls: false
    }
  },
  methods: {
    toggleControls () {
      this.showControls = !this.showControls;
    },
    addPartner (item) {
      this.$emit('add-partner', item);
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  &__item {
    margin-right: 16px;
    padding: 8px;
  }
}
</style>