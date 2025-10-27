/**
 * Repository Layer - Data Access
 * Handles all data fetching operations
 */

class FaqRepository {
  constructor() {
    this.baseUrl = 'src/assets/faqs.json';
  }

  /**
   * Fetch all FAQs from the JSON file
   * @returns {Promise<Array>} Array of FAQ objects
   */
  async getAllFaqs() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Failed to load FAQs');
      }

      const text = await response.text();
      const data = text.trim() ? JSON.parse(text) : [];
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid FAQ data format');
      }

      return data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  }

  /**
   * Get FAQ by ID (for future extensibility)
   * @param {string} id - FAQ ID
   * @returns {Promise<Object|null>} FAQ object or null
   */
  async getFaqById(id) {
    const faqs = await this.getAllFaqs();
    return faqs.find(faq => faq.id === id) || null;
  }
}

export default FaqRepository;
