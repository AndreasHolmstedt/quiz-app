import React, { Component } from 'react';
import './Quiz.css';

import Question from "./Question.js";
import CompletedQuestions from './CompletedQuestions.js'

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            streak: 0,
            quizCompleted: false,
            active: false,
            questionActive: false,
            timer: 0,
            maxQuestions: 10,
            currentQuestion: 1,
            questions: [],
            correctAnswer: null,
            userChoice: null,
            completedQuestions: [0,0,0,0,0,0,0,0,0,0]
        };
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    componentDidMount() {
        this.props.database.ref("questions/").once("value", snapshot => {
            let data = snapshot.val();
            let questions = [];

            for(let question in data) {
                if(data.hasOwnProperty(question)) {
                    let details = {
                        title: question,
                        answers: {}
                    };

                    for(let answer in data[question]) {
                        if(data[question].hasOwnProperty(answer)) {
                            details.answers[answer] = data[question][answer];
                        }
                    }

                    questions.push(details);
                }
            }

            this.setState({ questions: this.shuffle(questions) });
        });
    }

    startQuiz = e => {
        if(this.props.user.uid) {
            this.getWinningOption();
            this.setState({ quizCompleted: false, active: true, questionActive: true, timer: 30 });
            let component = this;

            let time = setInterval(function() {
                component.setState({ timer: Number((component.state.timer - 0.1).toFixed(1)) });
                if(component.state.timer === 0) {
                    clearInterval(time);
                    component.lockQuestion();

                    let completed = component.state.completedQuestions;
                    if(completed[component.state.currentQuestion-1] === 0) {
                        completed[component.state.currentQuestion-1] = -1;
                        component.setState({ completedQuestions: completed, streak: 0 });
                    }

                    if(component.state.currentQuestion === component.state.maxQuestions) {
                        component.setState({ quizCompleted: true });
                    }
                }
            }, 100);
        }
    }

    lockQuestion = e => {
        this.setState({ questionActive: false });
    }

    getWinningOption = e => {
        let correct;

        for(let answer in this.state.questions[this.state.currentQuestion-1].answers) {
            if(this.state.questions[this.state.currentQuestion-1].answers.hasOwnProperty(answer)) {
                if(this.state.questions[this.state.currentQuestion-1].answers[answer]) {
                    correct = answer;
                }
            }
        }

        this.setState({ correctAnswer: correct});
    }

    handleSelectAnswer = e => {
        if(this.state.questionActive) {
            let completed = this.state.completedQuestions;

            this.setState({ timer: 0.1, userChoice: e.target.innerText });

            if(e.target.innerText === this.state.correctAnswer) {
                let gainedScore = 1;
                switch(this.state.streak) {
                    case 2:
                        gainedScore += 1;
                        break;
                    case 3:
                        gainedScore += 1;
                        break;
                    case 4:
                        gainedScore += 2;
                        break;
                    case 5:
                        gainedScore += 2;
                        break;
                    case 6:
                        gainedScore += 3;
                        break;
                    case 7:
                        gainedScore += 3;
                        break;
                    case 8:
                        gainedScore += 4;
                        break;
                    case 9:
                        gainedScore += 4;
                        break;
                    default:
                        break;
                }

                completed[this.state.currentQuestion-1] = 1;
                this.setState({ completedQuestions: completed , streak: this.state.streak + 1, score: this.state.score + gainedScore });
            } else {
                completed[this.state.currentQuestion-1] = -1;
                this.setState({ completedQuestions: completed, streak: 0, score: this.state.score - 1 });
            }
        }
    }

    handleNextQuestion = _ => {
        if(this.state.quizCompleted) {
            this.setState({ active: false });

            if(this.state.score > this.props.user.highscore) {
                this.props.database.ref(`users/${this.props.user.uid}/highscore`).set(this.state.score);
            }
        }
        else {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 }, this.startQuiz);
        }
    }

    resetQuiz = _ => {
        this.setState({
            score: 0,
            streak: 0,
            quizCompleted: false,
            active: false,
            questionActive: false,
            timer: 0,
            currentQuestion: 1,
            questions: this.shuffle(this.state.questions),
            correctAnswer: null,
            userChoice: null,
            completedQuestions: [0,0,0,0,0,0,0,0,0,0]
        });
    }

    render() {
        let classes = "Quiz " + (this.props.visible ? "" : "hidden");
        const timerStyle = {
          width: (this.state.timer*(10/3)) + "%",
          background: this.state.timer > 10  ? "#70C132" : null,
        }

        return (
            <div className={classes}>
                { this.state.active
                    ?   <React.Fragment>
                            <CompletedQuestions completedQuestions={this.state.completedQuestions}/>
                            <div className="timer"><div style={timerStyle} /></div>
                            <div className="info">
                                <p>Score: {this.state.score}</p>
                                <p>Streak: {this.state.streak}</p>
                            </div>
                            <Question
                                handleSelectAnswer={this.handleSelectAnswer}
                                details={this.state.questions[this.state.currentQuestion-1]}
                                questionActive={this.state.timer === 0 ? false : true}
                                answer={this.state.correctAnswer}
                                userChoice={this.state.userChoice}
                            />
                            { this.state.active && !this.state.questionActive && <button onClick={this.handleNextQuestion}>{ this.state.quizCompleted ? "Show Score" : "Next Question"}</button> }
                        </React.Fragment>
                    :
                        this.state.quizCompleted
                        ?   <React.Fragment>
                                <h2>Score</h2>
                                <p>You scored {this.state.score} points!</p>
                                <button onClick={this.resetQuiz} >Play again!</button>
                            </React.Fragment>
                        :
                        <React.Fragment>
                            <h2>Quiz</h2>
                            <button disabled={this.state.questions.length === 0} onClick={this.startQuiz}>{ this.props.user.uid ? "Start Quiz" : "Must Be Logged In"}</button>
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
