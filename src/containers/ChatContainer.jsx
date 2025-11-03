import { useCallback, useEffect, useState, useMemo } from 'react';
import FaqService from '../services/FaqService.js';
import ChatPresenter from '../components/ChatPresenter.jsx';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create service instance only once using useMemo
  const faqService = useMemo(() => new FaqService(), []);

  const loadTemplate = useCallback(async () => {
    setIsTemplateLoaded(false);
    setLoadError(null);

    try {
      const result = await faqService.loadFaqTemplate();
      setMessages(result.messages);
      setLoadError(result.error);
      setIsTemplateLoaded(true);
    } catch (error) {
      console.error('Error loading template:', error);
      setMessages([{
        id: 'error-message',
        text: 'Welcome! Ask me anything.',
        sender: 'assistant'
      }]);
      setLoadError('Unable to load the conversation template. Please try again.');
      setIsTemplateLoaded(true);
    }
  }, [faqService]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  const searchFaqs = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length <= 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await faqService.searchFaqs(searchTerm);
      setSuggestions(results);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [faqService]);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm) {
      searchFaqs(searchTerm);
    }
  }, [searchTerm, searchFaqs]);

  const handleSendMessage = (text) => {
    const newMessage = faqService.createUserMessage(text);
    setMessages((current) => [...current, newMessage]);
    setSearchTerm('');
  };

  const handleSuggestionClick = (question) => {
    setSearchTerm(question);
  };

  const handleRetryLoadTemplate = () => {
    loadTemplate();
  };

  return (
    <ChatPresenter
      messages={messages}
      isTemplateLoaded={isTemplateLoaded}
      loadError={loadError}
      searchTerm={searchTerm}
      suggestions={suggestions}
      isLoading={isLoading}
      onSendMessage={handleSendMessage}
      onSuggestionClick={handleSuggestionClick}
      onRetryLoadTemplate={handleRetryLoadTemplate}
      onSearchTermChange={setSearchTerm}
    />
  );
};

export default ChatContainer;
