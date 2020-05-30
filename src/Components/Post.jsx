import React, { Component } from "react";
import "./Post.css";
import discuss from "../Assets/Icons/discussion.png"
import share from "../Assets/Icons/share.png"
import spread from "../Assets/Icons/spread.png"
class Post extends Component {
  show = () => {
    this.props.showDiscuss(this.props.data._id);
    console.log(this.props.data.attrs.author);
  };

  render() {
    return (
      <div className="post-container">
        <div>
          <h3 className="post-text">{this.props.data.attrs.text}</h3>
          <span className="post-author">
            {this.props.data.attrs.author}
          </span>
          <span className="post-date">
            {new Date(this.props.data.attrs.date).toDateString()}
          </span>
        </div>
        <div className="post-btn-group">
          <button className="post-btn" onClick={this.show}>
            <img src={discuss} />
          </button>
          <button className="post-btn">
            <img src={spread} />
          </button>
          <button className="post-btn">
            <img src={share} />
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
