import React, { Component } from "react";
import { Thought, Person } from "../../Models";
import { Newfeed, Post } from "..";
import "./Feed.css";
import {getConfig} from 'radiks'
const {userSession} =getConfig()
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
    const me = await Person.fetchOwnList();
    var following = me[0].attrs.following;
    following.push( userSession.loadUserData().username);
    const thoughts = await Thought.fetchList();
    var filtered_thoughts=thoughts.filter(item=> following.includes(item.attrs.author));
    this.setState({ feed: filtered_thoughts.reverse() });
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
        <div className="feed-input">
          <Newfeed {...this.props} updateFeed={this.updateFeed} />
        </div>
        <div className="feed-full">
          <div className="feedc">
            <React.Fragment>
              {/* ?_? */}
              {this.state.loadfeed ? this.getThoughts() : this.getThoughts()}
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
