import React, { Component } from "react";
import "./MyBook.css";
import { Newfeed, Post } from "..";

export default class MyBook extends Component {
  getThoughts = () => {
    const data = [
      {
        attrs: {
          text: "Text",
          author: "Author",
          date: new Date(),
        },
      },
    ];
    return data.map((thought) => {
      return <Post data={thought} showDiscuss={this.props.showDiscuss} />;
    });
  };

  render() {
    return (
      <div className="feed-container">
        <div className="feed-full">
          <div className="feedc">{this.getThoughts()}</div>
        </div>
      </div>
    );
  }
}
