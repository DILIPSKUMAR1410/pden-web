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
import Search from './Search/Search'
import Otherbook from './Otherbook/Otherbook'
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            menuon: false,
            search: false,
            selectperson: false,
            selectedname: '',
            searchvalue: ''
        }
    }
    callMenu = () => {
        this.setState({ menuon: !this.state.menuon });
    }
    setload = () => {
        this.setState({ loading: !this.state.loading });
    }
    reset = () => {
        if (this.state.menuon) this.setState({ menuon: false });
    }
    toggleSearch = searchvalue => {
        this.setState({ search: true });
        this.setState({selectperson:false});
        this.setState({ searchvalue: searchvalue });
    }
    onSelect = name => {
        this.setState({ search: false });
        this.setState({ selectperson: true });
        this.setState({ selectedname: name });
    }
    render() {
        return (
            <div className="homecontainer" onClick={this.reset}>
                <Header {...this.props} menuon={this.state.menuon} callMenu={this.callMenu}
                    toggleSearch={this.toggleSearch} search={this.state.search} 
                    onSelect={this.onSelect} selectedname={this.state.selectedname}/>
                <div className="hrow">
                    <div className="hcol1">
                        <Sidemenu {...this.props} toggleSearch={this.toggleSearch} search={this.state.search} selectperson={this.state.selectperson} />
                    </div>
                    <div className="hcol2">
                        {this.state.search ? <Search searchvalue={this.state.searchvalue} onSelect={this.onSelect} /> :
                        this.state.selectperson? <Otherbook selectedname={this.state.selectedname} />:
                            this.props.component === "Feed" ?
                                <div>
                                    <Newfeed load={this.setload} />
                                    <Feedcontent load={this.setload} />
                                </div> :
                                this.props.component === "Mybook" ? <Mybook load={this.setload}/> :
                                    this.props.component === "Shelf" ? <Shelf /> :
                                        this.props.component === "Invite" ? <Invite /> :
                                            <Help />
                        }
                    </div>
                </div>
                {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
            </div>
        )
    }
}
export default Feed;