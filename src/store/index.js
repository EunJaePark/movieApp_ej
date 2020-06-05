import Vue from 'vue'
import Vuex from 'vuex'
import { movieSearch  } from '../api/index'
import { getValueFromCookie, getTypeFromCookie } from '../utils/cookies';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviedata: [],
    // searchTxt: '',
    result: [],
    clickMovie: [], 
    searchTxtBox: {
      searchTxt : getValueFromCookie() || '', 
      check : getTypeFromCookie() || ''
    } 
  },
  mutations: {
    SET_URL(state, data) {
      console.log(data);
      // movie 전체 데이터 생성.
      state.moviedata = data
      // 영화 세부 정보 데이터.
      state.result = data.Data[0].Result
      // state.thisMovie = data.Data[this.state.index].Result
    },
    STATE_UTL(state, searchTxtBox) {
      state.searchTxtBox = searchTxtBox
    },
    CLICK_MOVIE(state, movie) {
      state.clickMovie = movie
    }
  },
  actions: {
    FETCH_TITLE(context, data) {
      console.log(data);
      return movieSearch(data.searchTxt)
      .then(res => {
        context.commit('SET_URL', res.data)
        return res;
      })
      .catch(err => {
        console.log(err);
          
      })
    },
  },
  modules: {
  }
}) 
