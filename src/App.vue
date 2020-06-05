<template>
  <div>
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<!--<script src="https://kit.fontawesome.com/aa7a88800a.js" crossorigin="anonymous"></script>-->

<script>
import AppHeader from './components/common/AppHeader';
// import MainPage from './views/MainPage';
// import MoviePage from './views/MoviePage';

export default {
  components: {
      AppHeader,
      // MainPage,
      // MoviePage,
  }
}
</script>

<style>
@import '../src/css/common.css';
@import '../src/css/reset.css';
</style>