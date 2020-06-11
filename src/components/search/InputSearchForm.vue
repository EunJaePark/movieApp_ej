<template>
  <div class="mainConts">
      <form class="checkbox">
        <!-- radio인테 중복선택되어서 name을 줌. -->
          <label 
            v-for="(item, index) in searchType" :key="index"
            :class="{'checkStyle': check === item.type}">
              <input 
                type="radio"  name="search"
                v-model="check" :value="item.type" />
              {{ item.typeKR }}
          </label>
      </form>

      <form class="inputBox" @submit="submitSearchData" >
        <input 
            v-for="(item, index) in searchType" :key="index"
            v-model="searchText" v-if="check === item.type"
            type="text" :placeholder="`${item.typeKR} 입력하세요`" />
        <button>검색</button>
      </form> 

  </div>
</template>


<script>
import { eventbus } from '../../main';
import { saveValue, saveType, deleteCookie } from '../../utils/cookies';

export default {
    data() {
        return {
            searchType: [
                {
                    type: 'title',
                    typeKR: '제목',

                },
                {
                    type: 'actor',
                    typeKR: '배우'
                },
                {
                    type: 'director',
                    typeKR: '감독'
                },
                {
                    type: 'nation',
                    typeKR: '국가'
                },
            ],
            searchText: '',
            check: 'title',
        }      
    },
    created() {
        // main페이지 접속 시 cookie에 저장되어있던 검색명과 검색타입 제거해줌.
        deleteCookie('movie_title');
        deleteCookie('movie_type'); 
    },
    methods: {
        submitSearchData() {
            console.log('검색어 넘긴다!!!!');
            console.log(this.searchText, this.check);
            // (영화검색명 + 체크박스상태)를 MovieConts로 보내기 위함.(main.js에 작성해놓은 이벤트버스)
            eventbus.passSearchTxt(this.searchText, this.check);
            console.log('이벤트버스로 데이터 넘긴 다음 행.');

            // 영화검색위해 입력한 검색어 + 검색타입 cookie에 저장해줌.
            saveValue(`${this.check}=${this.searchText}`);
            saveType(this.check);           
                      
            const searchTxtBox = {
                searchTxt : `${this.check}=${this.searchText}`, 
                check : this.check
            };
            
            // 바로 state에 겁색어랑 체크박스확인ㅇ데이터 넣어줘봄.
            this.$store.commit('STATE_UTL', searchTxtBox);

            // router이동 주소 보내줌.
            this.$router.push('/movie');

            // input창 비워줌.
            this.searchText = '';
        },
    }
}
</script>

<style scoped>

</style>