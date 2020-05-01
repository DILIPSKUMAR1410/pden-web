import React, { Component } from "react";
import "./UserList.css";

class UserList extends Component {
  renderList = (list) => {
    return list.map((i) => {
      return (
        <div className="user-list-item">
          <a href="#">{i}</a>
        </div>
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderList(this.props.list)}</React.Fragment>;
  }
}

export default UserList;
