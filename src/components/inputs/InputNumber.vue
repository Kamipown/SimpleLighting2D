<template>
    <label class="inputNumber">
      <Label :text="props.text" @move="onMove"/>
      <input type="number" min="0" max="100" :value="props.value" @input="onInput" :disabled="props.disabled"/>
    </label>
</template>

<script setup>
  import Label from '@/components/Label'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: {
      type: String,
    },
    value: {
      type: Number,
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['change'])

  const onMove = v => onchange(props.value + v || 0)
  const onInput = e => onchange(parseInt(e.target.value || 0))

  const onchange = v => {
    if (props.min !== null && props.max !== null)
      emits('change', Math.min(Math.max(v, props.min), props.max))
    else if (props.min !== null)
      emits('change', Math.max(v, props.min))
    else if (props.max !== null)
      emits('change', Math.min(v, props.max))
    else
      emits('change', v)
  }
</script>

<style lang="scss" scoped>
  .inputNumber {
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 14px;
    > .label {
      flex: 1;
      font-weight: 500;
    }
    > input {
      width: 150px;
      height: 24px;
      padding: 0 10px;
      border: 2px solid $light4;
      border-radius: 4px;
      background-color: $light1;
      text-align: right;
      &:focus {
        border-color: $primary1;
        outline: none;
      }
      &::-webkit-inner-spin-button, &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
    }
  }
</style>
