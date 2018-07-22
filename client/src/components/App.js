import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import logo from '../icons/logo.svg';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import './App.css';

const WS_API = 'http://localhost:3000';
const REST_API = 'http://localhost:3000';
const NEW_MESSAGE = 'new message';
const USER_COUNT = 'user count';

class App extends Component {
  state = {
    user: 'derek',
    numUsers: 0,
    messages: [],
    inputText: '',
    socket: openSocket(WS_API),
  };
  msgCardGroup = null;
  componentDidMount() {
    this.subscribeWS();
    fetch(`${REST_API}/messages`)
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }
  onInputChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user, socket, inputText } = this.state;
    if (!inputText) return;
    socket.emit(NEW_MESSAGE, {
      author: user,
      payload: inputText,
    });
    this.setState({ inputText: '' });
  };
  setMsgCardGroupRef = el => (this.msgCardGroup = el);
  scrollBottom = () => {
    if (this.msgCardGroup && this.msgCardGroup.root) {
      this.msgCardGroup.root.scrollTop = this.msgCardGroup.root.scrollHeight;
    }
  };
  subscribeWS = () => {
    const { socket } = this.state;
    socket.on(NEW_MESSAGE, msg => {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, msg],
      });
      this.scrollBottom();
    });
    socket.on(USER_COUNT, ({ numUsers }) => {
      this.setState({
        numUsers,
      });
    });
  };
  render() {
    const { numUsers, user, messages, inputText } = this.state;
    const { onSubmit, onInputChange, setMsgCardGroupRef } = this;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Welcome numUsers={numUsers} />
        <MessageCardGroup
          ref={setMsgCardGroupRef}
          messages={messages}
          user={user}
        />
        <form className="App-form" onSubmit={onSubmit}>
          <input
            autoComplete="off"
            value={inputText}
            onChange={onInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
