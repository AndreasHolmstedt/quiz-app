import React, { Component } from 'react';
import firebase from 'firebase';

class LoginFB extends Component {


  handleLogin = event => {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  }

  render(){
    return <button onClick={this.handleLogin}>Login with facebook</button>
  }
}


export default LoginFB;
