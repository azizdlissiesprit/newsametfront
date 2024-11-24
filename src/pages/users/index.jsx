import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography } from '@mui/material';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rights: {
      addProduct: false,
      modifyProduct: false,
      accessProductList: false,
      accessAnalytics: false,
      manageCategories: false,
      validateOrders: false,
      addHyperPoints: false,
    },
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        rights: {
          ...formData.rights,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to backend to add the user
      const response = await fetch('http://localhost:3001/api/users/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User created successfully!');
        setError(null);
      } else {
        setError(data.error || 'Failed to create user.');
        setSuccess(null);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the user.');
      setSuccess(null);
    }
  };

  return (
    <Box p={4} width="400px" mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Rights Checkboxes */}
        <Typography variant="h6" mt={2}>
          User Rights
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.addProduct}
              onChange={handleChange}
              name="addProduct"
            />
          }
          label="Add Product"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.modifyProduct}
              onChange={handleChange}
              name="modifyProduct"
            />
          }
          label="Modify Product"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.accessProductList}
              onChange={handleChange}
              name="accessProductList"
            />
          }
          label="Access Product List"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.accessAnalytics}
              onChange={handleChange}
              name="accessAnalytics"
            />
          }
          label="Access Analytics"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.manageCategories}
              onChange={handleChange}
              name="manageCategories"
            />
          }
          label="Manage Categories"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.validateOrders}
              onChange={handleChange}
              name="validateOrders"
            />
          }
          label="Validate Orders"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rights.addHyperPoints}
              onChange={handleChange}
              name="addHyperPoints"
            />
          }
          label="Add Hyperpoints"
        />

        {/* Submit Button */}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add User
          </Button>
        </Box>
      </form>

      {/* Success and Error Messages */}
      {error && <Typography color="error" mt={2}>{error}</Typography>}
      {success && <Typography color="primary" mt={2}>{success}</Typography>}
    </Box>
  );
};

export default AddUserForm;
