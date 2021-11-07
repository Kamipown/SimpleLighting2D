<template>
  <p class="label" @mousedown="onMouseDown">
    {{props.text}}
  </p>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive } from 'vue'
  
  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: String
  })
  
  // eslint-disable-next-line no-undef
  const emits = defineEmits(['move'])

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('mouseup', onMouseUp, false)
    window.addEventListener('mouseLeave', onMouseUp, false)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove, false)
    window.removeEventListener('mouseup', onMouseUp, false)
    window.removeEventListener('mouseLeave', onMouseUp, false)
  })

  const state = reactive({
    down: null
  })

  const onMouseDown = () => {
    state.down = true
  }

  const onMouseMove = (e) => {
    if (!state.down)
      return
    emits('move', e.movementX)
  }

  const onMouseUp = () => {
    if (!state.down)
      return
    state.down = false
  }
</script>

<style lang="scss" scoped>
  .label {
    font-weight: 500;
    cursor: ew-resize;
    user-select: none;
  }
</style>
