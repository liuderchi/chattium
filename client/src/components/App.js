import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import './App.css';

class App extends Component {
  state = {
    user: 'derek',
    numUsers: 0,
    messages: [
      {
        author: 'derek',
        payload: 'hi',
        timestamp: new Date().getTime(),
      },
      {
        author: 'jason',
        payload: 'ok',
        timestamp: new Date().getTime(),
      },
    ],
    inputText: '',
  };
  onInputChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { inputText } = this.state;
    if (!inputText) return;
    console.warn(inputText);
    // TODO send message to server
    this.setState({ inputText: '' });
  };
  render() {
    const { numUsers, user, messages, inputText } = this.state;
    const { onSubmit, onInputChange } = this;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Welcome numUsers={numUsers} />
        <MessageCardGroup messages={messages} user={user} />
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
