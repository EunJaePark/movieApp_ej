<template>
  <div class="mainConts">
      <form class="checkbox">
        <!-- radio인테 중복선택되어서 name을 줌. -->
        <label v-bind:class="{'checkStyle': check === 'titleCK'}">
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'titleCK'" />
            제목
        </label>
        <label v-bind:class="{'checkStyle': check === 'directorCK'}">
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'directorCK'" />
            감독이름
        </label>
        <label v-bind:class="{'checkStyle': check === 'keyCK'}">
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'keyCK'" />
            키워드 ( ex) 액션, 행복.. )
        </label>
      </form>

      <form class="inputBox" @submit="titleSend" >
        <input 
            class="keyword" type="text" placeholder="제목을 입력하세요" 
            v-model="searchText" 
            v-if="check === 'titleCK'"/>
        <input 
            class="title" type="text" placeholder="감독 이름을 입력하세요" 
            v-model="searchText" v-if="check === 'directorCK'" />
        <input 
            class="title" type="text" placeholder="키워드를 입력하세요" 
            v-model="searchText" v-if="check === 'keyCK'" />

        <button>입력</button>
      </form> 
  </div>
</template>

<script>
import { eventbus } from '../main';

export default {
    data() {
        return {
            searchText: '',
            check: 'titleCK',
        }      
    },
    methods: {
        titleSend() {
            console.log('검색어 넘긴다!!!!');
            console.log(this.searchText, this.check);
            // (영화검색명 + 체크박스상태)를 MovieConts로 보내기 위함.(main.js에 작성해놓은 이벤트버스)
            eventbus.passSearchTxt(this.searchText, this.check);
            console.log('이벤트버스로 데이터 넘긴 다음 행.');
            // router이동 주소 보내줌.
            this.$router.push('/movie');

            const searchTxt = {
                searchTxt : this.searchText, 
                check : this.check
            };
            console.log(searchTxt);
            
            // 바로 state에 겁색어랑 체크박스확인ㅇ데이터 넣어줘봄.
            this.$store.commit('STATE_UTL', searchTxt);

            // input창 비워줌.
            this.searchText = '';
        },
    }
}
</script>

<style scoped>

</style>