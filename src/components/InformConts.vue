<template>
  <div class="infromConts" v-if="clickMovieData">
      <div class="topData clear">
        <img 
          class="poster"                    
          v-bind:src="posterURL(clickMovieData.posters)" 
          v-bind:alt="textEdit(clickMovieData.title)"
        />
        <div class="summaryBox">
          <div class="title">
            <h2>{{ textEdit(clickMovieData.title) }} ( {{ clickMovieData.prodYear }} )</h2>
            <p class="engTitle">{{ clickMovieData.titleEng }}</p>
          </div><!--.title-->
          <div class="otherData">
            <div class="other1">
              <span>{{ clickMovieData.genre }}</span>
              <span>{{ clickMovieData.nation }}</span>
            </div><!--.other1-->
            <div class="other2">
              <span>{{ clickMovieData.repRlsDate }}</span>
              <span>{{ clickMovieData.runtime }}분</span>
              <span>{{ clickMovieData.rating }}</span>
            </div><!--.other2-->
            <p v-if="clickMovieData.directors.director[0].directorNm !== ''">(감독) {{ textEdit(clickMovieData.directors.director[0].directorNm) }}</p>
          </div><!--.otherData-->
          <br/>
          <!-- <p>영상url: {{ clickMovieData.vods.vod[0].vodUrl }}</p>
          <video :src="clickMovieData.vods.vod[0].vodUrl"></video> -->
          <br/>
          <!-- <p>감독: {{ textEdit(clickMovieData.directors.director[0].directorNm) }}</p>
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
          </ul> -->
        </div><!--.summaryBox-->
      </div><!--.topData-->

      <div class="detailBox">
        <!-- 한문장의 슬로건(줄거리 중 첫 문장!)-->
        <p 
          class="movieSlogan"
          v-if="clickMovieData.plots.plot[0].plotText !== ''">
          {{ sloganEdit(clickMovieData.plots.plot[0].plotText) }}
        </p>
        <!-- 줄거리 -->
          <p
            class="movieStory" 
            v-if="clickMovieData.plots.plot[0].plotText !== ''">
            {{ storyEdit(clickMovieData.plots.plot[0].plotText) }}
          </p>
          
            {{ photoIndex(clickMovieData.stlls) }}
          <div class="stills">
            <P style="width:100%; overflow:scroll;">스틸컷url: {{ clickMovieData.stlls }}</P>
            <div  v-for="(photo, imgIndex) in photoIndex(clickMovieData.stlls)" :key="imgIndex" >
              <img :src="stllImgURL(clickMovieData.stlls, imgIndex)" alt="" />
              {{ imgIndex }}
            </div>
          </div>

          <p v-if="clickMovieData.actors.actor[0].actorNm !== ''">배우: 
              <span 
                v-for="actorName in clickMovieData.actors.actor" 
                v-bind:key="actorName.actorId">
                  {{ actorName.actorNm }}, 
              </span> 
          </p>

          <p><a v-bind:href="clickMovieData.kmdbUrl" target="blanket">상세정보</a></p>
      </div><!--.detailBox-->
      
      <br/>
      <!-- <div style="border:2px solid red;">클릭한 id 영화 데이터: {{ clickMovieData }}</div> -->
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgIndex: 0,
    }
  },
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
    // 줄거리 중 제일 앞 문장만 추출.
    sloganEdit(story) {
      return story.substring(0, story.indexOf('!')+1);
    },
    // 줄거리 중 제일 앞 문장 제외한 나머지 모든 줄거리 추출.
    storyEdit(story) {
      return story.substring(story.indexOf('!')+1, story.length)
    },
    // 스틸컷 img 개수 세는 함수.
    photoIndex(photoUrl) {
      if(photoUrl === '') {
        this.imgIndex = 0;
        return 0;
      } else if(photoUrl.indexOf('|') === -1) {
        this.imgIndex = 1;
        return 1;
      } else if(photoUrl.indexOf('|')) { // http의 개수에 따라 v-for이용해 이미지 태그 생성.
        this.imgIndex = photoUrl.match(/http/g).length;
        return photoUrl.match(/http/g).length;
      }
    },
    stllImgURL(url, index) {            
      if(url === '') {   // url이 없을 경우
        // poster url주소가 없을 경우 빈 이미지 추출.
        return 'http://placehold.it/144x86';
      } else if(url.indexOf('|') === -1) {   // url이 1개일 경우
        return url;
      } else if(url.indexOf('|')) {   // url이 2개 이상일 경우  
        return url.split('|')[index];  // split를 이용해 '|'를 기준으로 url을 나눔. 그 뒤에 각 index에 맞는 사진url을 return.
      } 
    },
  }
}
</script>

<style>

</style>