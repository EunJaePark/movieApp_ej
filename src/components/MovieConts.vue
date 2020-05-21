<template>
  <div>
      movie page 연결 된 movieConts페이지.
      <br/>
      {{ moviedata }}
  </div>
</template>

<script>
import { eventbus } from '../main';

export default {
    computed: {
        moviedata() {
            return this.$store.state.moviedata;
        }
    },
    created() {
        // 이벤트버스로 mainConts에서 입력한 검색어 불러옴.
        eventbus.$on('sendSearch', (searchTxt, check) => {
            console.log(searchTxt, check);
            this.newMovie(searchTxt, check);
        })
    },
    methods: {
        newMovie(searchTxt, check) {
            console.log(searchTxt, check);
            
            console.log('영화 검색어 받았다!!!!');
            const txtCheck = {searchTxt, check};
            this.$store.dispatch('FETCH_TITLE', txtCheck)
        }
    }

    // created() {
    //     axios
    //     .get(' http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&direct=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=M1NV1B1101HZ3282TRPW')
    //     .then(res => {
    //         this.movieData = res.data;
    //     });
    // }
}
</script>

<style>

</style>