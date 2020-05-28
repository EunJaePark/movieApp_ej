import axios from 'axios';

const config = {
    // http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&director=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=인증키값
    // baseURLfront : 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&',
    // baseURLback : '=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=M1NV1B1101HZ3282TRPW',
    baseURL : 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&',
    myKey : 'M1NV1B1101HZ3282TRPW',
}

function movieTitle(searchtxt) {
    return axios.get(`${config.baseURL}title=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieDirector(searchtxt) {
    return axios.get(`${config.baseURL}director=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieKeyword(searchtxt) {
    return axios.get(`${config.baseURL}keyword=${searchtxt}&ServiceKey=${config.myKey}`);
}

export { movieTitle, movieDirector, movieKeyword }