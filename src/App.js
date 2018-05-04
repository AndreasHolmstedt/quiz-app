import React, { Component } from 'react';
import './App.css';


import Navigation from "./Navigation/Navigation.js";
import Quiz from "./Quiz/Quiz.js";
import Profile from "./Profile/Profile.js";
import Highscore from "./Highscore/Highscore.js";

import fire from "./fire.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
                database: null,
                viewQuiz: true,
                viewHighscore: false,
                viewProfile: false
        };
    }

    componentDidMount() {
         this.setState({ database: fire.database() });
    }

    handleViewQuiz = event => {
        this.setState({ viewQuiz: true, viewHighscore: false, viewProfile: false });
    }

    handleViewHighscore = event => {
        this.setState({ viewQuiz: false, viewHighscore: true, viewProfile: false });
    }

    handleViewProfile = event => {
        this.setState({ viewQuiz: false, viewHighscore: false, viewProfile: true });
    }

    render() {
        return (
            <div className="App">
                <Navigation handleViewQuiz={this.handleViewQuiz} handleViewHighscore={this.handleViewHighscore} handleViewProfile={this.handleViewProfile} />
                <Quiz visible={this.state.viewQuiz} />
                { this.state.viewHighscore ? <Highscore database={this.state.database} /> : null }
                { this.state.viewProfile ? <Profile /> : null }
            </div>
        );
    }
}

export default App;
