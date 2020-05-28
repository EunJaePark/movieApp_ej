<template>
  <div class="movieConts">
      <!-- 검색한 단어 출력 -->
    <h2>" {{ moviedata.KMAQuery }} "</h2>

    <div class="dataBox clear">
        <div class="movies" v-if="dataInMoviedata">  <!--  v-if는 없어도 될듯. -->
            <div 
                class="movie"
                v-for="(movie, index) in movieResult " v-bind:key="index">
                <div class="imgTitle">
                    <img 
                        v-if="movieResult[index].posters !== ''"
                        v-bind:src="movieResult[index].posters.substring(0, movieResult[index].posters.indexOf(movieResult[index].posters.match(/g/i)) + 1)" 
                        :alt="movieResult[index].title.replace(/!HS|!HE/g, '')"/>
                    <img 
                        v-else
                        src="http://placehold.it/213x303" 
                        alt="영화 포스터(url데이터없음)"/>

                    <!-- title의 불필요한 글자 삭제해줌. -->
                    <p>제목: {{ movieResult[index].title.replace(/!HS|!HE/g, '') }}</p>
                </div>

                <ul class="textData">
                    <li>장르: {{ movieResult[index].genre }}</li>
                    <li><a v-bind:href="movieResult[index].kmdbUrl" target="blanket">상세정보</a></li>
                </ul>


                    <br/><br/>
                    - 영화 포스터 주소 전체
                    {{ movieResult[index].posters }} 
                    <br/><br/>
                    - 영화 포스터 여러개의 주소가 있을 경우 처음 주소만 추출.
                    {{ movieResult[index].posters.substring(0, movieResult[index].posters.indexOf(movieResult[index].posters.match(/g/i)) + 1) }}
                    <br/><br/>
            </div>
        </div>
    </div>
    
    <br/><br/>

    {{ moviedata }}
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
        movieResult() {
            return this.$store.state.result;
        },
    },
    created() {
        // 이벤트버스로 mainConts에서 입력한 검색어 불러옴.
        console.log('이벤트버스 이용해서 movie페이지에서 $on작동해야된다.');
        
        // eventbus.$on('sendSearch', (searchTxt, check) => {
        //     console.log(searchTxt, check);
        //     this.newMovie(searchTxt, check);
        // })

        // 이벤트버스 안되서 input페이지에서 바로 state에 넣어준 값 가져옴.
        console.log(this.$store.state.searchTxt);
        console.log(this.$store.state.searchTxt.check);
        console.log(this.$store.state.searchTxt.searchTxt);
        // const checkTxt = this.$store.state.searchTxt.check;
        // const inputTxt = this.$store.state.searchTxt.searchTxt;

        const searchTxt = this.$store.state.searchTxt;
        this.$store.dispatch('FETCH_TITLE', searchTxt);

        // movieData();

    },
    methods: {
        // moviedata() {
        //     this.$store.state.result;
            
        //     // 데이터만들어서 그 이름 안에 이 값을 줘보자.
        // },
        // spa로 제작하려니 위의 created에서 이벤트버스로 받아오는게 작동이 안되어서, 아예 이벤트버스를 사용하지 않음.
        // 따라서, 아래의 newMovie()함수 주석처리 한 것.

        // newMovie(searchTxt, check) {
        //     console.log(searchTxt, check);
            
        //     console.log('영화 검색어 받았다!!!!');
        //     const txtCheck = {searchTxt, check};
        //     this.$store.dispatch('FETCH_TITLE', txtCheck)
        // }
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

<style scoped>
.imgTitle > img{ width:213px; height:303px; }
</style>