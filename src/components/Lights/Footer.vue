<template>
  <footer class="footer">
    <slot/>
  </footer>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
    padding: 10px;
    border-top: 2px solid $light3;
  }
</style>
