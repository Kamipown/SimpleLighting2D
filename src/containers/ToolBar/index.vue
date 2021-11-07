<template>
  <div class="toolBar" :class="{fullScreen: props.fullScreen}">
    <Process/>
    <Button icon="expand-arrows-alt" @click="toggleFullScreen"/>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'

  import Process from './Process'
  import Button from '@/components/Button'

  const store = useStore()

  // eslint-disable-next-line no-undef
  const props = defineProps({
    fullScreen: Boolean,
  })

  const toggleFullScreen = () => store.dispatch('toggleFullScreen')
</script>

<style lang="scss" scoped>
  .toolBar {
    position: absolute;
    z-index: 20;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    column-gap: 20px;
    padding: 20px;
    border-radius: 8px;
    background-color: $light1;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    transition: all 200ms ease-in-out;
    &.fullScreen {
      bottom: 0;
      border-radius: 8px 8px 0 0;
    }
  }
</style>
