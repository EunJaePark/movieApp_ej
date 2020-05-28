<template>
  <div class="movieConts">
      <!-- 검색한 단어 출력 -->
    <h2>" {{ moviedata.KMAQuery }} "</h2>

    <div class="dataBox clear">
        <div class="movies" v-if="dataInMoviedata">  <!--  v-if는 없어도 될듯. -->
            <div 
                class="movieBox"
                v-for="movie in movieResult " v-bind:key="movie.DOCID">
                <div class="imgTitle">
                    <img                     
                        v-bind:src="posterURL(movie.posters)" 
                        v-bind:alt="textEdit(movie.title)"/>

                    <!-- title의 불필요한 글자 삭제해줌. -->
                    <!-- <p>제목: {{ movie.title.replace(/!HS|!HE/g, '') }}</p> -->
                    <p>제목: {{ textEdit(movie.title) }} ( {{ movie.prodYear }} )</p>
                </div>

                <ul class="textData">
                    <li>장르: {{ movie.genre }}</li>
                    <li>줄거리: {{ movie.plots.plot[0].plotText }}</li>
                    <li>감독: {{ textEdit(movie.directors.director[0].directorNm) }}</li>
                    <li>배우: 
                        <span 
                            v-for="actorName in movie.actors.actor" 
                            v-bind:key="actorName.actorId">
                                {{ actorName.actorNm }}, 
                            </span> 
                    </li>
                    <li><a v-bind:href="movie.kmdbUrl" target="blanket">상세정보</a></li>
                </ul>


                    <br/><br/>
                    - 영화 포스터 주소 전체
                    {{ movie.posters }} 
                    <br/><br/>
                    - 영화 포스터 여러개의 주소가 있을 경우 처음 주소만 추출.
                    {{ movie.posters.substring(0, movie.posters.indexOf(movie.posters.match(/g/i)) + 1) }}
                    <br/><br/>
            </div><!--.movieBox-->
        </div><!--.movies-->
    </div><!--.dataBox-->
    
    <br/><br/>

    {{ moviedata }}
  </div><!--.movieConts-->
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
        // poster url 편집.(url이 두개 이상일 경우 첫번째 url만 추출)
        posterURL(url) {
            if(url !== '') { // poster url이 있을 경우
                // poster url이 두개 이상일 경우 jpg의 마지막 글자인 g의 index순번만큼 주소 추출.
                //  | <- 이 기호를 기준으로 했더니 url 주소가 하나일 경우 주소가 아예 사라져 버려서 jpg글자로 판단해주는 것으로 수정.
                return url.substring(0, url.indexOf(url.match(/g/i)) + 1);  
            } else {
                // poster url주소가 없을 경우 빈 이미지 추출.
                return 'http://placehold.it/213x303'
            }
        },
        // title, name, genre 편집.
        textEdit(text) {
            // 검색어를 나타내는 !HE, !HS글자 삭제.
            return text.replace(/!HE|!HS/g, '');
        },
        // 출연 배우가 많을 경우 5명까지만 추출하고 싶음.
        // actorKey(actor) {
        //     if(actor) 
        // },

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