import Vue from 'vue'
import Vuex from 'vuex'
import { movieSearch  } from '../api/index'
import { getValueFromCookie, getTypeFromCookie, getIDFromCookie } from '../utils/cookies';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviedata: [],
    // searchTxt: '',
    result: [],
    // clickMovie: [], 
    searchTxtBox: {
      searchTxt : getValueFromCookie() || '', 
      check : getTypeFromCookie() || ''
    } ,
    keywordFirstBox: {
      searchTxt : '',
      check : '',
    },
    similarMoviedata: [],
    movieID: {
      searchTxt : getIDFromCookie() || '',
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
    // CLICK_MOVIE(state, movie) {
    //   state.clickMovie = movie
    // },
    MOVIE_ID(state, id) {
      state.movieID = id
    },
    SIMILAR_MOVIE_API(state, keywordFirstBox) {
      state.keywordFirstBox = keywordFirstBox
    },
    SIMILAR_MOVIES(state, data) {
      state.similarMoviedata = data
    },
  },
  actions: {
    FETCH_TITLE(context, data) {
      console.log(data);
      return movieSearch(data.searchTxt)
      .then(res => {
        context.commit('SET_URL', res.data)
        console.log(res);
        
        return res;
      })
      .catch(err => {
        console.log(err);
          
      })
    },
    KEY_SIMILAR(context, data) {
      console.log(data);
      return movieSearch(data.searchTxt)
      .then(res => {
        context.commit('SIMILAR_MOVIES', res.data)
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
