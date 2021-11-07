<template>
  <section class="panelSection">
    <header v-if="props.title && props.icon">
      <Icon :name="props.icon" size="24"/>
      <h2>{{props.title}}</h2>
    </header>
    <slot/>
  </section>
</template>

<script setup>
  import Icon from '@/components/Icon'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    title: String,
    icon: String
  })
</script>

<style lang="scss" scoped>
  .panelSection {
    padding: 20px;
    border-bottom: 2px solid $light3;
    > header {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      user-select: none;
      > h2 {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
</style>
