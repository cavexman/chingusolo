import React, { Component } from 'react';
import Posts from './Posts';
import './App.css';
import AddNoteForm from './AddNoteForm';




class AppAuthorized extends Component {
  constructor(props){
    super(props);
    this.state = {    
      dirty: 0,
    }
  }

  componentDidMount() {
      
  }
  

  render() {
    return (
      <div className="main-container">
        <h1>Digital Journal<span> | Create A Note</span></h1>
        <AddNoteForm dirty={() => this.setState({dirty: this.state.dirty+1})}/>
        <Posts user={this.props.user} />
      </div>
    );
  }
}

export default AppAuthorized;

