import React from "react";
import "./Landingpage.css";
import { UserSession, AppConfig } from "blockstack";
import { User, configure } from "radiks";
import { Person } from '../../Models'
const userSession = new UserSession({
  appConfig: new AppConfig(["store_write", "publish_data"]),
});

configure({
  apiServer: "http://localhost:5000",
  userSession,
});
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSignin = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("thoughts");
    localStorage.removeItem("Users");
    localStorage.removeItem("Mydetails");
    localStorage.removeItem("discussions");
    userSession.signUserOut(window.location.origin);
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then((userData) => {
          this.setState({ loading: true });
          this.props.history.push("/");
          window.history.replaceState({}, document.title, "/");
        })
        .finally(() => {
          if (userSession.isUserSignedIn())
            User.createWithCurrentUser().finally(() => {
              Person.fetchOwnList().then((user) => {
                if (user.length === 0) {
                  const me = new Person({
                    username: userSession.loadUserData().username,
                    followers: [],
                    following: []
                  });
                  me.save().finally(() => {
                    localStorage.setItem("Mydetails", JSON.stringify(me));
                  });
                }
                else {
                  localStorage.setItem("Mydetails", JSON.stringify(user[0]));
                }
              })
                .finally(() => {
                  Person.fetchList().then((users) => {
                    localStorage.setItem("Users", JSON.stringify(users));
                  })
                    .finally(() => {
                      this.props.history.push("/feed");
                      this.setState({ loading: false });
                    });
                });
            });
          else
            this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <div>
        <div class="land">
          <div class="headerland">
            {!userSession.isUserSignedIn() ? (
              <button onClick={this.handleSignin}>
                Login using Blockstack
              </button>
            ) : (
                <div class="nav">
                  <a href="/feed">Home</a>
                  <button onClick={this.handleSignOut}>Logout</button>
                </div>
              )}
          </div>
          <div class="logo">
            <p>Pden</p>
          </div>
          <footer>
            <p>Copyright@pden2019</p>
          </footer>
        </div>
        {this.state.loading ? (
          <div class="loadcontainer">
            <div class="loader" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Page;
