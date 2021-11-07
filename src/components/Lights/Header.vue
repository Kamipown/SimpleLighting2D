<template>
  <header class="header">
    <div class="checkbox" :class="{checked: props.enabled}" @click="toggleEnabled">
      <div>
        <span/>
      </div>
    </div>
    <p>{{props.text}}</p>
    <div class="fold" :class="{folded: props.folded}" @click="toggleFolded">
      <div>
        <Icon name="angle-down" size="20"/>
      </div>
    </div>
  </header>
</template>

<script setup>
  import Icon from '@/components/Icon'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: String,
    enabled: Boolean,
    folded: Boolean
  })
  
  // eslint-disable-next-line no-undef
  const emits = defineEmits(['toggleEnabled', 'toggleFolded'])

  const toggleEnabled = () => emits('toggleEnabled')
  const toggleFolded = () => emits('toggleFolded')
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    > .checkbox {
      padding: 10px; 
      > div {
        width: 20px;
        height: 20px;
        border: 2px solid $light4;
        border-radius: 4px;
        cursor: pointer;
        transition: all 200ms ease-in-out;
        > span {
          display: block;
          width: 10px;
          height: 6px;
          margin: 3px 0 0 3px;
          border-left: 2px solid $light1;
          border-bottom: 2px solid $light1;
          transform: rotate(-45deg);
        }
      }
      &:not(.checked) {
        &:hover > div {
          background-color: $light2;
        }
        &:active > div {
          background-color: $light3;
          transition: none;
        }
      }
      &.checked {
        > div {
          border-color: $primary1;
          background-color: $primary1;
        }
        &:hover > div {
          background-color: $primary2;
        }
        &:active > div {
          background-color: $primary3;
          transition: none;
        }
      }
    }
    > p {
      flex: 1;
      font-weight: 600;
      font-size: 14px;
    }
    > .fold {
      padding: 10px;
      > div {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 200ms ease-in-out;
        > .icon::before {
          transition: all 200ms ease-in-out;
        }
      }
      &:hover > div {
        background-color: $light2;
      }
      &:active > div {
        background-color: $light3;
        transition: none;
      }
      &.folded > div > .icon::before {
        transform: rotate(-180deg);
      }
    }
  }
</style>
