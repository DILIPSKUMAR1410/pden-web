import React from 'react'
import './Header.css'
class Header extends React.Component{
render(){
    return(
        <div class="headerland1">
            <img onClick={this.props.gohome} src={require("../../Assets/Images/box.png")}/>
                <p className="id">Sandy.id</p>
        </div>
    )
}
}
export default Header;