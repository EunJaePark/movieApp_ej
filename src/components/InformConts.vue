<template>
  <div v-if="clickMovieData">
      InformConts
      <!-- <div 
        class="movieBox"
        v-for="movie in movieResult " v-bind:key="movie.DOCID">
          <p>제목: {{ textEdit(movie.title) }} ( {{ movie.prodYear }} )</p>
          <p>감독: {{ textEdit(movie.directors.director[0].directorNm) }}</p>
          <ul class="textData">
            <li v-if="movie.genre !== ''">장르: {{ movie.genre }}</li>
            <li v-if="movie.directors.director[0].directorNm !== ''">감독: {{ textEdit(movie.directors.director[0].directorNm) }}</li>
            <li v-if="movie.actors.actor[0].actorNm !== ''">배우: 
              <span 
                v-for="actorName in movie.actors.actor" 
                v-bind:key="actorName.actorId">
                  {{ actorName.actorNm }}, 
              </span> 
            </li>
            <li v-if="movie.plots.plot[0].plotText !== ''">줄거리: {{ movie.plots.plot[0].plotText }}</li>
            <li><a v-bind:href="movie.kmdbUrl" target="blanket">상세정보</a></li>
          </ul>
      </div>  -->
      <h2>제목: {{ textEdit(clickMovieData.title) }} ( {{ clickMovieData.prodYear }} )</h2>
      <br/>
      <p>영상url: {{ clickMovieData.vods.vod[0].vodUrl }}</p>
      <video :src="clickMovieData.vods.vod[0].vodUrl"></video>
      <br/>
      <p>감독: {{ textEdit(clickMovieData.directors.director[0].directorNm) }}</p>
      <ul class="textData">
          <li v-if="clickMovieData.genre !== ''">장르: {{ clickMovieData.genre }}</li>
          <li v-if="clickMovieData.directors.director[0].directorNm !== ''">감독: {{ textEdit(clickMovieData.directors.director[0].directorNm) }}</li>
          <li v-if="clickMovieData.actors.actor[0].actorNm !== ''">배우: 
            <span 
              v-for="actorName in clickMovieData.actors.actor" 
              v-bind:key="actorName.actorId">
                {{ actorName.actorNm }}, 
            </span> 
          </li>
          <li v-if="clickMovieData.plots.plot[0].plotText !== ''">줄거리: {{ clickMovieData.plots.plot[0].plotText }}</li>
          <li><a v-bind:href="clickMovieData.kmdbUrl" target="blanket">상세정보</a></li>
      </ul>
      <div class="stills">
        <P>스틸컷url: {{ clickMovieData.stlls }}</P>
        <img :src="editURL(clickMovieData.stlls)" />
      </div>
      <br/>
      <!-- <div style="border:2px solid red;">클릭한 id 영화 데이터: {{ clickMovieData }}</div> -->
      
  </div>
</template>

<script>
export default {
  computed: {
    clickMovieData() {
      return this.$store.state.clickMovie;
    }
  },
  methods: {
    textEdit(text) {
      // 검색어를 나타내는 !HE, !HS글자 삭제.
      return text.replace(/!HE|!HS/g, '');
    },
    editURL(url) {            
        if(url === '') {   // url이 없을 경우
            // poster url주소가 없을 경우 빈 이미지 추출.
            return 'http://placehold.it/144x86';
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
  }
}
</script>

<style>

</style>