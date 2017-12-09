import React, {Component} from 'react';
import MoviePool from './MoviePool';
import SearchResult from './SearchResult';
import Header from "./HeaderBar";
import Footer from "./FooterBar";
import UserPage from './UserPage';
import AutoComplete from './AutoComplete';
import MoviePage from "./MoviePage";
import './index.css';
import {logout} from './login';


class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            movieWonder:false,
            movieTitle: '',
            searchResult: {},
            hints: [],
            showHints: false,
            inMovieInfo: false,
            inUserPage: false,
            inSearchPage: true,
            currentMovie: {}
        };
        this.findMovie = this.findMovie.bind(this);
        this.handleMovieTitleInput = this.handleMovieTitleInput.bind(this);
        this.setMovieTitle = this.setMovieTitle.bind(this);
        this.goToMovieInfo = this.goToMovieInfo.bind(this);
        this.goToUserProfile = this.goToUserProfile.bind(this);
        this.backToSearchPage = this.backToSearchPage.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    goToUserProfile = () => {
        this.setState({
            inMovieInfo: false,
            inSearchPage: false,
            inUserPage: true
        })
    }
    backToSearchPage = () => {
        this.setState({
            inMovieInfo: false,
            inSearchPage: true,
            inUserPage: false
        })
    }

    findMovie = () => {
        const title = this.state.movieTitle;
        this.setState({
            movieWonder: true,
            movieTitle:''
        });
        fetch(`//localhost:8000/movie/${title}`, {
            method: 'GET',
            credential: 'include'
        })
        .then(r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ))
        .then(j => {
            console.log(j);
            this.setState({searchResult: j});
        })
        .catch(e => console.log(e));
    };
    
    handleMovieTitleInput = (e) => {
        if(e.target.value) {
            fetch(`//localhost:8000/movie/search/${e.target.value}`, {
                method: 'GET',
                credential: 'include'
            })
            .then(r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ))
            .then(j => {
                if(!j.Error && j.Search) {
                    this.setState({hints: j.Search});
                }
                else {
                    //console.warn('Empty');
                    this.setState({hints: []});
                }
            })
        }
        
        this.setState({movieTitle: e.target.value, showHints: true});
    };

    setMovieTitle = (movieTitle) => {
        this.setState({movieTitle, showHints: false});
    }
    
    goToMovieInfo = (title) => {
        fetch(`//localhost:8000/movie/${title}`, {
            method: 'GET',
            credential: 'include'
        })
        .then(r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ))
        .then(j => {
            console.log(j);
            this.setState({
                currentMovie: j,
                inMovieInfo: true,
                inSearchPage: false,
                inUserPage: false,
                movieWonder: false,
                movieTitle: ''
            });
        })
        .catch(e => console.log(e));
    }
    
    onLogout = () => {
        logout(this.props.user)
        .then(logoutInfo => console.log(logoutInfo))
        
        this.props.onLogout();
    }
    
    render() {
        return(
            <div>
                <Header onLogOut={this.onLogout} onUserPage={this.goToUserProfile} onSearchPage={this.backToSearchPage} user={this.props.user}/>
                {this.state.inUserPage && <UserPage user={this.props.user} deleteComment={this.props.deleteComment} reviews={this.props.reviews}/>}
                {this.state.inMovieInfo && <MoviePage comments={this.props.comments} movie={this.state.currentMovie} user={this.props.user} addComment={this.props.addComment}/>}
                {this.state.inSearchPage &&
                    <div>
                        <div className="sp-search">
                            <div className="sp-input">
                                <input value={this.state.movieTitle} onChange={this.handleMovieTitleInput} placeholder=" Search your favourite movie..."/>
                                <button onClick={this.findMovie}>GO!</button>
                                {this.state.showHints && <AutoComplete hints={this.state.hints} setMovie={this.setMovieTitle}/>}
                            </div>
                        </div>

                        {this.state.movieWonder && <SearchResult result={this.state.searchResult} onClick={this.goToMovieInfo}/>}
                        <MoviePool onClick={this.goToMovieInfo}/>
                    </div>}
                 <Footer/>
            </div>
        );
    }
}

export default SearchPage;