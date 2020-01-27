import React from 'react'
import './Journal.css'
import Header from '../Header/Header'
import Editor from './Editor/Editor'
class Journal extends React.Component{
    constructor(props){
        super(props);
        this.gotolist=this.gotolist.bind(this);
        this.gotohome=this.gotohome.bind(this);
        this.toggeload=this.toggleload.bind(this);
        this.state={
            loading:false
        }
    }
    toggleload(){
        if(this.state.loading)
            this.setState({ loading: true });
        else
            this.setState({ loading: true });
    }
    gotolist(){
        this.props.history.push("/myjournals");
    }
    gotohome(){
        this.props.history.push("/");
    }
    render(){
        var toggleLoad=this.toggleload;
        return(
            <div>
                <Header  gohome={this.gotohome}/>
                <Editor  golist={this.gotolist}  toggleLoad={toggleLoad.bind(this)} loading={this.state.loading}/>
            </div>
        )
    }
}
export default Journal;