<template>
  <div class="light">
    <Header
      :text="`Point light ${props.id}`"
      :enabled="props.enabled"
      :folded="props.folded"
      @toggleEnabled="onToggleEnabled"
      @toggleFolded="onToggleFolded"
    />
    <RevealTransition>
      <div v-show="!props.folded">
        <div :class="{disabled: !props.enabled}">
          <InputNumber
            text="Position X"
            :disabled="!props.enabled"
            :value="props.x"
            @change="onXChange"
          />
          <InputNumber
            text="Position Y"
            :disabled="!props.enabled"
            :value="props.y"
            @change="onYChange"
          />
          <InputNumber
            text="Radius"
            :disabled="!props.enabled"
            :value="props.radius"
            :min="0"
            @change="onRadiusChange"
          />
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
        <Footer>
          <Button text="Delete" icon="times" @click="onDelete" small/>
        </Footer>
      </div>
    </RevealTransition>
  </div>
</template>

<script setup>
  import Header from './Header'
  import Footer from './Footer'
  
  import Button from '@/components/Button'
  import RevealTransition from '@/components/RevealTransition'
  import { InputNumber, InputColor } from '@/components/inputs'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: Number,
    enabled: Boolean,
    folded: Boolean,
    x: Number,
    y: Number,
    intensity: Number,
    radius: Number,
    color: String
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['toggleEnabled', 'toggleFolded', 'edit', 'delete'])

  const onToggleEnabled = () => emits('toggleEnabled')
  const onToggleFolded = () => emits('toggleFolded')

  const onXChange = v => emits('edit', { x: v })
  const onYChange = v => emits('edit', { y: v })
  const onRadiusChange = v => emits('edit', { radius: v })
  const onIntensityChange = v => emits('edit', { intensity: v })
  const onColorChange = v => emits('edit', { color: v })

  const onDelete = () => emits('delete')
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
