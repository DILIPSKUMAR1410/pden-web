import React, { Component } from "react";
import { UserList } from "..";
import { Person } from "../../Models";
import { User } from "radiks"
import "./Shelf.css";

export default class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
    };
  }
  async componentDidMount() {
    const person = await Person.fetchOwnList();
    var temp = [];
    person[0].attrs.following.map((username) => {
      User.fetchList({ username: username }).then(userdetails => {
        temp.push(userdetails[0].attrs);
      }).finally(() => {
        var count = person[0].attrs.following.length;
        this.updateSave(temp, count);
      })
    })
  }

  updateSave = (temp, count) => {
    console.log(temp.length, count);
    if (temp.length === count)
      this.setState({ following: temp });
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
