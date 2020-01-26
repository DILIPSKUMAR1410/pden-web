import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Emoji from "react-emoji-render"; 
import './Editor.css'
import {
    UserSession,
    AppConfig
  } from 'blockstack';
  const options = { encrypt: false };
  const appConfig = new AppConfig()
  const userSession = new UserSession({ appConfig: appConfig })
class Editor extends React.Component{
    constructor(props){
      super(props);
      this.printValue=this.printValue.bind(this);
      this.setValue=this.setValue.bind(this);
      this.showmood=this.showmood.bind(this);
      this.selectem=this.selectem.bind(this);
      this.trigger=this.trigger.bind(this);
      this.date=this.date.bind(this);
      this.setTitle=this.setTitle.bind(this);
      this.setColor=this.setColor.bind(this); 
      this.state={
            title:'',
            text: '',
            date:'',
            color:'#ffffff',
            mood:"❤️",
            showemoji:false, 
            showtrigger:false,
            trigger:''
        };
    }
    printValue(){
        var temp=[];
        if (localStorage.getItem("Journal") != null)
        {
            temp=JSON.parse(localStorage.getItem("Journal"));
        }
        temp.push(JSON.stringify(this.state));
        userSession
        .putFile("Journal.json", JSON.stringify(temp), options)
        .then(() => {
            localStorage.setItem("Journal", JSON.stringify(temp));
            this.props.golist();
        });
    }
    setTitle({target}){
        this.setState({title: target.value});
    }
    setValue(content){
      this.setState({text : content});
    }
    showmood(){
        if(!this.state.showemoji)
        this.setState({showemoji: true})
    }
    selectem({target}){
        this.setState({mood: target.textContent});
        this.setState({showemoji:false});
        // console.log(this.state.mood);
    }
    trigger({target}){
        if (target.id=="tri")
        this.setState({trigger:target.value});
        else
        {
            if(this.state.showtrigger)
                this.setState({showtrigger:false});
            else
                this.setState({showtrigger:true});
        }
    }
    date(){
        var tempDate = new Date();
        var date = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' +tempDate.getFullYear();
        this.setState({date : date}, this.printValue);
        // console.log(date);
    }
    setColor({target}){
        this.setState({color: target.value});
    }

    render(){
        const Style={
            backgroundColor: this.state.color,
        }
    return (
    <div  class="row1">
        <div className="menu" >
            <div className="menuleft" >
                <div onClick={this.showmood} className={this.state.showemoji? "hideem":"showem"}>
                    <p>What is your mood?</p>
                    <p>{this.state.mood}</p>
                </div>
                <div class={this.state.showemoji? "showem":"hideem"}>
                    <p>What is your mood?</p>
                    <div class="emoji">
                        <p><Emoji  text=":smile:" onClick={this.selectem}/></p>
                        <p><Emoji  text=":cry:" onClick={this.selectem}/></p>
                        <p><Emoji  text=":angry:" onClick={this.selectem}/></p>
                        <p><Emoji  text="❤️" onClick={this.selectem}/></p>
                        <p><Emoji  text=":unamused:" onClick={this.selectem}/></p>
                        <p><Emoji  text=":confused:" onClick={this.selectem}/></p>
                        <p><Emoji  text=":open_mouth:" onClick={this.selectem}/></p>
                        <p><Emoji  text=":sunglasses:" onClick={this.selectem}/></p>
                    </div>
                </div>
                <br/>
                <p>Pick your Color:</p>
                <input type="color" value={this.state.color} onInput={this.setColor}/>
            </div>
            <div className="menuright">
                <p id="trigger" onClick={this.trigger}>Trigger</p>
                <textarea id="tri" className={this.state.showtrigger? "showem" : "hideem"} onChange={this.trigger}/>
                <p onClick={this.date}> Save Now</p>
            </div>
        </div>
        <div style={Style} className="editor">
            <input placeholder="Title of the journal" onChange={this.setTitle}/>
            <SunEditor width="71vw" minHeight="55vh" onChange={this.setValue}/>
        </div>
    </div>
  );
}
};
export default Editor;