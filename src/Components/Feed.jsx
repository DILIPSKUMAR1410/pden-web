import React, { Component } from "react";
import Post from "./Post";
import { getConfig } from "radiks";
import { Thought } from "../Models";

import "./Feed.css";

const { userSession } = getConfig();

class Feed extends Component {
  async componentDidMount() {
    const thoughts = await Thought.fetchList({ sort: "-order" }); // Check
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  }

  getThoughts = () => {
    // const data = JSON.parse(localStorage.getItem("thoughts"));
    // if (!data) return;
    // return (
    //   <React.Fragment>
    //     {data.forEach((i) => (
    //       <Post data={i} />
    //     ))}
    //   </React.Fragment>
    // );
    const data = { author: "Leonardo", text: "placeholder", date: new Date() };
    return (
      <React.Fragment>
        <Post data={data} showDiscuss={this.props.showDiscuss} />
        <Post data={data} showDiscuss={this.props.showDiscuss} />
        <Post data={data} showDiscuss={this.props.showDiscuss} />
        <Post data={data} showDiscuss={this.props.showDiscuss} />
      </React.Fragment>
    );
  };

  render() {
    return <div className="feed-container">{this.getThoughts()}</div>;
  }
}

export default Feed;
