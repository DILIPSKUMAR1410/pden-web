import React from "react";
import "./Newfeed.css";
import { Thought } from "../../Models";
import { getConfig } from "radiks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import sendIcon from "../../Assets/Images/send.png";
import { Form, TextArea } from "semantic-ui-react";
const { userSession } = getConfig();
class Newfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
    };
  }

  //creating a tweet
  post = (e) => {
    this.setState({ post: e.target.value });
  };
  //uploading the post
  upload = () => {
    if (this.state.post) {
      this.props.setload();
      //Fetching date
      const date = new Date();
      const thought = new Thought({
        author: userSession.loadUserData().username,
        text: this.state.post,
        date: date,
      });
      thought.save().finally(() => {
        this.props.setload();
        this.props.updateFeed(thought);
        document.getElementById("newfeed").value = "";
      });
    }
  };
  render() {
    return (
      <div className="newfeed">
        {/* <textarea
          id="newfeed"
          rows="5"
          cols="50"
          onChange={(e) => this.post(e)}
          maxLength="256"
        /> */}
        <Form className="feed-text">
          <TextArea
            placeholder="Share you thoughts here..."
            id="newfeed"
            onChange={(e) => this.post(e)}
            maxLength="256"
          />
        </Form>
        <button type="submit" onClick={this.upload}>
          <img src={sendIcon} alt="Send" />

          {/* <FontAwesomeIcon icon={faPlus} cursor={"pointer"} /> */}
        </button>
      </div>
    );
  }
}
export default Newfeed;
