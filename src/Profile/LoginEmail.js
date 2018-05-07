import React, { Component } from 'react';
import firebase from 'firebase';

class LoginEmail extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange = event => {
    this.setState({email: event.target.value});

  }
  handlePasswordChange = event => {
    this.setState({password: event.target.value});
  }


  handleSubmit = event => {
    console.log(this.state.email)
    console.log(this.state.password);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( user => {
      console.log(user);
    }).catch(function(error) {
      console.log(error.message)
    });
  }

  render(){
    return (
      <div>
        <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
        <button onClick={this.handleSubmit}>Sign In</button>
      </div>
    )


  }
}


export default LoginEmail;
