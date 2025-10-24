import React from 'react';

const FaqSuggestions = ({ suggestions = [], onSelect }) => {
  if (!suggestions.length) {
    return (
      <p className="faq-suggestions__empty">
        No matching FAQs found. Try different keywords.
      </p>
    );
  }

  return (
    <div className="faq-suggestions">
      <ol className="faq-suggestions__list">
        {suggestions.map((item, index) => {
          const handleSelect = () => {
            if (onSelect) {
              onSelect(item);
            }
          };

          return (
            <li key={item.id} className="faq-suggestions__item">
              <button type="button" className="faq-suggestions__button" onClick={handleSelect}>
                <span className="faq-suggestions__rank">{index + 1}</span>
                <span className="faq-suggestions__content">
                  <span className="faq-suggestions__question">{item.question}</span>
                  <span className="faq-suggestions__meta">
                    <span className="faq-suggestions__score">
                      Match score: {item.score}
                    </span>
                    {item.matchedTokens?.length ? (
                      <span className="faq-suggestions__keywords">
                        Keywords: {item.matchedTokens.join(', ')}
                      </span>
                    ) : null}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default FaqSuggestions;
