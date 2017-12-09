import React, {Component} from 'react';
import image from './movie-temp.jpg';
import './index.css';


class MoviePool extends Component {
    constructor() {
        super();
        this.state = {
            pool: ['Black Swan', 'coco', 'wonder woman', 'it', 'zootopia', 'Thor: Ragnarok',
                  'House of Flying Daggers', 'spider man', 'RMS Titanic', 'Mr. & Mrs. Smith',
                  'Justice League', '3 Idiots'],
            movies: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.getMoviePool();
    }
    
    getMoviePool = () => {
        const newList = [...this.state.movies];
        
        this.state.pool.map((title) => {
            fetch(`//localhost:8000/movie/${title}`, {
                method: 'GET',
                credential: 'include'
            })
            .then(r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ))
            .then(j => {
                //console.log(j);
                newList.push(j);
                this.setState({movies: newList})
            })
            .catch(e => console.log(e));
        })
        
    }
    
    handleClick = (e) => {
        this.props.onClick(e.currentTarget.title);
    }
    
    render() {
        return(
            <div className="movie-pool">
                <div className="movie-container">
                    {this.state.movies.map( (movie, index) => {
                        return (
                            <div className="movie" title={movie.Title} onClick={this.handleClick}>
                                <img src={movie.Poster}/>
                                <p>{movie.Title}</p>
                            </div>
                        );
                    } )}
                </div>
            </div>
        );
    }
}

export default MoviePool;