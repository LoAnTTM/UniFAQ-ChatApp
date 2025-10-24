import { useCallback, useMemo, useState } from 'react';
import ChatHeader from './components/ChatHeader.jsx';
import MessageList from './components/MessageList.jsx';
import InputBar from './components/InputBar.jsx';
import useFaqs from './hooks/useFaqs.js';
import useFaqSearch from './hooks/useFaqSearch.js';
import '/src/assets/styles/App.css';

const createId = (prefix) => `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`;

const WELCOME_MESSAGE = {
  id: 'welcome-message',
  text: 'Welcome! Ask me anything.',
  sender: 'assistant',
  type: 'text'
};

const App = () => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const { faqs, isLoading, error, reload } = useFaqs();
  const searchFaqs = useFaqSearch(faqs);

  const statusMessage = useMemo(() => {
    if (error) {
      return error;
    }
    if (isLoading && !faqs.length) {
      return 'Loading FAQs...';
    }
    return null;
  }, [error, faqs.length, isLoading]);

  const handleSendMessage = useCallback(
    (text) => {
      const matches = faqs.length ? searchFaqs(text) : [];

      setMessages((current) => {
        const userMessage = {
          id: createId('user'),
          text,
          sender: 'user',
          type: 'text'
        };
        const nextMessages = [...current, userMessage];

        if (!faqs.length) {
          nextMessages.push({
            id: createId('assistant'),
            sender: 'assistant',
            type: 'text',
            text: 'FAQs are unavailable right now. Please try again later.'
          });
          return nextMessages;
        }

        if (matches.length) {
          nextMessages.push({
            id: createId('assistant-suggestions'),
            sender: 'assistant',
            type: 'suggestions',
            text: 'Here are the top related FAQs:',
            suggestions: matches
          });
        } else {
          nextMessages.push({
            id: createId('assistant'),
            sender: 'assistant',
            type: 'text',
            text: "I couldn't find a matching FAQ. Try different keywords."
          });
        }

        return nextMessages;
      });
    },
    [faqs.length, searchFaqs]
  );

  const handleRetryLoadTemplate = useCallback(() => {
    reload();
  }, [reload]);

  const handleSuggestionSelect = useCallback((faq) => {
    setMessages((current) => [
      ...current,
      {
        id: createId('user'),
        sender: 'user',
        type: 'text',
        text: faq.question
      },
      {
        id: createId('assistant'),
        sender: 'assistant',
        type: 'text',
        text: faq.answer
      }
    ]);
  }, []);

  return (
    <div className="app-shell">
      <ChatHeader />
      <MessageList
        messages={messages}
        statusMessage={statusMessage}
        onRetry={error ? handleRetryLoadTemplate : undefined}
        onSuggestionSelect={handleSuggestionSelect}
      />
      <InputBar onSend={handleSendMessage} />
    </div>
  );
};

export default App;
