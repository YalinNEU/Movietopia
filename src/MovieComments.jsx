import React, {Component} from 'react';
import './index.css';
import logo from './ic_face_black_24px.svg';

class MovieComments extends Component {
    render() {
        return(
            <div className="mp-container">
                <p>Movie lover's comments:</p>
                <div className="mp-movie-comments">
                    {this.props.movieComments.map( (comment, index) => {
                        return(
                            <div key = {index}>
                                <div className="mp-comments-user">
                                    <img src={logo}/>
                                    <p>{comment.user}: </p>
                                </div>
                                <div className="mp-comments-user-said">
                                    <p>{comment.comments}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieComments;