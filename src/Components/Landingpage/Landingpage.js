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
      loading: false
    }
  }

  handleSignin = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    localStorage. removeItem("Journal");
    userSession.signUserOut(window.location.origin);
  }
  fetchdata=()=>{
    if (userSession.isUserSignedIn()) 
    {  
    console.log("didmount");
    this.setState({ loading: true });
    const options = { decrypt: false };
    userSession.getFile('Journal.json', options)
      .then((file) => {
        var statuses = JSON.parse(file || '[]')
        localStorage.setItem("Journal", JSON.stringify(statuses));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });       
      });  
    }
  }
  componentDidMount() 
  {   
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        console.log("pending");
        this.props.history.push("/");
        window.history.replaceState({}, document.title, "/");
        this.setState({ loading: true });
      }).finally(()=>{
        console.log("completed");
        this.fetchdata();
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
                <p>SecureBox</p>
              </div>
              {!userSession.isUserSignedIn() ?
                <button onClick={this.handleSignin}>Login using Blockstack</button> :
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
          {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
        </div>
      );
    }
  }
  export default Page;