import React from "react";
import "./Message.css";
import { getConfig } from "radiks";
import { Message } from "../../../../Models";
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
      const user = JSON.parse(localStorage.getItem("Mydetails"));
      //Fetching date
      const date = new Date();
      const message = new Message({
        postid: this.props.id,
        author: user[0],
        text: this.state.message,
        date: date,
      });
      message.save().finally(() => {
        window.location.reload(true);
      });
    }
  };
  render() {
    return (
      <div class="newfeed">
        <textarea
          rows="3"
          cols="50"
          onChange={(e) => this.post(e)}
          maxLength="256"
        />
        <button type="submit" onClick={this.upload}>
          Post
        </button>
      </div>
    );
  }
}
export default Newmessage;
