<template>
  <div class="app">
    <LeftPanel :fullScreen="fullScreen"/>
    <Scene :fullScreen="fullScreen"/>
    <RightPanel :fullScreen="fullScreen"/>
    <ToolBar :fullScreen="fullScreen"/>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'

  import defaultColorMap from '@/constants/defaultColorMap'
  import defaultLightMap from '@/constants/defaultLightMap'

  import LeftPanel from '@/containers/LeftPanel'
  import RightPanel from '@/containers/RightPanel'
  import Scene from '@/containers/Scene'
  import ToolBar from '@/containers/ToolBar'

  const store = useStore()

  const fullScreen = computed(() => store.getters['fullScreen'])
  const processing = computed(() => store.getters['processing'])
  const src = computed(() => store.getters['colorMap/src'])

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown, false)
    store.dispatch('colorMap/loadDefault', {
      data: defaultColorMap,
      setResults: true
    })
    store.dispatch('lightMap/loadDefault', {
      data: defaultLightMap
    })
  })

  const onKeyDown = ({ ctrlKey, shiftKey, metaKey, key }) => {
    // if (target.tagName === 'INPUT')
    //   return
    if ((ctrlKey || metaKey) && key === 'F11')
      store.dispatch('toggleFullScreen')
    if ((ctrlKey || metaKey) && shiftKey && key === 'F')
      store.dispatch('toggleFullScreen')
    if ((ctrlKey || metaKey) && shiftKey && key === 'E' && src.value && !processing.value)
      store.dispatch('process')
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap');
  @import url('https://unicons.iconscout.com/release/v4.0.0/css/line.css');

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html) {
    height: 100%;
  }

  :global(body) {
    height: 100%;
    margin: 0;
    background-color: $light2;
    font-family: "Roboto";
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    position: relative;
    height: 100%;
    color: $dark1;
    overflow: hidden;
  }
</style>
