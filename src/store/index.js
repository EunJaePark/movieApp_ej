import Vue from 'vue'
import Vuex from 'vuex'
import { movieTitle, movieDirector, movieActor, movieNation, movieGenre, movieKeyword  } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviedata: [],
    searchTxt: '',
    result: [],
    clickMovie: [],
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
    STATE_UTL(state, searchTxt) {
      state.searchTxt = searchTxt
    },
    CLICK_MOVIE(state, movie) {
      state.clickMovie = movie
    }
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
      // 검색단어가 '배우'일 경우
      else if(data.check === 'actorCK') {
        return movieActor(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
      // 검색단어가 '감독'일 경우
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
      // 검색단어가 '국가'일 경우
      else if(data.check === 'nationCK') {
        return movieNation(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
      // 검색단어가 '장르'일 경우
      else if(data.check === 'genreCK') {
        return movieGenre(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
      // 검색단어가 '키워드'일 경우
      else if(data.check === 'keywordCK') {
        console.log('keywordCK잘 전달됬다!!!store로!!!');
        
        return movieKeyword(data.searchTxt)
        .then(res => {
          context.commit('SET_URL', res.data)
          return res;
        })
        .catch(err => {
          console.log(err);
          
        }) 
      }
    },
    // // 클릭한 poster의 영화 id 넘겨줌.
    // MOVIE_CLICK(context, movie) {
    //   console.log('클릭한 영화데이터 넘어왔따.');    
    //   return context.commit('CLICK_MOVIE', movie) 
    // }
  },
  modules: {
  }
}) 
