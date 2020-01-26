import React from 'react'
import Header from "../Header/Header"
import './Newjournal.css'
class Newjournal extends React.Component{
    constructor(props){
        super(props);
        this.gotojournal=this.gotojournal.bind(this);
        this.gotohome=this.gotohome.bind(this);

    }
    gotojournal(){
        this.props.history.push("/journal");
    }
    gotohome(){
        this.props.history.push("/");
    }
    render(){
        return(
            <div>
                <Header gohome={this.gotohome}/>
                <div class="new">
                    <button onClick={this.gotojournal}>New Journal</button>
                </div>
            </div>
        )
    }
}
export default Newjournal;