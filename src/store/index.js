import Vue from 'vue'
import Vuex from 'vuex'
import { movieTitle, movieDirector, movieKeyword } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviedata: [],
    searchTxt: '',
    result: [],
  },
  mutations: {
    SET_URL(state, data) {
      console.log(data);
      // movie 전체 데이터 생성.
      state.moviedata = data
      // 영화 세부 정보 데이터.
      state.result = data.Data[0].Result
    },
    STATE_UTL(state, searchTxt) {
      state.searchTxt = searchTxt
    },
  },
  actions: {
    FETCH_TITLE(context, data) {
      console.log(data);

      // 검색단어가 '제목'일 경우
      if(data.check === 'titleCK') {
        return movieTitle(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      } 
      // 검색단어가 '감독'일 경우
      else if(data.check === 'keyCK') {
        return movieKeyword(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
      // 검색단어가 '키워드'일 경우
      else if(data.check === 'directorCK') {
        return movieDirector(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
    }
  },
  modules: {
  }
}) 
