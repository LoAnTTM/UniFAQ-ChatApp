import React from 'react';
import FaqSuggestions from './FaqSuggestions.jsx';

const MessageList = ({
  messages = [],
  statusMessage,
  onRetry,
  onSuggestionSelect
}) => {
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
            <li key={msg.id} className={`message message--${msg.sender ?? 'user'}`}>
              {msg.type === 'suggestions' ? (
                <div className="message__text message__text--suggestions">
                  {msg.text ? <p className="message__lead">{msg.text}</p> : null}
                  <FaqSuggestions
                    suggestions={msg.suggestions}
                    onSelect={onSuggestionSelect}
                  />
                </div>
              ) : (
                <span className="message__text">{msg.text}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
