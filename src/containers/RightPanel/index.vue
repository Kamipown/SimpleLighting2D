<template>
  <Panel class="rightPanel" stick="right" :folded="props.fullScreen">
    <AmbiantLight/>
    <PointLights/>
    <Settings/>
  </Panel>
</template>

<script setup>
  import Panel from '@/components/Panel'
  import AmbiantLight from './AmbiantLight'
  import PointLights from './PointLights'
  import Settings from './Settings'
  
  // eslint-disable-next-line no-undef
  const props = defineProps({
    fullScreen: Boolean,
  })
</script>
