<template>
  <PanelSection class="lights" title="Point Lights" icon="lightbulb-alt">
    <Button text="Add" icon="plus" @click="onAddLight"/>
    <PointLight
      v-for="light in pointLights"
      :key="light.id"
      :id="light.id"
      :enabled="light.enabled"
      :folded="light.folded"
      v-bind="light.values"
      @toggleEnabled="() => onToggleEnabled(light.id)"
      @toggleFolded="() => onToggleFolded(light.id)"
      @edit="data => onEdit(light.id, data)"
      @delete="() => onDelete(light.id)"
    />
  </PanelSection>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import PanelSection from '@/components/PanelSection'
  import Button from '@/components/Button'
  import { PointLight } from '@/components/Lights'

  const store = useStore()

  const pointLights = computed(() => store.getters['lights/pointLights'])

  const onAddLight = () => store.dispatch('lights/add')

  const onToggleEnabled = (id) => {
    store.dispatch('lights/toggleEnabled', { id })
  }

  const onToggleFolded = (id) => {
    store.dispatch('lights/toggleFolded', { id })
  }

  const onEdit = (id, data) => {
    store.dispatch('lights/edit', { id, data })
  }

  const onDelete = (id) => {
    store.dispatch('lights/delete', { id })
  }

</script>
