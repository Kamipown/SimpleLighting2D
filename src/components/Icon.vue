<template>
  <i :class="`icon uil uil-${props.name}`"/>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    }
  })

  const s = `${props.size}px`
</script>

<style lang="scss" scoped>
  .icon {
    width: v-bind('s');
    height: v-bind('s');
    line-height: v-bind('s');
    font-size: v-bind('s');
  }
</style>
