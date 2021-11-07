<template>
  <canvas
    class="canvas"
    ref="canvas"
    :width="state.width"
    :height="state.height"
    :style="{
      width: state.width * state.scale + 'px',
      height: state.height * state.scale + 'px'
    }"
  />
</template>

<script setup>
  import { computed, reactive, ref, watch } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const canvas = ref(null)

  const state = reactive({
    width: computed(() => store.getters['colorMap/width']),
    height: computed(() => store.getters['colorMap/height']),
    results: computed(() => store.getters['results']),
    scale: computed(() => store.getters['settings/scale'])
  })

  watch(() => state.results, results => {
    const ctx = canvas.value.getContext('2d')
    const imageData = new ImageData(results, state.width, state.height)
    ctx.putImageData(imageData, 0, 0)
  })
</script>

<style lang="scss" scoped>
  .canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>
