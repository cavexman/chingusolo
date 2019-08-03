import React, { Component } from 'react';
import AppAuthorized from './AppAuthorized';
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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      login: false
    }
  }


  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  doAction(action){
    console.log(action);
    if( action instanceof PropEditAction ){
      this.setState(action.getState());
    }
  }

  render() {
    if(this.state.login)
      return <AppAuthorized {...this.state} />

    return (
      <div className="App">
        <header className="App-header">
        Welcome to Chingu Solo {this.state.user}
        </header>

        
        <label>User<PropInput propName="user" doAction={e => this.doAction(e)}/></label>
        <label>Password<PropInput propName="pw" doAction={e => this.doAction(e)}/></label>
        <button onClick={() => this.setState({login:true})}>log in</button>
      </div>
    );
  }
}

export default App;

