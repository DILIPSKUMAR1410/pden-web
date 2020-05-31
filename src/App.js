import Landing from "./Components/Landing/Landing";
import Privacy from "./Components/Landing/Privacy";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./Route/Publicroute";
import PrivateRoute from "./Route/Privateroute";
import { Search, Profile} from "./Components";

import "semantic-ui-css/semantic.min.css";
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
          <PublicRoute component={Landing} path="/" exact />
          <PublicRoute component={Privacy} path="/privacy-policy" exact />
          <PublicRoute component={Search} path="/search" exact />
          <PublicRoute component={Profile} path="/user/:uid" />
          <PrivateRoute
            component="feed"
            path={`${process.env.PUBLIC_URL}/feed`}
            exact
          />
          <PrivateRoute
            component="mybook"
            path={`${process.env.PUBLIC_URL}/mybook`}
            exact
          />
          <PrivateRoute
            component="shelf"
            path={`${process.env.PUBLIC_URL}/shelf`}
            exact
          />
          <PrivateRoute
            component="invite"
            path={`${process.env.PUBLIC_URL}/invite`}
            exact
          />
          <PrivateRoute
            component="help"
            path={`${process.env.PUBLIC_URL}/help`}
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
