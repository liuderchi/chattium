import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import './App.css';

class App extends Component {
  state = {
    inputText: '',
  };
  onInputChange = e => {
    e.preventDefault();
    console.log(e.target.value);
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
    const { inputText } = this.state;
    const { onSubmit, onInputChange } = this;
    return (
      <div className="App">
        <form className="App-form" onSubmit={onSubmit}>
          <input value={inputText} onChange={onInputChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
