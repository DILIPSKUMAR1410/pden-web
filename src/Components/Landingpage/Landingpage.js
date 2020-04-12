import React from 'react'
import './Landingpage.css'
import {
  UserSession,
  AppConfig,
} from 'blockstack';
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      journallist:true,
    }
  }

  handleSignin = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    localStorage. removeItem("Demo");
    userSession.signUserOut(window.location.origin);
  }
 
  componentDidMount() 
  {   
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        this.props.history.push("/");
        window.history.replaceState({}, document.title, "/");
        this.setState({ loading: true });
      })
      .finally(()=>{
      })  
    }
  }
    
    render() {
      return (
        <div>
          <div class="land">
            <div class="headerland">
              <div class="logo">
                <img src={require("../../Assets/Images/box.png")} />
                <p>Twitter kind of app</p>
              </div>
              {!userSession.isUserSignedIn() ?
                <button onClick={this.handleSignin}>Login using Blockstack</button> :
                <div class="nav">
                  <a href="/feed">Home</a>
                  <button onClick={this.handleSignOut}>Logout</button>
                </div>}
            </div>
            <footer><p>Copyright@me2019</p></footer>
          </div>
          {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
        </div>
      );
    }
  }
  export default Page;