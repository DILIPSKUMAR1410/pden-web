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
    localStorage. removeItem("Journal");
    userSession.signUserOut(window.location.origin);
  }
  fetchdata=()=>{
    if (userSession.isUserSignedIn()) 
    {  
      // const option={encrypt : false};
      // var temp=[];
      // userSession.putFile("Journaldata.json",JSON.stringify(temp),option);  
    const options = { decrypt: false };
    userSession.getFile('Myjournal.json', options)
      .then((file) => {
        if(file==null)
          this.setState({ journallist: false });       
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
        this.props.history.push("/");
        window.history.replaceState({}, document.title, "/");
        this.setState({ loading: true });
      })
    this.fetchdata();
  
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
                 {this.state.journallist? <a href="/myjournals">My Journals</a>:null}
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