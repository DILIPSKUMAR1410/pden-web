import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Discussion from "./Discussion";
import Spinner from "./Spinner";
import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
    postid: "",
    loading: false,
  };

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post,
    });
  };

  setload = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <div className="home-container">
        <Feed showDiscuss={this.showDiscuss} setload={this.setload} />
        {this.state.showDiscuss ? (
          <Discussion id={this.state.postid} setload={this.setload} />
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}
export default Home;
