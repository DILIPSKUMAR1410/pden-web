import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Discussion from "./Discussion";
// import { Box, Container } from "@material-ui/core";

import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
  };

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
    });
  };

  render() {
    return (
      <div className="home-container">
        <Sidebar currentPage="feed" />
        <Feed showDiscuss={this.showDiscuss} />
        <Discussion show={this.state.showDiscuss} />
      </div>
    );
  }
}
export default Home;
