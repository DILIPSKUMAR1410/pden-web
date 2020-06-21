import React from "react";
import "./Message.css";
import { Thought, Message } from "../../Models";
import { getConfig } from "radiks";
import sendIcon from "../../Assets/Icons/send.png";
import { Form } from "semantic-ui-react";
const { userSession } = getConfig();
class Newmessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  //creating a tweet
  post = (e) => {
    this.setState({ message: e.target.value });
  };
  //uploading the post
  upload = () => {
    if (this.state.message) {
      this.props.setload();
      //Fetching date
      const date = new Date();
      const message = new Message({
        postid: this.props.id,
        author: userSession.loadUserData().username,
        text: this.state.message,
        date: date,
      });
      message.save()
        .then(res => {
          Thought.findById(this.props.id).then(post => {
            if (post.attrs.author === userSession.loadUserData().username) {
              var temp = post.attrs.messages;
              temp.push(res._id)
              const value = {
                messages: temp
              }
              post.update(value);
              post.save().finally(()=>{
                this.props.setload();
                this.props.updateDiscussion();
              })
            }
            else{
              this.props.setload();
              this.props.updateDiscussion();
            }
          })
        });
      document.getElementById("newmsg").value = "";
    }
  };
  render() {
    return (
      <div className="msgfeed">
        <Form className="msg-text">
          <input
            placeholder="Type you Message here"
            id="newmsg"
            row={1}
            onChange={(e) => this.post(e)}
            maxLength="256"
          />
        </Form>
        <button type="submit" onClick={this.upload}>
          <img src={sendIcon} className="send-icon" />
        </button>
      </div>
    );
  }
}
export default Newmessage;
