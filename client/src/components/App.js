import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import logo from '../icons/logo.png';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import './App.css';

const WS_API =
  process.env.REACT_APP_ENV === 'DEV' ? 'http://localhost:3000' : null;
const REST_API =
  process.env.REACT_APP_ENV === 'DEV'
    ? 'http://localhost:3000'
    : `${window.location.origin}:443`;
const NEW_MESSAGE = 'new message';
const USER_COUNT = 'user count';

class App extends Component {
  state = {
    user: Cookies.get('user') || '',
    numUsers: 0,
    messages: [],
    inputText: '',
    socket: openSocket(WS_API),
    showModal: true,
  };
  msgCardGroup = null;
  componentDidMount() {
    this.subscribeWS();
    fetch(`${REST_API}/messages`)
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }
  closeModal = e => {
    e.preventDefault();
    if (!this.state.user) return;
    this.setState({ showModal: false });
  };
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
  onUserChange = e => {
    e.preventDefault();
    Cookies.set('user', e.target.value);
    this.setState({ user: e.target.value });
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
    const { numUsers, user, messages, inputText, showModal } = this.state;
    const {
      onSubmit,
      onInputChange,
      onUserChange,
      closeModal,
      setMsgCardGroupRef,
    } = this;

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
        <Modal isOpen={showModal} contentLabel="Enter User Name">
          <div className="App-Modal">
            <h3>{`What's your name?`}</h3>
            <form onSubmit={closeModal}>
              <input
                autoComplete="off"
                value={user}
                onChange={onUserChange}
                placeholder="Tony Stark"
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
