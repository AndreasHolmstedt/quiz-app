import React, { Component } from 'react';
import './Quiz.css';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
                score: 0,
                active: false
        };
    }

    render() {
        let visible = this.props.visible;
        let classes = "Quiz " + (visible ? "" : "hidden");

        return (
            <div className={classes}>
                <h2>Quiz</h2>
                {//timer
                //spelarens poäng i pågående quiz
                //vilken fråga av hur många
                //fråga
                //svarsalternativ
                //visa din combo

                //frågor slumpas ur en pool, så att det kan bli olika frågor varje gång
                //combo - mer poäng om man svarar rätt på flera frågor på rad
                //minuspoäng för fel svarsalternativ
                }
            </div>
        );
    }
}

export default Quiz;
