import React, { Component } from 'react';
import './roomlist.css';
 class RoomList extends  React.Component {
	render() {
		return (
			 <div className="rooms-list">
                <ul>
                <h3>Your rooms:</h3>
                    {this.props.rooms.map(room => {
                    	 const active = this.props.roomId === room.id ? "active" : "";
                        return (
                            <li  key={room.id} className={"room"+ active}>
                                <a href="#" onClick={() => this.props.subscribeToRoom(room.id)}># {room.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
		);
	}
}
export default RoomList;
