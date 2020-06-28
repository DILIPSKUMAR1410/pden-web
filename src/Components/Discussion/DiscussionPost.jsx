import React, { Component } from "react";
import "./DiscussionPost.css";
import { Thought, Message } from "../../Models"
import { getConfig } from "radiks"
import approval from "../../Assets/Icons/approval.png"
const { userSession } = getConfig()
class DiscussionPost extends Component {
  // approve = () => {
  //   Thought.findById(this.props.thought._id).then(post => {
  //     var temp = post.attrs.messages;
  //     temp.push(res._id)
  //     const value = {
  //       messages: temp
  //     }
  //     post.update(value);
  //     post.save().finally(this.props.updateDiscussion);
  //   })
  // }
  // decline = () => {
  //   Thought.findById(this.props.thought._id).then(post => {
  //     var temp = post.attrs.declined;
  //     temp.push(res._id)
  //     const value = {
  //       declined: temp
  //     }
  //     post.update(value);
  //     post.save().finally(this.props.updateDiscussion);
  //   })
  // }
  render() {
    return (
      <div className={this.props.data.attrs.author === userSession.loadUserData().username ? "discussion-post-container author" : "discussion-post-container common"}>
        <div>
          <h3 className="discussion-post-text">{this.props.data.attrs.text}</h3>
          <span className="discussion-post-author">
            {this.props.data.attrs.author}
          </span>
        </div>
        {!this.props.thought.attrs.messages.includes(this.props.data._id) ?
          <div className="discussion-post-btn-group">
            {this.props.data.attrs.author !== userSession.loadUserData().username ?
              <input type="checkbox" style={{ cursor: "pointer" }} onChange={() => this.props.addToApprove(this.props.data._id)} />
              : null}
            <img className="discussion-post-img" title="Approval Pending" src={approval} alt="" />
          </div>
          : null}
      </div>
    );
  }
}

export default DiscussionPost;
