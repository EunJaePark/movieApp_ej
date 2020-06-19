import Vue from 'vue'
import Vuex from 'vuex'
import { movieSearch  } from '../api/index'
import { getValueFromCookie, getTypeFromCookie, getIDFromCookie, getFirstKey, getLike } from '../utils/cookies';

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
      searchTxt : getFirstKey() || '',
      check : '',
    },
    similarMoviedata: [],
    movieID: {
      searchTxt : getIDFromCookie() || '',
    },
    // like: '',
    likeMovies: [],
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
      console.log(searchTxtBox);
      
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
    // MOVIE_LIKE(state, likeCK) {
    //   state.like = likeCK
    // },
    LIKE_MOVIES(state, movie) {
      // console.log(movie);     
      state.likeMovies.push(movie)
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
    LIKE_MOVIE_LIST(context, data) {
      console.log(data);
      // for(let i = 0; i < data.length; i++) {
      return movieSearch(data)
      .then(res => {
        context.commit('LIKE_MOVIES', res.data.Data[0])
        // console.log(res);
        // console.log(res.data.Data[0]);
        
        return res;
      })
      .catch(err => {
        console.log(err);
          
      })
    // }
    },
  },
  modules: {
  }
}) 
