import React, { Component } from 'react';
import firebase from 'firebase';

class LoginGmail extends Component {


  handleLogin = event => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  }

  render(){
    return <button onClick={this.handleLogin}>Login with Gmail</button>
  }
}


export default LoginGmail;
