import React from 'react'
import './Mybook.css'
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
    //Rendering th tweets or feed
    renderFeedData = () => {
        var Feed = [];
        if (localStorage.getItem("Demofeed") && localStorage.getItem("Demofeed")!='[]') {
            Feed = JSON.parse(localStorage.getItem("Demofeed"));
            return Feed.map((tweet, index) => {
                return (
                    <div className="feedcard">
                        <div className="User"><span>@{JSON.parse(tweet).user}</span>{JSON.parse(tweet).date}</div>
                        <div className="Content">{JSON.parse(tweet).post}</div>
                        <div className="reaction" onContextMenu={e=>e.preventDefault()}>
                            <span><img src={require('../../../Assets/Icons/comments.png')}/></span>
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