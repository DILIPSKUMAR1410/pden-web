import React, { Component } from "react";
import { Person, Thought } from "../../Models";
import { Sidebar, Discussion, Spinner, Post } from "..";
import Profiletab from "./Profiletab";
import "./Profile.css";
import {getConfig} from 'radiks'
const {userSession}= getConfig();
class Profile extends Component {
  state = {
    username: this.props.match.params.uid,
    feed: [],
    showDiscuss: false,
    postid: "",
    loading: false,
    logoutmenu: false,
    followed: false
  };

  toggleLogoutMenu = () => {
    this.setState({ logoutmenu: !this.state.logoutmenu });
  };

  async componentDidMount() {
    this.setload();
    const thoughts = await Thought.fetchList({
      author: this.state.username,
    });
    this.setState({ feed: thoughts.reverse() });
    this.setState({ loadfeed: true });
    Person.fetchOwnList().then(person => {
      console.log(person);
      if (person[0].attrs.following.indexOf(this.props.match.params.uid) === -1)
        this.setState({ followed: false });
      else
        this.setState({ followed: true });
    })
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

  changePage = (page) => {
    this.props.history.push("/" + page);
  }

  follow = (name) => {
    Person.fetchOwnList().then(person => {
      var newfollowing = person[0].attrs.following;
      if (!this.state.followed)
        newfollowing.push(name);
      else {
        newfollowing.splice(newfollowing.indexOf(name));
      }
      Person.findById(person[0]._id).then(me => {
        const value = {
          following: newfollowing
        }
        me.update(value);
        me.save();
        this.setState({ followed: !this.state.followed });
      })
    }).finally(() => {
        // Person.fetchList({ username: name }).then(person => {
        //   var newfollower = person[0].attrs.followers;
        //   if (!this.state.followed)
        //     newfollower.push(userSession.loadUserData().username);
        //   else {
        //     newfollower.splice(newfollower.indexOf(userSession.loadUserData().username));
        //   }
        //   Person.findById(person[0]._id).then(he => {
        //     const value = {
        //       followers: newfollower
        //     }
        //     he.update(value);
        //     he.save();
        //   })
        // })
    })

  };

  render() {
    return (
      <div className="home-container">
        <Sidebar
          onSearch={this.onSearch}
          toggleLogoutMenu={this.toggleLogoutMenu}
          logoutmenu={this.state.logoutmenu}
          changePage={this.changePage}
        />
        <div className="feed-container">
          <div className="profile-tab-container">
            <Profiletab onFollow={this.follow} followed={this.state.followed} />
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
        {this.state.showDiscuss ? (
          <Discussion id={this.state.postid} setload={this.setload} />
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Profile;
