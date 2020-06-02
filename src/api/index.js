import axios from 'axios';

const config = {
    baseURL : 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=100&',
    myKey : 'M1NV1B1101HZ3282TRPW',
}

function movieTitle(searchtxt) {
    return axios.get(`${config.baseURL}title=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieActor(searchtxt) {
    return axios.get(`${config.baseURL}actor=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieDirector(searchtxt) {
    return axios.get(`${config.baseURL}director=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieNation(searchtxt) {
    return axios.get(`${config.baseURL}nation=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieGenre(searchtxt) {
    return axios.get(`${config.baseURL}genre=${searchtxt}&ServiceKey=${config.myKey}`);
}

function movieKeyword(searchtxt) {
    return axios.get(`${config.baseURL}keyword=${searchtxt}&ServiceKey=${config.myKey}`);
}

export { movieTitle, movieDirector, movieActor, movieNation,  movieGenre, movieKeyword  }