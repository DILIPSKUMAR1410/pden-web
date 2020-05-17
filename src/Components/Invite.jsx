import React from 'react'
import './Invite.css'
class Invite extends React.Component {
    myFunction = e => {
        var message=document.getElementById("message");
        message.className="message";
        var text = "Hey, I am using Pden decentralized social media built on blockchain. It has awesome features and complete data privacy. Check it out today.";
        navigator.clipboard.writeText(text);
        setTimeout(function(){
            document.getElementById("message").className = "hidden";
        }, 4000);
    }
    render() {
        return (
            <div id="invite">
                <div className="invitecard">
                    <span>Hey, I am using <span className="pden">Pden</span> decentralized social
                    media built on blockchain. It has awesome
                    features and complete data privacy. Check it
                    out today.</span>
                    <button onClick={this.myFunction}>Share</button>
                    <span id="message" className="hidden">Copied to clipboard!</span>
                </div>
            </div>
        )
    }
}
export default Invite;