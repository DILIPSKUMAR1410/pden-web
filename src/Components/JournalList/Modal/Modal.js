import React from 'react'
import './Modal.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class Modal extends React.Component{
    journaldetails=JSON.parse(JSON.parse(localStorage.getItem("Journal"))[this.props.Choice-1]);
    constructor(props)
    {
        super(props);
        this.state={
            title: this.journaldetails.title,
            mood: this.journaldetails.mood,
            text: this.journaldetails.text,
            trigger: this.journaldetails.trigger,
            date: this.journaldetails.date,
            color: this.journaldetails.color,
        }
    }
    render(){
        const Style={
            backgroundColor: this.state.color
        }
        return(
            <div className="modal">
                <div style={Style} class="details">
                    <div class="heading">
                        <p>{this.state.title}</p>
                        <p>{this.state.date}</p>
                    </div>
                    <p class="text">{ReactHtmlParser(this.state.text)}</p>
                    <div class="rest">
                        <p>Mood: {this.state.mood}</p>
                        <p>Trigger: {this.state.trigger}</p>
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Modal;