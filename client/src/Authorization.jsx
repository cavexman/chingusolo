import React from 'react';


class Authorization extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.showLogin){
      return <div>
              <div className="loginBox" id="firebaseui-auth-container"></div>
            </div>
    }else if(this.props.user){
      return <div>
              <div className="loginBoxHide" id="firebaseui-auth-container"></div>
              <button className="signout" onClick={()=>this.props.signOut()}>sign out</button>
            </div>
    }else
      return <div>
              <div className="loginBoxHide" id="firebaseui-auth-container"></div>
              <button className="signout" onClick={()=>this.props.startLogin()}>sign in</button>
            </div>
  }
}


export default Authorization;

