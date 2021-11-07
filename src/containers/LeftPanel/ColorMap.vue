<template>
  <PanelSection class="colorMap" title="Color Map" icon="image">
    <ImageSelector
      text="Import"
      @change="onColorMapChange"
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
    src: store.getters['colorMap/src'],
    name: store.getters['colorMap/name'],
    size: store.getters['colorMap/size'],
    width: store.getters['colorMap/width'],
    height: store.getters['colorMap/height'],
    lastUpdate: store.getters['colorMap/date']
  }))

  const onColorMapChange = file => {
    store.dispatch('colorMap/load', {
      file,
      setResults: true
    })
  }
</script>
