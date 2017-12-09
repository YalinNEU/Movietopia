const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const heroku = require('./heroku.js');
const omdb = require('./omdb.js');
const API_KEY = '852159f0';
const PORT = process.env.PORT || 8000;

const jsonParser = bodyParser.json();

let reviews = {};
let comments = {};
let token = '';

app.get('/movie/search/:prefix', (req, res) => {
    omdb.getMovies(API_KEY, req.params.prefix)
    .then(searchResult => {
        res.send(JSON.stringify(searchResult));
    })
    .catch(e => console.warn(e));
});

app.get('/movie/:title', (req, res) => {
    omdb.getMovieInfo(API_KEY, req.params.title)
    .then(movieInfo => {
        res.send(JSON.stringify(movieInfo));
    })
    .catch(e => console.warn(e));
});

app.get('/comments', (req, res) => {
    res.send(JSON.stringify(comments));
});

app.get('/reviews', (req, res) => {
    res.send(JSON.stringify(reviews));
});

app.post('/review/:username/:movieTitle', jsonParser, (req, res) => {
    const body = req.body;
    console.log(body);
    const username = req.params.username;
    const movieTitle = req.params.movieTitle;
    if(!reviews[username]) {
        reviews[username] = [];
    }
    const reviewList = reviews[username];
    
    if(!comments[movieTitle]) {
        comments[movieTitle] = [];
    }
    const commentList = comments[movieTitle];
    
    reviewList.push({movieTitle: movieTitle, comments: body.comment.comments});
    commentList.push({user: username, comments: body.comment.comments});
    
    heroku.saveReviews(token, reviews)
    .then(j => console.log(j));
    
    heroku.saveMovieComments(token, comments)
    .then(j => console.log(j));
});

app.delete('/review/:username/:movieTitle', jsonParser, (req, res) => {
    const body = req.body;
    console.log(body);
    const username = req.params.username;
    const movieTitle = req.params.movieTitle;
    const reviewList = reviews[username];
    const commentList = comments[movieTitle];
    const index = body.index;
    
    reviewList.splice(index, 1);
    removeFirstObject(commentList, {user: username, comments: body.comment.comments});
    
    heroku.saveReviews(token, reviews)
    .then(j => console.log(j));
    
    heroku.saveMovieComments(token, comments)
    .then(j => console.log(j));
});

app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`It's port: ${PORT}`);
    heroku.getAuthorization()
    .then(j => {
        token = j.token;
        
        heroku.getMovieComments(token)
        .then(j => {
            comments = j;
            console.log(j);
        })
        
        heroku.getReviews(token)
        .then(j => {
            reviews = j;
            console.log(j);
        })
    });
});

const removeFirstObject = (arr, target) => {
    for(let i in arr) {
        let dup = true;
        for(let key in arr[i]) {
            if(arr[i][key] !== target[key]) {
                dup = false;
            }
        }
        if(dup) {
            arr.splice(i, 1);
            break;
        }
    }
}