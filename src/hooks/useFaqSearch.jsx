import { useState, useEffect } from 'react';
import faqs from '../assets/faqs.json';

const useFaqSearch = (searchTerm) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      const searchKeywords = searchTerm.toLowerCase().split(/\s+/);
      const scoredFaqs = faqs
        .map(faq => {
          const questionKeywords = faq.question.toLowerCase().split(/\s+/);
          let score = 0;
          searchKeywords.forEach(searchWord => {
            if (questionKeywords.some(qWord => qWord.includes(searchWord))) {
              score++;
            }
          });
          return { ...faq, score };
        })
        .filter(faq => faq.score > 0);

      scoredFaqs.sort((a, b) => b.score - a.score);

      setSuggestions(scoredFaqs.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return suggestions;
};

export default useFaqSearch;
