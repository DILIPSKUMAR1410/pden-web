import React, { Component } from "react";
import profilePlaceholder from "../../Assets/Images/profile-placeholder.jpg";
import "./Profiletab.css";
class Profiletab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    if (window.location.pathname.includes("/user/")) {
      var name = window.location.pathname.replace("/user/", "");
      this.setState({ name: name });
    }
  }
  getProfilePic = () => {
    const profilePic = false;
    if (!profilePic) return profilePlaceholder;
  };

  render() {
    return (
      <div className="user-profile">
        <img src={this.getProfilePic()} alt="" />
        <span>{this.state.name}</span>
        <button
          className="follow-btn"
          onClick={this.props.onFollow(this.state.name)}
        >
          Follow
        </button>
      </div>
    );
  }
}
export default Profiletab;
