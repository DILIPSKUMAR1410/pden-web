import React from 'react'
import './Sidemenu.css'

class Sidemenu extends React.Component{
    render(){
        return(
            <div className="sidemenu">
                {(this.props.component!=="Feed" || this.props.search || this.props.selectperson)? <a href="/feed">Feed</a>:null }
                {(this.props.component!=="Mybook" || this.props.search || this.props.selectperson)? <a href="/mybook">My Book</a>:null }
                {(this.props.component!=="Shelf" || this.props.search || this.props.selectperson)? <a href="/shelf">Shelf</a>:null }
                {(this.props.component!=="Invite" || this.props.search || this.props.selectperson)? <a href="/invite">Invite</a>:null }
                {(this.props.component!=="Help" || this.props.search || this.props.selectperson)? <a href="/help">Help</a>:null }
            </div>
        )
    }
}
export default Sidemenu;