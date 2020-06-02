import React, { Component } from "react";
import { Spinner, Discussion, Feed, Sidebar, MyBook, Shelf } from "..";
import "./Home.css";

class Home extends Component {
  state = {
    showDiscuss: false,
    postid: "",
    loading: false,
    logoutmenu: false,
  };

  toggleLogoutMenu = () => {
    this.setState({ logoutmenu: !this.state.logoutmenu });
  };

  showDiscuss = (post) => {
    this.setState({
      showDiscuss: !this.state.showDiscuss,
      postid: post,
    });
  };

  setload = () => {
    this.setState({ loading: !this.state.loading });
  };

  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };

  changePage = (page) => {
    this.props.history.push("/" + page);
  }

  render() {
    return (
      <div className="home-container">
        <Sidebar
          currentPage=""
          onSearch={this.onSearch}
          toggleLogoutMenu={this.toggleLogoutMenu}
          logoutmenu={this.state.logoutmenu}
          changePage={this.changePage}
        />
        <div onClick={() => this.setState({ logoutmenu: false })}>
          {window.location.pathname.slice(1) == "feed" ?
            <Feed showDiscuss={this.showDiscuss} setload={this.setload} /> :
            window.location.pathname.slice(1) == "mybook" ?
              <MyBook showDiscuss={this.showDiscuss} setload={this.setload} /> :
              <Shelf />}
          {this.state.showDiscuss ? (
            <Discussion id={this.state.postid} setload={this.setload} showDiscuss={this.showDiscuss}/>
          ) : null}
          {this.state.loading ? <Spinner /> : null}
        </div>
      </div>
    );
  }
}

export default Home;
