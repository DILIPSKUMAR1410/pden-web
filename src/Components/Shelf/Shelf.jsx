import React, { Component } from "react";
import { UserList, Sidebar } from "..";
import {Person} from "../../Models"
import "./Shelf.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

export default class Shelf extends Component {
  constructor(props){
    super(props);
    this.state={
      followers:[]
    }
  }
  async componentDidMount(){
    const person = await Person.fetchOwnList();
    this.setState({ followers: person[0].attrs.followers });
  }
  getFollowers() {
    const following = [];
  }

  render() {
    return (
      <>
        <UserList list={this.state.followers} />
      </>
    );
  }
}
