<template>
  <div
    class="scene"
    :class="{
      fullScreen: props.fullScreen,
      centerHorizontal: state.width < dimensions.width,
      centerVertical: state.height < dimensions.height
    }"
    :style="style"
    @wheel.ctrl.prevent="onWheel"
  >
    <Canvas v-show="state.results"/>
    <Gizmos v-show="state.width" :offset="offset" :scale="state.scale"/>
  </div>
</template>

<script setup>
  import { computed, reactive } from 'vue'
  import { useStore } from 'vuex'

  import Canvas from './Canvas'
  import Gizmos from './Gizmos'

  import useSceneDimensions from '@/composables/useSceneDimensions'

  const store = useStore()

  // eslint-disable-next-line no-undef
  const props = defineProps({
    fullScreen: Boolean,
  })

  const dimensions = useSceneDimensions()

  const state = reactive({
    width: computed(() => store.getters['colorMap/width']),
    height: computed(() => store.getters['colorMap/height']),
    scale: computed(() => store.getters['settings/scale']),
    results: computed(() => store.getters['results']),
  })

  const offset = computed(() => {
    let w = state.width * state.scale
    let h = state.height * state.scale
    if (w <= dimensions.width && h <= dimensions.height) {
      return {
        x: (dimensions.width - w) / 2,
        y: (dimensions.height - h) / 2,
        overflow: 'hidden'
      }
    }
    if (w <= dimensions.width - 20) {
      return {
        x: (dimensions.width - w) / 2,
        y: 0,
        overflow: 'auto'
      }
    }
    if (h <= dimensions.height - 20) {
      return {
        x: 0,
        y: (dimensions.height - h) / 2,
        overflow: 'auto'
      }
    }
    return {
      x: 0,
      y: 0,
      overflow: 'auto'
    }
  })

  const style = computed(() => ({
    paddingLeft: offset.value.x + 'px',
    paddingTop: offset.value.y + 'px',
    overflow: offset.value.overflow
  }))

  const onWheel = ({ deltaY }) => {
    if (deltaY < 0 && state.scale < 16)
      store.dispatch('settings/setScale', state.scale + 1)
    else if (deltaY > 0 && state.scale > 1)
      store.dispatch('settings/setScale', state.scale - 1)
  }
</script>

<style lang="scss" scoped>
  .scene {
    position: absolute;
    top: 0;
    right: 360px;
    bottom: 0;
    left: 360px;
    height: 100%;
    overflow: auto;
    &:not(.fullScreen) {
      right: 360px;
      left: 360px;
    }
    &.fullScreen {
      left: 0px;
      right: 0px;
    }
    // &.centerHorizontal {
    // }
    // &.centerVertical {
    // }
  }
</style>
