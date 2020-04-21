import React from 'react'
import './Search.css'
// import {
//     UserSession,
//     AppConfig
// } from 'blockstack';
// const appConfig = new AppConfig()
// const userSession = new UserSession({ appConfig: appConfig })
var ID = ["suresh.id.blockstack","aswin.id.blockstack","somebody.id.blockstack","somebodyelse.id.blockstack",
        "Dilip.id.blockstack","Vishnu.id.blockstack","Senpai.id.blockstack","youknowwho.id.blockstack","trump.id.blockstack",
        "harry.id.blockstack","putin.id.blockstack","suresh1.id.blockstack","aswin1.id.blockstack","somebody1.id.blockstack","somebodyelse1.id.blockstack",
        "Dilip1.id.blockstack","Vishnu1.id.blockstack","Senpai1.id.blockstack","youknowwho1.id.blockstack","trump1.id.blockstack",
        "harry1.id.blockstack","putin1.id.blockstack","suresh2.id.blockstack","aswin2.id.blockstack","somebody2.id.blockstack","somebodyelse2.id.blockstack",
        "Dilip2.id.blockstack","Vishnu2.id.blockstack","Senpai2.id.blockstack","youknowwho2.id.blockstack","trump2.id.blockstack",
        "harry2.id.blockstack","putin2.id.blockstack"];
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadpeople: false };
    }
    //Rendering the tweets or feed
    renderPeopleData = () => {
        var search = [];
        for (var i = 0; i < ID.length; i++) {
            if (ID[i].search(this.props.searchvalue) === 0)
                search.push(ID[i]);
        }
        if (search.length>0) {
            return search.map((person, index) => {
                return (
                    <div className="person" id={person} onClick={this.onSelected}>
                        {person}
                    </div>
                )
            });
        }
        else return (
            <div className="noperson">No Person Found!!</div>
        )
    }
    onSelected=e=>{
        this.setState({ suggestion: false });
        document.getElementById("search").value='';
        this.props.onSelect(e.target.id);
    }
    render() {
        return (
            <div className="shelf">
                {this.props.loadpeople ? this.renderPeopleData() : this.renderPeopleData()}
            </div>
        )
    }
}
export default Search;