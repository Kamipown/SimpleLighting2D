<template>
  <label class="inputColor">
    <Label :text="props.text" @move="onMove"/>
    <div class="input">
      <input type="color" :value="props.value" @input="onInput" :disabled="props.disabled"/>
    </div>
  </label>
</template>

<script setup>
  import Label from '@/components/Label'

  import shiftHue from '@/lib/shiftHue'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: {
      type: String,
    },
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['change'])

  const onMove = v => onchange(shiftHue(props.value, v))
  const onInput = e => onchange(e.target.value)

  const onchange = v => emits('change', v)
</script>

<style lang="scss" scoped>
  .inputColor {
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 14px;
    > p {
      flex: 1;
      font-weight: 500;
    }
    > .input {
      position: relative;
      width: 150px;
      height: 24px;
      border: 2px solid $light4;
      border-radius: 4px;
      overflow: hidden;
      > input[type=color] {
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        cursor: pointer;
      }
    }
  }
</style>
