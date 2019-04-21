import React, { Component } from 'react';
import MessageList from './Components/MessageList';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from './Components/sendMessageForm';
import RoomList from './Components/RoomList';
import NewRoomForm from './Components/NewRoomForm';

class App extends Component {
  constructor(){
    super();
    this.state={
      roomId:null,
      messages:[],
      joinableRooms: [],
      joinedRooms: []
    }
  }
  componentDidMount(){
    const chatManager = new ChatManager({
    instanceLocator: 'v1:us1:5b2cd92f-1db7-4bb2-b1ff-0b8258f99447',
    userId: 'saini',
    tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5b2cd92f-1db7-4bb2-b1ff-0b8258f99447/token' })
                                        })
  chatManager.connect()
  .then(currentUser => {
    this.currentUser=currentUser;
    //console.log(this.currentUser.rooms)  working
    this.getRooms();
  })
  .catch(err => {
    console.log('Error on connection', err)
  })

  }
  getRooms=()=>{ this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
               // console.log([...this.state.joinableRooms,...this.state.joinedRooms]);
            })
            .catch(err => console.log('error on joinableRooms: ', err))
          }
  subscribeToRoom=(roomId)=> {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }    
        })
        .then(room => {
            this.setState({
                roomId: room.id
            });
            this.getRooms()
          })
        .catch(err => console.log('error on subscribing to room: ', err))
    }
  sendMessage=(text)=> {
        this.currentUser.sendMessage({
            text,
            roomId:this.state.roomId
        })
    }
    createRoom=(name)=> {
      this.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('error with createRoom: ', err))
    }
  render() {
    return (
      <div className="App">
        <RoomList 
        roomId={this.state.roomId}
        subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
        <MessageList roomId={this.state.roomId} messages={this.state.messages} />
        <SendMessageForm disabled={ !this.state.roomId } sendMessage={this.sendMessage} />
         <NewRoomForm createRoom={this.createRoom} />

      </div>
    );
  }
}

export default App;
