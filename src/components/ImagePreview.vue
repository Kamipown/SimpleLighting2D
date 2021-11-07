<template>
  <div v-if="props.src" class="imagePreview">
    <div :style="style"/>
    <p>
      <span>Name</span>
      <span>{{props.name}}</span>
    </p>
      <p>
        <span>Size</span>
        <span>{{bytes(props.size)}}</span>
      </p>
    <p>
      <span>Dimensions</span>
      <span>{{props.width}}x{{props.height}}</span>
    </p>
    <p>
      <span>Last update</span>
      <span>{{props.lastUpdate?.toLocaleString().replace(',', '')}}</span>
    </p>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  
  import { bytes } from '@/composables/filters'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    src: String,
    name: String,
    size: Number,
    width: Number,
    height: Number,
    lastUpdate: Date
  })

  const style = computed(() => ({
    height: `${props.width > 320 ? props.height * 320 / props.width : props.height}px`,
    backgroundImage: `url('${props.src}')`
  }))
</script>

<style lang="scss" scoped>
  .imagePreview {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    > div {
      width: 100%;
      border-radius: 8px;
      background-color: $light2;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    > p {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 4px;
      user-select: none;
      > span:first-child {
        font-weight: 500;
      }
    }
  }
</style>
