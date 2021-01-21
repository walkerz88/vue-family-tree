<template>
  <div class="vue-family-card">
    <div class="vue-family-card__content">
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
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'VueFamilyCard',
  props: {
    image: String,
    name: String,
    dateOfBirth: String,
    editable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-family-card {
  position: relative;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 15px rgba(94, 101, 124, 0.25);
  border-radius: 5px;
  padding: 12px;
  &__content {
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
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
}
</style>