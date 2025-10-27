/**
 * Service Layer - Business Logic
 * Handles all business operations and data processing
 */

import FaqRepository from '../repositories/FaqRepository.js';

class FaqService {
  constructor() {
    this.repository = new FaqRepository();
  }

  /**
   * Load FAQ template and convert to message format
   * @returns {Promise<Object>} Object containing messages and loading state
   */
  async loadFaqTemplate() {
    try {
      const faqs = await this.repository.getAllFaqs();
      
      if (!Array.isArray(faqs) || faqs.length === 0) {
        return {
          messages: [{
            id: 'welcome-message',
            text: 'Welcome! Ask me anything.',
            sender: 'assistant'
          }],
          error: null
        };
      }

      // Convert FAQs to message format
      const templateMessages = faqs.flatMap((item, index) => [
        {
          id: `q-${index}`,
          text: item.question,
          sender: 'user'
        },
        {
          id: `a-${index}`,
          text: item.answer,
          sender: 'assistant'
        }
      ]);

      return {
        messages: templateMessages,
        error: null
      };
    } catch (error) {
      console.error('Error loading FAQ template:', error);
      return {
        messages: [{
          id: 'error-message',
          text: 'Welcome! Ask me anything.',
          sender: 'assistant'
        }],
        error: 'Unable to load the conversation template. Please try again.'
      };
    }
  }

  /**
   * Search FAQs based on search term
   * @param {string} searchTerm - The search term
   * @returns {Array} Array of matching FAQs with scores
   */
  async searchFaqs(searchTerm) {
    if (!searchTerm || searchTerm.trim().length <= 2) {
      return [];
    }

    try {
      const faqs = await this.repository.getAllFaqs();
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

      // Sort by score (highest first) and return top 3
      scoredFaqs.sort((a, b) => b.score - a.score);
      return scoredFaqs.slice(0, 3);
    } catch (error) {
      console.error('Error searching FAQs:', error);
      return [];
    }
  }

  /**
   * Create a new user message
   * @param {string} text - Message text
   * @returns {Object} Message object
   */
  createUserMessage(text) {
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      sender: 'user'
    };
  }
}

export default FaqService;
