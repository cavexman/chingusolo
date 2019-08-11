import React, { Component } from 'react';

//********************** Firebase ***************************/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
//********************** Firebase ***************************/


class Action{
    constructor(state){
      this.state = state;
    }
  
    getState(){
      return( this.state );
    }
  }
  
  class PropEditAction extends Action{
    constructor(state) {
      super(state);
    }
  }
  
  class PropInput extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render(){
      if( this.props.textarea){
        return(
          <textarea className="field" value={this.props.initialValue} onChange={e => this.props.doAction(new PropEditAction({ [this.props.propName]:e.target.value}))}/>
        )
      }else{
        return(
          <input className="field" value={this.props.initialValue} onChange={e => this.props.doAction(new PropEditAction({ [this.props.propName]:e.target.value}))}/>
        )
      }
    }
  }

class AddNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "body",
      title: "title"
    };
  }
 
    componentDidMount() {
       
    }

    //"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    addNote = async () => {
      var db = firebase.firestore();
      var user = firebase.auth().currentUser;
      console.log(user.uid);

      // Add a second document with a generated ID.
      const newNote = { author:  user.uid,
        body: this.state.body,
        datetime: firebase.firestore.Timestamp.now(),
        title: this.state.title
      };
      console.log("adding ", newNote);

      const docRef = await db.collection("notes").add(newNote);

      console.log("Document written with ID: ", docRef.id);
      // this.props.dirty();
    }

    doAction(action){
        console.log(action);
        if( action instanceof PropEditAction ){
          this.setState(action.getState());
        }
      }

    render() {
        return <div className="add-note-form">
            <label><div className="field-label">Title:</div><PropInput propName="title" doAction={e => this.doAction(e)}/></label>
            <label><div className="field-label">Body:</div><PropInput textarea={1} propName="body" doAction={e => this.doAction(e)}/></label>
            <div className="footnote">Use the form above to create a post. Be sure to fill in the required title and body fields and then press submit.</div>
            <button className="submit" onClick={() => this.addNote()}>Submit</button><br/>
        </div>
    }
  }
  export default AddNoteForm;
