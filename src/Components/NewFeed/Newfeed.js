import React from 'react'
import './Newfeed.css'
import {
    UserSession,
    AppConfig,
} from 'blockstack';
const options = { encrypt: false };
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Newfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: userSession.loadUserData().username,
            post: '',
        }
    }
    post = e => {
        this.setState({ post: e.target.value });
    }
    upload = () => {
        if (this.state.post) {
            const options1 = { decrypt: false };
            var temp = [];
            userSession.getFile('Demo.json', options1)
                .then((file) => {
                    this.props.load();
                    temp = JSON.parse(file || '[]')
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    var a = [];
                    a.push(JSON.stringify(this.state));
                    temp.map((x, index) => {
                        a.push(x);
                    })
                    userSession
                        .putFile("Demo.json", JSON.stringify(a), options)
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
                <textarea rows="5" cols="50" onChange={e => this.post(e)} maxlength='100' />
                <button type="submit" onClick={this.upload}>Ready to Post</button>
            </div>
        )
    }
}
export default Newfeed;