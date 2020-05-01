import React, { Component } from "react";
import profilePlaceholder from "../Assets/Images/profile-placeholder.jpg";
import "./Sidebar.css";

// Props:
//  currentPage: Used to decide which all link to display in the sidebar. Valid options: ['feed', 'shelf', 'mybook', 'invite']

class Sidebar extends Component {
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
    return (
      <div className="sidebar">
        <div className="profile-pic-container">
          <img src={this.getProfilePic()} alt="" className="profile-pic" />
          <span className="profile-name">Leonardo Vinci</span>
        </div>

        <ul className="sidebar-menu">
          {this.getSidebarButtons(this.props.currentPage)}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
