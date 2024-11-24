import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Grid, Divider } from '@mui/material';

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    productName: 'Laptop',
    options: [{ name: 'RAM Upgrade', price: 50 }, { name: 'Extended Warranty', price: 100 }],
    quantity: 1,
    dateOfOrder: '2024-11-20',
    clientName: 'John Doe',
    totalPrice: 1150,
  },
  {
    id: 2,
    productName: 'Smartphone',
    options: [{ name: 'Screen Protector', price: 20 }, { name: 'Fast Charger', price: 25 }],
    quantity: 2,
    dateOfOrder: '2024-11-21',
    clientName: 'Jane Smith',
    totalPrice: 1100,
  },
  {
    id: 3,
    productName: 'Headphones',
    options: [{ name: 'Carrying Case', price: 15 }],
    quantity: 1,
    dateOfOrder: '2024-11-22',
    clientName: 'Alice Johnson',
    totalPrice: 215,
  },
];

const ValidateOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleValidateOrder = () => {
    if (selectedOrder) {
      alert(`Order for ${selectedOrder.clientName} validated.`);
      setSelectedOrder(null); // Reset selection
    }
  };

  const handleCancelOrder = () => {
    if (selectedOrder) {
      alert(`Order for ${selectedOrder.clientName} cancelled.`);
      setSelectedOrder(null); // Reset selection
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Validate Orders
      </Typography>
      <Grid container spacing={4}>
        {/* Order List */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Orders
          </Typography>
          <List>
            {mockOrders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem button onClick={() => handleSelectOrder(order)}>
                  <ListItemText
                    primary={`${order.productName} - ${order.clientName}`}
                    secondary={`Date: ${order.dateOfOrder} | Total: $${order.totalPrice}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>

        {/* Order Details */}
        <Grid item xs={12} md={6}>
          {selectedOrder ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Typography><strong>Client Name:</strong> {selectedOrder.clientName}</Typography>
              <Typography><strong>Product:</strong> {selectedOrder.productName}</Typography>
              <Typography><strong>Quantity:</strong> {selectedOrder.quantity}</Typography>
              <Typography><strong>Date of Order:</strong> {selectedOrder.dateOfOrder}</Typography>
              <Typography><strong>Total Price:</strong> ${selectedOrder.totalPrice}</Typography>
              <Box mt={2}>
                <Typography variant="subtitle1"><strong>Options:</strong></Typography>
                <ul>
                  {selectedOrder.options.map((option, index) => (
                    <li key={index}>
                      {option.name}: ${option.price}
                    </li>
                  ))}
                </ul>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleValidateOrder}
                  style={{ marginRight: '10px' }}
                >
                  Validate
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelOrder}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="subtitle1">Select an order to see the details.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ValidateOrders;
