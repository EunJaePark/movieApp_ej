<template>
  <div>
      Main page
      <MainConts></MainConts>
  </div>
</template>

<script>
import MainConts from '../components/MainConts';

export default {
  components: {
    MainConts,
  }
}
</script>

<style scoped>
div{ border:2px solid blueviolet; }
</style>