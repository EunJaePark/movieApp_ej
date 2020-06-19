<template>
  <div class="likeConts" >
      <button @mouseover="likeMovieAPI()">찜한 영화 : {{ likeCount }}개</button>      
      <!-- {{ likeNum }} -->
      <div class="movieListBox">
          찜한 영화 목록 
          <ul>
            <li v-for="(movie, index) in likeMovieInform" :key="index">{{ likeMovieInform[0] }}</li>

          </ul>
      </div>
  </div>
</template>

<script>
import { getLikePocket } from '../../utils/cookies';

export default {
    data() {
        return {
            likeCount: 0,
            likePocket: [],
            likeMovieInform: [],
        }
    },
    // computed: {
    //     likeNum() {
    //         let getLikePK = getLikePocket(); // 좋아요 해제한 영화 정보 가져옴.
    //         console.log(getLikePK);
    //         let likePKdiv = getLikePK.split('[');
    //         console.log(likePKdiv);
            
    //         for(let i = 0; i < likePKdiv.length; i++) {
    //             console.log(likePKdiv[i]);
    //             if(likePKdiv[i] !== "''") {
    //                 let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3].replace(/(\s*)/g, '');; // likePocket에 있던 영화정보 각각 불러옴.
    //                 console.log(getLikeDiv);
    //             }
    //             this.likeCount++;
    //         }
    //     }
        
    // },
    created() {
        let getLikePK = getLikePocket(); // 좋아요 해제한 영화 정보 가져옴.
        console.log(getLikePK);
        let likePKdiv = getLikePK.split('[');
        console.log(likePKdiv);
            
        for(let i = 0; i < likePKdiv.length; i++) {
            console.log(likePKdiv[i]);
            if(likePKdiv[i] !== "''") {
                let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3].replace(/(\s*)/g, '');; // likePocket에 있던 영화정보 각각 불러옴.
                console.log(getLikeDiv);
                this.likePocket.push(getLikeDiv);
            }
            this.likeCount++;
        }


        // 찜한 영화목록 api주소로 데이터 불러오기.
        console.log('찜한 영화 api 불러와보자~~~');
        console.log(this.likePocket);
            

            // 찜한 영화 목록 데이터 불러오ㅏ야 되는데 헤매고 있음...
            // api주소가 배열로 되어있는데, 어떻게 하나씩 보내지????
            for(let i = 0; i < this.likePocket.length; i++) {
                let apiData = this.likePocket[i];
                console.log(this.likePocket[i]);
                
                const searchTxtBox = {
                    searchTxt : apiData, 
                    // check : this.check
                };
                console.log(searchTxtBox);
                
                this.$store.commit('STATE_UTL', searchTxtBox);

                let searchTxtbox = this.$store.state.searchTxtBox.searchTxt;
                this.$store.dispatch('LIKE_MOVIE_LIST', searchTxtbox);
                console.log(searchTxtbox);
                

                console.log(this.$store.state.likeMovies);
                

                // for(let j = 0; j < this.$store.state.likeMovies.length; j++) {}
                
                // this.likeMovieInform.push(this.$store.state.likeMovies);
                // let title = this.$store.state.likeMovies.data.Data[0].Result[0].title;
                // this.likeMovieTitle.push(title.replace(/!HE|!HS/g, ''));
            }  
            console.log(this.$store.state.likeMovies);
            console.log(this.$store.state.likeMovies.length);
            this.likeMovieInform.push(this.$store.state.likeMovies);
            this.likeMovieList(this.$store.state.likeMovies);  
    },
    methods: {
        likeMovieList() {
            console.log('영화 목록 배열로 잘 생성해보자!!!');
            
            // // this.
            // console.log('찜한 영화 api 불러와보자~~~');
            // console.log(this.likePocket);

            

            // // 찜한 영화 목록 데이터 불러오ㅏ야 되는데 헤매고 있음...
            // // api주소가 배열로 되어있는데, 어떻게 하나씩 보내지????
            // for(let i = 0; i < this.likePocket.length; i++) {
            //     let apiData = this.likePocket[i];
            //     console.log(this.likePocket[i]);
                
            //     const searchTxtBox = {
            //         searchTxt : apiData, 
            //         // check : this.check
            //     };
            //     console.log(this.likePocket[i]);
            //     this.$store.commit('STATE_UTL', searchTxtBox);

            //     let searchTxtbox = this.$store.state.searchTxtBox.searchTxt[i];
            //     this.$store.dispatch('LIKE_MOVIE_LIST', searchTxtbox);
            //     console.log(searchTxtbox);
                

            //     console.log(this.$store.state.likeMovies.data);
                
            //     console.log(this.$store.state.likeMovies.data.Data[0].Result[0].title);
            //     let title = this.$store.state.likeMovies.data.Data[0].Result[0].title;
            //     this.likeMovieTitle.push(title.replace(/!HE|!HS/g, ''));
            // }

            
            
        },
    },
}
</script>

<style>

</style>