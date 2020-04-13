import React from 'react'
import './Home.css'
import Feed from '../Feed/Feed'
import Newfeed from '../NewFeed/Newfeed'
class Home extends React.Component {
constructor(props){
    super(props);
    this.state={
        loading:false
    }
}
setload=()=>{
    this.setState({loading:!this.state.loading});
}
    render() {
        return (
            <div>
            <div className="hrow">
                <div className="hcol1"></div>
                <div className="hcol2">
                    <Newfeed load={this.setload}/>
                    <Feed load={this.setload}/>
                </div>
                <div className="hcol3"></div>
            </div>
            {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
            </div>
        )
    }
}
export default Home;