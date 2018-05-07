import React, { Component } from 'react';
import firebase from 'firebase';

import  './CreateUser.css'

import fire from '../fire.js'

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: "",
            email: "",
            password1: "",
            password2: "",
            photoURL: "",
            highscore: 0,
            errormessage: "",
        }
}

    handleNameChange = event => {
        this.setState({ displayName: event.target.value });
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }
    handlePassword1Change = event => {
        this.setState({ password1: event.target.value });
    }
    handlePassword2Change = event => {
        this.setState({ password2: event.target.value });
    }
    handlePhotoURLChange = event => {
        this.setState({ photoURL: event.target.value });
    }

    handleSubmit = event => {
    if(this.state.displayName.length !== 0 &&
        this.state.photoURL.length !== 0 &&
        this.state.password1 === this.state.password2){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password1).then(userObj => {
            let user = {
                displayName: this.state.displayName,
                email: this.state.email,
                uid: userObj.uid,
                photoURL: this.state.photoURL,
                highscore: this.state.highscore,
            }
            console.log(user);
            this.setState({uid: userObj.uid })
            fire.database().ref(`users/${userObj.uid}`).set(user);
            }).catch(error => {
                this.setState({errormessage: error.message })
            });
        }
    }

  render(){
    return (
      <div>
        <div>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Full name"/>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
        </div>
        <div>
          <input type="password" value={this.state.password1} onChange={this.handlePassword1Change} placeholder="Password"/>
          <input type="password" value={this.state.password2} onChange={this.handlePassword2Change} placeholder="Repeat Password"/>
        </div>
        <div>
          <input type="text" value={this.state.photoURL} onChange={this.handlePhotoURLChange} placeholder="Link to profile photo"/>
          <button onClick={this.handleSubmit}>Sign up new account</button>
        </div>
         { this.state.errormessage ? <p>{this.state.errormessage}</p> : null }
      </div>
    )


  }
}


export default CreateUser;
