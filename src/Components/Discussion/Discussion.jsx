import React, { Component } from "react";
import { DiscussionPost, Newmessage } from "..";
import { Message, Thought } from "../../Models";
import "./Discussion.css";
import { getConfig } from 'radiks'
const { userSession } = getConfig()
export default class Discussion extends Component {
  state = {
    isOpen: true,
    discussions: [],
    postid: null,
    thought: "",
    approve: []
  };

  async componentDidMount() {
    this.updateDiscussion();
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

  updateDiscussion = () => {
    this.props.setload();
    Thought.findById(this.props.id).then(thought => {
      this.setState({ thought });
      Message.fetchList({
        postid: this.props.id,
      }).then(discussions => {
        var temp = discussions;
        if (userSession.loadUserData().username !== thought.attrs.author) {
          temp = discussions.filter(item => thought.attrs.messages.includes(item._id) || item.attrs.author === userSession.loadUserData().username)
        }
        this.setState({ discussions: temp });
      }).finally(() => {
        this.props.setload();
      })
    })
  };

  addToApprove = (id) => {
    var temp = this.state.approve;
    if (this.state.approve.includes(id))
      temp.splice(temp.indexOf(id), 1);
    else
      temp.push(id);
    this.setState({ approve: temp });
  }

  approveMessage = () => {
    this.props.setload();
    Thought.findById(this.props.id).then(thought => {
      var temp1 = thought.attrs.messages;
      var temp2 = this.state.approve;
      var temp3 = temp1.concat(temp2.filter((item) => temp1.indexOf(item) < 0))
      const value = {
        messages: temp3
      }
      thought.update(value);
      thought.save().finally(() => {
        this.setState({ approve: [] });
        this.props.setload();
        this.updateDiscussion();
      })
    });
  }

  getDiscussions = () => {
    return this.state.discussions.map((item, index) => {
      return <DiscussionPost
        data={item}
        key={index}
        thought={this.state.thought}
        updateDiscussion={this.updateDiscussion}
        addToApprove={this.addToApprove}
      />;
    });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <div className="discussion-tab">
          <div onClick={this.toggle} className="discussion-title">
            Discuss
            <button className="close-btn" onClick={this.props.showDiscuss}>
              x
            </button>
          </div>
          {this.state.approve.length ?
            <div className="approval-tab">
              <div className="approve-btn-grp">
                <span>Approve {this.state.approve.length} messages?</span>
                <button className="approve-btn" onClick={this.approveMessage}>Approve</button>
              </div>
            </div>
            : null}
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
          </div>
          <div className="discussion-new">
            <Newmessage
              {...this.props}
              updateDiscussion={this.updateDiscussion}
            />
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
