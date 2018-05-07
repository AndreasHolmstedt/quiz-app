import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav className="Navigation">
                <button onClick={this.props.handleViewQuiz} className={ this.props.activeTab === "Quiz" ? "active" : null } >Quiz</button>
                <button onClick={this.props.handleViewHighscore} className={ this.props.activeTab === "Highscore" ? "active" : null } >Highscore</button>
                <button onClick={this.props.handleViewProfile} className={ this.props.activeTab === "Profile" ? "active" : null } >Profile</button>
            </nav>
        );
    }
}

export default Navigation;
