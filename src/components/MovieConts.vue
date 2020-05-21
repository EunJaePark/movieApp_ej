<template>
  <div class="movieConts">
    <h2>" {{ moviedata.KMAQuery }} "</h2>

    <div class="dataBox clear">
        <div class="movies" v-if="dataInMoviedata">
            <div 
                class="movie"
                v-for="(movie, index) in dataInMoviedata[0].Result " :key="index">
                <div class="imgTitle">
                    <img src="" alt="영화 포스터(url데이터없음)"/>
                    <p>제목: {{ dataInMoviedata[0].Result[index].title }}</p>
                </div>
                <ul class="textData">
                    <li>장르: {{ dataInMoviedata[0].Result[index].genre }}</li>
                    <li>포스터url: {{ dataInMoviedata[0].Result[index].posterUrl }}</li>
                    <li><a v-bind:href="dataInMoviedata[0].Result[index].kmdbUrl">상세정보</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- {{ moviedata }} -->
  </div>
</template>

<script>
import { eventbus } from '../main';

export default {
    computed: {
        moviedata() {
            return this.$store.state.moviedata;
        },
        dataInMoviedata() {
            return this.moviedata.Data;
        },
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