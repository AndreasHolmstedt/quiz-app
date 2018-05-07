import React, { Component } from 'react';
import './Question.css';

class Question extends Component {
    render() {
        let btn1 = this.props.details.answers[0] === this.props.answer ? "correct" : null;
        let btn2 = this.props.details.answers[1] === this.props.answer ? "correct" : null;
        let btn3 = this.props.details.answers[2] === this.props.answer ? "correct" : null;
        let btn4 = this.props.details.answers[3] === this.props.answer ? "correct" : null;

        return (
            <div className="Question">
                <h2>{this.props.details.title}</h2>
                <div className="answers">
                    <button className={btn1} onClick={this.props.handleSelectAnswer} >{this.props.details.answers[0]}</button>
                    <button className={btn2} onClick={this.props.handleSelectAnswer} >{this.props.details.answers[1]}</button>
                    <button className={btn3} onClick={this.props.handleSelectAnswer} >{this.props.details.answers[2]}</button>
                    <button className={btn4} onClick={this.props.handleSelectAnswer} >{this.props.details.answers[3]}</button>
                </div>
            </div>
        );
    }
}

export default Question;
