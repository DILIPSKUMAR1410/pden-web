import React, { Component } from "react";
import Post from "./Post";
import { Person, Thought } from "../Models";
import Spinner from "./Spinner";
import Discussion from "./Discussion";
import Sidebar from "./Sidebar"
class Profile extends Component {
  state = {
    username: this.props.match.params.uid,
    feed: [],
    showDiscuss: false,
    postid: "",
    loading: false,
  };

  async componentDidMount() {
    this.setload();
    const thoughts = await Thought.fetchList({
      author: this.state.username
    })
    this.setState({ feed: thoughts.reverse() });
    this.setState({ loadfeed: true });
    this.setload();
  }

  getThoughts = () => {
    var thoughts = this.state.feed;
    return thoughts.map((thought) => {
      return <Post data={thought} showDiscuss={this.showDiscuss} />;
    });
  };

  updateFeed = (thoughts) => {
    this.setState({ feed: thoughts });
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  };
  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post,
    });
  };
  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };
  setload = () => {
    this.setState({ loading: !this.state.loading });
  };
  render() {
    return (
      <div className="home-container">
        <Sidebar onSearch={this.onSearch}/>
        <div className="feed-container">
          <div className="feed">
            <React.Fragment>
              {/* ?_? */}
              {this.state.loadfeed ? this.getThoughts() : this.getThoughts()}
            </React.Fragment>
          </div>
        </div>
        {this.state.showDiscuss ? (
          <Discussion id={this.state.postid} setload={this.setload}/>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Profile;
