import React, { Component } from 'react';
import './Question.css';

class Question extends Component {
    render() {
        return (
            <div className="Question">
                <h2>{this.props.details.title}</h2>
                <div className="answers">
                    <button>{this.props.details.answers[0]}</button>
                    <button>{this.props.details.answers[1]}</button>
                    <button>{this.props.details.answers[2]}</button>
                    <button>{this.props.details.answers[3]}</button>
                </div>
            </div>
        );
    }
}

export default Question;
