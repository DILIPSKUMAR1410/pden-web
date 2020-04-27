import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Landingpage from './Components/Landingpage/Landingpage'
import PublicRoute from './Route/Publicroute';
import PrivateRoute from './Route/Privateroute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute component={Landingpage} path="/" exact />
          <PrivateRoute component="Feed" path={`${process.env.PUBLIC_URL}/feed`} exact />
          <PrivateRoute component="Mybook" path={`${process.env.PUBLIC_URL}/mybook`} exact />
          <PrivateRoute component="Shelf" path={`${process.env.PUBLIC_URL}/shelf`} exact />
          <PrivateRoute component="Invite" path={`${process.env.PUBLIC_URL}/invite`} exact />
          <PrivateRoute component="Help" path={`${process.env.PUBLIC_URL}/help`} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;