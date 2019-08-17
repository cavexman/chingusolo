
import React, { Component } from 'react';

//********************** Firebase ***************************/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui'
//********************** Firebase ***************************/

import Authorization from './Authorization';
import AppAuthorized from './AppAuthorized';
import './App.css';


const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      displayName: "logged out",
      user: false,
      authUI: false,
      showLogin: false
    }
  }


  componentDidMount() {
//this will get some net nanny to warn me but there's no good way to hide the api key on the client.
//https://stackoverflow.com/questions/52100690/should-i-hide-firebase-api-keys-into-backend-not-due-to-data-security-but-proje
    const firebaseConfig = {
      "apiKey": "AIzaSyD_KHCyN3vCHWzMg10JuvEtqdaLFbbqCGk",
      "authDomain": "notesolo-cave.firebaseapp.com",
      "databaseURL": "https://notesolo-cave.firebaseio.com",
      "projectId": "notesolo-cave",
      "storageBucket": "notesolo-cave.appspot.com",
      "messagingSenderId": "256441349038",
      "appId": "1:256441349038:web:bde01be578c41a5d"
    };
    

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => this.onAuthStateChanged(user));

    if(!this.state.authUI){
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
      this.setState({ authUI: ui });
    }

  }

  onAuthStateChanged(user) {
    if(user){
      this.setState({user: user, displayName: user.displayName, showLogin: false});
    }else{
      //logged out
      this.setState({user: false, displayName: "logged out"});
    }
  }

  signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.state.authUI.reset();
      // The start method will wait until the DOM is loaded.
      this.state.authUI.start('#firebaseui-auth-container', uiConfig);
      
    }).catch(function(error) {
      // An error happened.
    });
  }

  startLogin(){
    this.setState({showLogin: true});
    this.state.authUI.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    if(this.state.user){
      return (
        <div className="App">
          <header className="App-header">
          Welcome to Chingu Solo {this.state.displayName}
          <Authorization user={this.state.user}
            signOut={() => this.signOut()}
            startLogin={() => this.startLogin()}
            showLogin={this.state.showLogin}
          />
          </header>
          <AppAuthorized {...this.state} />
        </div>
      );
    }else return (
      <div className="App">
        <header className="App-header">
        Welcome to Chingu Solo {this.state.displayName}
        <Authorization
          user={this.state.user} 
          signOut={() => this.signOut()}
          startLogin={() => this.startLogin()}
          showLogin={this.state.showLogin}
        />
        </header>
      </div>
    );
  }
}

export default App;

