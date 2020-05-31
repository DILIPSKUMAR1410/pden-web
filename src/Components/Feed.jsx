import React, { Component } from "react";
import { Thought } from "../Models";
import { Newfeed, Post } from "./";
import "./Feed.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadfeed: false,
      feed: [],
    };
  }

  async componentDidMount() {
    this.props.setload();
    const thoughts = await Thought.fetchList();
    this.setState({ feed: thoughts.reverse() });
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
    this.setState({ loadfeed: true });
    this.props.setload();
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
        <div className="feed-full">
          <div className="feedc">
            <div className="feed-input">
              <Newfeed {...this.props} updateFeed={this.updateFeed} />
            </div>
            <React.Fragment>
              {this.state.loadfeed ? this.getThoughts() : this.getThoughts()}
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
