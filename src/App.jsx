import { useCallback, useEffect, useState } from 'react';
import ChatHeader from './components/ChatHeader.jsx';
import MessageList from './components/MessageList.jsx';
import InputBar from './components/InputBar.jsx';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const loadTemplate = useCallback(async () => {
    setIsTemplateLoaded(false);
    setLoadError(null);

    try {
      const response = await fetch('src/assets/faqs.json');
      if (!response.ok) {
        throw new Error('Failed to load template');
      }

      const text = await response.text();
      const data = text.trim() ? JSON.parse(text) : []; 

      if (!Array.isArray(data) || data.length === 0) {
        setMessages([
          {
            id: 'welcome-message',
            text: 'Welcome! Ask me anything.',
            sender: 'assistant'
          }
        ]);
      } else {
        const templateMessages = data.flatMap((item) => [
          {
            id: `q-${item.id}`,
            text: item.question,
            sender: 'user'
          },
          {
            id: `a-${item.id}`,
            text: item.answer,
            sender: 'assistant'
          }
        ]);

        setMessages(templateMessages);
      }
      setIsTemplateLoaded(true);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      setMessages([
        {
          id: 'error-message',
          text: 'Welcome! Ask me anything.',
          sender: 'assistant'
        }
      ]);
      setIsTemplateLoaded(true);
      setLoadError(null);
      // setLoadError('Unable to load the conversation template. Please try again.');
    }
  }, []);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  const handleSendMessage = (text) => {
    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
        sender: 'user'
      }
    ]);
  };

  const handleRetryLoadTemplate = () => {
    loadTemplate();
  };

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
        onRetry={loadError ? handleRetryLoadTemplate : undefined}
      />
      <InputBar onSend={handleSendMessage} />
    </div>
  );
};

export default App;
