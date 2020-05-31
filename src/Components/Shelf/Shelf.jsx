import React, { Component } from "react";
import { UserList, Sidebar } from "..";
import "./Shelf.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

export default class Shelf extends Component {
  getFollowers() {
    const followers = [];
    return followers;
  }

  render() {
    return (
      <>
        <Sidebar />
        <UserList list={this.getFollowers()} />
      </>
    );
  }
}
