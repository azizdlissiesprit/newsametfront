import axios from 'axios';
export async function GetCategories() {
    try {
      const response = await axios.get('http://localhost:3001/get-categories');
      return response.data;
    } catch (error) {
      console.error('Error finding products:', error);
      throw error;
    }
  }
  export async function GetMainCategories() {
    try {
      const categories = await GetCategories();
      const mainCategories = categories.map(category => category.maincat); // Extract 'maincat' from each category
      return mainCategories;
    } catch (error) {
      console.error('Error extracting main categories:', error);
      throw error;
    }
  }
  export async function GetSubCategories() {
    try {
      const response = await axios.get('http://localhost:3001/get-categories');
      const categories = response.data;
  
      // Extract subcats from each category
      const subCategories = categories.flatMap(cat => cat.subcats || []);
  
      return subCategories;
    } catch (error) {
      console.error('Error finding subcategories:', error);
      throw error;
    }
  }