<template>
  <div class="light">
    <Header
      :text="`Ambiant light`"
      :enabled="props.enabled"
      :folded="props.folded"
      @toggleEnabled="onToggleEnabled"
      @toggleFolded="onToggleFolded"
    />
    <RevealTransition>
      <div v-show="!props.folded">
        <div :class="{disabled: !props.enabled}">
          <InputNumber
            text="Intensity"
            :disabled="!props.enabled"
            :value="props.intensity"
            :min="0"
            :max="100"
            @change="onIntensityChange"
          />
          <InputColor
            text="Color"
            :disabled="!props.enabled"
            :value="props.color"
            @change="onColorChange"
          />
        </div>
      </div>
    </RevealTransition>
  </div>
</template>

<script setup>
  import Header from './Header'

  import RevealTransition from '@/components/RevealTransition'
  import { InputNumber, InputColor } from '@/components/inputs'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: Number,
    enabled: Boolean,
    folded: Boolean,
    intensity: Number,
    color: String
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['toggleEnabled', 'toggleFolded', 'edit'])

  const onToggleEnabled = () => emits('toggleEnabled')
  const onToggleFolded = () => emits('toggleFolded')

  const onIntensityChange = v => emits('edit', { intensity: v })
  const onColorChange = v => emits('edit', { color: v })
</script>

<style lang="scss" scoped>
  .light {
    margin-top: 20px;
    border: 2px solid $light3;
    border-radius: 8px;
    user-select: none;
    > div {
      > div {
        border-top: 2px solid $light3;
        padding: 5px;
        transition: opacity 200ms ease-in-out;
        &.disabled {
          opacity: 0.5;
        }
      }
    }
  }
</style>
