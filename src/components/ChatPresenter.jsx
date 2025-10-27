import React from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import InputBar from './InputBar.jsx';
import FaqSuggestions from './FaqSuggestions.jsx';
import '/src/assets/styles/App.css';

const ChatPresenter = ({
  messages,
  isTemplateLoaded,
  loadError,
  searchTerm,
  suggestions,
  onSendMessage,
  onSuggestionClick,
  onRetryLoadTemplate,
  onSearchTermChange
}) => {
  return (
    <div className="app-shell">
      <ChatHeader />
      <MessageList
        messages={messages}
        statusMessage={
          loadError
            ? loadError
            : isTemplateLoaded
              ? null
            : 'Loading sample conversation...'
        }
        onRetry={loadError ? onRetryLoadTemplate : undefined}
      />
      <InputBar
        onSend={onSendMessage}
        onInputChange={onSearchTermChange}
        inputValue={searchTerm}
      />
      <FaqSuggestions
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
    </div>
  );
};

export default ChatPresenter;
