<template>
  <div class="imageSelector" :class="state">
    <p>{{props.text}}</p>
    <Icon name="import" size="20"/>
    <input
      type="file"
      accept="image/png"
      title=""
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @change="onChange"
    />
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  
  import Icon from '@/components/Icon'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    text: {
      type: String,
      default: 'Select or drop image'
    }
  })

  // eslint-disable-next-line no-undef
  const emits = defineEmits(['change'])

  const state = reactive({
    hovering: false,
    clicking: false,
    dragging: false
  })
  
  const onMouseEnter = () => { state.hovering = true; }
  const onMouseLeave = () => { state.hovering = false; state.clicking = false; }
  const onMouseDown = () => { state.clicking = true; }
  const onMouseUp = () => { state.clicking = false; }
  const onDragEnter = () => { state.dragging = true; }
  const onDragLeave = () => { state.dragging = false; }
  const onDrop = () => { state.dragging = false; }

  const onChange = e => emits('change', e.target.files[0])
</script>

<style lang="scss" scoped>
  .imageSelector {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 40px;
    border-radius: 8px;
    background-color: $primary1;
    color: $light1;
    user-select: none;
    transition: height 200ms ease-in-out, background-color 200ms ease-in-out;
    > input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    > p {
      font-weight: 500;
    }
    > .icon {
      margin-left: 10px;
    }
    &.hovering {
      background-color: $primary2;
    }
    &.clicking {
      background-color: $primary3;
      transition: none;
    }
    &.dragging {
      height: 80px;
      background-color: $primary2;
    }
  }
</style>
