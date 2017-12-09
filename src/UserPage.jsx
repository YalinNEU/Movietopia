import React, {Component} from 'react';
import './index.css';
import logo from './ic_movie_black_24px.svg';
import deleteLogo from './ic_delete_black_24px.svg';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
    }
    
    deleteComment = (index) => {
        const reviews = this.props.reviews[this.props.user];
        const review = reviews[index];
        const movieTitle = review.movieTitle;
        const comments = review.comments;
        this.props.deleteComment(movieTitle, {user: this.props.user, comments}, index);
    }

    render() {
        return(
            <div className="up-container">
                <div className="up-title">Hi, {this.props.user}</div>
                <div className="up-history">
                    {this.props.reviews[this.props.user] && this.props.reviews[this.props.user].map( (history, index) => {
                        return(
                            <div className="up-section" key={index}>
                                <div className="mp-comments-user">
                                    <img alt="logo" src={logo}/>
                                    <p>{history.movieTitle}: </p>
                                </div>

                                <div className="up-comment">
                                    <p>{history.comments}</p>
                                    <img className="up-delete" alt="delete-btn" src={deleteLogo} onClick={() => this.deleteComment(index)}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default UserPage;