import React from 'react'
import './Feedcontent.css'
import {
    UserSession,
    AppConfig
} from 'blockstack';
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadfeed: false };
    }
    //Fetching and Storing the tweets in localstorage
    componentDidMount() {
        const options = { decrypt: false }
        this.props.load();
        userSession.getFile('Demofeed.json', options)
            .then((file) => {
                var temp = JSON.parse(file || '[]')
                localStorage.setItem("Demofeed", JSON.stringify(temp));
            })
            .finally(() => {
                this.props.load();
                this.setState({ loadfeed: !this.state.loadfeed });
            })
    }
    //Rendering th tweets or feed
    renderFeedData = () => {
        var Feed = [];
        if (localStorage.getItem("Demofeed") && localStorage.getItem("Demofeed")!='[]') {
            Feed = JSON.parse(localStorage.getItem("Demofeed"));
            return Feed.map((tweet, index) => {
                return (
                    <div className="feedcard">
                        <div className="User"><span className={userSession.loadUserData().username===JSON.parse(tweet).user? "yellow":"normal"}>@{JSON.parse(tweet).user}</span>{JSON.parse(tweet).date}</div>
                        <div className="Content">{JSON.parse(tweet).post}</div>
                        <div className="reaction" onContextMenu={e=>e.preventDefault()}>
                            <span><img src={require('../../../Assets/Icons/comments.png')}/></span>
                            <span><img src={require('../../../Assets/Icons/spread.png')}/></span>
                            <span><img src={require('../../../Assets/Icons/bookmark.png')}/></span>
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