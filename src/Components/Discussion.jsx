import React, { Component } from "react";
import Newmessage from './Home/Feed/Message/Message'
import "./Discussion.css";
import DiscussionPost from "./DiscussionPost";
import { Message } from '../Models'
class Discussion extends Component {

  constructor(props){
    super(props);
    this.state={
      loaddiscussion: false
    }
  }
  async componentDidMount() {
    const messages = await Message.fetchList({
      postid: this.props.id });
      console.log(messages);
    localStorage.setItem("discussions", JSON.stringify(messages));
    this.setState({ loaddiscussion: true });
  }

  getDiscussions = () => {
    var discussions = JSON.parse(localStorage.getItem("discussions"));
    if(!discussions) discussions=[];
    return discussions.map((item) => {
      return <DiscussionPost data={item} />;
    });
  };

  render() {
    return (
      <div className="discussion-container">
        {this.state.loaddiscussion?this.getDiscussions():null}
        <Newmessage {...this.props} />
        {/* <div className="discussion-inp-container">
          <input type="text" className="discussion-inp" />
          <button className="discussion-post-btn">Post</button>
        </div> */}
      </div>
    );
  }
}

export default Discussion;
