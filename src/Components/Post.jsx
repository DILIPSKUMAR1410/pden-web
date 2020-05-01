import React, { Component } from "react";
import "./Post.css";

// Props:
//  showDiscuss: Function to show the discuss box

class Post extends Component {
  render() {
    return (
      <div className="post-container">
        <h3 className="post-text">{this.props.data.text}</h3>
        <span className="post-author">
          {this.props.data.author.attrs.username}
        </span>
        <span className="post-date">
          {new Date(this.props.data.date).toDateString()}
        </span>
        <button
          className="post-btn post-btn-discuss"
          onClick={this.props.showDiscuss}
        >
          {" "}
          ->{" "}
        </button>
        <div className="post-btn-group">
          <button className="post-btn post-btn-spread">Sp</button>
          <button className="post-btn post-btn-share">Sh</button>
        </div>
      </div>
    );
  }
}

export default Post;
