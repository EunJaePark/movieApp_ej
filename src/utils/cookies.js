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

// InformConts에서 새로고침시 데이터 남아있도록 하는 쿠키 생성.
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

export { saveValue, saveType, getValueFromCookie, getTypeFromCookie, deleteCookie, saveInform, getIDFromCookie }