import React from 'react'
import './Sidemenu.css'

class Sidemenu extends React.Component{
    render(){
        return(
            <div className="sidemenu">
                {this.props.component==="Feed"? null:<a href="/feed">Feed</a> }
                {this.props.component==="Mybook"? null:<a href="/mybook">My Book</a> }
                {this.props.component==="Shelf"? null:<a href="/shelf">Shelf</a> }
                {this.props.component==="Invite"? null:<a href="/invite">Invite</a> }
                {this.props.component==="Help"? null:<a href="/help">Help</a> }
            </div>
        )
    }
}
export default Sidemenu;