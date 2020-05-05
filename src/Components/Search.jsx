import React, { Component } from "react";
import UserList from "./UserList";
import Sidebar from "./Sidebar";
import { parse } from "query-string";
import fetch from "isomorphic-fetch";
import Spinner from "./Spinner";
import "./Search.css";

class Search extends Component {
  state = {
    results: [],
    loading: true,
  };

  onSearch = (val) => {
    window.location.href = `/search?q=${val}`;
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
