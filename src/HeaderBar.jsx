import React, {Component} from 'react';
import './index.css';

class HeaderBar extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
        return(
            <div id="wrapper">
                <ul className="nav">
                    <li className="left">Hi, {this.props.user}</li>
                    <li className="right" onClick={this.props.onLogOut}>Log out</li>
                    <li className="right" onClick={this.props.onUserPage}>Profile</li>
                    <li className="right" onClick={this.props.onSearchPage}>Movie</li>
                </ul>
            </div>
        );
    }
}

export default HeaderBar;