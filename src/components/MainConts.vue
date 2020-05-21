<template>
  <div>
      <form>
        <!-- radio인테 중복선택되어서 name을 줌. -->
        <label>
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'titleCK'" 
            />
            제목
        </label>
        <label>
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'directorCK'" 
            />
            감독이름
        </label>
        <label>
            <input 
                type="radio" name="search" 
                v-model="check" v-bind:value="'keyCK'" 
            />
            키워드( ex)액션, 행복.. )
        </label>
      </form>

      <form @submit="titleSend">
        <input 
            class="keyword" type="text" placeholder="키워드를 입력하세요" 
            v-model="searchText" v-if="check === 'titleCK'"
        />
        <input 
            class="title" type="text" placeholder="감독명을 입력하세요" 
            v-model="searchText" v-if="check === 'directorCK'" 
        />
        <input 
            class="title" type="text" placeholder="제목을 입력하세요" 
            v-model="searchText" v-if="check === 'keyCK'" 
        />
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
            console.log(this.searchText, this.check);
            // 영화검색명을 MovieConts로 보내기 위함.(main.js에 작성해놓은 이벤트버스)
            eventbus.passSearchTxt(this.searchText, this.check);

            // input창 비워줌.
            this.searchText = '';
        },
    }
}
</script>

<style scoped>
form{ background-color:orchid; }
</style>