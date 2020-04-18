import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Landingpage from './Components/Landingpage/Landingpage'
import Feed from './Components/Feed/Feed'
import PublicRoute from './Route/Publicroute';
import PrivateRoute from './Route/Privateroute';
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
    <Switch>
      <PublicRoute  component={Landingpage} path="/" exact />
      <PrivateRoute  component={Feed} path={`${process.env.PUBLIC_URL}/feed`} exact />
    </Switch>
  </BrowserRouter>
    );
  }
}

export default App;