import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Emoji from "react-emoji-render";
import './Editor.css'
import {
    UserSession,
    AppConfig
} from 'blockstack';
const options = { encrypt: false };
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.printValue = this.printValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.showmood = this.showmood.bind(this);
        this.selectem = this.selectem.bind(this);
        this.trigger = this.trigger.bind(this);
        this.date = this.date.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setColor = this.setColor.bind(this);
        this.state = {
            title: '',
            text: '',
            date: '',
            color: '#ffffff',
            mood: "❤️",
            showemoji: false,
            showtrigger: false,
            trigger: ''
        };
    }
    printValue() {
        this.props.toggleLoad();
        const options1 = { decrypt: false };
        var temp = [];
        userSession.getFile('Myjournal.json', options1)
            .then((file) => {
                temp = JSON.parse(file || '[]')
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                temp.push(JSON.stringify(this.state));
                userSession
                    .putFile("Myjournal.json", JSON.stringify(temp), options)
                    .finally(() => {
                        this.props.toggleLoad();
                        this.props.golist();
                    })

            });

    }
    setTitle({ target }) {
        this.setState({ title: target.value });
    }
    setValue(content) {
        this.setState({ text: content });
    }
    showmood() {
        if (!this.state.showemoji)
            this.setState({ showemoji: true })
    }
    selectem({ target }) {
        this.setState({ mood: target.textContent });
        this.setState({ showemoji: false });
        // console.log(this.state.mood);
    }
    trigger({ target }) {
        if (target.id == "tri")
            this.setState({ trigger: target.value });
        else {
            if (this.state.showtrigger)
                this.setState({ showtrigger: false });
            else
                this.setState({ showtrigger: true });
        }
    }
    date() {
        var tempDate = new Date();
        var date = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
        this.setState({ date: date }, this.printValue);
        // console.log(date);
    }
    setColor({ target }) {
        this.setState({ color: target.value });
    }

    render() {
        const Style = {
            backgroundColor: this.state.color,
        }
        return (
            <div class="row1">
                <div className="menu" >
                    <div className="menuleft" >
                        <div onClick={this.showmood} className={this.state.showemoji ? "hideem" : "showem"}>
                            <p>What is your mood? <br /><em>Choose a smiley that best represents your frame of mind</em></p>
                            <p className="em">{this.state.mood}</p>
                        </div>
                        <div class={this.state.showemoji ? "showem" : "hideem"}>
                            <p>What is your mood?</p>
                            <div class="emoji">
                                <p className="em"><Emoji text=":smile:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":cry:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":angry:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text="❤️" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":unamused:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":confused:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":open_mouth:" onClick={this.selectem} /></p>
                                <p className="em"><Emoji text=":sunglasses:" onClick={this.selectem} /></p>
                            </div>
                        </div>
                        <br />
                        <p>Pick the background of your journal entry:</p>
                        <input type="color" value={this.state.color} onInput={this.setColor} />
                    </div>
                    <div className="menuright">
                        <p id="trigger" onClick={this.trigger}>Trigger</p>
                        <textarea id="tri" placeholder="Jot down the origin of this thought" className={this.state.showtrigger ? "showem" : "hide"} onChange={this.trigger} />
                    </div>
                </div>
                <div style={Style} className="editor">
                    <input placeholder="Title of the journal" onChange={this.setTitle} />
                    <SunEditor width="71vw" minHeight="55vh" onChange={this.setValue} />
                    {this.props.loading ?
                        <div class="loadcont"><button class="editorbutton" onClick={this.date} disabled> Save Now</button><div class="load" /></div> :
                        <button class="editorbutton" onClick={this.date}> Save Now</button>}
                </div>
            </div>
        );
    }
};
export default Editor;