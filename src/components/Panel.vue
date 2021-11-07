<template>
  <aside class="panel" :class="[props.stick, {folded: props.folded}]">
    <slot/>
  </aside>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    stick: {
      type: String,
      required: true,
      validator: v => ['left', 'right'].includes(v)
    },
    folded: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
  .panel {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    width: 360px;
    height: 100%;
    background-color: $light1;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    overflow: auto;
    transition: all 200ms ease-in-out;
    &.left {
      &:not(.folded) {
        left: 0;
      }
      &.folded {
        left: -360px;
      }
    }
    &.right {
      &:not(.folded) {
        right: 0;
      }
      &.folded {
        right: -360px;
      }
    }
  }
</style>
