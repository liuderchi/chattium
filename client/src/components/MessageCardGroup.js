import React, { Component } from 'react';

class MessageCardGroup extends Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="MessageCardGroup">
        {messages.map((message, i) => (
          <div key={i}>TODO MessageCard {message}</div>
        ))}
      </div>
    );
  }
}

export default MessageCardGroup;
