import React, {Component} from 'react';
import './index.css';

class HomePage extends Component {
    render() {
        return(
            <div>
                <div className="hp-head">
                    <div className="hp-title">
                        <p>Movietopia</p>
                        <button onClick={this.props.submit}>Login / Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;