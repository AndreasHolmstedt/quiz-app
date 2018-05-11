import React, { Component } from 'react';
import './App.css';


import Navigation from "./Navigation/Navigation.js";
import Quiz from "./Quiz/Quiz.js";
import Profile from "./Profile/Profile.js";
import Highscore from "./Highscore/Highscore.js";

import fire from "./fire.js";
import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
                database: fire.database(),
                user: {},
                viewQuiz: true,
                viewHighscore: false,
                viewProfile: false
        };

    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(userObj => {
            if(userObj) {
                this.state.database.ref(`users/${userObj.uid}`).once("value", snap => {
                    let data = snap.val();

                    if(data === null) {
                        let user = {
                            email: userObj.email,
                            displayName: userObj.displayName,
                            photoURL: userObj.photoURL,
                            uid: userObj.uid,
                            highscore: 0,
                        }
                        this.state.database.ref(`users/${userObj.uid}`).set(user);
                    }
                });

                this.state.database.ref(`users/${userObj.uid}`).once("value", snap => {
                    let data = snap.val();
                    this.setState({ user: data })
                });

                this.state.database.ref(`users/${userObj.uid}`).on("child_changed", snap => {
                    let data = snap.val()
                    let user = this.state.user;
                    user.displayName = data;

                    this.setState({ user: user })
                });
            }
            else {
                this.setState({user: {}})
            }
        });
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
            <React.Fragment>
                <h1>Quiz App</h1>
                <Navigation
                    handleViewQuiz={this.handleViewQuiz}
                    handleViewHighscore={this.handleViewHighscore}
                    handleViewProfile={this.handleViewProfile}
                    activeTab={ this.state.viewQuiz ? "Quiz" : this.state.viewHighscore ? "Highscore" : "Profile" }
                />
                <Quiz visible={this.state.viewQuiz} database={this.state.database} user={this.state.user} />
                { this.state.viewHighscore && <Highscore database={this.state.database} user={this.state.user} /> }
                { this.state.viewProfile && <Profile database={this.state.database} user={this.state.user} /> }
            </React.Fragment>
        );
    }
}

export default App;
