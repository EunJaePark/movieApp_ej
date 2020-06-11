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

export { saveValue, saveType, getValueFromCookie, getTypeFromCookie, deleteCookie, saveInform, getIDFromCookie, saveFirstKey, getFirstKey }