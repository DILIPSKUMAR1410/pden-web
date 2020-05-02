import React, { Component } from "react";
import UserList from "./UserList";
import Sidebar from "./Sidebar";
import { parse } from "query-string";
import fetch from "isomorphic-fetch";

import "./Search.css";

class Search extends Component {
  state = {
    results: [],
  };

  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
  };

  async componentDidMount() {
    const target = parse(this.props.location.search).q;
    try {
      var response = await fetch(
        `https://core.blockstack.org/v1/search?query=${target}`
      );
      var data = await response.json();
      const results = data.results;
      this.setState({
        results: results,
      });
    } catch (e) {
      console.error(e);
      return <div>No Users Found!</div>;
    }
  }

  render() {
    return (
      <div className="home-container">
        <Sidebar currentPage="" onSearch={this.onSearch} />
        <div className="search-results-container">
          <h2 className="search-title">Search Results</h2>
          <UserList list={this.state.results} />
        </div>
      </div>
    );
  }
}

export default Search;
