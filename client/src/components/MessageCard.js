import React, { Component } from 'react';

class MessageCard extends Component {
  render() {
    const { message, displayTime = false, user } = this.props;
    return (
      <div
        className={
          user === message.author
            ? 'MessageCard-cardRight'
            : 'MessageCard-cardLeft'
        }
      >
        <div className="MessageCard-author">{message.author}</div>
        <div className="MessageCard-payload">{message.payload}</div>
        {displayTime && (
          <div className="MessageCard-time">
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        )}
      </div>
    );
  }
}

export default MessageCard;
