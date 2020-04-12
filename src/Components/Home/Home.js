import React from 'react'
import './Home.css'
import Feed from '../Feed/Feed'
import Newfeed from '../NewFeed/Newfeed'
class Home extends React.Component {
    render() {
        return (
            <div className="hrow">
                <div className="hcol1"></div>
                <div className="hcol2">
                    <Newfeed/>
                    <Feed />
                </div>
                <div className="hcol3"></div>
            </div>
        )
    }
}
export default Home;