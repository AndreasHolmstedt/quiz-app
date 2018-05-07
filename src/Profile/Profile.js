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
            isLoggedIn: false,
            newName: ""
        }
    }

    componentWillMount() {
      if(this.props.user.uid) {
            this.setState({ isLoggedIn: true });
        }
    }
    componentWillReceiveProps(nextProps) {

      if(this.props.user.uid) {
            this.setState({ isLoggedIn: true });
        }
    }

    handleChange = event => {
        this.setState({ newName: event.target.value });
    }

    handleNameChange = event => {

        //db.ref("users/" + this.props.user.uid + "/name").set(value);
    }

    cancelNameChange = event => {
        this.setState({ newName: "" });
        this.toggleEditMode();
    }

    toggleEditMode = event => {
        this.setState({ edit: !this.state.edit });
    }

    handleLogout = event => {
      firebase.auth().signOut().then(()=>{
        //  this.setState({ isLoggedIn: false });
      })
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div className="Profile">
                { this.state.isLoggedIn
                    ?
                        <React.Fragment>
                            <h2>My Profile</h2>
                            <img className="avatar" src={this.props.user.photoURL} alt="avatar" />

                            { !this.state.edit && <p onClick={this.toggleEditMode} >{this.props.user.name}</p> }
                            { this.state.edit
                                &&  <React.Fragment>
                                        <br />
                                        <input type="text" value={this.state.newName} onChange={this.handleChange} />
                                        <br />
                                        <button onClick={this.cancelNameChange}>Discard Change</button>
                                        <button onClick={this.handleNameChange}>Change Name</button>
                                    </React.Fragment>
                            }

                            <p>Your Highscore: {this.props.user.highscore}</p>
                            <button onClick={this.handleLogout}>Sign Out</button>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <h2>Not Logged In</h2>
                            <LoginEmail />
                            <div>
                            <LoginFB />
                            <LoginGmail />
                            <LoginGithub />
                            </div>
                            <h3>Create New User:</h3>
                            <CreateUser />

                        </React.Fragment>
                }
            </div>
        );
    }
}

export default Profile;
