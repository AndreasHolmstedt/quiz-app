import React, { Component } from 'react';
import './Profile.css';

import LoginFB from './LoginFB.js';
import LoginGmail from './LoginGmail.js';
import LoginGithub from './LoginGithub.js';
import CreateUser from './CreateUser.js';
import LoginEmail from './LoginEmail.js';

import firebase from 'firebase';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            newName: "",
        }
    }

    handleChange = event => {
        this.setState({ newName: event.target.value });
    }

    handleNameChange = event => {
        this.props.database.ref("users/" + this.props.user.uid + "/displayName").set(this.state.newName);
        this.cancelNameChange();
    }

    cancelNameChange = event => {
        this.setState({ newName: "" });
        this.toggleEditMode();
    }

    toggleEditMode = event => {
        this.setState({ edit: !this.state.edit });
    }

    handleLogout = event => {
        firebase.auth().signOut().then(()=>{});
    }

    render() {
        return (
            <div className="Profile">
                { this.props.user.uid
                    ?
                        <React.Fragment>
                            <h2>My Profile</h2>
                            <img className="avatar" src={this.props.user.photoURL} alt="avatar" />

                            { !this.state.edit &&
                                <React.Fragment>
                                    <p className="displayName" onClick={this.toggleEditMode} >{this.props.user.displayName}</p>
                                    <p>Your Highscore: {this.props.user.highscore}</p>
                                    <button onClick={this.handleLogout}>Sign Out</button>
                                </React.Fragment>
                            }
                            { this.state.edit &&
                                <React.Fragment>
                                    <input className="newName" type="text" value={this.state.newName} onChange={this.handleChange} placeholder="New Name" />
                                    <button className="discard" onClick={this.cancelNameChange}>Discard Change</button>
                                    <button className="change" onClick={this.handleNameChange}>Change Name</button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <h2>You are not signed in</h2>
                            <LoginEmail />
                            <div>
                                <LoginFB />
                                <LoginGmail />
                                <LoginGithub />
                            </div>
                            <CreateUser />
                        </React.Fragment>
                }
            </div>
        );
    }
}

export default Profile;
