import React from 'react';

//********************** Firebase ***************************/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui'
//********************** Firebase ***************************/


class Authorization extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ui: null
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);

    if(!this.state.ui){
        // Initialize the FirebaseUI Widget using Firebase.
        this.state.ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        this.state.ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  signIn(){
    if(!this.state.ui){
      // Initialize the FirebaseUI Widget using Firebase.
      this.state.ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      this.state.ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.state.ui.reset();
      // The start method will wait until the DOM is loaded.
      // this.state.ui.start('#firebaseui-auth-container', uiConfig);
      
    }).catch(function(error) {
      // An error happened.
    });
  }

  render(){
    if(this.props.user){
      return <button onClick={()=>this.signOut()}>sign out</button>
    }else
      return <div id="firebaseui-auth-container"></div>
  }
}


export default Firebase;

