import React, { Component } from 'react';
import './App.css';



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
    return(
      <input className="field" value={this.props.initialValue} onChange={e => this.props.doAction(new PropEditAction({ [this.props.propName]:e.target.value}))}/>
    )
  }
}

class Posts extends Component {
  state = {
      data: []
    };
  
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ data: res.posts }))
        .catch(err => console.log(err));
    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch(`/posts/rcc`);
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      if(this.state.data.length > 0){
      return <div className="posts">
      {
        this.state.data.map( p => 
          <div className="post" key={`${p.id}frag`}>
          <div className="title" key={`${p.id}title`}>{p.title}</div>
          <div className="body" key={`${p.id}body`}>{p.body}</div>
          <div className="footer" key={`${p.id}footer`}>
            <a className="edit" href="edit">Edit</a>
            <a className="delete" href="delete">delete</a>
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

class AppAuthorized extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    // this.callBackendAPI()
      // .then(res => this.setState({ data: res.express }))
      // .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(`/posts/rcc`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log(body);
    return body;
  };

  render() {
    return (
      <div>
        <h1>Digital Journal</h1><h2>Create a Note</h2>
        <label>Title:<br/><PropInput propName="title" doAction={e => this.doAction(e)}/></label>
        <label><br/>Body:<br/><PropInput propName="body" doAction={e => this.doAction(e)}/></label>
        <div>Use the form above to create a post. Be sure to fill in the required title and body fields and then press submit.</div>
        <button>Submit</button><br/>
        <Posts user={this.props.user} />
      </div>
    );
  }
}

export default AppAuthorized;

