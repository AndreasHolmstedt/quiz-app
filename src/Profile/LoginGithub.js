import React, { Component } from 'react';
import firebase from 'firebase';

class LoginGithub extends Component {


  handleLogin = event => {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  }

  render(){
    return <button onClick={this.handleLogin}>Login with Github</button>
  }
}


export default LoginGithub;
