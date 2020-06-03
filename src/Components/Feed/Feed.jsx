import React, { Component } from "react";
import { Thought, Person, Spread } from "../../Models";
import { Newfeed, Post } from "..";
import "./Feed.css";
import { getConfig } from 'radiks'
const { userSession } = getConfig()
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
    following.push(userSession.loadUserData().username);
    const thoughts = await Thought.fetchList();
    var filtered_thoughts = thoughts.filter(item => following.includes(item.attrs.author));
    following.pop();
    const spreads = await Spread.fetchList();
    var filtered_spreads = spreads.filter(item=>this.spreadFilter(item, filtered_thoughts, following));
    var feed = filtered_thoughts.concat(filtered_spreads);
    feed.sort(function (a, b) {
      var keyA = new Date(a.attrs.date),
        keyB = new Date(b.attrs.date);
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    // console.log(feed);
    this.setState({ feed: feed });
    this.setState({ loadfeed: true });
    this.props.setload();
  }

  spreadFilter=(item, filtered_thoughts, following)=>{
    if(following.includes(item.attrs.spreadauthor) && !(filtered_thoughts.some(thought => thought._id == item.attrs.postid)))
      return true
    else
      return false
  }

  getThoughts = () => {
    return this.state.feed.map((thought) => {
      return <Post data={thought} showDiscuss={this.props.showDiscuss} />;
    });
  };

  updateFeed = (thought) => {
    this.setState({ feed: [thought, ...this.state.feed] });
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
              {this.getThoughts()}
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
