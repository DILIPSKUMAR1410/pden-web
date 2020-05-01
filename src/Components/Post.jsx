import React, { Component } from "react";
import "./Post.css";

// Props:
//  showDiscuss: Function to show the discuss box

class Post extends Component {
  show = () => {
    this.props.showDiscuss(this.props.data._id);
  }
  render() {
    return (
      <div className="post-container">
        <h3 className="post-text">{this.props.data.attrs.text}</h3>
        <span className="post-author">{this.props.data.attrs.author.attrs.username}</span>
        <span className="post-date">{new Date(this.props.data.attrs.date).toDateString()}</span>
        <button
          className="post-btn post-btn-discuss"
          onClick={this.show}
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
