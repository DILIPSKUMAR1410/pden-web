import React, { Component } from "react";

import "./Discussion.css";
import DiscussionPost from "./DiscussionPost";

class Discussion extends Component {
  getDiscussions = () => {
    const discussions = [
      {
        author: "Leonardo",
        text: "Test",
      },
      {
        author: "Leonardo",
        text: "123",
      },
    ];

    return discussions.map((item) => {
      return <DiscussionPost data={item} />;
    });
  };

  render() {
    if (!this.props.show) return <div></div>;
    return (
      <div className="discussion-container">
        {this.getDiscussions()}
        {/* <div className="discussion-inp-container">
          <input type="text" className="discussion-inp" />
          <button className="discussion-post-btn">Post</button>
        </div> */}
      </div>
    );
  }
}

export default Discussion;
