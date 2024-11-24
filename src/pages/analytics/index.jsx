import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const mockData = [
  { productName: "Product A", likeNumber: 200, favNumber: 150, accessNumber: 300, boughtNumber: 50 },
  { productName: "Product B", likeNumber: 180, favNumber: 120, accessNumber: 280, boughtNumber: 40 },
  { productName: "Product C", likeNumber: 220, favNumber: 170, accessNumber: 320, boughtNumber: 60 },
];

const productNames = mockData.map((product) => product.productName);
const likeData = mockData.map((product) => product.likeNumber);
const favData = mockData.map((product) => product.favNumber);
const accessData = mockData.map((product) => product.accessNumber);
const boughtData = mockData.map((product) => product.boughtNumber);

const Index = () => {
  return (
    <Box p={4} height="100vh" overflow="auto">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Most Liked Products
          </Typography>
          <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
            <BarChart
              xAxis={[{ data: productNames, scaleType: "band" }]}
              series={[
                {
                  data: likeData,
                  label: "Likes",
                  color: "#4caf50", // Green
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Most Added to Favourites
          </Typography>
          <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
            <BarChart
              xAxis={[{ data: productNames, scaleType: "band" }]}
              series={[
                {
                  data: favData,
                  label: "Favourites",
                  color: "#2196f3", // Blue
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Most Accessed Products
          </Typography>
          <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
            <BarChart
              xAxis={[{ data: productNames, scaleType: "band" }]}
              series={[
                {
                  data: accessData,
                  label: "Accesses",
                  color: "#ff9800", // Orange
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Most Bought Products
          </Typography>
          <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
            <BarChart
              xAxis={[{ data: productNames, scaleType: "band" }]}
              series={[
                {
                  data: boughtData,
                  label: "Bought",
                  color: "#f44336", // Red
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
