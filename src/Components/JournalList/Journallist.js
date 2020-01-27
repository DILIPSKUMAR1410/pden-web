import React from 'react'
import './JournalList.css'
import Modal from './Modal/Modal'
import Header from '../Header/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {
    UserSession,
    AppConfig
} from 'blockstack';
const options = { encrypt: false };
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Journallist extends React.Component {
    constructor(props) {
        super(props);
        this.renderTableData = this.renderTableData.bind(this);
        this.sortbydate = this.sortbydate.bind(this);
        this.sortbytitle = this.sortbytitle.bind(this);
        this.openmodal = this.openmodal.bind(this);
        this.closemodal = this.closemodal.bind(this);
        this.gotohome = this.gotohome.bind(this);
        this.newjournal = this.newjournal.bind(this);
        // this.start = this.start.bind(this);
        this.state = {
            sorted: false,
            sortdate: false,
            sorttitle: 0,
            selected: 0,
            loading:false,
            loadtable:false
        }
        // this.start();
    }
    componentDidMount() {
        this.setState({ loading: true })
        const options = { decrypt: false }
        userSession.getFile('Myjournal.json', options)
          .then((file) => {
            var temp = JSON.parse(file || '[]')
            localStorage.setItem("Journal", JSON.stringify(temp));
          })
          .finally(() => {
            this.setState({ loading: false })
            this.setState({ loadtable: true })
          })
      }
    renderTableData() {
        var journaldetails = [];
        var j = 0, i = 0;
        if (localStorage.getItem("Journal")) {
            journaldetails = JSON.parse(localStorage.getItem("Journal"));
        }
        if (this.state.sortdate) {
            var temp = [];
            for (j = journaldetails.length; j > 0; j--)
                temp.push(journaldetails[j - 1]);
            journaldetails = temp;
        }
        if (this.state.sorttitle) {
            var titles = [];
            for (j = 0; j < journaldetails.length; j++)
                titles.push(JSON.parse(journaldetails[j]).title);
            titles.sort();
            if (this.state.sorttitle == 2)
                titles.reverse();
            var temp = [];
            for (i = 0; i < journaldetails.length; i++) {
                for (j = 0; j < journaldetails.length; j++) {
                    if (titles[i] === JSON.parse(journaldetails[j]).title) {
                        temp.push(journaldetails[j]);
                        break;
                    }
                }
            }
            journaldetails = temp;
        }

        return journaldetails.map((a, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><p id={JSON.parse(a).title} onClick={this.openmodal}>{JSON.parse(a).title}</p></td>
                    <td><p id={JSON.parse(a).title}>{JSON.parse(a).date}</p></td>
                    <td><p id={index}>Share</p></td>
                </tr>
            )
        });
    }
    sortbydate() {
        if (this.state.sorted) {
            if (this.state.sortdate) {
                this.setState({ sorted: false, sortdate: false });
            }
            else {
                this.setState({ sortdate: true });
                this.setState({ sorttitle: 0 });
            }
        }
        else {
            this.setState({ sorted: true });
            this.setState({ sortdate: true });
        }

    }
    sortbytitle() {
        if (this.state.sorted) {
            if (this.state.sorttitle == 1)
                this.setState({ sorttitle: 2 });
            else if (this.state.sorttitle == 2)
                this.setState({ sorttitle: 1 });
            else {
                this.setState({ sortdate: false });
                this.setState({ sorttitle: 1 });
            }
        }
        else {
            this.setState({ sorted: true });
            this.setState({ sorttitle: 1 });
        }
    }
    openmodal({ target }) {
        var journaldetails = [];
        var j = 0;
        if (localStorage.getItem("Journal")) {
            journaldetails = JSON.parse(localStorage.getItem("Journal"));
            for (j = 0; j < journaldetails.length; j++) {
                if (target.id === JSON.parse(journaldetails[j]).title) {
                    this.setState({ selected: j + 1 });
                    break;
                }
            }
        }
    }
    closemodal() {
        this.setState({ selected: 0 });
    }
    gotohome() {
        this.props.history.push("/");
    }
    newjournal() {
        localStorage.removeItem("Journal");
        this.props.history.push("/journal");
    }

    render() {
        return (
            <div>
                <Header gohome={this.gotohome} />
                <div class="list">
                    <table>
                        <th>S No</th>
                        <th onClick={this.sortbytitle}><span>Name of the Journal </span>
                            {this.state.sorttitle == 1 ? <FontAwesomeIcon icon={faSortUp} /> :
                                this.state.sorttitle == 2 ? <FontAwesomeIcon icon={faSortDown} /> : null}</th>
                        <th onClick={this.sortbydate}><span>Date</span>
                            {this.state.sortdate ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}</th>
                        <tbody>
                            {this.state.loadtable?this.state.sorted ? this.renderTableData() : this.renderTableData():null}
                        </tbody>
                    </table>
                    <button onClick={this.newjournal}>New Journal</button>
                </div>
                {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
                {this.state.selected ? <Modal Choice={this.state.selected} onClose={this.closemodal} /> : null}
            </div>
        )
    }
}
export default Journallist;