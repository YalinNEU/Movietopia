const fetch = require('node-fetch');

const getMovies = (apikey, prefix) => {
    const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${prefix}`;
    return fetch(url)
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        //console.log(j);
        return j;
    })
    .catch(e => console.warn(e));
}

const getMovieInfo = (apikey, title) => {
    const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title}`;
    return fetch(url)
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        //console.log(j);
        return j;
    })
    .catch(e => console.warn(e));
}

module.exports = {getMovies, getMovieInfo};