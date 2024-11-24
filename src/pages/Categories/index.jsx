import React, { useState, useEffect  } from "react";
import { Box, Button, Typography,TextField, List, ListItem,Alert,Paper    } from "@mui/material";

function CategoriesManager() {
  const [opt, setOpt] = useState(0); // Track which action is selected (1 to 9)
  const [categoryName, setCategoryName] = useState(""); 
  const [categories, setCategories] = useState([]); // Store the fetched categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [subcategory, setSubcategory] = useState(''); // New subcategory name
  const [error, setError] = useState(null); // Error message
  const [success, setSuccess] = useState(null); // Success message
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Selected subcategory
  const [newName, setNewName] = useState(""); // New name for the category
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [subcategories, setSubcategories] = useState([]); // Subcategories of selected category

  const [newSubcatName, setNewSubcatName] = useState(""); // New subcategory name
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories'); // Replace with your backend route
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          console.log(data);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        setError('An error occurred while fetching categories');
        console.error(err);
      }
    };
    fetchCategories();
  }, []);
  const handleToggleHideSubCategory = async () => {
    if (!selectedCategory || !selectedSubCategory) {
      setError("Please select both a category and a subcategory.");
      return;
    }
  
    const newHiddenSubCatValue = selectedSubCategory.hiddenSubCat === "no" ? "yes" : "no";
  
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/hide-subcategory/${selectedCategory._id}/${selectedSubCategory.subcat}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hiddenSubCat: newHiddenSubCatValue }),
        }
      );
  
      if (response.ok) {
        const updatedCategory = await response.json(); // Get the updated category
        setSuccess(`Subcategory ${newHiddenSubCatValue === "yes" ? "hidden" : "unhidden"} successfully!`);
        setError(null);
  
        // Update the selected category's subcategories locally
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === selectedCategory._id
              ? {
                  ...cat,
                  subcats: cat.subcats.map((sub) =>
                    sub.subcat === selectedSubCategory.subcat
                      ? { ...sub, hiddenSubCat: newHiddenSubCatValue }
                      : sub
                  ),
                }
              : cat
          )
        );
  
        setSelectedSubCategory({
          ...selectedSubCategory,
          hiddenSubCat: newHiddenSubCatValue,
        }); // Update the selected subcategory's hiddenSubCat value
      } else {
        const { error } = await response.json();
        setError(error || "Failed to toggle subcategory visibility.");
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while toggling the subcategory visibility.");
      setSuccess(null);
    }
  };
  
  const handleToggleHideCategory = async () => {
    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }
  
    const newHiddenCatValue = selectedCategory.hiddenCat === "no" ? "yes" : "no";
  
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/hide-category/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hiddenCat: newHiddenCatValue }),
        }
      );
  
      if (response.ok) {
        const updatedCategory = await response.json(); // Get the updated category
        setSuccess(`Category ${newHiddenCatValue === "yes" ? "hidden" : "unhidden"} successfully!`);
        setError(null);
  
        // Update the categories list locally
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === selectedCategory._id ? updatedCategory : cat
          )
        );
        setSelectedCategory(updatedCategory); // Update selected category
      } else {
        const { error } = await response.json();
        setError(error || "Failed to toggle category visibility.");
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while toggling the category visibility.");
      setSuccess(null);
    }
  };
  
  const handleRenameSubcategory = async () => {
    if (!newSubcatName.trim()) {
      setError("Subcategory name cannot be empty.");
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/${selectedCategory._id}/subcategories/${selectedSubcategory._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newSubcatName: newSubcatName, // Send the new subcategory name
          }),
        }
      );
  
      if (response.ok) {
        const updatedCategory = await response.json();
  
        setSuccessMessage(`Subcategory renamed to "${newSubcatName}" successfully!`);
  
        // Update the subcategories list locally
        setSubcategories((prevSubcategories) =>
          prevSubcategories.map((subcat) =>
            subcat._id === selectedSubcategory._id
              ? { ...subcat, subcat: newSubcatName } // Update the renamed subcategory
              : subcat
          )
        );
  
        // Reset the selected subcategory and input
        setSelectedSubcategory(null);
        setNewSubcatName("");
      } else {
        const { error } = await response.json();
        setError(error || "Failed to rename subcategory.");
      }
    } catch (err) {
      setError("An error occurred while renaming the subcategory.");
      console.error(err);
    }
  };
  
  const handleRenameCategory = async () => {
    if (!newName.trim()) {
      setError("Category name cannot be empty.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/rename/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newName }),
        }
      );
      if (response.ok) {
        setSuccessMessage(`Category renamed to "${newName}" successfully!`);
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === selectedCategory._id ? { ...cat, maincat: newName } : cat
          )
        );
        setSelectedCategory(null);
        setNewName("");
      } else {
        const { error } = await response.json();
        setError(error || "Failed to rename category.");
      }
    } catch (err) {
      setError("An error occurred while renaming the category.");
      console.error(err);
    }
  };
  const handleDeleteSubCategory = async () => {
    if (!selectedCategory || !selectedSubCategory) {
      alert("Please select both a category and a subcategory to delete.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/remove-subcategory/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subcatName: selectedSubCategory.subcat }), // Send subcat name in the request
        }
      );
  
      if (response.ok) {
        const updatedCategory = await response.json(); // Parse the updated category data
        setSuccess("Subcategory deleted successfully!");
        setError(null);
  
        // Update the category's subcategories locally
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === selectedCategory._id
              ? updatedCategory.updatedCategory // Replace with updated data from server
              : cat
          )
        );
  
        setSelectedSubCategory(null); // Reset the selected subcategory
      } else {
        const { error } = await response.json();
        setError(error || "Failed to delete subcategory.");
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while deleting the subcategory.");
      setSuccess(null);
    }
  };
  
  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      alert('Please select a category to delete.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/delcategories/${selectedCategory._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Category deleted successfully!');
        setCategories(categories.filter(cat => cat._id !== selectedCategory._id)); // Remove the deleted category from the list
        setSelectedCategory(null); // Reset the selected category
        setSuccess('Category deleted successfully!');
        setError(null);
      } else {
        setError('Failed to delete category');
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while deleting the category');
      setSuccess(null);
    }
  };
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      console.log("xe",categoryName);

      const response = await fetch("http://localhost:3001/api/addcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        alert("Category added successfully!");
        setCategoryName(""); // Clear the input field
      } else {
        alert("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("An error occurred while adding the category.");
    }
  };
  const handleAddSubcategory = async () => {
    if (!subcategory || !selectedCategory) {
      alert('Please select a category and enter a subcategory name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/categories/${selectedCategory._id}/subcategories`, {
        method: 'PATCH', // Updating the category
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subcat: subcategory }),
      });

      if (response.ok) {
        alert('Subcategory added successfully!');
        setSubcategory(''); // Reset the subcategory input
        setSelectedCategory(null); // Reset the selected category
        const updatedCategory = await response.json();
        setCategories(categories.map(cat => 
          cat._id === updatedCategory._id ? updatedCategory : cat
        )); // Update the local category list
      } else {
        alert('Failed to add subcategory');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while adding the subcategory');
    }
  };
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Categories Manager
      </Typography>

      {/* Buttons for actions */}
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2} mb={4}>
        <Button
          variant="contained"
          onClick={() => setOpt(1)}
        >
          Add Category
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(2)}
        >
          Add Subcategory
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(3)}
        >
          Remove Category
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(4)}
        >
          Remove Subcategory
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(5)}
        >
          List Categories
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(6)}
        >
          Hide Categories
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(7)}
        >
          Hide Subcategories
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(8)}
        >
          Rename Category
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(9)}
        >
          Rename Subcategory
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpt(10)}
        >
          Modify Subcategory
        </Button>
      </Box>

      {/* Conditional Rendering */}
      <Box>
      {opt === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Add a New Category
            </Typography>
            <TextField
              fullWidth
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
            >
              Submit
            </Button>
          </Box>
        )}

        {opt === 2 && (
           <Box>
           <Typography variant="h4" gutterBottom>Add Subcategory</Typography>
           
           {/* Step 1: Display categories */}
           {!selectedCategory && (
             <Box>
               <Typography variant="h6">Select a Category:</Typography>
               <List>
                 {categories.map(category => (
                   <ListItem key={category._id} button onClick={() => setSelectedCategory(category)}>
                     {category.maincat}
                   </ListItem>
                 ))}
               </List>
               {error && <Typography color="error">{error}</Typography>}
             </Box>
           )}
     
           {/* Step 2: Add a subcategory to the selected category */}
           {selectedCategory && (
             <Box>
               <Typography variant="h6">
                 Adding Subcategory to: <strong>{selectedCategory.maincat}</strong>
               </Typography>
               <TextField
                 label="Subcategory Name"
                 value={subcategory}
                 onChange={(e) => setSubcategory(e.target.value)}
                 fullWidth
                 margin="normal"
               />
               <Button variant="contained" color="primary" onClick={handleAddSubcategory}>
                 Add Subcategory
               </Button>
               <Button
                 variant="outlined"
                 color="secondary"
                 onClick={() => setSelectedCategory(null)}
                 sx={{ marginLeft: 2 }}
               >
                 Cancel
               </Button>
             </Box>
           )}
         </Box>
        )}
        {opt === 3 && (
            <Box>
            <Typography variant="h4" gutterBottom>Delete Category</Typography>
      
            {/* Display success or error messages */}
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
      
            {/* Step 1: Display categories */}
            <Box>
              <Typography variant="h6">Select a Category to Delete:</Typography>
              <List>
                {categories.map(category => (
                  <ListItem
                    key={category._id}
                    button
                    selected={selectedCategory?._id === category._id}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.maincat}
                  </ListItem>
                ))}
              </List>
            </Box>
      
            {/* Step 2: Delete button */}
            {selectedCategory && (
              <Box mt={2}>
                <Typography>
                  Selected Category: <strong>{selectedCategory.maincat}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteCategory}
                  sx={{ marginTop: 2 }}
                >
                  Delete Category
                </Button>
              </Box>
            )}
          </Box>
        )}
       {opt === 4 && (
  <Box>
    <Typography variant="h4" gutterBottom>
      Delete Subcategory
    </Typography>

    {/* Display success or error messages */}
    {success && <Alert severity="success">{success}</Alert>}
    {error && <Alert severity="error">{error}</Alert>}

    {/* Step 1: Display categories */}
    <Box>
      <Typography variant="h6">Select a Category:</Typography>
      <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category._id}
              button
              selected={selectedCategory?._id === category._id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory(null); // Reset subcategory when category changes
              }}
            >
              {category.maincat}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>

    {/* Step 2: Display subcategories */}
    {selectedCategory && (
      <Box mt={2}>
        <Typography variant="h6">
          Subcategories for <strong>{selectedCategory.maincat}</strong>:
        </Typography>
        <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
          <List>
            {selectedCategory.subcats.map((subcat, index) => (
              <ListItem
                key={index}
                button
                selected={selectedSubCategory?.subcat === subcat.subcat}
                onClick={() => setSelectedSubCategory(subcat)}
              >
                {subcat.subcat}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    )}

    {/* Step 3: Delete button */}
    {selectedSubCategory && (
      <Box mt={2}>
        <Typography>
          Selected Subcategory: <strong>{selectedSubCategory.subcat}</strong>
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteSubCategory}
          sx={{ marginTop: 2 }}
        >
          Delete Subcategory
        </Button>
      </Box>
    )}
  </Box>
)}

        {opt === 5 && (
           <Box display="flex" gap={2}>
           <Box>
             <Typography variant="h5" gutterBottom>
               Categories
             </Typography>
             <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto" }}>
               <List>
                 {categories.map((category) => (
                   <ListItem
                     key={category._id}
                     button
                     selected={selectedCategory?._id === category._id}
                     onClick={() => setSelectedCategory(category)}
                   >
                     {category.maincat}
                   </ListItem>
                 ))}
               </List>
             </Paper>
           </Box>
     
           {selectedCategory && (
             <Box>
               <Typography variant="h5" gutterBottom>
                 Subcategories for <strong>{selectedCategory.maincat}</strong>
               </Typography>
               <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto" }}>
                 <List>
                   {selectedCategory.subcats.length > 0 ? (
                     selectedCategory.subcats.map((subcat) => (
                       <ListItem key={subcat.subcat}>{subcat.subcat}</ListItem>
                     ))
                   ) : (
                     <Typography variant="body2" p={2}>
                       No subcategories available.
                     </Typography>
                   )}
                 </List>
               </Paper>
             </Box>
           )}
         </Box>
        )}
        {opt === 6 && (
  <Box>
    <Typography variant="h4" gutterBottom>
      Hide/Unhide Category
    </Typography>

    {/* Display success or error messages */}
    {success && <Alert severity="success">{success}</Alert>}
    {error && <Alert severity="error">{error}</Alert>}

    {/* Step 1: Display categories */}
    <Box>
      <Typography variant="h6">Select a Category to Toggle Visibility:</Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category._id}
            button
            selected={selectedCategory?._id === category._id}
            onClick={() => {
              setSelectedCategory(category); // Select category
              setError(null); // Reset errors
              setSuccess(null); // Reset success messages
            }}
          >
            {category.maincat}
          </ListItem>
        ))}
      </List>
    </Box>

    {/* Step 2: Show button to hide/unhide category */}
    {selectedCategory && (
      <Box mt={2}>
        <Typography variant="h6">
          Category: <strong>{selectedCategory.maincat}</strong>
        </Typography>
        <Button
          variant="contained"
          color={selectedCategory.hiddenCat === "no" ? "primary" : "secondary"}
          onClick={handleToggleHideCategory}
          sx={{ marginTop: 2 }}
        >
          {selectedCategory.hiddenCat === "no" ? "Hide" : "Unhide"}
        </Button>
      </Box>
    )}
  </Box>
)}

{opt === 7 && (
  <Box>
    <Typography variant="h4" gutterBottom>
      Hide/Unhide Subcategory
    </Typography>

    {/* Display success or error messages */}
    {success && <Alert severity="success">{success}</Alert>}
    {error && <Alert severity="error">{error}</Alert>}

    {/* Step 1: Display categories */}
    <Box>
      <Typography variant="h6">Select a Category:</Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category._id}
            button
            selected={selectedCategory?._id === category._id}
            onClick={() => {
              setSelectedCategory(category); // Select category
              setSelectedSubCategory(null); // Reset subcategory when category changes
            }}
          >
            {category.maincat}
          </ListItem>
        ))}
      </List>
    </Box>

    {/* Step 2: Display subcategories */}
    {selectedCategory && (
      <Box mt={2}>
        <Typography variant="h6">
          Subcategories for <strong>{selectedCategory.maincat}</strong>:
        </Typography>
        <List>
          {selectedCategory.subcats.map((subcat) => (
            <ListItem
              key={subcat.subcat}
              button
              selected={selectedSubCategory === subcat}
              onClick={() => setSelectedSubCategory(subcat)}
            >
              {subcat.subcat}
            </ListItem>
          ))}
        </List>
      </Box>
    )}

    {/* Step 3: Hide/Unhide button for selected subcategory */}
    {selectedSubCategory && (
      <Box mt={2}>
        <Typography variant="h6">
          Subcategory: <strong>{selectedSubCategory.subcat}</strong>
        </Typography>
        <Button
          variant="contained"
          color={selectedSubCategory.hiddenSubCat === "no" ? "primary" : "secondary"}
          onClick={handleToggleHideSubCategory}
          sx={{ marginTop: 2 }}
        >
          {selectedSubCategory.hiddenSubCat === "no" ? "Hide" : "Unhide"}
        </Button>
      </Box>
    )}
  </Box>
)}

        {opt === 8 && (
          <Box>
          <Typography variant="h5" gutterBottom>
            Rename a Category
          </Typography>
          <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto" }}>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category._id}
                  button
                  selected={selectedCategory?._id === category._id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setNewName(category.maincat); // Pre-fill with current name
                    setError(null);
                    setSuccessMessage("");
                  }}
                >
                  {category.maincat}
                </ListItem>
              ))}
            </List>
          </Paper>
    
          {selectedCategory && (
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                Renaming category: <strong>{selectedCategory.maincat}</strong>
              </Typography>
              <TextField
                fullWidth
                label="New Category Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRenameCategory}
                style={{ marginTop: 10 }}
              >
                Confirm
              </Button>
            </Box>
          )}
    
          {successMessage && (
            <Typography color="success" mt={2}>
              {successMessage}
            </Typography>
          )}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
        )}
       {opt === 9 && (
  <Box>
    <Typography variant="h5" gutterBottom>
      Rename a Subcategory
    </Typography>

    {/* Display list of categories */}
    <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category._id}
            button
            selected={selectedCategory?._id === category._id}
            onClick={() => {
              setSelectedCategory(category);
              setSubcategories(category.subcats); // Fetch subcategories
              setSelectedSubcategory(null); // Reset subcategory selection
              setNewSubcatName(""); // Clear input
              setError(null); // Clear errors
              setSuccessMessage(""); // Clear success message
            }}
          >
            {category.maincat}
          </ListItem>
        ))}
      </List>
    </Paper>

    {/* Display subcategories of selected category */}
    {selectedCategory && subcategories.length > 0 && (
      <Paper elevation={2} style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
        <Typography variant="body1" gutterBottom>
          Subcategories of <strong>{selectedCategory.maincat}</strong>:
        </Typography>
        <List>
          {subcategories.map((subcategory, index) => (
            <ListItem
              key={index}
              button
              selected={selectedSubcategory?._id === subcategory._id}
              onClick={() => {
                setSelectedSubcategory(subcategory); // Select subcategory
                setNewSubcatName(subcategory.subcat); // Pre-fill input with current subcat name
                setError(null); // Clear errors
                setSuccessMessage(""); // Clear success message
              }}
            >
              {subcategory.subcat}
            </ListItem>
          ))}
        </List>
      </Paper>
    )}

    {/* Input for renaming subcategory */}
    {selectedSubcategory && (
      <Box mt={2}>
        <Typography variant="body1" gutterBottom>
          Renaming subcategory: <strong>{selectedSubcategory.subcat}</strong>
        </Typography>
        <TextField
          fullWidth
          label="New Subcategory Name"
          value={newSubcatName}
          onChange={(e) => setNewSubcatName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRenameSubcategory}
          style={{ marginTop: 10 }}
        >
          Confirm
        </Button>
      </Box>
    )}

    {/* Success and error messages */}
    {successMessage && (
      <Typography color="success" mt={2}>
        {successMessage}
      </Typography>
    )}
    {error && (
      <Typography color="error" mt={2}>
        {error}
      </Typography>
    )}
  </Box>
)}

        {opt === 10 && (
          <Typography variant="h5">Placeholder for Modifying a Subcategory</Typography>
        )}
      </Box>
    </Box>
  );
}

export default CategoriesManager;
