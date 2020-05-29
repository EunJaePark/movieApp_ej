<template>
  <div class="appHeader">
      <button @click.prevent="goMain">Movie App (스터디용)</button>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      this.$router.push('/main');
    }
  }
}
</script>

<style>

</style>