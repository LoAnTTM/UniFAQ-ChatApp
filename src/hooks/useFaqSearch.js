import { useCallback, useMemo } from 'react';

const tokenize = (text = '') =>
  Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((token) => token.length > 2)
    )
  );

const useFaqSearch = (faqs = []) => {
  const indexedFaqs = useMemo(
    () =>
      faqs.map((faq) => ({
        faq,
        tokens: tokenize(`${faq.question} ${faq.answer}`)
      })),
    [faqs]
  );

  const searchFaqs = useCallback(
    (query, limit = 3) => {
      const queryTokens = tokenize(query);
      if (!queryTokens.length) {
        return [];
      }

      return indexedFaqs
        .map(({ faq, tokens }) => {
          const matchedTokens = queryTokens.filter((token) => tokens.includes(token));
          const score = matchedTokens.length;

          return {
            ...faq,
            score,
            matchedTokens
          };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.question.localeCompare(b.question))
        .slice(0, limit);
    },
    [indexedFaqs]
  );

  return searchFaqs;
};

export default useFaqSearch;
