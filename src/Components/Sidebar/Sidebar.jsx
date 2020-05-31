import React, { Component } from "react";
import profilePlaceholder from "../../Assets/Images/profile-placeholder.jpg";
import { Searchbar } from "..";
import "./Sidebar.css";
import { getConfig } from "radiks";
const { userSession } = getConfig();
// Props:
//  currentPage: Used to decide which all link to display in the sidebar. Valid options: ['feed', 'shelf', 'mybook', 'invite']

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: userSession.loadUserData().username,
    };
  }

  handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("thoughts");
    localStorage.removeItem("Users");
    localStorage.removeItem("Mydetails");
    localStorage.removeItem("discussions");
    userSession.signUserOut(window.location.origin);
  };

  goToLanding = () => {
    window.location.pathname = "/";
  };

  getProfilePic = () => {
    const profilePic = false;
    if (!profilePic) return profilePlaceholder;
  };

  getSidebarButtons = (currentPage) => {
    return [
      ["feed", "F"],
      ["shelf", "S"],
      ["mybook", "B"],
      ["invite", "I"],
    ]
      .filter((item) => item[0] !== currentPage)
      .map((item) => (
        <div className={item[0] + " sidebar-menu-link"}>
          <a onClick={()=>this.props.changePage(item[0])} key={item[0]}></a>
        </div>
      ));
  };

  render() {
    if (userSession.isUserSignedIn())
      return (
        <div className="sidebar">
          <div className="pden-logo" onClick={this.goToLanding}>
            Pden.
          </div>
          <div className="menu">
            <Searchbar {...this.props} />
            <div className="sidebar-menu">
              {this.getSidebarButtons(this.props.currentPage)}
            </div>
            <span className="profile-name">{this.state.name}</span>
            <div onClick={() => this.props.toggleLogoutMenu()}>
              <img src={this.getProfilePic()} alt="" className="profile-pic" />
              {this.props.logoutmenu ? (
                <div className="logout-menu">
                  <span onClick={this.handleSignOut}>Logout</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default Sidebar;
