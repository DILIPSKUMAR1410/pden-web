import React, { Component } from "react";
import "./MyBook.css";
import { Thought } from "../../Models"
import { Post } from "..";

export default class MyBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadfeed: false,
      feed: [],
    };
  }

  async componentDidMount() {
    this.props.setload();
    const thoughts = await Thought.fetchOwnList();
    this.setState({ feed: thoughts.reverse() });
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
    this.props.setload();
  }

  getThoughts = () => {
    return this.state.feed.map((thought) => {
      return <Post data={thought} showDiscuss={this.props.showDiscuss} />;
    });
  };

  render() {
    return (
      <div className="feed-container">
        <div className="feed-full">
          <div className="feedc">{this.getThoughts()}</div>
        </div>
      </div>
    );
  }
}
