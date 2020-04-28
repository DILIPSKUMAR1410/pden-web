import React from 'react'
import './Mybook.css'
import Tweet from '../../Landingpage/New'
class Mybook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadfeed: false };
    }
    componentDidMount() {
        this.props.load();
        Tweet.fetchOwnList().then(tweets => {
            console.log(tweets);
            tweets=tweets.reverse();
            localStorage.setItem("MyDemo", JSON.stringify(tweets));
        })
            .finally(() => {
                this.props.load();
                this.setState({ loadfeed: !this.state.loadfeed });
            });
    }
    //Rendering th tweets or feed
    renderFeedData = () => {
        var Feed = [];
        if (localStorage.getItem("MyDemo") && localStorage.getItem("MyDemo")!=='[]') {
            Feed = JSON.parse(localStorage.getItem("MyDemo"));
            return Feed.map((tweet, index) => {
                return (
                    <div className="feedcard">
                        <div className="User"><span>@{tweet.attrs.user}</span>{tweet.attrs.date}</div>
                        <div className="Content">{tweet.attrs.tweet}</div>
                        <div className="reaction" onContextMenu={e=>e.preventDefault()}>
                            <span><img src={require('../../../Assets/Icons/comments.png')} alt="comment"/></span>
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
export default Mybook;