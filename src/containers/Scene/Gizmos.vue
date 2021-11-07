<template>
  <div class="gizmos" v-show="(!state.fullScreen && state.showGizmos) || (state.fullScreen && state.showGizmosFullScreen)">
    <Gizmo v-for="light in lights"
      :key="light.id"
      :id="light.id"
      :offset="props.offset"
      :scale="props.scale"
      v-bind="light.values"
      @move="move => onMove(light.id, light.values.x + move.x, light.values.y + move.y)"
      @scale="move => onScale(light.id, Math.max(light.values.radius + move.x, 0))"
      @intensify="move => onIntensify(light.id, Math.min(Math.max(light.values.intensity + move.x, 0), 100))"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import Gizmo from '@/components/Gizmo'

  const store = useStore()

  // eslint-disable-next-line no-undef
  const props = defineProps({
    offset: Object,
    scale: Number
  })

  const lights = computed(() => store.getters['lights/pointLights'].filter(light => light.enabled))

  const onMove = (id, x, y) => {
    store.dispatch('lights/edit', { id, data: { x, y } })
  }

  const onScale = (id, radius) => {
    store.dispatch('lights/edit', { id, data: { radius } })
  }

  const onIntensify = (id, intensity) => {
    store.dispatch('lights/edit', { id, data: { intensity } })
  }

  const state = computed(() => ({
    fullScreen: store.getters['fullScreen'],
    showGizmos: store.getters['settings/showGizmos'],
    showGizmosFullScreen: store.getters['settings/showGizmosFullScreen'],
  }))
</script>

<style lang="scss" scoped>
  .gizmos {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    > div {
      position: absolute;
      border-radius: 50%;
    }
  }
</style>