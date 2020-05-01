import React from "react";
import "./Header.css";
import { UserSession, AppConfig } from "blockstack";
import Searchbar from "../Searchbar/Searchbar";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionlist: [],
      searchvalue: "",
      suggestion: false,
      borrow: false,
    };
  }

  handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("Demofeed");
    userSession.signUserOut(window.location.origin);
    window.location.reload(true);
  };

  // suggest = (e) => {
  //   if (!this.state.suggestion) this.setState({ suggestion: true });
  //   else if (e.target.value === "") this.setState({ suggestion: false });
  //   var search = [];
  //   var val = e.target.value;
  //   val = val.replace(/[-[\]/{}()*+?\\^$|]/g, "");
  //   for (var i = 0; i < ID.length; i++) {
  //     if (ID[i].search(val) === 0) search.push(ID[i]);
  //   }
  //   this.setState({ suggestionlist: search, searchvalue: e.target.value });
  // };

  // onSearch = (e) => {
  //   if (e.keyCode === 13) {
  //     if (this.state.searchvalue) {
  //       var val = this.state.searchvalue;
  //       val = val.replace(/[-[\]/{}()*+?\\^$|]/g, "");
  //       console.log(val);

  //       window.location.href = "#search";
  //       this.props.toggleSearch(val);
  //       this.setState({ suggestion: false });
  //     }
  //   }
  // };

  onSelected = (e) => {
    this.setState({ suggestion: false });
    document.getElementById("search").value = "";
    this.props.onSelect(e.target.id);
  };

  // renderSuggestions = () => {
  //   return this.state.suggestionlist.map((person) => {
  //     return (
  //       <div id={person} onClick={this.onSelected}>
  //         {person}
  //       </div>
  //     );
  //   });
  // };

  borrow = () => {
    this.setState({ borrow: true });
    document.getElementById("borrow").className = "borrow";
    setTimeout(function () {
      document.getElementById("borrow").className = "hidden";
    }, 4000);
  };
  name = () => {
    var name = "";
    for (var i = 0; this.props.selectedname[i] != "."; i++)
      name = name + this.props.selectedname[i];
    return name;
  };

  getHeaderTitle = () => {
    return this.props.search ? (
      <p className="logoh">Search</p>
    ) : this.props.selectedname ? (
      <div className="searchimg"></div>
    ) : this.props.component === "Feed" ? (
      <p className="logoh">Feed</p>
    ) : this.props.component === "Mybook" ? (
      <p className="logoh">My Book</p>
    ) : this.props.component === "Shelf" ? (
      <p className="logoh">Shelf</p>
    ) : this.props.component === "Invite" ? (
      <p className="logoh">Invite</p>
    ) : this.props.component === "Help" ? (
      <p className="logoh">Help</p>
    ) : null;
  };

  render() {
    return (
      <div className="headerland1">
        {this.getHeaderTitle()}
        {/* <div className="searchcontainer">
          <input
            id="search"
            placeholder="Search your friends here"
            onChange={this.suggest}
            onKeyPress={this.onSearch}
          />
          {this.state.suggestion ? (
            <div className="suggestion">
              {this.renderSuggestions()}
              <span onClick={this.onSearch}>Search for more people...</span>
            </div>
          ) : null}
        </div> */}

        <Searchbar
          onSearch={this.onSearch}
          toggleSearch={this.props.toggleSearch}
        />

        {!this.props.selectedname ? (
          <div className="id">
            <p>{userSession.loadUserData().username}</p>
            <div className="hmenu" onClick={this.props.callMenu}></div>
            <div className={this.props.menuon ? "hmenucontent" : "hmenuhide"}>
              <span>Night Mode</span>
              <span onClick={(e) => this.handleSignOut(e)}>Logout</span>
            </div>
          </div>
        ) : (
          <div className="otherid">
            <span>{this.props.selectedname}</span>
            <div>
              {!this.state.borrow ? (
                <button onClick={this.borrow}>Borrow</button>
              ) : null}
              <span id="borrow" className="hidden">
                You have borrowed {this.name()}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Header;
