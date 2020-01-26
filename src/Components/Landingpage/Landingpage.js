import React from 'react'
import './Landingpage.css'
import {
    UserSession,
    AppConfig,
  } from 'blockstack';
  const appConfig = new AppConfig()
  const userSession = new UserSession({ appConfig: appConfig })
class Page extends React.Component{
    
    handleSignin = (e) => {
        e.preventDefault();
        userSession.redirectToSignIn();
      }
      
      handleSignOut(e) {
        e.preventDefault();
        userSession.signUserOut(window.location.origin);
      }
      
      
      componentDidMount() {
        if (userSession.isSignInPending()) {
          userSession.handlePendingSignIn().then((userData) => {
            // userSession.getFile("Journal.json", )
            this.props.history.push("/");
            window.history.replaceState({}, document.title, "/")
            // this.setState({ userData: userData})
          });
        }
        if(userSession.isUserSignedIn())
        {
          console.log("HI");
        }
      }
render(){
    return(
        <div class="land">
            <div class="headerland">
                <div class="logo">
                    <img src={require("../../Assets/Images/box.png")}/>
                    <p>SecureBox</p>
                </div>
                {!userSession.isUserSignedIn()?
                <button onClick={this.handleSignin}>Login using Blockstack</button>:
                <div class="nav">
                  <a href="/newjournal">New Journal</a>
                  <a href="/myjournals">My Journals</a>
                  <button onClick={this.handleSignOut}>Logout</button>
                </div>}
            </div>
            <div class="row">
                <div class="leftcol">
                    <p><strong>SecureBox</strong> is your privacy focussed journal.</p>
                    <p>Pour out your thoughts and store them on the decentralized web.</p>
                    <p>Experience the power of Simplicity </p>
                </div>
            </div>
            <footer><p>Copyright@securebox2019</p></footer>
        </div>
    );
}
}
export default Page;