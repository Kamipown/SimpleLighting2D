<template>
  <div class="gizmo" :style="style" @mousedown="onMouseDown">
    <span v-show="props.radius * props.scale >= 10">{{props.id}}</span>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive, computed } from 'vue'

  import hexToRGB from '@/lib/hexToRGB'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: Number,
    offset: Object,
    scale: Number,
    x: Number,
    y: Number,
    radius: Number,
    intensity: Number,
    color: String
  })
  
  // eslint-disable-next-line no-undef
  const emits = defineEmits(['move', 'scale', 'intensify'])

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
    down: false,
    x: 0,
    y: 0
  })

  const onMouseDown = () => {
    state.down = true
    state.x = 0
    state.y = 0
  }

  const onMouseMove = ({ ctrlKey, shiftKey, movementX, movementY }) => {
    if (!state.down)
      return
    state.x += movementX
    state.y += movementY
    let moveX = parseInt(state.x / props.scale)
    let moveY = parseInt(state.y / props.scale)
    if (moveX || moveY) {
      if (shiftKey)
        emits('scale', { x: moveX })
      else if (ctrlKey)
        emits('intensify', { x: moveX })
      else
        emits('move', { x: moveX, y: moveY })
      state.x -= moveX * props.scale
      state.y -= moveY * props.scale
    }
  }

  const onMouseUp = () => {
    if (!state.down)
      return
    state.down = false
  }

  const style = computed(() => ({
    left: (props.x - props.radius) * props.scale + props.offset.x + 'px',
    top: (props.y - props.radius) * props.scale + props.offset.y + 'px',
    width: props.radius * 2 * props.scale + 'px',
    height: props.radius * 2 * props.scale + 'px',
    borderColor: props.color,
    backgroundColor: `rgba(${[...Object.values(hexToRGB(props.color)), props.intensity / 100].join(',')})`
  }))
</script>

<style lang="scss" scoped>
  .gizmo {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid;
    border-radius: 50%;
    > span {
      line-height: 12px;
      font-weight: 600;
      font-size: 12px;
      user-select: none;
    }
  }
</style>
