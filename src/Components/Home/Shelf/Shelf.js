import React from 'react'
import './Shelf.css'
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
    //Rendering the tweets or feed
    renderFeedData = () => {
        var ID = ["suresh.id.blockstack","aswin.id.blockstack","somebody.id.blockstack","somebodyelse.id.blockstack",
        "Dilip.id.blockstack","Vishnu.id.blockstack","Senpai.id.blockstack","youknowwho.id.blockstack","trump.id.blockstack",
        "harry.id.blockstack","putin.id.blockstack"];
        localStorage.setItem("Demoid", JSON.stringify(ID));
        if (localStorage.getItem("Demoid") && localStorage.getItem("Demoid")!='[]') {
            ID = JSON.parse(localStorage.getItem("Demoid"));
            return ID.map((person, index) => {
                return (
                    <div className="person">
                        {person}
                    </div>
                )
            });
        }
        else return (
            <div className="noperson">No People Yet!!</div>
        )
    }
    render() {
        return (
            <div className="shelf">
                {this.props.loadfeed ? this.renderFeedData() : this.renderFeedData()}
            </div>
        )
    }
}
export default Feed;