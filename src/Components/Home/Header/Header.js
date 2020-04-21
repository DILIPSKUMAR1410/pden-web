import React from 'react'
import './Header.css'
import {
    UserSession,
    AppConfig,
} from 'blockstack';
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
var ID = ["suresh.id.blockstack", "aswin.id.blockstack", "somebody.id.blockstack", "somebodyelse.id.blockstack",
    "Dilip.id.blockstack", "Vishnu.id.blockstack", "Senpai.id.blockstack", "youknowwho.id.blockstack", "trump.id.blockstack",
    "harry.id.blockstack", "putin.id.blockstack"];
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionlist: [],
            searchvalue: '',
            suggestion: false,
            borrow: false
        }
    }
    handleSignOut = e => {
        e.preventDefault();
        localStorage.removeItem("Demofeed");
        userSession.signUserOut(window.location.origin);
        window.location.reload(true);
    }
    suggest = e => {
        if (!this.state.suggestion)
            this.setState({ suggestion: true });
        else if (e.target.value === '')
            this.setState({ suggestion: false });
        var search = [];
        var val = e.target.value;
        val = val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "");
        for (var i = 0; i < ID.length; i++) {
            if (ID[i].search(val) === 0)
                search.push(ID[i]);
        }
        this.setState({ suggestionlist: search, searchvalue: e.target.value });
    }
    onSearch = e => {
        if (e.target.id === "search") {
            if (e.key === 'Enter') {
                if (this.state.searchvalue) {
                    var val = this.state.searchvalue;
                    val = val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "");
                    window.location.href = "#seach";
                    this.props.toggleSearch(val);
                    this.setState({ suggestion: false });
                }
            }
        }
        else {
            window.location.href = "#seach";
            var val = this.state.searchvalue;
            val = val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "");
            this.setState({ suggestion: false });
            this.props.toggleSearch(val);
        }

    }
    onSelected = e => {
        this.setState({ suggestion: false });
        document.getElementById("search").value='';
        this.props.onSelect(e.target.id);
    }
    renderSuggestions = () => {
        return this.state.suggestionlist.map((person) => {
            return (
                <div id={person} onClick={this.onSelected}>{person}</div>
            )
        });
    }
    borrow = () => {
        this.setState({ borrow: true });
        document.getElementById("borrow").className = "borrow";
        setTimeout(function () {
            document.getElementById("borrow").className = "hidden";
        }, 4000);
    }
    name = () => {
        var name = '';
        for (var i = 0; this.props.selectedname[i] != '.'; i++)
            name = name + this.props.selectedname[i];
        return name;
    }
    render() {
        return (
            <div class="headerland1">
                {this.props.search ? <p className="logoh">Search</p> :
                    this.props.selectedname ? <div className="searchimg"></div> :
                        this.props.component === "Feed" ? <p className="logoh">Feed</p> :
                            this.props.component === "Mybook" ? <p className="logoh">My Book</p> :
                                this.props.component === "Shelf" ? <p className="logoh">Shelf</p> :
                                    this.props.component === "Invite" ? <p className="logoh">Invite</p> :
                                        this.props.component === "Help" ? <p className="logoh">Help</p> : null}
                <div className="searchcontainer">
                    <input id="search" placeholder="Search your friends here" onChange={this.suggest} onKeyPress={this.onSearch} />
                    {this.state.suggestion ?
                        <div className="suggestion">
                            {this.renderSuggestions()}
                            <span onClick={this.onSearch}>Search for more people...</span>
                        </div> : null}
                </div>
                {!this.props.selectedname ?
                    <div className="id">
                        <p>{userSession.loadUserData().username}</p>
                        <div className="hmenu" onClick={this.props.callMenu}></div>
                        <div className={this.props.menuon ? "hmenucontent" : "hmenuhide"}>
                            <span>Night Mode</span>
                            <span onClick={e => this.handleSignOut(e)}>Logout</span>
                        </div>
                    </div> :
                    <div className="otherid">
                        <span>{this.props.selectedname}</span>
                        <div>
                            {!this.state.borrow?<button onClick={this.borrow}>Borrow</button>:null}
                            <span id="borrow" className="hidden">You have borrowed {this.name()}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Header;