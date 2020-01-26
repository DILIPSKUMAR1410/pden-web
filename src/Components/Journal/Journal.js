import React from 'react'
import './Journal.css'
import Header from '../Header/Header'
import Editor from './Editor/Editor'
class Journal extends React.Component{
    constructor(props){
        super(props);
        this.gotolist=this.gotolist.bind(this);
        this.gotohome=this.gotohome.bind(this);

    }
    gotolist(){
        this.props.history.push("/myjournals");
    }
    gotohome(){
        this.props.history.push("/");
    }
    render(){
        return(
            <div>
                <Header  gohome={this.gotohome}/>
                <Editor golist={this.gotolist}/>
            </div>
        )
    }
}
export default Journal;