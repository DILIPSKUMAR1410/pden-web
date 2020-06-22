import Landing from "./Components/Landing/Landing";
import Privacy from "./Components/Landing/Privacy";
import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./Route/Publicroute";
import PrivateRoute from "./Route/Privateroute";
import { Search, Profile, Discussion, Spinner } from "./Components";
import { User, configure } from "radiks";
import { Person } from "./Models";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Connect } from '@blockstack/connect';
function App() {
  const [load, setLoad] = useState(false);
  function afterLogin(userSession) {
    if (userSession.isUserSignedIn()) {
      setLoad(true);
      User.createWithCurrentUser()
        .catch(error => {
          console.log(error);
        }).finally(() => {
          Person.fetchOwnList()
            .then((user) => {
              if (user.length === 0) {
                const me = new Person({
                  username: userSession.loadUserData().username,
                  followers: [],
                  following: [],
                });
                me.save().finally(() => {
                  localStorage.setItem("Mydetails", JSON.stringify(me));
                  setLoad(true);
                  window.location.pathname = "/feed";
                });
              } else {
                localStorage.setItem("Mydetails", JSON.stringify(user[0]));
                window.location.pathname = "/feed";
                setLoad(true);
              }
            })
        });
    }
  }
  const authOptions = {
    redirectTo: '/',
    finished: ({ userSession }) => {
      afterLogin(userSession);
      // console.log(userSession.loadUserData());
    },
    appDetails: {
      name: 'Pden',
      icon: 'https://pden.xyz/logo.png',
    },
  };
  return (
    <Connect authOptions={authOptions}>
      <BrowserRouter>
        <Switch>
          <PublicRoute component={Landing} path="/" exact />
          <PublicRoute component={Privacy} path="/privacy-policy" exact />
          <PublicRoute component={Search} path="/search" exact />
          <PublicRoute component={Profile} path="/user/:uid" />
          <PublicRoute component={Discussion} path="/discuss" />
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
      {load ? <Spinner /> : null}
    </Connect>
  );
}

export default App;
