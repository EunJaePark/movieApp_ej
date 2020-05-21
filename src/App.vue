<template>
  <div>
    <AppHeader></AppHeader>
    <MainPage></MainPage>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MainPage from './views/MainPage';

export default {
  components: {
      AppHeader,
      MainPage,
  }
}
</script>

<style>

</style>