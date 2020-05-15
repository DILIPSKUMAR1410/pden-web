import React, { Component } from "react";
import "./DiscussionPost.css";

// Props:
//  showDiscuss: Function to show the discuss box

class DiscussionPost extends Component {
  render() {
    return (
      <div className="discussion-post-container">
        <h3 className="discussion-post-text">{this.props.data.attrs.text}</h3>
        <span className="discussion-post-author">
          {this.props.data.attrs.author}
        </span>
        <div className="discussion-post-btn-group">
          <button className="discussion-post-btn discussion-post-btn-spread">
            Sp
          </button>
          <button className="discussion-post-btn discussion-post-btn-share">
            Sh
          </button>
        </div>
      </div>
    );
  }
}

export default DiscussionPost;
