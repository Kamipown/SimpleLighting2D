<template>
  <Panel class="leftPanel" stick="left" :folded="props.fullScreen">
    <ColorMap/>
    <LightMap/>
  </Panel>
</template>

<script setup>
  import Panel from '@/components/Panel'
  import ColorMap from './ColorMap'
  import LightMap from './LightMap'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    fullScreen: Boolean,
  })
</script>
