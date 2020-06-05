import axios from 'axios';

const config = {
    baseURL : 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=100&sort=prodYear,1&',
    myKey : 'M1NV1B1101HZ3282TRPW',
}

function movieSearch(searchtxt) {
    return axios.get(`${config.baseURL}${searchtxt}&ServiceKey=${config.myKey}`);
}


export { movieSearch } 