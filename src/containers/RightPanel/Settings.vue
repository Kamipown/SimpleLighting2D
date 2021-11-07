<template>
  <PanelSection class="settings" title="Settings" icon="setting">
    <InputNumber
      text="Scale multiplier"
      :value="state.scale"
      :min="1"
      :max="16"
      @change="onScaleChange"
    />
    <InputSwitch text="Show gizmos when UI is visible" :value="state.showGizmos" @toggle="onShowGizmos"/>
    <InputSwitch text="Show gizmos when UI is hidden" :value="state.showGizmosFullScreen" @toggle="onShowGizmosFullScreen"/>
    <InputSwitch text="Auto hide UI when running" :value="state.autoMaximize" @toggle="onAutoMaximize"/>
  </PanelSection>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import PanelSection from '@/components/PanelSection'
  import { InputSwitch, InputNumber } from '@/components/inputs'

  const store = useStore()

  const state = computed(() => ({
    showGizmos: store.getters['settings/showGizmos'],
    showGizmosFullScreen: store.getters['settings/showGizmosFullScreen'],
    autoMaximize: store.getters['settings/autoMaximize'],
    scale: store.getters['settings/scale']
  }))

  const onShowGizmos = () => store.dispatch('settings/toggleShowGizmos')
  const onShowGizmosFullScreen = () => store.dispatch('settings/toggleShowGizmosFullScreen')
  const onAutoMaximize = () => store.dispatch('settings/toggleAutoMaximize')
  const onScaleChange = v => store.dispatch('settings/setScale', v)
</script>

<style lang="scss" scoped>
  .settings {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
</style>
