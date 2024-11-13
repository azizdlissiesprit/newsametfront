import React, { useState, useEffect } from 'react';
import { GetCategories, GetMainCategories, GetSubCategories } from '../../Api/Categories';
import { TextField, Button, Box,IconButton,Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const ZoomableImage = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const [clickPositionarray, setClickPositionarray] = useState([]);
  const [stockData, setStockData] = useState([]);
 // Initialize an empty object

  const [textFieldValue, setTextFieldValue] = useState("");
  const [stockDatamatch, setStockDatamatch] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imagelinkers, setimagelinkers] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null); // Track selected image ID

  const handleImageClick = (e) => {
    const imageIndex = parseInt(e.target.dataset.index, 10); // Convert the dataset index to a number
    console.log("xx", imagePreviews);
    console.log("xsx", clickPositionarray);
    console.log("vvv", imagelinkers);
    
    if (!isZoomed) {
      setIsZoomed(true);
    } else {
      const imageRect = e.target.getBoundingClientRect();
      const posX = e.clientX - imageRect.left;
      const posY = e.clientY - imageRect.top;
      const percentageX = ((posX / imageRect.width) * 100).toFixed(2);
      const percentageY = ((posY / imageRect.height) * 100).toFixed(2);

      const newClickPosition = {
        index: imageIndex,   // Store the image index
        x: `${percentageX}%`,
        y: `${percentageY}%`,
    };



      // Update clickPositionarray state
      setClickPositionarray(prevItems => [...prevItems, newClickPosition]);
      console.log("TB:", clickPositionarray);

      // Check if imagelinkers has at least one item
      if (imagelinkers.length > 0) {
        // Update the only item in imagelinkers directly
        setimagelinkers(prevImagelinkers => [
          {
            ...prevImagelinkers[0], // Get the existing item
            clickpos: [...clickPositionarray] // Assign the entire clickPositionarray to clickpos
          }
        ]);
      }
      console.log("f", clickPositionarray);
    }
  };
  const updateHyperpoints = async (idProd, clickpos) => {
    try {
      console.log("zaaa",clickpos);
      const response = await axios.post('http://localhost:3001/api/products/update-hyperpoints', {
        clickpos,idProd
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating hyperpoints:', error);
      throw error;
    }
  };
  const handleDeletePoint = (index) => {
    setClickPositionarray(prevArray => prevArray.filter((_, i) => i !== index));
  };

  const handleIdpChange = (index, newIdp) => {
    setClickPositionarray(prevArray => {
      const updatedArray = [...prevArray];
      updatedArray[index] = { ...updatedArray[index], idp: newIdp };
      return updatedArray;
    });
  };
  useEffect(() => {
    if (stockDatamatch && stockDatamatch.images) {
      // Extract and map image paths
      const newImagelinkers = stockDatamatch.images.map(imageObj => {
        const stockdatapath = imageObj.img;
        const imageName = stockdatapath.split('/images/')[1]; // Get the part after "images/"
        const pathimg = imageName; // Public folder reference
        return { pathimg, stockdatapath };
      });
  
      // Update imagePreviews state with URLs from the public folder
      const newImagePreviews = newImagelinkers.map(item => item.pathimg);
  
      setImagePreviews(prevPreviews => [
        ...prevPreviews,
        ...newImagePreviews
      ]);
  
      // Update imagelinkers state
      if (newImagelinkers.length > 0) {
        setimagelinkers(() => [
          {
            ...newImagelinkers[0], // Use the first (and only) item from newImagelinkers
          }
        ]);
      }
    }
  }, [stockDatamatch]);
  
  // Specify the dependency array with myVariable


  







  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const categories = await GetMainCategories();
        const subcategories = await GetSubCategories();

        const response = await fetch('http://localhost:3001/get-products'); // Ensure the correct endpoint
        if (response.ok) {
          const data = await response.json();
          setStockData(data);

        } else {
          throw new Error('Failed to fetch stock data');
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const handleZoomOut = () => {
    setIsZoomed(false);
    setClickPosition(null);
    console.log("vvv", imagelinkers);
  };

  const handleTextFieldChange = (e) => {
    setTextFieldValue(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', position: 'relative' }}>
    {imagePreviews.length === 0 ? (
      <p>No images yet</p>
    ) : (
      imagePreviews.map((src, index) => (
        
        <div
          key={index}
          style={{
            display: 'inline-block',
            position: 'relative',
            marginRight: '10px',
            backgroundColor: 'red',  // Debug color
            padding: '5px',  // Padding to see the boundary
            border: '2px solid black',  // Border to clearly see the div boundary
          }}
        >
          <img
            src={src}
            onClick={handleImageClick}
            alt={`preview-${index}`}
            style={{
              width: isZoomed ? '600px' : '300px',
              transition: 'width 0.3s ease',
              cursor: isZoomed ? 'default' : 'zoom-in',
              zIndex: 1,
              display: 'block',
            }}
            ref={(el) => {
              if (el) {
                el.dataset.index = index;  // Store the index in the image element if needed
              }
            }}
          />
          {console.log("clickPositionarray:", clickPositionarray, "index:", index)}

          {clickPositionarray
  .filter(position => position.index === index)  // Only show points for the current image index
  .map((position, idx) => (
    <div
      key={idx}
      style={{
        position: 'absolute',
        left: `calc(${position.x} - 15px)`,  // Adjust position based on percentage and X's size
        top: `calc(${position.y} - 15px)`,   // Adjust position based on percentage and X's size
        zIndex: 2,
        fontSize: '30px',
        color: 'red',
        pointerEvents: 'none',  // Make sure X doesn't interfere with image clicks
        backgroundColor: 'yellow',  // Debug background color for visibility
        width: '30px',  // Set width for debug
        height: '30px', // Set height for debug
        textAlign: 'center',  // Center the text
        lineHeight: '30px',  // Align text vertically
      }}
    >
       X
    </div>
  ))
}
        </div>
      ))
    )}
  
    
  
    <Box mt={3}>
    {isZoomed && (
      <div style={{ marginTop: '20px' }}>
        
        <Button onClick={handleZoomOut} variant="contained" color="primary">
          Zoom Out
        </Button>
      </div>
    )}
      <TextField
        fullWidth
        variant="outlined"
        label="Additional Information"
        value={textFieldValue}
        onChange={(event) => {
          const value = event.target.value;
          setTextFieldValue(value);
  
          // Check for a match in the stockData
          const matchedProduct = stockData.find((product) => product.idProd === value);

          if (matchedProduct) {
            setStockDatamatch(matchedProduct);
           
            console.log('Matched product:', matchedProduct); // Ensure you're logging the correct data
          }
        }}
      />
      <Typography>hyperpoints{}</Typography>
    </Box>
    <div style={{ marginTop: '20px', textAlign: 'left', padding: '0 20px' }}>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>Points Coordinates</Typography>
        <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
          {clickPositionarray.map((position, idx) => (
            position && (
              <li key={idx} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                <strong>Point {idx + 1}:</strong> X: {position.x}, Y: {position.y}
                <TextField
                  value={position.idp || ''}
                  onChange={(e) => handleIdpChange(idx, e.target.value)}
                  placeholder="IDP"
                  style={{ marginLeft: '10px', width: '100px' }}
                />
                <button
                  onClick={() => handleDeletePoint(idx)}
                  style={{
                    marginLeft: '10px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span className="material-icons" style={{ color: 'red' }}>
                    delete
                  </span>
                </button>
              </li>
            )
          ))}
        </ul>
        <Button onClick={(event)=>{updateHyperpoints(stockDatamatch.idProd,clickPositionarray)} } variant="contained" color="primary">
          done
        </Button>
      </div>
  </div>
       );
};

export default ZoomableImage;