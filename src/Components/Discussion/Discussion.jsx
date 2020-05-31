import React, { Component } from "react";
import { DiscussionPost, Newmessage } from "..";
import { Message, Thought } from "../../Models";
import "./Discussion.css";

export default class Discussion extends Component {
  state = {
    isOpen: true,
    discussions: [],
    postid: null,
    thought: "",
  };

  async componentDidMount() {
    this.props.setload();
    const discussions = await Message.fetchList({
      postid: this.props.id,
    });
    const thought = await Thought.findById(this.props.id);
    this.setState({ thought: thought });
    console.log(thought);
    this.props.setload();
    this.setState({ discussions });
  }

  show = () => {
    this.setState({ isOpen: true });
  };

  hide = () => {
    this.setState({ isOpen: false });
  };

  toggle = () => {
    this.state.isOpen ? this.hide() : this.show();
  };

  updateDiscussion = (messages) => {
    this.setState({ discussions: messages });
  };

  getDiscussions = () => {
    return this.state.discussions.map((item) => {
      return <DiscussionPost data={item} />;
    });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <div className="discussion-tab">
          <div onClick={this.toggle} className="discussion-title">
            Discuss
          </div>
          <div className="discussion-container">
            <div className="thought-content">
              {this.state.thought ? this.state.thought.attrs.text : null}
              <br />
              <small>
                {this.state.thought
                  ? "@" + this.state.thought.attrs.author
                  : null}
              </small>
            </div>
            <div className="discussions">{this.getDiscussions()}</div>
            <div className="discussion-new">
              <Newmessage
                {...this.props}
                updateDiscussion={this.updateDiscussion}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="discussion-tab collapsed">
          <div className="discussion-title" onClick={this.toggle}>
            Discuss
          </div>
        </div>
      );
    }
  }
}
