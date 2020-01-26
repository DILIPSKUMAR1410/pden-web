import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Myjournal from './Components/JournalList/Journallist'
import Editor from './Components/Journal/Journal'
import Landingpage from './Components/Landingpage/Landingpage'
import New from './Components/NewJournal/Newjournal'
import PublicRoute from './Route/Publicroute';
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
    <Switch>
      <PublicRoute  component={Landingpage} path="/" exact />
      <PublicRoute  component={New} path={`${process.env.PUBLIC_URL}/newjournal`} exact />
      <PublicRoute  component={Editor} path={`${process.env.PUBLIC_URL}/journal`} exact />
      <PublicRoute  component={Myjournal} path={`${process.env.PUBLIC_URL}/myjournals`} exact />
    </Switch>
  </BrowserRouter>
    );
  }
}

export default App;