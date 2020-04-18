import React from 'react'
import './Feed.css'
import Header from './Header/Header'
import Feedcontent from './Feedcontent/Feedcontent'
import Newfeed from './NewFeed/Newfeed'
import Sidemenu from './Sidemenu/Sidemenu'
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
                <Header menuon={this.state.menuon} callMenu={this.callMenu}/>
                <div className="hrow">
                    <div className="hcol1">
                        <Sidemenu />
                    </div>
                    <div className="hcol2">
                        <Newfeed load={this.setload} />
                        <Feedcontent load={this.setload} />
                    </div>
                </div>
                {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
            </div>
        )
    }
}
export default Feed;