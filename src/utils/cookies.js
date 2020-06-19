// MainConts에서 사용.
function saveValue(value) {
    document.cookie = `movie_title = ${ value }`;
}
function saveType(type) {
    document.cookie = `movie_type = ${ type }`;
}

// store에서 사용.
function getValueFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)movie_title\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
}  
function getTypeFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)movie_type\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
}

// MainConts에서 사용.
function deleteCookie(value) {
    document.cookie = `${value} = ''`;
}

// InformConts에서 새로고침시 해당 영화 데이터 남아있도록 하는 쿠키 생성.
// 인자값이름은 movieID라고 해놓았지만 해당 영화의 api를 구하기 위한 title, director, movieSeq가 들어있다.
function saveInform(movieID) {
    document.cookie = `movie_ID = ${movieID}`;
    document.cookie = `informCheck = movieId`;
}
function getIDFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)movie_ID\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
} 
// 첫번째 키워드 cookie에 저장용.(새로고침시 첫번째 키워드 데이터가 사라지기 때문.)
function saveFirstKey(key) {
    document.cookie = `firstKey = ${key}`;
}
function getFirstKey() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)firstKey\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

// 좋아요 버튼 클릭 시 cookie에 like값 저장해줌.
function saveLike(likeCheck) {
    document.cookie = `like = ${likeCheck}`;
    // document.cookie = `like = ${JSON.stryingify(likeCheck)}`;
}
function getLike() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)like\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

// 좋아요 정보와 해당 영화의 데이터를 '좋아요 주머니'에 담아두자.
function saveLikePocket(likeData) {
    movieDel();
    movieAdd();

    function movieDel() {
        console.log(likeData);
        if(likeData === 'false') {
            console.log('이 영화목록 좋아요포켓에서 삭제해야된다!!!');
            let getMovieID = getIDFromCookie(); // 좋아요 해제한 영화 정보 가져옴.
            let movieIDnum = getMovieID.slice(getMovieID.lastIndexOf('=') + 1, getMovieID.length); // 영화 정보 중 movieSeq숫자만 불러옴.(이걸로 비교할 것임)
            console.log(movieIDnum);
                     
            let getLikePocket = document.cookie.replace(/(?:(?:^|.*;\s*)likePocket\s*=\s*([^;]*).*$)|^.*$/,'$1',); // cookie의 likePocket불러옴.
            let likePKdiv = getLikePocket.split('['); // 객체로 변했던 likePocket를 배열로 바꿔줌.
            console.log(getLikePocket);
            console.log(likePKdiv);

            for(let i = 0; i < likePKdiv.length; i++) { // likePocket에 들어있던 영화 수만큼 for문 돌려서 비교해 줄 것임.
                console.log(likePKdiv[i]);
                
                let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3]; // likePocket에 있던 영화정보 각각 불러옴.
                console.log(getLikeDiv);
                if(likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3] !== undefined) {
                    let noBlankLikePKdiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3].replace(/(\s*)/g, ''); // 영화정보 공백 없앰.
                    let likeMvNum = noBlankLikePKdiv.slice(noBlankLikePKdiv.lastIndexOf('=') + 1, noBlankLikePKdiv.length); // 영화정보의 movieSeq숫자만 불러옴.
                    console.log(likeMvNum);
                    if(likeMvNum === movieIDnum) {
                        console.log(`[${likePKdiv[i]}`);
                        
                        getLikePocket.replace(`[${likePKdiv[i]}`, '');
                        // console.log(getLikePocket.indexOf(`[${likePKdiv[i]}`));
                        // console.log(getLikePocket.indexOf(`[${likePKdiv[i]}`)+(likePKdiv[i].length+1));
                        console.log(getLikePocket);
                        let removeTxtFirstIndex = getLikePocket.indexOf(`[${likePKdiv[i]}`);
                        let removeTxtlastIndex = getLikePocket.indexOf(`[${likePKdiv[i]}`)+(likePKdiv[i].length+1);
                        console.log(removeTxtFirstIndex, removeTxtlastIndex);
                        
                        // getLikePocket.slice(removeTxtFirstIndex, removeTxtlastIndex);
                        console.log(getLikePocket.slice(removeTxtFirstIndex, removeTxtlastIndex));

                        // 좋아요 취소한 영화정보를 제외한 나머지 기존에 좋아요 눌렀던 영화 정보들 다시 lickPocket쿠키로 넘김.
                        getLikePocket = `${getLikePocket.slice(0, removeTxtFirstIndex)}${getLikePocket.slice(removeTxtlastIndex, getLikePocket.length)}`;
                        break;
                    }
                }
                // console.log(getLikeDiv.slice(getMovieID.lastIndexOf('=') + 1, getMovieID.length));
                // if(likePKdiv[i].replace(/[\{\}\]]/g, '').split('"')[3].replace(/(\s*)/g, '') = )
            }
            console.log(getLikePocket);
            
            document.cookie = `likePocket = ${getLikePocket}`;
        }
    }
    
    function movieAdd() {
        let getLikePocket = document.cookie.replace(/(?:(?:^|.*;\s*)likePocket\s*=\s*([^;]*).*$)|^.*$/,'$1',);
        let likePKdiv = getLikePocket.split('[');
        // console.log(`getLikePocket = ${getLikePocket}`);
        
        // console.log(`likePKdiv = ${likePKdiv}`);
        
        let movieInform;
        for(let i = 0; i < likePKdiv.length; i++) {
            // console.log(`getLikePocket = ${getLikePocket}`);
        
            // console.log(`likePKdiv = ${likePKdiv}`);
            // *** cookie의 'likePocket에 저장되어있는 영화 정보' 불러옴. ***
            if(getLikePocket !== '') {
                let getLikeDiv = likePKdiv[i].replace(/[\{\}\]]/g, '').split('"');
                // console.log(getLikeDiv);          
                movieInform = getLikeDiv[3]; // cookie의 likePocket에 저장되있던 좋아요 눌린 영화 정보.
                // movieInform = likePKdiv[i].replace(/[\{\}\]]/g, '').slice(likePKdiv[1].match(/:/g), likePKdiv[1].match(/likeCK/)).replace(/\"/g, '');
                // movieInform에서 slice를 indexOf로 순서로 찾아주니까, 영화제목마다 길이가 달라 엉망으로 적용된다.... 인덱스가 아닌 문자 그 자체로 찾아야겠다.
                // ======> likePKdiv[i].replace(/[\{\}\]]/g, '')을 "로 나눠 배열로 만든 뒤, getLikeDiv로 선언해주고, 배열의 3번째 요소인 영화정보를 가져왔다!!!!

                // console.log(`movieInform = ${movieInform}`);
                // console.log(likeData[0].movieID);
                // console.log(likeData[0].slice(likeData[0].indexOf('`'), likeData[0].indexOf('}')-2));
            }

            // *** likePocket쿠키로 '좋아요 버튼 클릭한 영화의 정보' + '종아요 상태' 전달. ***
            if(getLikePocket === '') { //만약 cookie의 likePocket의 값이 비었다면 새롭게 내용 추가.
                console.log('cookie의 likePocket이 비어있는 상태네!!');          
                document.cookie = `likePocket = ${JSON.stringify(likeData)}`;
                // break;
            } else if(getLikePocket !== '' && movieInform !== likeData[0].movieID) { // cookie의 likePocket에 내용이 있으면서 이미 같은 영화가 없는 경우 : 기존 내용 뒤에 넣어주기.
                console.log('likePocket에 내용은 있지만 지금 이 영화는 없는 상태야!!');           
                document.cookie = `likePocket = ${getLikePocket}${JSON.stringify(likeData)}`;
                // break;
            } 
            // else if(movieInform === likeData[0].movieID) /* getLikePocket의 movieID랑 새로 넣어주려는 likeData의 movieID랑 비교해줘야함 */ { // cookie의 likePocket에 내용이 있으면서 이미 같은 영화가 있는 경우 : 기존 영화의 like여부만 수정.
            //     console.log('같은 영화가 likePocket에 이미 들어있네!!!!');
            //     // 해당 영화를 cookie의 getLikePocket에서 찾아서 like유무만 수정해주자.
            //     // if(movieInform === likeData[0].movieID)
            //     break;
            // } 
        }
    }/* movieAdd() */
    
}/* saveLikePocket() */

function getLikePocket() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)likePocket\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

export { 
    saveValue, saveType, 
    getValueFromCookie, getTypeFromCookie, 
    deleteCookie, 
    saveInform, getIDFromCookie, 
    saveFirstKey, getFirstKey, 
    saveLike, getLike, 
    saveLikePocket, getLikePocket 
}