<template>
  <div>
    <AppHeader></AppHeader>
    <MainPage></MainPage>
    <MoviePage></MoviePage>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MainPage from './views/MainPage';
import MoviePage from './views/MoviePage';

export default {
  components: {
      AppHeader,
      MainPage,
      MoviePage,
  }
}
</script>

<style>

</style>