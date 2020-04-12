import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Landingpage from './Components/Landingpage/Landingpage'
import Home from './Components/Home/Home'
import PublicRoute from './Route/Publicroute';
import PrivateRoute from './Route/Privateroute';
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
    <Switch>
      <PublicRoute  component={Landingpage} path="/" exact />
      <PrivateRoute  component={Home} path={`${process.env.PUBLIC_URL}/feed`} exact />
    </Switch>
  </BrowserRouter>
    );
  }
}

export default App;