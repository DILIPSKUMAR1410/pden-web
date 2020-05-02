import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Discussion from "./Discussion";
// import { Box, Container } from "@material-ui/core";

import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
    postid: '',
    loading: false
  };

  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post
    });
  };

  setload = () => {
    this.setState({ loading: !this.state.loading });
  };
  
  render() {
    return (
      <div className="home-container">
        <Sidebar currentPage="feed" onSearch={this.onSearch} setload={this.setload}/>
        <Feed showDiscuss={this.showDiscuss} setload={this.setload}/>
        {this.state.showDiscuss ? <Discussion id={this.state.postid} setload={this.setload}/> : null}
        {this.state.loading ? (
          <div class="loadcontainer">
            <div class="loader" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Home;
