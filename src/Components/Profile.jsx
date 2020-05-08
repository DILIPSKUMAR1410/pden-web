import React, { Component } from "react";
import Post from "./Post";

class Profile extends Component {
  state = {
    username: this.props.match.params.uid,
    feed: [],
  };

  async componentDidMount() {
    // fetch logic here
  }

  getThoughts = () => {
    var thoughts = this.state.feed;
    return thoughts.map((thought) => {
      return <Post data={thought} showDiscuss={this.props.showDiscuss} />;
    });
  };

  updateFeed = (thoughts) => {
    this.setState({ feed: thoughts });
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  };

  render() {
    return (
      <div className="feed-container">
        <div className="feed">
          <React.Fragment>
            {/* ?_? */}
            {this.state.loadfeed ? this.getThoughts() : this.getThoughts()}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default Profile;
