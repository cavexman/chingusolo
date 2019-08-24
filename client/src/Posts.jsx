import React, { Component } from 'react';

//********************** Firebase ***************************/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
//********************** Firebase ***************************/

class EditSaveButton extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    if( this.props.editItem === this.props.id )
      return <button className="edit" onClick={() => this.props.store.save_doc(`${this.props.id}`)}>Save</button>
    else
      return <button className="edit" onClick={() => this.props.store.edit_doc(`${this.props.id}`)}>Edit</button>
  }
}

class Editable extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    if(this.props.editing === this.props.id)
      this.props.update( { [this.props.type]: this.props.text} ); //set an initial value
  }
}

class EditableInputProp extends Editable{
  constructor(props) {
    super(props);
  }
 
  render(){
    if(this.props.editing === this.props.id){
      return <div className={this.props.type}><input defaultValue={this.props.text} 
      onChange={e => this.props.update( { [this.props.type]: e.target.value} )  }/></div>
    }else{
      return <div className={this.props.type}>{this.props.text}</div>
    }
  }
}

class EditableTextProp extends Editable{
  constructor(props) {
    super(props);
  }
 
  render(){
    if(this.props.editing === this.props.id){
      return <div className={this.props.type}>
      <textarea defaultValue={this.props.text}       
        onChange={e => this.props.update( { [this.props.type]: e.target.value} )  }
      />
      </div>
    }else{
      return <div className={this.props.type}>{this.props.text}</div>
    }
  }
}
//      return <div className="title" key={`${p.id}title`}>{p.title}</div>


//todo we should use a redux style store instead of this.state.data
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listener: false,
      editItem: "",
      title: "",
      body: ""
    };
  }
 
  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.setState({listener: this.startListening(this)});
  }

  startListening(view) {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;

    return db.collection("notes").where("author", "==", user.uid).orderBy("datetime")
      .onSnapshot(function(querySnapshot) {
          let posts = [];
          querySnapshot.forEach(function(doc) {
              posts.push({
                  id: doc.id,
                  title: doc.data().title,
                  body: doc.data().body
                });
          });
          view.setState({data: posts});
      });
  };
  

  delete_doc(id){
    var db = firebase.firestore();
    

    db.collection("notes").doc(id).delete().then(function() {
      
    })
    .catch(function(error) {
      
    });
  }

  save_doc(id){
    
    if(this.state.title && this.state.body){
      var db = firebase.firestore();
      db.collection("notes").doc(id).update({title: this.state.title, body:this.state.body})
      .then(() => {
        this.setState({editItem: ""});
      })
      .catch(function(error) {
        
      });
    }else
    this.setState({editItem: ""});
  }

  edit_doc(id){
    // setup initial values
    const doc = this.state.data.find(d => d.id === id);
    
    this.setState({
      editItem: id,
      title: doc.title,
      body: doc.body
    });
  }

  render() {
    if(this.state.data.length > 0){
      const store = this; //TODO use a real store
    return <div className="posts">
    {
      this.state.data.map( p => 
        <div className="post" key={`${p.id}frag`}>
          <EditableInputProp editing={this.state.editItem} id={p.id} text={p.title} update={(t) => this.setState(t)} type="title"/>
          <div className="scrollview">
              <EditableTextProp editing={this.state.editItem} id={p.id} text={p.body} update={(t) => this.setState(t)} type="body"/>         
          </div>
          <div className="footer" key={`${p.id}footer`}>
            <EditSaveButton editItem={this.state.editItem} store={store} id={p.id}/>
            <button className="delete" onClick={() => store.delete_doc(`${p.id}`)}>Delete</button>
          </div> 
        </div>
      )
    }
    </div>
    
    }else{
      return <div>posts</div>
    }
  }
  }
  export default Posts;
