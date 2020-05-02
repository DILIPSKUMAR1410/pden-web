import React from "react";
import "./Newfeed.css";
import { getConfig } from "radiks";
import { Thought } from "../../../../Models";
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
      const user = JSON.parse(localStorage.getItem("Mydetails"));
      //Fetching date
      const date = new Date();
      const thought = new Thought({
        author: user[0],
        text: this.state.post,
        date: date,
      });
      thought.save().finally(() => {
        Thought.fetchList().then(thoughts => {
          this.props.setload();
          this.props.updateFeed(thoughts.reverse());
        });
        document.getElementById("newfeed").value = "";
      });
    }
  };
  render() {
    return (
      <div class="newfeed">
        <textarea
          id="newfeed"
          rows="5"
          cols="50"
          onChange={(e) => this.post(e)}
          maxLength="256"
        />
        <button type="submit" onClick={this.upload}>
          Ready to Post
        </button>
      </div>
    );
  }
}
export default Newfeed;
