import React, { Component } from "react";
import Newmessage from "./Home/Feed/Message/Message";
import "./Discussion.css";
import DiscussionPost from "./DiscussionPost";
import { Message } from "../Models";
class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaddiscussion: false,
      discussions: [],
    };
  }

  async componentDidMount() {
    this.props.setload();
    const messages = await Message.fetchList({
      postid: this.props.id,
    });
    this.setState({ discussions: messages });
    localStorage.setItem("discussions", JSON.stringify(messages));
    this.setState({ loaddiscussion: true });
    this.props.setload();
  }

  getDiscussions = () => {
    // var discussions = JSON.parse(localStorage.getItem("discussions"));
    // if(!discussions) discussions=[];
    return this.state.discussions.map((item) => {
      return <DiscussionPost data={item} />;
    });
  };

  updateDiscussion = (messages) => {
    this.setState({ discussions: messages });
  };

  render() {
    return (
      <div className="discussion-container">
        {this.state.loaddiscussion ? this.getDiscussions() : null}
        <Newmessage {...this.props} updateDiscussion={this.updateDiscussion} />
        {/* <div className="discussion-inp-container">
          <input type="text" className="discussion-inp" />
          <button className="discussion-post-btn">Post</button>
        </div> */}
      </div>
    );
  }
}

export default Discussion;
