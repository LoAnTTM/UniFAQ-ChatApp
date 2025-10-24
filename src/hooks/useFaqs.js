import { useCallback, useEffect, useState } from 'react';

const FAQS_URL = new URL('../assets/faqs.json', import.meta.url);

const normalizeFaqs = (data) =>
  Array.isArray(data)
    ? data
        .map((item, index) => ({
          id: item.id ?? `faq-${index}`,
          question: item.question?.trim() ?? '',
          answer: item.answer?.trim() ?? ''
        }))
        .filter((item) => item.question && item.answer)
    : [];

const useFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFaqs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(FAQS_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch FAQ data');
      }

      const text = await response.text();
      const parsed = text.trim() ? JSON.parse(text) : [];
      setFaqs(normalizeFaqs(parsed));
    } catch (err) {
      console.error('Failed to load FAQs', err);
      setError('Unable to load FAQs at the moment.');
      setFaqs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  return {
    faqs,
    isLoading,
    error,
    reload: loadFaqs
  };
};

export default useFaqs;
