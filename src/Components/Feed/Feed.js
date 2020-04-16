import React from 'react'
import './Feed.css'
import {
    UserSession,
    AppConfig
} from 'blockstack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply } from "@fortawesome/free-solid-svg-icons";
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadtable: false };
    }
    //Fetching and Storing the tweets in localstorage
    componentDidMount() {
        const options = { decrypt: false }
        userSession.getFile('Demo.json', options)
            .then((file) => {
                this.props.load();
                var temp = JSON.parse(file || '[]')
                localStorage.setItem("Demo", JSON.stringify(temp));
            })
            .finally(() => {
                this.props.load();
                this.setState({ loadtable: !this.state.loadtable });
            })
    }
    //Rendering th tweets or feed
    renderTableData = () => {
        var journaldetails = [];
        if (localStorage.getItem("Demo")!=[]) {
            journaldetails = JSON.parse(localStorage.getItem("Demo"));
            return journaldetails.map((a, index) => {
                var v = '';
                for (var i = 0; JSON.parse(a).user[i] != '.'; i++)
                    v = v + JSON.parse(a).user[i];
                return (
                    <div className="feedcard">
                        <div className="User">{v}</div>
                        <div className="Content">{JSON.parse(a).post}</div>
                        <div className="reaction">
                            <span><FontAwesomeIcon icon={faThumbsUp} /></span>
                            <span><FontAwesomeIcon icon={faReply} /> </span>
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
                {this.state.loadtable ? this.renderTableData() : this.renderTableData()}
            </div>
        )
    }
}
export default Feed;