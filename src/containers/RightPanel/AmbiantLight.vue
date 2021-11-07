<template>
  <PanelSection class="lights" title="Ambiant Light" icon="sun">
    <AmbiantLight
      style="margin: 0;"
      :id="light.id"
      :enabled="light.enabled"
      :folded="light.folded"
      v-bind="light.values"
      @toggleEnabled="onToggleEnabled"
      @toggleFolded="onToggleFolded"
      @edit="onEdit"
    />
  </PanelSection>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import PanelSection from '@/components/PanelSection'
  import { AmbiantLight } from '@/components/Lights'

  const store = useStore()

  const light = computed(() => store.getters['lights/ambiantLight'])

  const onToggleEnabled = () => {
    store.dispatch('lights/toggleEnabled', { id: 0 })
  }

  const onToggleFolded = () => {
    store.dispatch('lights/toggleFolded', { id: 0 })
  }

  const onEdit = (data) => {
    store.dispatch('lights/edit', { id: 0, data })
  }
</script>
