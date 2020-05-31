import React, { Component } from "react";
import { UserList, Sidebar } from "..";
import { Person } from "../../Models";
import "./Shelf.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

export default class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
    };
  }
  async componentDidMount() {
    const person = await Person.fetchOwnList();
    this.setState({ following: person[0].attrs.following });
  }

  render() {
    return (
      <>
        <div className="shelf-container">
          <h2 className="title">My Shelf</h2>
          <UserList list={this.state.following} />
        </div>
      </>
    );
  }
}
