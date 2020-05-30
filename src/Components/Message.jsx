import React from "react";
import "./Message.css";
import { Message } from "../Models";
import { getConfig } from "radiks";
import { Form, TextArea } from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
      const user = JSON.parse(localStorage.getItem("Mydetails"));
      //Fetching date
      const date = new Date();
      const message = new Message({
        postid: this.props.id,
        author: userSession.loadUserData().username,
        text: this.state.message,
        date: date,
      });
      message.save().finally(() => {
        Message.fetchList({
          postid: this.props.id,
        }).then((messages) => {
          this.props.setload();
          this.props.updateDiscussion(messages);
        });
      });
      document.getElementById("newmsg").value = "";
    }
  };
  render() {
    return (
      <div className="msgfeed">
        <Form className="msg-text">
          <TextArea
            placeholder='Type you Message here'
            id="newmsg"
            row={1}
            onChange={(e) => this.post(e)}
            maxLength="256"
          />
        </Form>
        <button type="submit" onClick={this.upload}>
        <FontAwesomeIcon icon={faPlus} cursor={"pointer"} />
        </button>
      </div>
    );
  }
}
export default Newmessage;
