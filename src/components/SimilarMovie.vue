<template>
  <div class="similarMovie" v-if="keywordFirst !== 'keyword=undefined'"> <!--첫 번째 키워드가 있을 때만 보이도록 조건 준 것.-->   
        <p>비슷한 콘텐츠</p>
        <span class="text">( 오른쪽으로 스크롤 하면 순서대로 모든 영화 목록을 볼 수 있습니다. )</span>
        <span class="samekey"># {{ keywordEdit(keywordFirst) }}</span> 

        <div class="similarMovieBox" v-if="firstKeyword.Data">
            <div class="movie" v-for="(movie, index) in firstKeyword.Data[0].Result" :key="index">        
                    <div class="imgTitle">  <!--@click="movieInform(movie)"-->
                        <img                     
                            v-bind:src="posterURL(movie.posters)" 
                            v-bind:alt="movie.title"
                        />

                        <div class="hoverBox">
                            <p class="director">감독: {{ movie.directors.director[0].directorNm }}</p>
                            <p class="story" v-if="movie.plots.plot[0].plotText !== ''">줄거리: {{ movie.plots.plot[0].plotText }}</p>
                            <a v-bind:href="movie.kmdbUrl" target="blanket">상세정보 보기</a>
                        </div>

                    </div>

                    <p class="title">
                        <span>{{ movie.title }}</span>
                        <span class="year">( {{ movie.prodYear }} )</span>
                    </p>

            </div><!--.similarMovie-->
        </div><!--.similarMovieBox-->
        <br/>
        <!-- {{ firstKeyword.Data[0] }} -->
  </div><!--.similarMovie-->
</template>

<script>
export default {
    data() {
        return {
            // 첫 번쨰 키워드명.
            keywordFirst: this.$store.state.keywordFirstBox.searchTxt,
        }
    },
    computed: {
        // 첫 번째 키워드에 해당하는 영화 목록 호출.
        firstKeyword() {
            return this.$store.state.similarMoviedata;
        },
    },
    created() {
        console.log(this.keywordFirst);
        
        // InfomConts.vue에서 store에 저장한 keyword와 check불러와서 api에 넣어줌. (기존 api구하는 함수 형식에 맞추느라 여러 데이터형식으로 생성함)
        const keywordFirstBox = this.$store.state.keywordFirstBox;
        console.log(keywordFirstBox);
        
        this.$store.dispatch('KEY_SIMILAR', keywordFirstBox);
    },
    methods: {
        // 첫 번째 키워드 이름만 추출.(앞에 적힌 api에 필요한 type는 추출안함.)
        keywordEdit(keyword) {
            return keyword.substring(keyword.indexOf('=')+1, keyword.length);
        },
        posterURL(url) {            
            if(url === '') {   // url이 없을 경우
                // poster url주소가 없을 경우 빈 이미지 추출.
                return 'http://placehold.it/213x303';
            }else if(url.indexOf('|') === -1) {   // url이 1개일 경우
                return url;
            }else if(url.indexOf('|')) {   // url이 2개 이상일 경우  
                return url.substring(0, url.indexOf('|')); 
            } 
        },
        // movieInform(movie) {
        //     this.$store.commit('CLICK_MOVIE', movie); 
        //     this.$router.push('/inform');
        // },
    },
}
</script>

<style>

</style>