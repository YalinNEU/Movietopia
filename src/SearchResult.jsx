import React, {Component} from 'react';
import './index.css';


class SearchResult extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick = (e) => {
        this.props.onClick(e.currentTarget.title);
    }
    
    render() {
        return(
            <div>
                <div className="sr-container">
                    <div className="sr-movie" title={this.props.result.Title} onClick={this.handleClick}>
                        <img src={this.props.result.Poster}/>
                        <div className="movie-intro">
                            <p>Name: <span>{this.props.result.Title}</span></p>
                            <p>Year: <span>{this.props.result.Year}</span></p>
                            <p>Score: <span>{this.props.result.imdbRating}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResult;