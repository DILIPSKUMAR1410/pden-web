import React from 'react'
import './Mybook.css'
import Todo from '../../Landingpage/New'
class Mybook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadfeed: false };
    }
    //Rendering th tweets or feed
    renderFeedData = () => {
        Todo.fetchOwnList().then(todo=>{console.log(todo);});

        // Todo.findById("58ef730f7462-42d2-91df-148dd5fbf4d9").then(todo=>{
        //     console.log(todo.attrs); 
        //     const newAttributes = {
        //         title: "Aswin",
        //         completed: false
        //       }
        //       todo.update(newAttributes);
        //         todo.save();
        // })
        var Feed = [];
        if (localStorage.getItem("Demofeed") && localStorage.getItem("Demofeed")!=='[]') {
            Feed = JSON.parse(localStorage.getItem("Demofeed"));
            return Feed.map((tweet, index) => {
                return (
                    <div className="feedcard">
                        <div className="User"><span>@{tweet.attrs.user}</span>{tweet.attrs.date}</div>
                        <div className="Content">{tweet.attrs.tweet}</div>
                        <div className="reaction" onContextMenu={e=>e.preventDefault()}>
                            <span><img src={require('../../../Assets/Icons/comments.png')} alt="comment"/></span>
                        </div>
                    </div>
                )
            });
        }
        else return (
            <div className="nofeed">No Feeds Yet!!</div>
        )
    }
    render() {
        return (
            <div className="feed">
                {this.props.loadfeed ? this.renderFeedData() : this.renderFeedData()}
            </div>
        )
    }
}
export default Mybook;