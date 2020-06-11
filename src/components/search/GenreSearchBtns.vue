<template>
  <div class="genreBtnBox">
      <form class="genreBtn" @click="btnSearch('genreCK')" v-bind:value="'genreCK'">
          <p>
              <span># genre</span> 
              <span># 장르별</span>
              <span>모아보기!</span>
          </p>
          <button v-for="(item, index) in genre" :key="index" @click="searchText = item">
              {{ item }}
          </button>
      </form>
  </div>
</template>

<script>
import { saveValue, saveType } from '../../utils/cookies';

export default {
    data() {
        return {
            genre: ['애니메이션', '역사', '코메디', '드라마', 'SF', '사회', '액션', '로맨스'],
            searchText: '',
        }
    },
    methods: {
        btnSearch(check) {
            // 영화검색위해 입력한 검색어 + 검색타입 cookie에 저장해줌.
            saveValue(`genre=${this.searchText}`);
            saveType(check);

            const searchTxtBox = {
                searchTxt : `genre=${this.searchText}`, 
                check : check,
            };
            console.log(searchTxtBox);
            
            // 바로 state에 겁색어랑 체크박스확인ㅇ데이터 넣어줘봄.
            this.$store.commit('STATE_UTL', searchTxtBox);

            // router이동 주소 보내줌.
            this.$router.push('/movie');

            // input창 비워줌.
            this.searchText = '';
        }
    },
}
</script>

<style>

</style>