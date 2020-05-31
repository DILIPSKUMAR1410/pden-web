import React, { Component } from "react";

import "./Searchbar.css";

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onSearch = (e) => {
    if (e.charCode === 13) {
      if (this.state.input) {
        var val = this.state.input.replace(/[-[\]/{}()*+?\\^$|]/g, "");
        // this.props.onSearch(val);
        window.location.href = `/search?q=${val}`;
      }
    }
  };

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
      <input
        className="search"
        name="search"
        placeholder="Search"
        onChange={this.onChange}
        onKeyPress={this.onSearch}
      />
    );
  }
}

export default Searchbar;
