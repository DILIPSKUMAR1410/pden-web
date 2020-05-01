import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Discussion from "./Discussion";
// import { Box, Container } from "@material-ui/core";

import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
    postid: ''
  };

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post
    });
  };

  render() {
    return (
      <div className="home-container">
        <Sidebar currentPage="feed" />
        <Feed showDiscuss={this.showDiscuss} />
        {this.state.showDiscuss ? <Discussion id={this.state.postid} /> : null}
      </div>
    );
  }
}
export default Home;
