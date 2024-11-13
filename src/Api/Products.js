import axios from 'axios';

// Fetch all products
export async function GetProducts() {
  try {
    const response = await axios.get('http://localhost:3001/get-products');
    return response.data;
  } catch (error) {
    console.error('Error finding products:', error);
    throw error;
  }
}

// Add a new product (AjouterProduit)
export const AjouterProduit = async (productData) => {
  try {
    console.log("xx",productData);
    const modifiedPrices = productData.prices.map((price, index) => ({
      option_name: `T${index + 1}`, // Assign the name based on the index
      prix_option: price            // Keep the price value
    }));

    // Replace the original prices array with the modified one
    const newProductData = {
      ...productData,
      prices: modifiedPrices // Updated prices array
    };
    console.log("xnew x",newProductData);
    const response = await axios.post('http://localhost:3001/api/products', newProductData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update an existing product by adding hyperPoints to a specific image
export const UpdateProduct = async (productId, imageId, hyperPoints) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/products/${productId}/images/${imageId}`, {
      hyperPoints,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product image: ${error.message}`);
    throw error;
  }
};
