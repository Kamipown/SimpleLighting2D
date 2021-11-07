<template>
  <div class="button" :class="{disabled: props.disabled, small: props.small}" @click="onClick">
    <p v-if="props.text">{{props.text}}</p>
    <Icon v-if="props.icon" :name="props.icon" :size="props.small ? 16 : 20"/>
  </div>
</template>

<script setup>
  import Icon from '@/components/Icon'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['click'])

  const onClick = () => {
    if (!props.disabled)
    emits('click')
  }
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    column-gap: 10px;
    border-radius: 8px;
    color: $light1;
    user-select: none;
    > p {
      font-weight: 500;
    }
    &:not(.disabled) {
      background-color: $primary1;
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      &:hover {
        background-color: $primary2;
      }
      &:active {
        background-color: $primary3;
      }
    }
    &.disabled {
      background-color: $light3;
      color: $dark3;
    }
    &.small {
      height: 28px;
      border-radius: 4px;
      > p {
        font-size: 14px;
      }
    }
  }
</style>
