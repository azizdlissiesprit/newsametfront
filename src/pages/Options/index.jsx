import {React,useState} from 'react'
import {Formik,FieldArray} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, TextField, IconButton,Select, MenuItem,List, ListItem, Paper,Autocomplete  } from "@mui/material";
import styles from './style.module.scss'
import * as yup from "yup";

function Index() {
  const [opt, setopt] = useState(0);

    const handleFormulaireSubmit = async (values, { resetForm },setFieldValue) => {
        try {
          
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };
  return (
    <>
    {}
    {opt==2&&(<>
    
      <Formik initialValues={initialValues2} onSubmit={handleFormulaireSubmit}>
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
        <Formik onSubmit={handleFormulaireSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
            value={values.idproduit}
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
            value={values.nomproduit}
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
    
    </>
  )
    
}
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