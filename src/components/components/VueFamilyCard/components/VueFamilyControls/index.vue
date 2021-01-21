<template>
  <div class="vue-family-controls">
    <div class="vue-family-controls__header">
      <div class="vue-family-controls__header-item">
        <button class="vue-family-controls__button">
          + Добавить отца
        </button>
      </div>
      <div class="vue-family-controls__header-item">
        <button class="vue-family-controls__button">
          + Добавить мать
        </button>
      </div>
    </div>
    <div class="vue-family-controls__left">
      <div class="vue-family-controls__left-item">
        <button class="vue-family-controls__button">
          + Добавить брата
        </button>
      </div>
      <div class="vue-family-controls__left-item">
        <button class="vue-family-controls__button">
          + Добавить сестру
        </button>
      </div>
    </div>
    <div class="vue-family-controls__right">
      <button class="vue-family-controls__button">
        + Добавить партнера
      </button>
    </div>
    <div class="vue-family-controls__footer">
      <div class="vue-family-controls__footer-item">
        <button class="vue-family-controls__button">
          + Добавить сына
        </button>
      </div>
      <div class="vue-family-controls__footer-item">
        <button class="vue-family-controls__button">
          + Добавить дочь
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFamilyControls'
}
</script>

<style lang="scss" scoped>
.vue-family-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &__button {
    display: block;
    width: 232px;
    padding: 16px;
    border: 2px solid #fff;
    border-radius: 5px;
    background: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    &:hover,
    &:active {
      background-color: #fff;
      color: #000;
    }
  }
  &__header,
  &__footer {
    .vue-family-controls__button {
      margin: 0 16px;
    }
  }
  &__header {
    display: flex;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-100% - 50px));
    &:before {
      content: '';
      display: block;
      width: 2px;
      height: 50px;
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -1px;
      background-color: #fff;
    }
  }
  &__header-item {
    display: flex;
    flex-direction: column;
    &:first-child {
      &:after {
        content: '';
        display: block;
        box-sizing: border-box;
        width: 50%;
        height: 50px;
        align-self: flex-end;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        border-radius: 0 0 0 10px;
      }
    }
    &:last-child {
      &:after {
        content: '';
        display: block;
        box-sizing: border-box;
        width: 50%;
        height: 50px;
        align-self: flex-start;
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
        border-radius: 0 0 10px 0;
      }
    }
  }
  &__left {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(calc(-100% - 100px), -50%);
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 100%;
      display: block;
      width: 50px;
      height: 50%;
      border: 2px solid #fff;
      border-left: none;
      border-radius: 0 10px 10px 0;
      transform: translate(0, -50%);
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: calc(100% + 50px);
      display: block;
      width: 50px;
      height: 2px;
      margin-top: -1px;
      background-color: #fff;
    }
  }
  &__left-item {
    padding: 12px 0;
  }
  &__right {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(calc(100% + 50px), -50%);
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 100%;
      display: block;
      width: 50px;
      height: 2px;
      background-color: #fff;
    }
  }
  &__footer {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, calc(100% + 50px));
    &:before {
      content: '';
      display: block;
      width: 2px;
      height: 50px;
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -1px;
      background-color: #fff;
    }
  }
  &__footer-item {
    display: flex;
    flex-direction: column;
    &:first-child {
      &:before {
        content: '';
        display: block;
        box-sizing: border-box;
        width: 50%;
        height: 50px;
        align-self: flex-end;
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        border-radius: 10px 0 0 0;
      }
    }
    &:last-child {
      &:before {
        content: '';
        display: block;
        box-sizing: border-box;
        width: 50%;
        height: 50px;
        align-self: flex-start;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        border-radius: 0 10px 0 0;
      }
    }
  }
}
</style>