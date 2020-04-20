import React from 'react'
import './Header.css'
import {
    UserSession,
    AppConfig,
} from 'blockstack';
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Header extends React.Component {
    handleSignOut=e=>{
        e.preventDefault();
        localStorage.removeItem("Demofeed");
        userSession.signUserOut(window.location.origin);
        window.location.reload(true);
    }
    render() {
        return (
            <div class="headerland1">
                {this.props.component==="Feed"?<p className="logoh">Feed</p>: null}
                {this.props.component==="Mybook"?<p className="logoh">My Book</p>:null}
                {this.props.component==="Shelf"?<p className="logoh">Shelf</p>:null}
                {this.props.component==="Invite"?<p className="logoh">Invite</p>:null}
                {this.props.component==="Help"?<p className="logoh">Help</p>:null}
                <div className="id">
                    <p>{userSession.loadUserData().username}</p>
                    <div className="hmenu" onClick={this.props.callMenu}></div>
                    <div className={this.props.menuon?"hmenucontent":"hmenuhide"}>
                        <span>Night Mode</span>
                        <span onClick={e=>this.handleSignOut(e)}>Logout</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;