import React from 'react';

const MessageList = ({ messages = [], statusMessage, onRetry }) => {
  const shouldShowEmptyState = !statusMessage && messages.length === 0;

  return (
    <div className="message-list">
      {statusMessage ? (
        <div className="empty-chat">
          <p>{statusMessage}</p>
          {onRetry ? (
            <button type="button" className="empty-chat__retry" onClick={onRetry}>
              Try Again
            </button>
          ) : null}
        </div>
      ) : shouldShowEmptyState ? (
        <div className="empty-chat">
          <p>Start the conversation by entering your question.</p>
        </div>
      ) : (
        <ul className="message-list__items">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`message message--${msg.sender ?? 'user'}`}
            >
              <span className="message__text">{msg.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
