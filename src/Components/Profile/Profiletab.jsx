import React, { Component } from "react";
import profilePlaceholder from "../../Assets/Images/profile-placeholder.jpg";
import "./Profiletab.css";
import { getConfig, User } from 'radiks'
const { userSession } = getConfig()
class Profiletab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pic: profilePlaceholder
    };
  }
  componentDidMount() {
    if (window.location.pathname.includes("/user/")) {
      var name = window.location.pathname.replace("/user/", "");
      this.setState({ name: name });
      User.fetchList({ username: name }).then(
        user => {
        console.log(user);
          if (user.length > 0 && user[0].attrs.profile && user[0].attrs.profile.image && user[0].attrs.profile.image[0].contentUrl)
            this.setState({ pic: user[0].attrs.profile.image[0].contentUrl });
          // console.log(pic);
        });
    }
  }


  render() {
    return (
      <div className="user-profile">
        <img src={this.state.pic} alt="" />
        <span>{this.state.name}</span>
        {this.state.name !== userSession.loadUserData().username ?
          <button
            className="follow-btn"
            onClick={() => this.props.onFollow(this.state.name)}
          >
            {this.props.followed ?
              "Unfollow" : "Follow"}
          </button>
          : null}
      </div>
    );
  }
}
export default Profiletab;
