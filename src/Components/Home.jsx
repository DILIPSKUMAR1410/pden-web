import React, { Component } from "react";
import { Spinner, Discussion, Feed, Sidebar } from "./";
import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
    postid: "",
    loading: false,
    logoutmenu: false,
  };

  toggleLogoutMenu = () => {
    this.setState({ logoutmenu: !this.state.logoutmenu });
  }

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post,
    });
  };

  setload = () => {
    this.setState({ loading: !this.state.loading });
  };

  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };

  render() {
    return (
      <div className="home-container">
        <Sidebar currentPage="" onSearch={this.onSearch} toggleLogoutMenu={this.toggleLogoutMenu} logoutmenu={this.state.logoutmenu} />
        <div onClick={() => this.setState({ logoutmenu: false })}>
          <Feed showDiscuss={this.showDiscuss} setload={this.setload} />
          {this.state.showDiscuss ? (
            <Discussion id={this.state.postid} setload={this.setload} />
          ) : null}
          {this.state.loading ? <Spinner /> : null}
        </div>
      </div>
    );
  }
}

export default Home;
