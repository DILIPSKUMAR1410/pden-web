import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Landingpage from "./Components/Landingpage";
import Search from "./Components/Search";
import PublicRoute from "./Route/Publicroute";
import PrivateRoute from "./Route/Privateroute";
import Profile from "./Components/Profile";

import "./App.css";

class App extends React.Component {
  state = {
    currentPage: "feed",
  };
  // getCurrentPage = () => {
  //   const url = window.location.pathname.slice(1);
  //   if (
  //     url === "feed" ||
  //     url === "shelf" ||
  //     url === "mybook" ||
  //     url === "invite"
  //   ) {
  //     this.setState({ currentPage: url });
  //     return;
  //   }

  //   this.setState({ currentPage: "" });
  // };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute component={Landingpage} path="/" exact />
          <PublicRoute component={Search} path="/search" exact />
          <PublicRoute component={Profile} path="/user/:uid" />
          <PrivateRoute
            component="Feed"
            path={`${process.env.PUBLIC_URL}/feed`}
            exact
          />
          <PrivateRoute
            component="Mybook"
            path={`${process.env.PUBLIC_URL}/mybook`}
            exact
          />
          <PrivateRoute
            component="Shelf"
            path={`${process.env.PUBLIC_URL}/shelf`}
            exact
          />
          <PrivateRoute
            component="Invite"
            path={`${process.env.PUBLIC_URL}/invite`}
            exact
          />
          <PrivateRoute
            component="Help"
            path={`${process.env.PUBLIC_URL}/help`}
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
