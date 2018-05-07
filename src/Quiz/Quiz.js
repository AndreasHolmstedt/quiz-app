import React, { Component } from 'react';
import './Quiz.css';

import Question from "./Question.js";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            active: false,
            timer: 0,
            maxQuestions: 30,
            currentQuestion: 1,
            questions: []
        };
    }

    componentDidMount() {
        // Fetch questions from database and add to state.questions
        this.props.database.ref("questions/").once("value", snapshot => {
            let data = snapshot.val();
            let questions = [];
            
            for(let question in data) {
                if(data.hasOwnProperty(question)) {
                    let details = { 
                        title: question,
                        answers: []
                    };

                    for(let answer in data[question]) {
                        if(data[question].hasOwnProperty(answer)) {
                            details.answers.push(answer);
                        }
                    }

                    questions.push(details);
                }
            }

            this.setState({ questions: questions });
        });
    }

    simulateActivate = e => {
        this.setState({ active: true, timer: 30 });
        let component = this;

        let time = setInterval(function() {
            component.setState({ timer: (component.state.timer - 1) });
            if(component.state.timer === 0) {
                clearInterval(time);
            }
        }, 1000);
    }

    render() {
        let classes = "Quiz " + (this.props.visible ? "" : "hidden");

        return (
            <div className={classes}>
                { this.state.active 
                    ?   <React.Fragment>
                            <hr className="timer" style={{ width: (this.state.timer*3.33) + "%" }} />
                            <Question details={this.state.questions[this.state.currentQuestion-1]} />
                        </React.Fragment>
                    :   <React.Fragment>
                            <h2>Quiz</h2>
                            <button onClick={this.simulateActivate}>Activate</button>
                        </React.Fragment>
                }
                {
                    //timer
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
