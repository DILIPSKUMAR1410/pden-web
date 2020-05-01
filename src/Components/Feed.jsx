import React, { Component } from "react";
import Post from "./Post";
import { getConfig } from "radiks";
import { Thought } from "../Models";
import Newfeed from "./Home/Feed/NewFeed/Newfeed"
import "./Feed.css";

const { userSession } = getConfig();

class Feed extends Component {
  constructor(props){
    super(props);
    this.state={
      loadfeed: false
    }
  }
  async componentDidMount() {
    const thoughts = await Thought.fetchList();
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
    this.setState({loadfeed:true});
  }

  getThoughts = () => {
    var thoughts = JSON.parse(localStorage.getItem("thoughts"));
    if(!thoughts) thoughts=[];
    return thoughts.reverse().map((thought) => {
      return (<Post data={thought} showDiscuss={this.props.showDiscuss} />);
    });
  }
  render() {
    return (
    <div className="feed-container">
      <Newfeed/>
      < React.Fragment >
        {this.state.loadfeed?this.getThoughts():this.getThoughts()}
      </React.Fragment >
    </div >
    )
  }
}

export default Feed;
