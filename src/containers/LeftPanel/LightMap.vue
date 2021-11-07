<template>
  <PanelSection class="lightMap" title="Light Map" icon="image">
    <ImageSelector
      text="Import"
      @change="onLightMapChange"
    />
    <ImagePreview v-bind="state"/>
  </PanelSection>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import PanelSection from '@/components/PanelSection'
  import ImageSelector from '@/components/ImageSelector'
  import ImagePreview from '@/components/ImagePreview'

  const store = useStore()

  const state = computed(() => ({
    src: store.getters['lightMap/src'],
    name: store.getters['lightMap/name'],
    size: store.getters['lightMap/size'],
    width: store.getters['lightMap/width'],
    height: store.getters['lightMap/height'],
    lastUpdate: store.getters['lightMap/date']
  }))

  const onLightMapChange = file => {
    store.dispatch('lightMap/load', { file })
  }
</script>
