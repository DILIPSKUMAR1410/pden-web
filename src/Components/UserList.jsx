import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import profilePlaceholder from "../Assets/Images/profile-placeholder.jpg";
import twitterIcon from "../Assets/Images/twitter.svg";
import facebookIcon from "../Assets/Images/facebook.svg";
import instagramIcon from "../Assets/Images/instagram.svg";
import "./UserList.css";

class UserList extends Component {
  getProfilePic = (user) => {
    if (user.profile && user.profile.image && user.profile.image[0].contentUrl)
      return (
        <img
          src={user.profile.image[0].contentUrl}
          alt="Profile"
          className="user-list-picture"
        />
      );
    return (
      <img
        src={profilePlaceholder}
        alt="Profile"
        className="user-list-picture"
      />
    );
  };

  getName = (user) => {
    if (user.profile && user.profile.name)
      return <span className="user-list-name">{user.profile.name}</span>;
    else return <span className="user-list-name"></span>;
  };

  getSocial = (user) => {
    const socialList = ["twitter", "facebook", "instagram"];
    const socialIcons = [twitterIcon, facebookIcon, instagramIcon];
    if (!user.profile || !user.profile.account)
      return <span className="user-list-social"></span>;
    let availableSocials = [];
    user.profile.account.forEach((i) => {
      if (socialList.includes(i.service)) {
        availableSocials.push(
          <a href={i.proofUrl}>
            <img
              src={socialIcons[socialList.indexOf(i.service)]}
              className="user-list-social-icon"
            />
          </a>
        );
      }
    });
    return <span className="user-list-social">{availableSocials}</span>;
  };

  renderList = (list) => {
    return list.map((i) => {
      return (
        <div className="user-list-item">
          {this.getProfilePic(i)}
          <div className="user-list-details">
            {this.getName(i)}
            <br />
            {this.getSocial(i)}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <StackGrid columnWidth={250}>
          {this.renderList(this.props.list)}
        </StackGrid>
      </React.Fragment>
    );
  }
}

export default UserList;
