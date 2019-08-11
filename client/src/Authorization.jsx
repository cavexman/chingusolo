import React from 'react';


class Authorization extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.user){
      return <button onClick={()=>this.props.signOut()}>sign out</button>
    }else
      return <div id="firebaseui-auth-container"></div>
  }
}


export default Authorization;

