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
              <span>{{ `${dateEdit(clickMovieData.repRlsDate)} 개봉` }}</span>
              <span>{{ clickMovieData.runtime }}분</span>
              <span>{{ clickMovieData.rating }}</span>
            </div><!--.other2-->
            <p v-if="clickMovieData.directors.director[0].directorNm !== ''">(감독) {{ textEdit(clickMovieData.directors.director[0].directorNm) }}</p>

            <a v-bind:href="clickMovieData.kmdbUrl" target="blanket">영화 상세정보</a>
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

          <div class="movieKeyword" v-if="clickMovieData.keywords">
            <form @click="btnSearch('keywordCK')">
              <button 
                v-for="(keyword, keywordIndex) in keywordNum(clickMovieData.keywords)" :key="keywordIndex"
                @click="searchText = keyWord(clickMovieData.keywords, keywordIndex)">
                {{ `# ${keyWord(clickMovieData.keywords, keywordIndex)}` }}
              </button>
            </form>
          </div>
          
          <div class="movieStlls" v-if="clickMovieData.stlls">
            <p>{{ `${photoIndex(clickMovieData.stlls)}장의 스틸컷` }}</p>
            <div  v-for="(photo, imgIndex) in photoIndex(clickMovieData.stlls)" :key="imgIndex" >
              <img :src="stllImgURL(clickMovieData.stlls, imgIndex)" alt="" />
              <!-- {{ imgIndex }} -->
            </div>
          </div>

          <div class="movieActor clear" v-if=" clickMovieData.actors.actor[0].actorNm">
            <p>출연 / 스탭</p>
            <div
              v-for="(actorName, index) in clickMovieData.actors.actor" 
              v-bind:key="index"><!--key를 actorName.actorId로 주니까 데이터 자체에 같은 배우명단이 2개인 경우가 있어서 actorId가 중복된다는 error가 발생. 일단 에러 없애기 위해서 key를 임의의 index로 주었다.-->
                  <span class="krNm">{{ actorEdit(actorName.actorNm) }} </span>
                  <br/>
                  <span class="enNm">{{ actorEdit(actorName.actorEnNm) }}</span> 
            </div>
          </div>


          <!-- <p><a v-bind:href="clickMovieData.kmdbUrl" target="blanket">상세정보</a></p> -->
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
      keywordIndex: 0,
      searchText: '',
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
    // 영화 개봉일자 편집.
    dateEdit(date) {
      return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
      // \d : 숫자 문자가 아닌 문자에 대응된다. [^0-9]와 동일하다.
      // {n} : 앞 표현식이 n번 나타나는 부분에 대응된다. n은 반드시 양의 정수여야 한다.
      // 즉, \d{4}는 앞에서 4번째까지의 [0-9]까지 해당하는 숫자를 지칭하게 되는 것이다.
    },
    // 줄거리 중 제일 앞 문장만 추출.
    sloganEdit(story) {
      return story.substring(0, story.indexOf('!')+1);
    },
    // 줄거리 중 제일 앞 문장 제외한 나머지 모든 줄거리 추출.
    storyEdit(story) {
      return story.substring(story.indexOf('!')+1, story.length)
    },
    // keyword 개수 구함.
    keywordNum(key) {
      if(key === '') {
        return this.keywordIndex = 0;
      } else if(key.indexOf(',') === -1) {
        return this.keywordIndex = 1;
      } else if(key.indexOf(',')) {
        return this.keywordIndex = key.match(/,/g).length + 1;
      } 
    },
    // keyword하나씩 넣어줌.
    keyWord(key, index) {
      if(key === '') return;
      else if(key.indexOf(',') === -1) return key;
      else if(key.indexOf(',')) return key.split(',')[index];
    },
    // 스틸컷 img 개수 세는 함수.
    photoIndex(photoUrl) {
      if(photoUrl === '') {
        return this.imgIndex = 0;
      } else if(photoUrl.indexOf('|') === -1) {     
        return this.imgIndex = 1;
      } else if(photoUrl.indexOf('|')) { // http의 개수에 따라 v-for이용해 이미지 태그 생성.
        return this.imgIndex = photoUrl.match(/http/g).length;
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
    // 배우 이름에 !HE, !HS 제거해줌.
    actorEdit(name) {
      if(name.match(/!HE | !HS/gi)) return name.replace(/!HE | !HS/g, '');
      else return name;
    },

    // keyword 클릭하면 해당 키워드별 영화목록 보이게 함.
    btnSearch(check) {
      // router이동 주소 보내줌.
      this.$router.push('/movie');

      const searchTxt = {
        searchTxt : this.searchText, 
        check : check,
      };
      console.log(searchTxt);
            
      // 바로 state에 겁색어랑 체크박스확인ㅇ데이터 넣어줘봄.
      this.$store.commit('STATE_UTL', searchTxt);

      // input창 비워줌.
      this.searchText = '';
    }
  }
}

</script>

<style>

</style>