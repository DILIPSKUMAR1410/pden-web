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
      console.log(this.state.input);

      if (this.state.input) {
        var val = this.state.input.replace(/[-[\]/{}()*+?\\^$|]/g, "");
        console.log(val);

        window.location.href = "#search";
        this.props.toggleSearch(val);
        this.setState({ suggestion: false });
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
        onChange={this.onChange}
        onKeyPress={this.onSearch}
      />
    );
  }
}

export default Searchbar;
