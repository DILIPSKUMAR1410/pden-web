import React from 'react'
import './Header.css'
import {
    UserSession,
    AppConfig,
  } from 'blockstack';
  const appConfig = new AppConfig()
  const userSession = new UserSession({ appConfig: appConfig })
class Header extends React.Component{
render(){
    return(
        <div class="headerland1">
            <img onClick={this.props.gohome} src={require("../../Assets/Images/box.png")}/>
                <p className="id">{userSession.loadUserData().username }</p>
        </div>
    )
}
}
export default Header;