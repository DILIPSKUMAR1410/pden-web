import React, { Component } from "react";
import "./Post.css";
import { Spread, Thought } from "../../Models"
import discuss from "../../Assets/Icons/discussion.png";
import share from "../../Assets/Icons/share.png";
import spread from "../../Assets/Icons/spread.png";
import alreadyspread from "../../Assets/Icons/already-spread.png";
import { getConfig } from "radiks"
const { userSession } = getConfig()
class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spread: false,
      text: '',
      owner: '',
      spreadauthor: '',
      date: '',
      spread_date: '',
    }
  }

  async componentDidMount() {
    if (this.props.data.attrs.postid) {
      const thought = await Thought.findById(this.props.data.attrs.postid);
      const spread = await Spread.fetchOwnList({
        postid: this.props.data.attrs.postid,
      });
      if (this.props.data.attrs.author === userSession.loadUserData().username || spread.length > 0)
        this.setState({ spread: true });
      this.setState({
        text: thought.attrs.text,
        owner: thought.attrs.author,
        date: new Date(thought.attrs.date).toDateString(),
        spreadauthor: this.props.data.attrs.spreadauthor,
        spread_date: new Date(this.props.data.attrs.date).toDateString()
      });
    }
    else {
      const spread = await Spread.fetchOwnList({
        postid: this.props.data._id
      });
      if (this.props.data.attrs.author === userSession.loadUserData().username || spread.length > 0)
        this.setState({ spread: true });
      this.setState({
        text: this.props.data.attrs.text,
        owner: this.props.data.attrs.author,
        date: new Date(this.props.data.attrs.date).toDateString(),
      });
    }

  }

  show = () => {
    if (this.props.data.attrs.postid)
      this.props.showDiscuss(this.props.data.attrs.postid);
    else
      this.props.showDiscuss(this.props.data._id);
  };

  spread = () => {
    if (!this.state.spread && this.state.owner !== userSession.loadUserData().username) {
      const date = new Date();
      var id = this.props.data._id;
      if (this.props.data.attrs.postid)
        id = this.props.data.attrs.postid;
      const spread = new Spread({
        spreadauthor: userSession.loadUserData().username,
        postid: id,
        date: date,
      });
      spread.save().then(() => {
        this.setState({ spread: true });
      })
    }
  }

  render() {
    return (
      <div className="post-container" id={this.props.data.attrs.postid ? this.props.data.attrs.postid : this.props.data.id}>
        <div>
          <h3 className="post-text">{this.state.text}</h3>
          <strong>
            <span className="post-author">{this.state.owner}</span>
            <span className="post-date">
              {this.state.date}
            </span>
          </strong>
          <br />
          {this.state.spreadauthor ?
            <span>
              <span className="post-author">{this.state.spreadauthor} spread it on </span>
              <span className="post-date">
                {this.state.spread_date}
              </span>
            </span> : null}
        </div>
        <div className="post-btn-group">
          <button className="post-btn" onClick={this.show}>
            <img src={discuss} />
          </button>
          <button className={this.state.spread ? "post-btn-active" : "post-btn"} onClick={this.spread}>
            <img src={this.state.spread ? alreadyspread : spread} />
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
