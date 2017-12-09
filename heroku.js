const fetch = require('node-fetch');

const getReviews = (token) => {
    const url = `http://sea-info6250-crud.herokuapp.com/topics/garfi/reviews`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: `userToken=${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        return j.details;
    })
    .catch(e => console.warn(e));
}

const saveReviews = (token, reviews) => {
    const url = `http://sea-info6250-crud.herokuapp.com/topics/garfi/reviews`;
    return fetch(url, {
        method: 'PUT',
        credentials: 'include',
		    body: JSON.stringify({toStore: reviews}),
        headers: {
            Cookie: `userToken=${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        return j;
    })
    .catch(e => console.warn(e));
}

const getMovieComments = (token) => {
    const url = `http://sea-info6250-crud.herokuapp.com/topics/garfi/movies`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: `userToken=${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        return j.details;
    })
    .catch(e => console.warn(e));
}

const saveMovieComments = (token, comments) => {
    const url = `http://sea-info6250-crud.herokuapp.com/topics/garfi/movies`;
    return fetch(url, {
        method: 'PUT',
        credentials: 'include',
		    body: JSON.stringify({toStore:comments}),
        headers: {
            Cookie: `userToken=${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        return j;
    })
    .catch(e => console.warn(e));
}

const getAuthorization = () => {
    const url = `http://sea-info6250-crud.herokuapp.com/users/garfi/admin/session`;
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
		    body: JSON.stringify({password:'garfi'}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => {
        return r.ok ? r.json() : r.json().then(j => Promise.reject(j))
    })
    .then(j => {
        return j;// token is here
    })
    .catch(e => {
        console.warn(e);
        return e;
    });
}

const logoutAdmin = () => {
    const url = `http://sea-info6250-crud.herokuapp.com/users/garfi/admin/session`;
    return fetch(url, {
        method: 'DELETE',
        credentials: 'include',
		    body: JSON.stringify({password:'garfi'}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
    .then(j => {
        console.log(j);
        return j;
    })
    .catch(e => console.warn(e));
}

module.exports = {getReviews, saveReviews, getMovieComments, saveMovieComments, getAuthorization, logoutAdmin};