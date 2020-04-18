import React from 'react'
import './Newfeed.css'
import {
    UserSession,
    AppConfig,
} from 'blockstack';
const options = { encrypt: false };
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
class Newfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: userSession.loadUserData().username,
            date: '',
            post: '',
        }
    }
    //creating a tweet
    post = e => {
        this.setState({ post: e.target.value });
    }
    //uploading the post
    upload = () => {
        if (this.state.post) {
            //Fetching date
            const dateobj = new Date();
            var date = monthNames[dateobj.getMonth()] + ' ' + dateobj.getDate();
            //getting the file, push the data and uploading back
            const options1 = { decrypt: false };
            var temp = [];
            userSession.getFile('Demofeed.json', options1)
                .then((file) => {
                    this.props.load();
                    temp = JSON.parse(file || '[]')
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    //Since this.setState() is asynchronous, we won't be able to set the date like that 
                    var tempobj = this.state;
                    tempobj.date = date;
                    //We have to push data to the starting index
                    var temp2 = [];
                    temp2.push(JSON.stringify(tempobj));
                    console.log(temp2);
                    temp.map((x, index) => {
                        temp2.push(x);
                    });
                    //we have fetched the data, now we have to push back
                    userSession
                        .putFile("Demofeed.json", JSON.stringify(temp2), options)
                        .finally(() => {
                            this.props.load();
                            window.location.reload(true);
                        })

                });
        }
    }
    render() {
        return (
            <div class="newfeed">
                <textarea rows="5" cols="50" onChange={e => this.post(e)} maxlength='256' />
                <button type="submit" onClick={this.upload}>Ready to Post</button>
            </div>
        )
    }
}
export default Newfeed;