import React from "react";
import "./Newfeed.css";
import { getConfig } from "radiks";
import { Tweet } from "../../../../Models";
const options = { encrypt: false };
const { userSession } = getConfig();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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
      this.props.load();
      const user=JSON.parse(localStorage.getItem("Mydetails"));
      //Fetching date
      const dateobj = new Date();
      var date = monthNames[dateobj.getMonth()] + " " + dateobj.getDate();
      const tweet = new Tweet({
        user: user[0],
        tweet: this.state.post,
        date: date,
      });
      tweet.save().finally(() => {
        this.props.load();
        window.location.reload(true);
      });
    }
  };
  render() {
    return (
      <div class="newfeed">
        <textarea
          rows="5"
          cols="50"
          onChange={(e) => this.post(e)}
          maxlength="256"
        />
        <button type="submit" onClick={this.upload}>
          Ready to Post
        </button>
      </div>
    );
  }
}
export default Newfeed;
