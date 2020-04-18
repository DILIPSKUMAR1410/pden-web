import React from 'react'
import './Sidemenu.css'

class Sidemenu extends React.Component{
    render(){
        return(
            <div className="sidemenu">
                <p>My Book</p>
                <p>Shelf</p>
                <p>Search</p>
                <p>Invite</p>
                <p>Help</p>
            </div>
        )
    }
}
export default Sidemenu;