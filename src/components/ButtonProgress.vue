<template>
  <div class="processButton" :class="{enabled: props.enabled, disabled: props.disabled}" @click="onClick">
    <span>{{props.text}}</span>
    <div class="progress">
      <div class="inner">
        <span>{{props.text}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: String,
    icon: String,
    value: String,
    enabled: Boolean,
    disabled: Boolean,
  })
  
  // eslint-disable-next-line no-undef
  const emits = defineEmits(['click'])

  const onClick = () => {
    if (props.enabled)
      emits('click')
  }
</script>

<style lang="scss" scoped>
  .processButton {
    position: relative;
    width: 200px;
    height: 40px;
    border-radius: 8px;
    background-color: $light2;
    overflow: hidden;
    user-select: none;
    > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 500;
    }
    > .progress {
      position: relative;
      width: v-bind('props.value');
      height: 100%;
      background-color: $primary1;
      overflow: hidden;
      transition: width 200ms;
      > .inner {
        width: 200px;
        height: 100%;
        overflow: hidden;
        > span {
          position: absolute;
          top: 50%;
          left: 100px;
          transform: translate(-50%, -50%);
          font-weight: 500;
          color: $light1;
        }
      }
    }
    &.enabled {
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      &:hover > div {
        background-color: $primary2;
      }
      &:active > div {
        background-color: $primary3;
        transition: none;
      }
    }
    &.disabled > .progress {
      background-color: $light3;
      > .inner > span {
        color: $dark3;
      }
    }
  }
</style>
