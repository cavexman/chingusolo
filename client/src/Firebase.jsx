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


class Firebase extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ui: props.ui
    }

    const firebaseConfig = {
      apiKey: "AIzaSyDVqhivJSBPxw_eOZbGWoF95kuKvP5ex7M",
      authDomain: "notesolo-cave.firebaseapp.com",
      databaseURL: "https://notesolo-cave.firebaseio.com",
      projectId: "notesolo-cave",
      storageBucket: "notesolo-cave.appspot.com",
      messagingSenderId: "256441349038",
      appId: "1:256441349038:web:bde01be578c41a5d"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.props.onAuthStateChanged);

    var uiConfig = {
      signInSuccessUrl: 'https://notesolo-cave.firebaseapp.com/index.html',
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
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
      }
    };

    if(!this.state.ui){
        // Initialize the FirebaseUI Widget using Firebase.
        this.state.ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        this.state.ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  render(){
    return <div id="firebaseui-auth-container"></div>
  }
}


export default Firebase;

