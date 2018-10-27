import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import './App.css';

class App extends Component {
  state = {
    user: 'derek',
    numUsers: 3,
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
  };
  render() {
    const { numUsers, user, messages } = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        <Welcome numUsers={numUsers} />
        <MessageCardGroup messages={messages} user={user} />
      </div>
    );
  }
}

export default App;
