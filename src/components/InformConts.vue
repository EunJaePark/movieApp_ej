<template>
  <div class="infromConts" v-if="clickMovieData.Data">
    <!-- {{ clickMovieData.Data[0].Result[0] }} -->
      <div class="topData clear">
        <img 
          class="poster"                    
          v-bind:src="posterURL(clickMovieData.Data[0].Result[0].posters)" 
          v-bind:alt="textEdit(clickMovieData.Data[0].Result[0].title)"
        />
        <div class="summaryBox">
          <div class="title">
            <h2>{{ textEdit(clickMovieData.Data[0].Result[0].title) }} ( {{ clickMovieData.Data[0].Result[0].prodYear }} )</h2>
            <p class="engTitle">{{ clickMovieData.Data[0].Result[0].titleEng }}</p>
          </div><!--.title-->
          <div class="textBox">
            <div class="textList">
              <span>{{ clickMovieData.Data[0].Result[0].genre }}</span>
              <span>{{ clickMovieData.Data[0].Result[0].nation }}</span>
            </div><!--.textInform-->
            <div class="textList">
              <span>{{ `${dateEdit(clickMovieData.Data[0].Result[0].repRlsDate)} 개봉` }}</span>
              <span>{{ clickMovieData.Data[0].Result[0].runtime }}분</span>
              <span>{{ clickMovieData.Data[0].Result[0].rating }}</span>
            </div><!--.textInform-->
            <p v-if="clickMovieData.Data[0].Result[0].directors.director[0].directorNm !== ''">(감독) {{ textEdit(clickMovieData.Data[0].Result[0].directors.director[0].directorNm) }}</p>

            <a v-bind:href="clickMovieData.Data[0].Result[0].kmdbUrl" target="blanket">영화 상세정보</a>
          </div><!--.textBox-->

          <div class="likeScoreBox">
            <div class="likeBtn" >
              <button 
                @click="likeMovie(textEdit(clickMovieData.Data[0].Result[0].title), textEdit(clickMovieData.Data[0].Result[0].directors.director[0].directorNm), clickMovieData.Data[0].Result[0].movieSeq)"
                :class="{'fillHeart':likeCheck === 'true'}">❤</button>
            </div>
          </div><!--.likeScoreBox-->
          <br/>
          <!-- <p>영상url: {{ clickMovieData.vods.vod[0].vodUrl }}</p>
          <video :src="clickMovieData.vods.vod[0].vodUrl"></video> -->
          <br/>
        </div><!--.summaryBox-->
      </div><!--.topData-->

      <div class="detailBox">
        <!-- 한문장의 슬로건(줄거리 중 첫 문장!)-->
        <p 
          class="movieSlogan"
          v-if="clickMovieData.Data[0].Result[0].plots.plot[0].plotText !== ''">
          {{ sloganEdit(clickMovieData.Data[0].Result[0].plots.plot[0].plotText) }}
        </p>
        <!-- 줄거리 -->
          <p
            class="movieStory" 
            v-if="clickMovieData.Data[0].Result[0].plots.plot[0].plotText !== ''">
            {{ storyEdit(clickMovieData.Data[0].Result[0].plots.plot[0].plotText) }}
          </p>

          <div class="movieKeyword" v-if="clickMovieData.Data[0].Result[0].keywords">
            <form @click="btnSearch('keywordCK')">
              <button 
                v-for="(keyword, keywordIndex) in keywordNum(clickMovieData.Data[0].Result[0].keywords)" :key="keywordIndex"
                @click="searchText = keyWord(clickMovieData.Data[0].Result[0].keywords, keywordIndex)">
                {{ `# ${keyWord(clickMovieData.Data[0].Result[0].keywords, keywordIndex)}` }}
              </button>
            </form>
          </div>
          
          <div class="movieStlls" v-if="clickMovieData.Data[0].Result[0].stlls">
            <p>{{ `${photoIndex(clickMovieData.Data[0].Result[0].stlls)}장의 스틸컷` }}</p>
            <div  v-for="(photo, imgIndex) in photoIndex(clickMovieData.Data[0].Result[0].stlls)" :key="imgIndex" >
              <img :src="stllImgURL(clickMovieData.Data[0].Result[0].stlls, imgIndex)" alt="" />
              <!-- {{ imgIndex }} -->
            </div>
          </div>

          <div class="movieActor clear" v-if=" clickMovieData.Data[0].Result[0].actors.actor[0].actorNm">
            <p>출연 / 스탭</p>
            <div
              class="actorsBox"
              v-for="(actorName, index) in actorNum((clickMovieData.Data[0].Result[0].actors.actor), actors)" 
              v-bind:key="index"><!--key를 actorName.actorId로 주니까 데이터 자체에 같은 배우명단이 2개인 경우가 있어서 actorId가 중복된다는 error가 발생. 일단 에러 없애기 위해서 key를 임의의 index로 주었다.-->
                  <span class="krNm">{{ actorEdit(actorName.actorNm) }} </span>
                  <br/>
                  <span class="enNm">{{ actorEdit(actorName.actorEnNm) }}</span> 
            </div><!--.actorsBox-->

            <button 
              v-if="clickMovieData.Data[0].Result[0].actors.actor.length > 10"
              @click="actorMore(clickMovieData.Data[0].Result[0].actors.actor.length, 'yes')">{{ actorsBtnText }}</button>
          </div><!--.movieActor-->
      </div><!--.detailBox-->
      
      <br/>
      <!-- <div style="border:2px solid red;">클릭한 id 영화 데이터: {{ clickMovieData }}</div> -->
      
  </div>
</template>

<script>
import { saveValue, saveType, deleteCookie, saveFirstKey, saveLike, getLike, saveLikePocket, getLikePocket, getIDFromCookie } from '../utils/cookies';

export default {
  data() {
    return {
      imgIndex: 0,
      keywordIndex: 0,
      searchText: '',
      key: '', // 키워드 중 첫 번째만 추출.(SimilarMovie.vue로 전달할 것)
      actors: 10, // 배우 불러오는 수.(더보기 버튼 클릭시 전체 배우 수만큼 숫자 늘어남)
      actorsAllCheck: 'no',
      actorsBtnText: '더보기',
      likeCheck: '',
    }
  },
  computed: {
    clickMovieData() {
      // return this.$store.state.clickMovie;
      return this.$store.state.moviedata;
    },
    getCookieLike() {
      return getLike();
    },
  },
  created() {   
    console.log(this.$store.state.movieID);
    
    // 영화 상세정보 불러옴.(cookie이용해서 api만들어서 가져올 것임.)
    const idAPI = this.$store.state.movieID;
    console.log(idAPI);
    
    this.$store.dispatch('FETCH_TITLE', idAPI);


    // // cookie의 like와 movie_ID 내용을 확인해서 좋아요 버튼 활셩화 유무 판단.
    // console.log('like확인!!!');
    // console.log(this.getCookieLike);
    
    // this.likeCheck = this.getCookieLike;
    // console.log(this.likeCheck);


    // cookie의 likePocket에 영화정보가 있으면 data의 likeCheck를 true로 해줌.(페이지 로딩시 - 즉, 다른 페이지 갔다가 다시 들어와도 그대로 기록이 남아있도록 해주는 것.)
    let getMovieID = getIDFromCookie();   // MovieConts에서 포스터 클릭 시 cookie로 넘겨준 이 영화 정보 가져옴.
    let getLike = getLikePocket(); // cookie에 있는 likePocket 내용 가져옴.
    let likePKdiv = getLike.split('['); // likePocket의 내용들(객체화시킴)을 배열로 바꿔줌.

    console.log(getMovieID.replace(/(\s*)/g, ''));    

    for(let i = 1; i < likePKdiv.length; i++) {
      let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3]; // ㅣlikePocket에 들어있는 영화정보들 일일히 비교하기위해 영화정보만 분리시킴.(like정보도 함께 있었기 때문.)
      console.log(getLikeDiv.replace(/(\s*)/g, ''));
      let like = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[7];
      console.log(like);
      
      
      // getMovieID와 getLikeDiv의 공백 수가 달라서 아예 공백을 없애서 비교해줌.
      if(getLikeDiv.replace(/(\s*)/g, '') === getMovieID.replace(/(\s*)/g, '')) { // 현재 상세페이지의 영화가 likePocket에 있으면 좋아요 버튼 true로 줌.
        console.log('좋아요 포켓에 이 영화 있다.');
        this.likeCheck = like;
        break; // for문 돌면서 좋아요 포켓에 영화가 있다는 결과가 나오면 더이상 함수 돌리지 않는다.
      } else {
        console.log('좋아요 포켓에 이 영화 없습니다..');
        
        this.likeCheck = 'false';
      }
    }
    
    

    
  },
  // 메서드의 actorNum을 실행시키기 위해서 beforeUpdated를 작성해준 것이었는데, 없어도 알아서 작동된다. 태그에 v-for로 넣어줬더니.
  // beforeUpdated(){
  //   console.log('actornum실행해라~~');
    
  //   this.actorNum();
  // },
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
    // keyword하나씩 넣어줌. + data의 keywordFirst에 첫 번째 키워드 넣어줌.
    keyWord(key, index) {
      if(key === '') return;
      else if(key.indexOf(',') === -1) {
        // this.keywordFirst = key;
        return key;
      }
      else if(key.indexOf(',')) {
        // this.keywordFirst = key.split(',')[0];
        return key.split(',')[index];
      }
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
    // 배우가 10명 초과일 경우 10명까지만 추출함.
    actorNum(actors, num) {
      console.log(actors.length);
      return actors.slice(0, num);
    },
    // '더보기'버튼 클릭하면 모든 배우 목록이 보이도록 해줌.
    actorMore(all, moreCheck) {
      if(this.actorsAllCheck === 'no') {
        this.actors = all;
        this.actorsAllCheck = moreCheck;
        this.actorsBtnText = '접기';
      } else if(this.actorsAllCheck === 'yes') {
        this.actors = 10;
        this.actorsAllCheck = 'no';
        this.actorsBtnText = '더보기';
      }     
    },
    // 배우 이름에 !HE, !HS 제거해줌.
    actorEdit(name) {
      if(name.match(/!HE | !HS/gi)) return name.replace(/!HE | !HS/g, '');
      else return name;
    },

    // keyword 클릭하면 해당 키워드별 영화목록 보이게 함.
    btnSearch(check) {
      // 영화검색위해 입력한 검색어 + 검색타입 cookie에 저장해줌.
      saveValue(`keyword=${this.searchText}`);
      saveType(this.check); 

      const searchTxtBox = {
        searchTxt : `keyword=${this.searchText}`, 
        check : check,
      };
      console.log(searchTxtBox);
            
      // 바로 state에 겁색어랑 체크박스확인ㅇ데이터 넣어줘봄.
      this.$store.commit('STATE_UTL', searchTxtBox);

      // router이동 주소 보내줌.
      this.$router.push('/movie');


      // input창 비워줌.
      this.searchText = '';
    },
    // like버튼 클릭 시 data에 likeCheck데이터 전달.
    likeMovie(title, director, movieSeq) {
      // 좋아요 버튼 값과 해당 영화의 정보를 '좋아요주머니'배열 속 요소로 넣어주자.


      if(this.likeCheck === 'false') {
        this.likeCheck = 'true';

        // let thisLikeInform = 'true';
        // let thisLikeInform = {
        //   // title: 'title=진도&director=유동종&movieSeq=09848',
        //   // movieID: `title=${title}&director=${director}&movieSeq=${movieSeq}`,
        //   likeCK: 'true'
        // };   

        // saveLikePocket에 넣어주기 위해 배열로 만들음.(중복되니까 나중에 정리할 방법 생각하기)
        let likePocket = [ 
          {movieID: `title=${title}&director=${director}&movieSeq=${movieSeq}`},
          {likeCK: 'true'}
        ];

        
        // let getLikePK = getLikePocket();
        // console.log(getLikePK);
        // console.log(getLikePK.split('['));
        // let likePKdiv = getLikePK.split('[');
        // console.log(likePKdiv[1].replace(/[\{\}\]]/g, '').slice(likePKdiv[1].indexOf(':'), likePKdiv[1].indexOf(',')-2).replace(/\"/g, '')); // likePocket에 들어있는 영화 정보 하나씩 추출 후 .
        // console.log(likePKdiv);
        
        // console.log(thisLikeInform.movieID);

        // for(let i = 0; i < likePKdiv.length; i++) {
        //   let movieInform = likePKdiv[i].replace(/[\{\}\]]/g, '').slice(likePKdiv[1].indexOf(':'), likePKdiv[1].indexOf(',')-2).replace(/\"/g, '');
        //   if(movieInform !== thisLikeInform.movieID) {
        //     console.log('영화가 pocket에 없다!!!');
            
        //   }
        // }

        // cookie에 like값 넣어줌.
        // saveLike(thisLikeInform); 
        // cookie의 likePocket에 like버튼 누른 영화정보 넣어줌.
        saveLikePocket(likePocket);
      } else {
        console.log('좋아요 취소합니다!!!!');
        
        this.likeCheck = 'false';

        let likePocket = 'false';
        saveLikePocket(likePocket);


        // let thisLikeInform = 'false';
        // let thisLikeInform = {
        //   // title: 'title=진도&director=유동종&movieSeq=09848',
        //   // movieID: `title=${title}&director=${director}&movieSeq=${movieSeq}`,
        //   likeCK: 'false'
        // };

        // saveLike(thisLikeInform);

        // 쿠키의 likePocket에 저장된 정보 가져와서 좋아요 취소한 영화 데이터 삭제시켜 줘야함.





        // let likePocket = [ // saveLikePocket에 넣어주기 위해 배열로 만들음.(중복되니까 나중에 정리할 방법 생각하기)
        //   {movieID: `title=${title}&director=${director}&movieSeq=${movieSeq}`},
        //   {likeCK: 'false'}
        // ];

        // // 쿠키의 likePocket에 저장된 정보 가져와서 좋아요 취소한 영화 데이터 삭제시켜 줘야함.
        // let getLikePK = getLikePocket();
        // let likePKdiv = getLikePK.split('[');
        // console.log('likePocket에 저장된 영화 데이터 불러온다!!!!');        
        // console.log(getLikePK);
        // console.log(likePKdiv);
        
        // for(let i = 0; i < likePKdiv.length; i++) {
        //   // let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"');
        //   let newLikeMovie = likePocket[0][Object.keys(likePocket[0])[0]];

        //   console.log(likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3]);
        //   if(likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3] === newLikeMovie) {
        //     saveLikePocket(likePKdiv[i].replace('"true"', '"false"'));
        //   }
        // }
        // console.log(likePocket[0][Object.keys(likePocket[0])[0]]);
        
        // saveLikePocket(likePocket);
      }
      console.log(this.likeCheck);
    },
  }
}

</script>

<style>

</style>