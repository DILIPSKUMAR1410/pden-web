import React from 'react'
import './Home.css'
import Header from './Header/Header'
import Feedcontent from './Feed/Feedcontent/Feedcontent'
import Newfeed from './Feed/NewFeed/Newfeed'
import Sidemenu from './Sidemenu/Sidemenu'
import Mybook from './Mybook/Mybook'
import Shelf from './Shelf/Shelf'
import Invite from './Invite/Invite'
import Help from './Help/Help'
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            menuon:false
        }
    }
    callMenu=()=>{
        this.setState({menuon:!this.state.menuon});
    }
    setload = () => {
        this.setState({ loading: !this.state.loading });
    }
    reset=()=>{
        if(this.state.menuon)this.setState({menuon:false});
    }
    render() {
        return (
            <div className="homecontainer" onClick={this.reset}>
                <Header {...this.props} menuon={this.state.menuon} callMenu={this.callMenu}/>
                <div className="hrow">
                    <div className="hcol1">
                        <Sidemenu {...this.props}/>
                    </div>
                    <div className="hcol2">
                        {this.props.component==="Feed"?
                        <div>
                        <Newfeed load={this.setload} />
                        <Feedcontent load={this.setload} />
                        </div>:
                        this.props.component==="Mybook"?
                        <Mybook/>:
                        this.props.component==="Shelf"?
                        <Shelf/>:
                        this.props.component==="Invite"?
                        <Invite/>:
                        <Help/>
                        }
                    </div>
                </div>
                {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
            </div>
        )
    }
}
export default Feed;