import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './messagelist.css';
 class MessageList extends React.Component {
 	  componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }
	render() {
		 if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
		return (
			<div className="message-list">
			{
			this.props.messages.map((message,index)=>(
			 <div key={index} className="message">
                            <div className="message-username">{message.senderId}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
			))
			}	

			</div>
		)
	}
}
export default MessageList;
