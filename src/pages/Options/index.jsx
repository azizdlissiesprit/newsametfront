import {React,useState} from 'react'
import {Formik,FieldArray} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, TextField, IconButton,Select, MenuItem,List, ListItem, Paper,Autocomplete  } from "@mui/material";
import styles from './style.module.scss'
import * as yup from "yup";

function Index() {
  const [opt, setopt] = useState(4);
  const handleOptionChange = (value) => {
    setopt(value);
  };
    const handleFormulaireSubmit = async (values, { resetForm },setFieldValue) => {
        try {
          
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };
  return (
    <>
    {}
    <Box display="flex" justifyContent="center" gap={2} mt={2}>
      <Button 
        variant={opt === 1 ? "contained" : "outlined"} 
        color="primary" 
        onClick={() => handleOptionChange(1)}
      >
        Option Simple
      </Button>
      <Button 
        variant={opt === 2 ? "contained" : "outlined"} 
        color="secondary" 
        onClick={() => handleOptionChange(3)}
      >
        Option Associé au Taille
      </Button>
      <Button 
        variant={opt === 3 ? "contained" : "outlined"} 
        color="success" 
        onClick={() => handleOptionChange(2)}
      >
        Option avec des Choix
      </Button>
    </Box>
    {opt==2&&(<>
    
      <Formik initialValues={initialValues2} onSubmit={(values) => {
        // Submit handler to process the form data
        console.log("Form Values:", values);

        // Prepare the payload
        const payload = {
          nomOption: values.nomoption,
          typeOption: 2, // Fixed value as specified
          customOptions: values.choices.map((choice) => ({
            name: choice.choiceName,
            prix: choice.choiceCost,
          })),
        };

        // Send to the backend
        fetch("http://localhost:3001/api/options", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              alert("Option saved successfully!");
            } else {
              alert("Failed to save option. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error saving option. Check console for details.");
          });
      }}>
      {({ values, handleChange, handleBlur,handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Box>
            {/* Option Name Field */}
            <TextField
              fullWidth
              label="Option Name"
              name="nomoption"
              value={values.nomoption}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="filled"
              sx={{ mb: 2 }}
            />

           

            {/* Dynamic Choices */}
            <FieldArray name="choices">
              {({ remove, push }) => (
                <div>
                  {values.choices.map((choice, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={2}>
                      <TextField
                        label="Choice Name"
                        name={`choices[${index}].choiceName`}
                        value={choice.choiceName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="filled"
                        sx={{ mr: 2 }}
                      />
                      <TextField
                        label="Choice Cost"
                        name={`choices[${index}].choiceCost`}
                        value={choice.choiceCost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="filled"
                        sx={{ mr: 2 }}
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}

                  {/* Button to add new choice */}
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => push({ choiceName: "", choiceCost: "" })}
                  >
                    Add Choice
                  </Button>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    
    </>
    )}



    
    {opt==1&&(<> 
      <div className={styles.container}>
        <div className={styles.tile}>
          <h1 className={styles.h1Text}></h1>
        </div>
        <Formik onSubmit={async (values, { resetForm }) => {
          console.log("Form Values:", values);

          // Prepare the payload
          const payload = {
            nomOption: values.nomoption,
            typeOption: 1,
            customOptions:[],
            singleOptionPrice: values.coutoption,
             // Fixed value as specified
          };
          

          try {
            // Send the POST or PATCH request
            const response = await fetch('http://localhost:3001/api/options', {
              method: 'POST', // Adjust method as needed (PATCH for updating, POST for adding new)
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              const data = await response.json();
              console.log('Option updated:', data);
              alert('Option updated successfully!');
              resetForm(); // Reset the form
            } else {
              console.error('Failed to update the option');
              alert('Failed to update the option. Please try again.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the option. Please try again.');
          }
        }} initialValues={initialValues} validationSchema={checkoutSchema}>
  {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
    <form onSubmit={handleSubmit}>
      <Box className={styles.BoxGrid}>
        {/* Id Produit */}
        <div className={styles.BoxContent}>
          <h1 className={styles.h1Text}>Nom Option</h1>
          <TextField
            autoComplete="off"
            fullWidth
            type="text"
            label="Nom Option"
            value={values.nomoption}
            name="nomoption"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.nomoption && !!errors.nomoption}
            helperText={touched.nomoption && errors.nomoption}
            sx={{
              gridColumn: "span 4",
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
              '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' }
            }}
          />
        </div>

        {/* Nom Produit */}
        <div className={styles.BoxContent}>
          <h1 className={styles.h1Text}>Coût Option</h1>
          <TextField
            autoComplete="off"
            fullWidth
            type="text"
            label="coût Option"
            value={values.coutoption}
            name="coutoption"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.coutoption && !!errors.coutoption}
            helperText={touched.coutoption && errors.coutoption}
            sx={{
              gridColumn: "span 4",
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
              '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' }
            }}
          />
        </div>

        {/* Submit and Reset Buttons */}
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              fontWeight: "600",
              letterSpacing: ".05em",
              fontSize: "18px",
              backgroundColor: "rgba(0, 8, 238, .5)",
              ":hover": { color: "white", backgroundColor: "rgba(0, 8, 238, .8)" }
            }}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{
              marginLeft: "20px",
              fontWeight: "600",
              color: "rgba(0, 8, 238, .5)",
              letterSpacing: ".05em",
              fontSize: "18px",
              ":hover": { color: "white", backgroundColor: "rgba(0, 8, 238, .8)" }
            }}
            onClick={() => resetForm()}
          >
            Réinitialiser
          </Button>
        </Box>
      </Box>
    </form>
  )}
</Formik>

        
      </div>

    </>)}
    {opt == 3 && (
  <>
    <div className={styles.container}>
      <div className={styles.tile}>
        <h1 className={styles.h1Text}>Add Prices for Different Sizes</h1>
      </div>
      <Formik
        onSubmit={async (values, { resetForm }) => {
          console.log("Form Values:", values);
            
          // Prepare the payload with sizesOptions
          const payload = {
            nomOption: values.nomoption,
            typeOption: 3,
            customOptions:[],
            singleOptionPrice: values.coutoption,
            sizesOptions: values.sizesOptions, // Array of size-specific prices
          };

          try {
            // Send the POST request
            const response = await fetch('http://localhost:3001/api/options', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              const data = await response.json();
              console.log('Option added:', data);
              alert('Option added successfully!');
              resetForm(); // Reset the form after submission
            } else {
              console.error('Failed to add the option');
              alert('Failed to add the option. Please try again.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the option. Please try again.');
          }
        }}
        initialValues={{
          nomoption: '',
          coutoption: '',  // Assuming this is for single option price
          sizesOptions: [], // Initialize with one empty price option
        }}

      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.BoxGrid}>
              {/* Nom Option */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Nom Option</h1>
                <TextField
                  autoComplete="off"
                  fullWidth
                  type="text"
                  label="Nom Option"
                  value={values.nomoption}
                  name="nomoption"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.nomoption && !!errors.nomoption}
                  helperText={touched.nomoption && errors.nomoption}
                  sx={{
                    gridColumn: "span 4",
                    '& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
                    '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' },
                  }}
                />
              </div>

              {/* Dynamic Price Options */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Price Options for Sizes</h1>
                {values.sizesOptions.map((sizeOption, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <TextField
                      label={`Price for Size ${index + 1}`}
                      name={`sizesOptions[${index}].price`}
                      value={sizeOption.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="filled"
                      sx={{ mr: 2 }}
                    />
                    <Button
                      type="button"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        const newSizes = [...values.sizesOptions];
                        newSizes.splice(index, 1);
                        handleChange({ target: { name: 'sizesOptions', value: newSizes } });
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}

                {/* Button to add new price */}
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleChange({
                      target: {
                        name: 'sizesOptions',
                        value: [...values.sizesOptions, { price: '' }],
                      },
                    });
                  }}
                >
                  Add Price for New Size
                </Button>
              </div>

              {/* Submit and Reset Buttons */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    fontWeight: "600",
                    letterSpacing: ".05em",
                    fontSize: "18px",
                    backgroundColor: "rgba(0, 8, 238, .5)",
                    ":hover": { color: "white", backgroundColor: "rgba(0, 8, 238, .8)" },
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    marginLeft: "20px",
                    fontWeight: "600",
                    color: "rgba(0, 8, 238, .5)",
                    letterSpacing: ".05em",
                    fontSize: "18px",
                    ":hover": { color: "white", backgroundColor: "rgba(0, 8, 238, .8)" },
                  }}
                  onClick={() => resetForm()}
                >
                  Réinitialiser
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  </>
)}


    </>
  )
    
}
const checkoutSchema2 = yup.object().shape({
  // Validation for the option name (nomOption)
  nomoption: yup.string()
    .required('Nom Option is required')
    .min(3, 'Nom Option should be at least 3 characters')
    .max(100, 'Nom Option should not exceed 100 characters'),

  // Validation for the cost of the option (coutoption)
  coutoption: yup.number()
    .required('Cost Option is required')
    .positive('Cost must be a positive number')
    .typeError('Cost Option must be a number'),

  // Validation for sizesOptions
  sizesOptions: yup.array()
    .of(
      yup.object().shape({
        price: yup.number()
          .required('Price for size is required')
          .positive('Price must be a positive number')
          .typeError('Price for size must be a number'),
      })
    )
    .min(1, 'At least one size price is required') // Ensure at least one size price exists
    .required('Sizes options are required'),
});
const checkoutSchema = yup.object().shape({

    nomoption: yup.string().required("Le champ 'Nom produit' est obligatoire."),
    
    coutoption: yup.string().required("Le champ 'Prix min' est obligatoire."),

  });
const initialValues = {
    
    nomoption: "",
    coutoption: "", 
  };
  const initialValues2 = {
    nomoption: "",
    
    choices: [{ choiceName: "", choiceCost: "" }],
  };
export default Index