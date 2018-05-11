import React, { Component } from 'react';
import './Question.css';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn1: "",
            btn2: "",
            btn3: "",
            btn4: "",
            answers: Object.keys(this.props.details.answers),
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.questionActive) {
            let btn1 = this.state.answers[0] === nextProps.answer ? "correct" : this.props.userChoice === this.state.answers[0] ? "incorrect" : null;
            let btn2 = this.state.answers[1] === nextProps.answer ? "correct" : this.props.userChoice === this.state.answers[1] ? "incorrect" : null;
            let btn3 = this.state.answers[2] === nextProps.answer ? "correct" : this.props.userChoice === this.state.answers[2] ? "incorrect" : null;
            let btn4 = this.state.answers[3] === nextProps.answer ? "correct" : this.props.userChoice === this.state.answers[3] ? "incorrect" : null;

            this.setState({ btn1: btn1, btn2: btn2, btn3: btn3, btn4: btn4 });
        }
        else {
            this.setState({ answers: Object.keys(nextProps.details.answers), btn1: "", btn2: "", btn3: "", btn4: "" });
        }
    }

    render() {
        return (
            <div className="Question">
                <h2>{this.props.details.title}</h2>
                <div className="answers">
                    <button className={this.state.btn1} onClick={this.props.handleSelectAnswer} >{this.state.answers[0]}</button>
                    <button className={this.state.btn2} onClick={this.props.handleSelectAnswer} >{this.state.answers[1]}</button>
                    <button className={this.state.btn3} onClick={this.props.handleSelectAnswer} >{this.state.answers[2]}</button>
                    <button className={this.state.btn4} onClick={this.props.handleSelectAnswer} >{this.state.answers[3]}</button>
                </div>
            </div>
        );
    }
}

export default Question;
