<template>
  <label class="inputSwitch" :class="{active: props.value}" @click="onClick">
    <div><div/></div>
    <p>{{props.text}}</p>
  </label>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: String,
    value: Boolean
  })
  
  // eslint-disable-next-line no-undef
  const emits = defineEmits(['toggle'])

  const onClick = () => emits('toggle')
</script>

<style lang="scss" scoped>
  .inputSwitch {
    display: flex;
    align-items: center;
    column-gap: 20px;
    padding: 5px;
    cursor: pointer;
    > div {
      position: relative;
      width: 24px;
      height: 8px;
      border-radius: 4px;
      background-color: $light3;
      > div {
        position: absolute;
        top: -4px;
        left: -6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $light4;
        transition: all 200ms ease-in-out;
      }
    }
    > p {
      flex: 1;
      font-weight: 500;
      font-size: 14px;
      user-select: none;
    }
    &.active > div > div {
      left: 14px;
      background-color: $primary1;
    }
  }
</style>
