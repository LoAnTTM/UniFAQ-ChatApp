import React from 'react';

const FaqSuggestions = ({ suggestions, isLoading, onSuggestionClick }) => {
  if (isLoading) {
    return (
      <div className="faq-suggestions">
        <p>Searching FAQs...</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="faq-suggestions">
      <p>Related FAQs:</p>
      <ul>
        {suggestions.map(faq => (
          <li key={faq.id} onClick={() => onSuggestionClick(faq.question)}>
            {faq.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqSuggestions;
