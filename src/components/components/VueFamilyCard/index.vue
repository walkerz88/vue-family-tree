<template>
  <div class="vue-family-card">
    <div
      v-show="editable && controls.active"
      class="vue-family-card__overlay"
      @click="toggleControls"
    />
    <div
      class="vue-family-card__content"
      :style="{zIndex: editable && controls.active ? 200 : null}"
    >
      <VueFamilyControls
        v-show="editable && controls.active"
      />
      <div class="vue-family-card__body">
        <div
          v-show="image"
          :style="{backgroundImage: image ? `url(${image})` : null}"
          class="vue-family-card__image"
        />
        <div class="vue-family-card__info">
          <div
            v-show="name"
            class="vue-family-card__title"
          >
            {{ name }}
          </div>
          <div
            v-show="dateOfBirth"
            class="vue-family-card__caption"
          >
            {{ dateOfBirth }}
          </div>
          <button @click.prevent="$emit('set-root-person', id)">
            root
          </button>
        </div>
      </div>
      <div
        class="vue-family-card__footer"
        v-show="editable"
      >
        <button
          class="vue-family-card__icon"
          @click.prevent
        >
          <img src="./edit.svg" alt="edit">
        </button>
      </div>
      <button
        v-show="editable"
        class="vue-family-card__plus"
        @click="toggleControls"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import VueFamilyControls from './components/VueFamilyControls';

export default {
  name: 'VueFamilyCard',
  components: {
    VueFamilyControls
  },
  props: {
    id: Number,
    image: String,
    name: String,
    dateOfBirth: String,
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
      controls: {
        active: false
      }
    }
  },
  methods: {
    toggleControls () {
      if (!this.preventMouseEvents) {
        this.$emit('toggle-controls');
        this.controls.active = !this.controls.active;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-family-card {
  &__content {
    position: relative;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(94, 101, 124, 0.25);
    border-radius: 5px;
    padding: 12px;
    transition: box-shadow .2s ease;
    box-sizing: border-box;
    width: 256px;
    &:hover {
      box-shadow: 0px 0px 15px rgba(94, 101, 124, 0.5);
    }
  }
  &__body {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__image {
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
    border-radius: 50%;
    background-size: cover;
    background-position: 50%;
    & + .vue-family-card__info {
      padding-left: 12px;
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
  }
  &__caption {
    margin-top: 4px;
    font-weight: 600;
    font-size: 12px;
    color: rgba(#000, .7);
  }
  &__footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 13px;
  }
  &__icon {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    outline: none;
    > img {
      width: 14px;
      height: 14px;
    }
    & + .vue-family-card__icon {
      margin-left: 16px;
    }
  }
  &__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -11px;
    left: 50%;
    margin: 0 0 0 -11px;
    width: 22px;
    height: 22px;
    background: #000;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    border: none;
    padding: 0;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #000000;
    opacity: 0.6;
  }
}
</style>