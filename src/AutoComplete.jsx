import React, {Component} from 'react';

class AutoComplete extends Component {
    constructor(){
        super();
        this.handleAutoComplete = this.handleAutoComplete.bind(this);
    }
    
    handleAutoComplete = (e) => {
        this.props.setMovie(e.target.textContent);
    }
    
    render() {
        return(
            <ul id='auto-complete-dropdown'>
                {this.props.hints.map( (hint, index) => {
                    return(
                        <li key={index} onClick={this.handleAutoComplete} className="hint-dropdown">{hint.Title}</li>
                    )
                })}
            </ul>
        )
    }
}

export default AutoComplete;