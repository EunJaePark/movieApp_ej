<template>
  <div class="movieConts">
    <button class="gomainBtn" @click.prevent="goMain">
        <span class="arrow">← </span> 
        <span class="text"> 검색 페이지로</span>
    </button>

    <!-- 검색한 단어 출력 -->
    <h2>{{ inputTextEdit(inputText) }}</h2>

    <div class="movieNumBox">
        <p>총 {{ movieNum(moviedata.TotalCount) }}개의 영화가 검색되었습니다.</p>
        <p>( 오른쪽으로 스크롤 하면 순서대로 모든 영화 목록을 볼 수 있습니다. )</p>
    </div>

    <div class="dataBox clear">
        <div class="movies clear" v-if="movieResult"> 
            <!-- v-if를 줘서 영화 데이터가 존재할 때만 영화 정보 박스(.movies)를 보이게 함. + movieResult속에 있는 데이터들 사용하려면 적어줘야함.(왜그런지는 모르겠다..) -->
            <div 
                class="movieBox"
                v-for="(movie, index) in movieResult " 
                v-bind:key="index"
            >
                <div class="imgTitle" @click="moveInform(movie, textEdit(movie.title), textEdit(movie.directors.director[0].directorNm), movie.movieSeq)">
                    <img                     
                        v-bind:src="posterURL(movie.posters)" 
                        v-bind:alt="textEdit(movie.title)"
                    />

                    <div class="hoverBox">
                        <!-- <p class="title">{{ textEdit(movie.title) }}<br/>( {{ movie.prodYear }} )</p> -->
                        <p class="director">감독: {{ textEdit(movie.directors.director[0].directorNm) }}</p>
                        <p class="story" v-if="movie.plots.plot[0].plotText !== ''">줄거리: {{ movie.plots.plot[0].plotText }}</p>
                    </div>
                </div>

                <p class="title">
                    <span>{{ textEdit(movie.title) }}</span>
                    <span class="year">( {{ movie.prodYear }} )</span>
                </p>
            </div><!--.movieBox-->
        </div><!--.movies-->

        <p class="nodataTxt" v-else>해당하는 영화가 없습니다.</p>
    </div><!--.dataBox-->
    
    <br/><br/>
    <!-- {{ moviedata }} -->
  </div><!--.movieConts-->
</template>

<script>
import { eventbus } from '../main';
import { saveInform } from '../utils/cookies';

export default {
    computed: {
        inputText() {
            return this.$store.state.searchTxtBox.searchTxt;
        },
        moviedata() {
            return this.$store.state.moviedata;
        },
        // dataInMoviedata() {
        //     return this.moviedata.Data;
        // },
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
        console.log(this.$store.state.searchTxtBox);
        console.log(this.$store.state.searchTxtBox.check);
        console.log(this.$store.state.searchTxtBox.searchTxt);
        // const checkTxt = this.$store.state.searchTxt.check;
        // const inputTxt = this.$store.state.searchTxt.searchTxt;

        const searchTxtBox = this.$store.state.searchTxtBox;
        this.$store.dispatch('FETCH_TITLE', searchTxtBox);

        // movieData();

    },
    methods: {
        // 입력한 검색어 추출.(영화type도 함께 들어있어 검색어만 뽑아냄)
        inputTextEdit(text) {
            return text.substring(text.indexOf('=')+1, text.length);
        },
        //movie검색 결과 개수가 총 100개 이상일 경우 개수안내표시를 100까지만 나타냄.
        movieNum(num) {
            if(num <= 100) return num;
            else if(num > 100) return 100;
        },
        // poster url 편집.(url이 두개 이상일 경우 첫번째 url만 추출)
        posterURL(url) {            
            if(url === '') {   // url이 없을 경우
                // poster url주소가 없을 경우 빈 이미지 추출.
                return 'http://placehold.it/213x303';
            }else if(url.indexOf('|') === -1) {   // url이 1개일 경우
                return url;
            }else if(url.indexOf('|')) {   // url이 2개 이상일 경우  
                // poster url이 두개 이상일 경우 jpg의 마지막 글자인 g의 index순번만큼 주소 추출.
                //  | <- 이 기호를 기준으로 했더니 url 주소가 하나일 경우 주소가 아예 사라져 버려서 jpg글자로 판단해주는 것으로 수정.
                // return url.substring(0, url.indexOf(url.match(/g/i)) + 1); 
                // '|'로 기준을 바꿔줌. 대신 기존과 달리 3가지의 경우로 분류함. 
                return url.substring(0, url.indexOf('|')); 
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

        // 다시 검색하기 버튼 클릭 시 main페이지로 이동.
        goMain() {
            this.$router.push('/main');
        },
        // poster클릭 시 세부 정보 페이지(InformPage)로 이동.
        moveInform(movie, movieID, director, movieSeq) {
            // InformConts가 새로고침해도 그대로 내용이 남아있도록 하기 위해서, 처음부터 title, director, movieSeq를 cookie와 store에 넘겨줘서 api생성할 수 있도록 한 것이다.
            // title, director, movieSeq를 하나씩만 해봤더니 다른 영화가 연결되는 경우가 있어서 조건을 3개나 준 것.
            saveInform(`title=${movieID}&director=${director}&movieSeq=${movieSeq}`);
            console.log(this.$store.state.movieID);

            const searchTxtBox = {
                // searchTxt : `movieId=${movieID}`, 
                searchTxt : `title=${movieID}&director=${director}&movieSeq=${movieSeq}`, 
            };
            this.$store.commit('MOVIE_ID', searchTxtBox);
            
            // this.$store.commit('CLICK_MOVIE', movie); 
            this.$router.push('/inform');
        }

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

</style>