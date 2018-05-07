import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            newName: ""
        }
    }

    handleChange = event => {
        this.setState({ newName: event.target.value });
    }

    handleNameChange = event => {
        this.props.database.ref("users/" + this.props.user.uid + "/name").set(this.state.newName);
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

    }

    handleLogin = event => {

    }

    render() {
        return (
            <div className="Profile">
                { this.props.user.isLoggedIn
                    ?   
                        <React.Fragment>
                            <h2>My Profile</h2>
                            <img className="avatar" src={this.props.user.avatar} alt="avatar" />

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
                            <button onClick={this.handleLogin}>Sign In</button>
                        </React.Fragment>
                }
            </div>
        );
    }
}

export default Profile;
