import axios from 'axios';

const config = {
    // http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&director=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=인증키값
    baseURL : 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=100&sort=prodYear,1&',
    myKey : 'M1NV1B1101HZ3282TRPW',
}

function movieSearch(searchtxt) {
    console.log(`${config.baseURL}${searchtxt}&ServiceKey=${config.myKey}`);
    console.log(axios.get(`${config.baseURL}${searchtxt}&ServiceKey=${config.myKey}`));
    
    
    return axios.get(`${config.baseURL}${searchtxt}&ServiceKey=${config.myKey}`);
}


export { movieSearch } 