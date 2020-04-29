import React from "react";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadpeople: false };
  }

  getUsers = (target) => {
    // const currentUser = JSON.parse(localStorage.getItem('Mydetails'));
    // const following =

    const userList = JSON.parse(localStorage.getItem("Users"));
    return userList
      .filter(
        (user) => user.attrs.username.toLowerCase().indexOf(target.toLowerCase()) != -1
      )
      .map((user) => <div className="person">{user.attrs.username}</div>);
  };

  render() {
    return <div className="shelf">{this.getUsers(this.props.searchvalue)}</div>;
  }
}
export default Search;
