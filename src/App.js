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
                database: fire.database(),
                user: {
                    highscore: 270,
                    displayName: "Wicked",
                    photoURL: "http://avatarbox.net/avatars/img19/47_face_avatar_picture_12669.jpg",
                    uid: "uid",
                    isLoggedIn: true
                },
                viewQuiz: true,
                viewHighscore: false,
                viewProfile: false
        };
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

    enableUserListener() {
        this.state.database.ref("users/" + this.state.user.uid + "/displayName").on("value", snapshot => {
            let newUser = this.state.user;
            newUser.displayName = snapshot.val();

            this.setState({ user: newUser });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation 
                    handleViewQuiz={this.handleViewQuiz} 
                    handleViewHighscore={this.handleViewHighscore} 
                    handleViewProfile={this.handleViewProfile} 
                    activeTab={ this.state.viewQuiz ? "Quiz" : this.state.viewHighscore ? "Highscore" : "Profile" }
                />
                <Quiz visible={this.state.viewQuiz} database={this.state.database} />
                { this.state.viewHighscore && <Highscore database={this.state.database} user={this.state.user} /> }
                { this.state.viewProfile && <Profile database={this.state.database} user={this.state.user} /> }
            </React.Fragment>
        );
    }
}

export default App;
