<template>
  <ButtonProgress
    :text="processing ? `${progress}%` : 'Run'"
    :value="processing ? `${progress}%` : '100%'"
    :enabled="src && !processing"
    :disabled="!src"
    @click="run"
  />
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import ButtonProgress from '@/components/ButtonProgress'

  const store = useStore()

  const fullScreen = computed(() => store.getters['fullScreen'])
  const processing = computed(() => store.getters['processing'])
  const progress = computed(() => store.getters['progress'])
  const autoMaximize = computed(() => store.getters['settings/autoMaximize'])
  const src = computed(() => store.getters['colorMap/src'])

  const run = () => {
    store.dispatch('process')
    if (autoMaximize.value && !fullScreen.value) {
      store.dispatch('toggleFullScreen')
    }
  }
</script>
