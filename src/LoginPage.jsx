import React, {Component} from 'react';
import './index.css';
import {login, signup} from './login';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    updateUsername = (e) => {
        this.setState({username: e.target.value});
    };

    updatePassword = (e) => {
        this.setState({password: e.target.value});
    };

    onLogin = () => {
        const {username, password} = this.state;
        
        login(username, password)
        .then(loginInfo => loginInfo.error ? Promise.reject(loginInfo) : loginInfo)
        .then(loginInfo => {
            this.props.onLogin({username, token: loginInfo.token});
            
            fetch('//localhost:8000/reviews')
            .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
            .then(reviews => {
                this.props.onGetReviews(reviews);
            });
            
            fetch('//localhost:8000/comments')
            .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
            .then(comments => {
                this.props.onGetComments(comments);
            });
        })
        .catch(e => console.log(e));
    };

    createAccount = () => {
        const {username, password} = this.state;
        signup(username, password)
        .then(loginInfo => loginInfo.error ? Promise.reject(loginInfo) : loginInfo)
        .then(loginInfo => {
            this.props.onLogin({username, token: loginInfo.token});
            
            fetch('//localhost:8000/reviews')
            .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
            .then(reviews => {
                this.props.onGetReviews(reviews);
            });
            
            fetch('//localhost:8000/comments')
            .then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
            .then(comments => {
                this.props.onGetComments(comments);
            });
        })
        .catch(e => console.log(e));
    };

    render() {
        return (
        <div className="hp-head">
            <div className="hp-title">
                <div className="login-form">
                    <p className="login-title">Welcome to Movietopia</p>
                    <form>
                        <div className="user-name">
                            <label>Username:</label>
                            <input className="form-control"
                                   placeholder="username..."
                                   onChange={this.updateUsername}/>
                        </div>
                        <div className="password">
                            <label>Password:</label>
                            <input className="form-control"
                                   placeholder="password..."
                                   type="password"
                                   onChange={this.updatePassword}/>
                        </div>
                    </form>
                    <div className="login-button">
                        <button onClick={this.onLogin}>Login</button>
                        <button onClick={this.createAccount}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

        );
    }
}
export default LoginPage;