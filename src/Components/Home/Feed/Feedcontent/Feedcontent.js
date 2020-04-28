import React from 'react'
import './Feedcontent.css'
import { User, getConfig } from 'radiks';
import Tweet from '../../../Landingpage/New'
const { userSession } = getConfig();
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadfeed: false };
    }
    //Fetching and Storing the tweets in localstorage
    componentDidMount() {
        this.props.load();
        Tweet.fetchList().then(tweets => {
            console.log(tweets);
            tweets=tweets.reverse();
            localStorage.setItem("Demofeed", JSON.stringify(tweets));
        })
            .finally(() => {
                this.props.load();
                this.setState({ loadfeed: !this.state.loadfeed });
            });
    }
    //Rendering th tweets or feed
    renderFeedData = () => {
        var Feed = [];
        if (localStorage.getItem("Demofeed") && localStorage.getItem("Demofeed") !== '[]') {
            Feed = JSON.parse(localStorage.getItem("Demofeed"));
            console.log(Feed);
            return Feed.map((tweet, index) => {
                return (
                    <div className="feedcard">
                        <div className="User"><span className={userSession.loadUserData().username === tweet.attrs.user ? "yellow" : "normal"}>@{tweet.attrs.user}</span>{tweet.attrs.date}</div>
                        <div className="Content">{tweet.attrs.tweet}</div>
                        <div className="reaction" onContextMenu={e => e.preventDefault()}>
                            <span><img src={require('../../../../Assets/Icons/comments.png')} alt="comment" /></span>
                            <span><img src={require('../../../../Assets/Icons/spread.png')} alt="spread" /></span>
                            <span><img src={require('../../../../Assets/Icons/bookmark.png')} alt="bookmark" /></span>
                        </div>
                    </div>
                )
            });
        }
        else return (
            <div className="nofeed">No Feeds Yet!!</div>
        )

    }
    render() {
        return (
            <div className="feed">
                {this.props.loadfeed ? this.renderFeedData() : this.renderFeedData()}
            </div>
        )
    }
}
export default Feed;

