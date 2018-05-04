import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav className="Navigation">
                <ul>
                    <li>
                        <button onClick={this.props.handleViewQuiz} >Quiz</button>
                    </li>
                    <li>
                        <button onClick={this.props.handleViewHighscore} >Highscore</button>
                    </li>
                    <li>
                        <button onClick={this.props.handleViewProfile} >Profile</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
