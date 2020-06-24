import React, { Component } from "react";
import "./Post.css";
import { Spread, Thought } from "../../Models"
import discuss from "../../Assets/Icons/discussion.png";
import share from "../../Assets/Icons/share.png";
import spread from "../../Assets/Icons/spread.png";
import alreadyspread from "../../Assets/Icons/already-spread.png";
import { getConfig } from "radiks"
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
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
      share:false,
      menuon:false
    }
    this.fetchData = this.fetchData.bind(this);
  }

  async componentDidMount() {
    this.fetchData();
    document.addEventListener('click', this.toggleShare);
  }

  toggleShare=()=>{
    // console.log(this.state.menuon, this.state)
    if(this.state.share && this.state.menuon){
      this.setState({share:false, menuon:false});
    }
    else if(this.state.menuon){
      this.setState({share:true});
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.fetchData();
    }
  }

  async fetchData() {
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
          {this.state.share?
          <div className="share-menu">
            <FacebookShareButton
              quote={"See the thought \"" + this.state.text + "\" by " + this.state.owner}
              url="pden.xyz"
            >
              <FacebookIcon size={25} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton
              title={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <LinkedinIcon size={25} round={true} />
            </LinkedinShareButton>
            <RedditShareButton
              title={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <RedditIcon size={25} round={true} />
            </RedditShareButton>
            <TelegramShareButton
              title={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <TelegramIcon size={25} round={true} />
            </TelegramShareButton>
            <TwitterShareButton
              title={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <TwitterIcon size={25} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              title={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <WhatsappIcon size={25} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
              subject="Pden Thought"
              body={"See the thought \"" + this.state.text + "\" by " + this.state.owner + "\n"}
              url="pden.xyz"
            >
              <EmailIcon size={25} round={true} />
            </EmailShareButton>
          </div>:null}
          <button className="post-btn" >
            <img src={share} onClick={()=>this.setState({menuon:true})}/>
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
