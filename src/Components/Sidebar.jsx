import React, { Component } from "react";
import profilePlaceholder from "../Assets/Images/profile-placeholder.jpg";
import Searchbar from "./Home/Searchbar/Searchbar";
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
  componentDidMount() {
    if (window.location.pathname.includes("/user/")) {
      var name = window.location.pathname.replace("/user/", "");
      this.setState({ name: name });
    }
  }

  getProfilePic = () => {
    const profilePic = false;
    if (!profilePic) return profilePlaceholder;
  };

  getSidebarButtons = (currentPage) => {
    return [
      ["feed", "Feed"],
      ["shelf", "Shelf"],
      ["mybook", "My Book"],
      ["invite", "Invite Friends"],
    ]
      .filter((item) => item[0] !== currentPage)
      .map((item) => (
        <a className="sidebar-menu-link" href="/feed/#" key={item[0]}>
          <li className="sidebar-menu-item">{item[1]}</li>
        </a>
      ));
  };

  render() {
    if (userSession.isUserSignedIn())
      return (
        <div className="sidebar">
          <div className="profile-pic-container">
            <img src={this.getProfilePic()} alt="" className="profile-pic" />
            <span className="profile-name">{this.state.name}</span>
          </div>

          <ul className="sidebar-menu">
            {this.getSidebarButtons(this.props.currentPage)}
          </ul>
          <Searchbar {...this.props} />
        </div>
      );
    else return <div></div>;
  }
}

export default Sidebar;
