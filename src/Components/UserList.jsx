import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import profilePlaceholder from "../Assets/Images/profile-placeholder.jpg";
import { Person } from "../Models";
import twitterIcon from "../Assets/Images/twitter.svg";
import facebookIcon from "../Assets/Images/facebook.svg";
import instagramIcon from "../Assets/Images/instagram.svg";
// import blockstackIcon from "../Assets/Images/blockstack.svg";
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
    let availableSocials = [];
    // if (
    //   user.profile &&
    //   user.profile.apps &&
    //   user.profile.apps["https://app_pden_xyz"]
    // )
    availableSocials.push(
      <span className="blockstack-icon">
        <span className="social-tooltip">{user.username}</span>
        <img
          src={
            "https://www.vectorlogo.zone/logos/blockstack/blockstack-icon.svg"
          }
          alt="blockstack"
          className="user-list-social-icon"
        />
      </span>
    );
    if (!user.profile || !user.profile.account)
      return <span className="user-list-social">{availableSocials}</span>;
    user.profile.account.forEach((i) => {
      if (socialList.includes(i.service)) {
        availableSocials.push(
          <a href={i.proofUrl}>
            <img
              src={socialIcons[socialList.indexOf(i.service)]}
              alt="blockstack"
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
        <div
          id={i.username}
          className="user-list-item"
          onClick={() => this.showProfile(i.username)}
        >
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

  showProfile = (username) => {
    Person.fetchList({
      username: username,
    }).then((user) => {
      if (user.length > 0) {
        localStorage.setItem(username, JSON.stringify(user[0]));
        window.location.href = `/user/${user[0].attrs.username}`;
      } else console.log("No pden account yet");
    });
  };

  render() {
    return (
      <React.Fragment>
        <StackGrid columnWidth={250} className="user-list">
          {this.renderList(this.props.list)}
        </StackGrid>
      </React.Fragment>
    );
  }
}

export default UserList;
