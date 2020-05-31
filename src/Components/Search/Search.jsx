import React, { Component } from "react";
import { parse } from "query-string";
import fetch from "isomorphic-fetch";
import { Spinner, Sidebar, UserList } from "..";
import "./Search.css";

class Search extends Component {
  state = {
    results: [],
    loading: true,
    logoutmenu: false,
  };

  // onSearch = (val) => {
  //   window.location.href = `/search?q=${val}`;
  // };
  changePage = (page) => {
    this.props.history.push("/" + page);
  }
  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };
  toggleLogoutMenu = () => {
    this.setState({ logoutmenu: !this.state.logoutmenu });
  };
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const target = parse(this.props.location.search).q;
    try {
      var response = await fetch(
        `https://core.blockstack.org/v1/search?query=${target}`
      );
      var data = await response.json();
      const results = data.results;
      this.setState({
        results: results,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      return <div>No Users Found!</div>;
    }
  }

  render() {
    return (
      <div className="home-container">
        <Sidebar onSearch={this.onSearch}
          toggleLogoutMenu={this.toggleLogoutMenu}
          logoutmenu={this.state.logoutmenu}
          changePage={this.changePage}
          />
        <div className="search-results-container">
          <h2 className="search-title">
            Search Results for "{parse(this.props.location.search).q}"
          </h2>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <UserList list={this.state.results} />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
