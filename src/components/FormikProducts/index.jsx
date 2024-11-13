import {React, useEffect, useState} from 'react'
import {Formik,FieldArray} from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormGroup, FormControlLabel, Box, Button, TextField, IconButton,Select, MenuItem,List, ListItem, Paper,Autocomplete  } from "@mui/material";
import * as yup from "yup";
import styles from './style.module.scss'
 
import { AjouterProduit } from '../../Api/Products';
import { GetCategories,GetMainCategories,GetSubCategories } from '../../Api/Categories';
const FormikProduits = () => {
 
  const [options, setoptions] = useState([]);
  const [options2, setoptions2] = useState([]);
  const [options3, setoptions3] = useState([]);
    const [selectedFiles, setselectedFiles] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({
    option1: false,
    option2: false,
  });
  const [selectedOptions2, setSelectedOptions2] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [valuesforselect, setvaluesforselect] = useState("");
  const [valuesforselect2, setvaluesforselect2] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  var [inputValue, setInputValue] = useState('');
  const handleFileUpload = async (files) => {
    // Prepare FormData for files
    
    setTimeout(() => {
      console.log("sss");
    }, 1000);
    console.log(files);
    const formData = new FormData();
    try{

    
    files.forEach((file) => {
  
        formData.append('images', file);
      
    });
  }
  catch(error)
  {      console.log('error error error',error);
  }
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

    
    try {
      const response = await fetch('http://localhost:3001/api/upload-images', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Files uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
  const handleFormulaireSubmit = async (values, { resetForm },setFieldValue) => {
    try {

      console.log("you pressed on submit!",values);  // Check if this logs
      values = { ...values, categories: options3 };

      values.mousse[0].mousse_name="Magic 30";

      values.mousse[1].mousse_name="HR35";

      console.log("ccc",values);
      resetForm();

      //const result = await AjouterProduit(values);
      
      setImagePreviews([]);
      console.log("ccc",values);
      await handleFileUpload(selectedFiles);
      //console.log('Product added successfully:', result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleAddCategory = async () => {
    const selectedCategory = valuesforselect;
    const selectedCategory2 = valuesforselect2;

    if (selectedCategory && !options3.includes(selectedCategory)) {
      setoptions3(prevOptions => [...prevOptions, selectedCategory]);
      console.log("rr1",options3);

    }
    else{
      
    }


    if (selectedCategory2 && !options3.includes(selectedCategory2)) {
      setoptions3(prevOptions => [...prevOptions, selectedCategory2]);
      console.log("rrx",selectedCategory2);
      console.log("rr2",options3);
    }
    console.log("rr3",options3);
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const categories = await GetMainCategories();
        const subcategories = await GetSubCategories();
        setoptions(categories);
        setoptions2(subcategories);
        
      } catch (error) {
        console.error('Error fetching main categories:', error);
      }

    };

    fetchCategories();
  }, []);
  const handleImageChange = (event,values,setFieldValue) => {
    const files = event.target.files; // Get the selected files
    const fileNames = Array.from(files).map(file => file.name); // Extract file names
    const filesArray = Array.from(files);
    setselectedFiles(filesArray);
    console.log("igot triggered",selectedFiles);

    // Set the field value with the names of the selected images
    setFieldValue('images', [...values.images, ...fileNames]); // Append new file names
  };
  
  const mergeOptions = () => {
    // Concatenate options and options2
    const combinedOptions = [...options, ...options2];
    
    // Update options3 with the combined array
    setoptions3(combinedOptions);
  }
  const handleRemoveImage = (index, values, setFieldValue) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = values.images.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    setFieldValue('images', updatedFiles);
  };
  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };
  const handleCheckboxChange2 = (event) => {
    setSelectedOptions2({
      ...selectedOptions2,
      [event.target.name]: event.target.checked,
    });
  };
    return(
    <div>
      <Formik onSubmit={handleFormulaireSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue,resetForm}) => (
          <form onSubmit={handleSubmit}>
            <Box  className={styles.BoxGrid}>
              {/* Id Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Id Produit</h1>
                <TextField autoComplete='off' fullWidth type="text"
                  label="ID Produit" value={values.idproduit} name="idproduit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.idproduit && !!errors.idproduit}
                  helperText={touched.idproduit && errors.idproduit}
                  sx={{gridColumn: "span 4",'& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                    '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                  }}
                />
              </div>
              {/* Nom Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Nom Produit</h1>
                <TextField autoComplete='off' fullWidth variant="filled"
                  type="text" label="Nom produit"
                  value={values.nomproduit} name="nomproduit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.nomproduit && !!errors.nomproduit}
                  helperText={touched.nomproduit && errors.nomproduit}
                  sx={{gridColumn: "span 4",'& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                    '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                  }}
                />
              </div>
              <div className={styles.BoxContent}>
  <h1 className={styles.h1Text}>Categorie Produit</h1>
  <Box display={"flex"}>
  <Autocomplete
  sx={{flex:0.4}}
  
  freeSolo
  options={options}
  getOptionLabel={(option) => option}
  onChange={(event, newValue) => {
    
    if (newValue) {
      setvaluesforselect(newValue);
   
      console.log(valuesforselect);
      
    }
    
  }}
  onInputChange={(event, newInputValue, reason) => {
    if (reason === 'input') {
      setvaluesforselect(newInputValue);
      console.log("newInputValue",newInputValue);// Update inputValue while typing
    }
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      name="categoriesproduit"
      label="categories produit"
      variant="outlined"
      onBlur={handleBlur}
      error={!!touched.categories && !!errors.categories}
      helperText={touched.categories && errors.categories}
      fullWidth
      sx={{
        width: "500px",
        '& .MuiInputBase-input': { fontSize: '1.4rem' },
        '& .MuiInputLabel-root': { fontSize: '1.4rem', color: 'secondary' },
        '& .MuiInputLabel-root.Mui-focused': { fontSize: '1rem', color: '#0D7C66' },
      }}
    />
  )}
/>
<Autocomplete
  fullWidth
  freeSolo
  sx={{flex:0.4}}
  options={options2}
  getOptionLabel={(option) => option}
  onChange={(event, newValue) => {
    if (newValue) {
      setvaluesforselect2(newValue);
      console.log(options3);
    }
    else{

    }
  }}
  onInputChange={(event, newInputValue, reason) => {
    if (reason === 'input') {
      setvaluesforselect2(newInputValue);
      console.log("newInputValue",newInputValue);// Update inputValue while typing
    }
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      name="souscategoriesproduit"
      label="sous categories produit"
      variant="outlined"
      onBlur={handleBlur}
      error={!!touched.souscategories && !!errors.souscategories}
      helperText={touched.souscategories && errors.souscategories}
      fullWidth
      sx={{
        width: "500px",
        '& .MuiInputBase-input': { fontSize: '1.4rem' },
        '& .MuiInputLabel-root': { fontSize: '1.4rem', color: 'secondary' },
        '& .MuiInputLabel-root.Mui-focused': { fontSize: '1rem', color: '#0D7C66' },
      }}
    />
  )}
/>
  <Button type='button' sx={{ color:"white",fontWeight: "600", letterSpacing :".05em", fontSize : "18px", backgroundColor: "rgba(0, 8, 238, .5)",
                ":hover":{color:"white",backgroundColor: "rgba(0, 8, 238, .8)"}, flex: 0.2  ,
              }}
              onClick={handleAddCategory}>
    
  Ajouter au categorie</Button>
  </Box>
  <Paper 
  style={{ 
    maxHeight: 200, 
    overflow: 'auto', 
    backgroundColor: options.length === 0 ? '#c2c2c2' : '#d6d6d6', marginTop:"10px"
  }}
>
  {options3.length > 0 ? (
    <List>
      {options3.map((option, index) => (
        <ListItem key={index}>
          {option}
        </ListItem>
      ))}
    </List>
  ) : (
    <p style={{ textAlign: 'center', padding: '16px' }}>Ajouter des categories</p>
  )}
</Paper>
</div>
              {/* Type Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Type Produit</h1>
                <TextField autoComplete='off' fullWidth variant="filled"
                  type="text" label="Type produit"
                  value={values.typeproduit} name="typeproduit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.typeproduit && !!errors.typeproduit}
                  helperText={touched.typeproduit && errors.typeproduit}
                  sx={{gridColumn: "span 4",'& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                    '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                  }}
                />
              </div>
              {/* Images Produit */}
              <div className={styles.BoxContent}>
  <h1 className={styles.h1Text}>Images</h1>
  <input
    name='images'
    type='file'
    accept='image/*'
    multiple
    onChange={(e) => handleImageChange(e,values, setFieldValue)}
    style={{
      gridColumn: 'span 4',
      marginBottom: '10px',
    }}
  />
  {/* Image Name Display Section */}
  <Box className={styles.imagePreviewContainer}>
    {values.images && values.images.length === 0 ? (
      <p className={styles.noImagesText}>No images selected</p> // Display message if no images
    ) : (
      values.images.map((imageName, index) => (
        <div key={index} className={styles.imageNameWrapper}>
          <p className={styles.imageName}>{imageName}</p>
          <IconButton
            className={styles.closeButton}
            onClick={() => handleRemoveImage(index, values, setFieldValue)}>
            <CloseIcon />
          </IconButton>
        </div>
      ))
    )}
  </Box>
</div>

              {/* Description Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Description</h1>
                <TextField autoComplete='off' fullWidth variant="filled"
                  type="text" label="Description"
                  value={values.description} name="description"
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{gridColumn: "span 4",'& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                    '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                  }}
                />
              </div>
              {/* Gamme Prix (Prix min, Prix max) Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Gamme Prix</h1>
                <Box sx={{ display: "flex",gridColumn: "span 4"}}>
                  <Box sx={{ display: "flex",gridColumn: "span 2",gap:"16px",}}>
                    <TextField autoComplete='off' fullWidth
                      variant="filled" type="text" label="Prix min"
                      value={values.prixmin} name="prixmin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.prixmin && !!errors.prixmin}
                      helperText={touched.prixmin && errors.prixmin}
                      sx={{ '& .MuiInputBase-input': { fontSize: '1.6rem' },
                        '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                        '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                      }}
                    />
                    <TextField autoComplete='off' fullWidth
                      variant="filled" type="text" label="Prix max"
                      value={values.prixmax} name="prixmax"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.prixmax && !!errors.prixmax}
                      helperText={touched.prixmax && errors.prixmax}
                      sx={{ '& .MuiInputBase-input': { fontSize: '1.6rem' },
                        '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                        '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                      }}
                    />
                  </Box>
                </Box>
              </div>
              {/* Dimensions (Long, Larg, Hauteur, Profondeur) Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Dimensions</h1>
                <Box sx={{ display: "flex",gridColumn: "span 4",gap:"16px",}}>
                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Largeur (cm)"
                    onBlur={handleBlur}
                    name="largeur" value={values.largeur}
                    onChange={handleChange}
                    error={!!touched.largeur && !!errors.largeur}
                    helperText={touched.largeur && errors.largeur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />
                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Longeur (cm)"
                    value={values.longeur} name="longeur"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.longeur && !!errors.longeur}
                    helperText={touched.longeur && errors.longeur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />

                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Hauteur (cm)"
                    value={values.hauteur} name="hauteur"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.hauteur && !!errors.hauteur}
                    helperText={touched.hauteur && errors.hauteur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />
                  
                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Profondeur (cm)"
                    value={values.profondeur} name="profondeur"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.profondeur && !!errors.profondeur}
                    helperText={touched.profondeur && errors.profondeur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />
                </Box>
              </div>
              {/* Quantité Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Quantité</h1>
                <TextField autoComplete='off' fullWidth variant="filled"
                  type="text" label="Quantité"
                  value={values.quantity} name="quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  sx={{gridColumn: "span 4",'& .MuiInputBase-input': { fontSize: '1.6rem' },
                    '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary'},
                    '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                }}
                />
              </div>
                        <div className={styles.BoxContent}>
            <h1 className={styles.h1Text}>Disponibilité Produit</h1>
            <Select
              fullWidth
              variant="filled"
              label="Disponibilité produit"
              value={values.disponibilite}
              name="disponibilite"
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={""}
              error={!!touched.disponibilite && !!errors.disponibilite}
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.6rem' },
                '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
                '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' },
              }}
            >
                      <MenuItem value="" disabled>
              Select an option
            </MenuItem>
              <MenuItem value="commande">Sur commande</MenuItem>
              <MenuItem value="stock">En stock</MenuItem>
            </Select>
          </div>
          <div className={styles.BoxContent}>
        <h1 className={styles.h1Text}>Options</h1>
        <FormGroup>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.option1}
                onChange={handleCheckboxChange}
                name="option1"
              />
            }
            label="Option Mousse"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.option2}
                onChange={handleCheckboxChange}
                name="option2"
              />
            }
            label=" Option Coffre"
          />
        </FormGroup>
        {selectedOptions.option1 && (
        <Box className={styles.BoxContent}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Prix Magic 30"
            value={values.mousse[0].mousse_prix}
            name="mousse[0].mousse_prix"
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
              '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' },
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Prix HR35"
            value={values.mousse[1].mousse_prix}
            name="mousse[1].mousse_prix"
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem', color: 'secondary' },
              '& .MuiInputLabel-root.Mui-focused': { fontSize: '1.6rem', color: 'rgba(0, 8, 238, 1)' },
            }}
          />
        </Box>
      )}
        <h1 className={styles.h1Text}>Nombre des places</h1>
        <FormGroup>
        <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions2.option1}
                onChange={handleCheckboxChange2}
                name="option1"
              />
            }
            label="2 Places"
          />
        <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions2.option2}
                onChange={handleCheckboxChange2}
                name="option2"
              />
            }
            label="3 Places"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions2.option3}
                onChange={handleCheckboxChange2}
                name="option3"
              />
          }
            label="4 Places"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions2.option4}
                onChange={handleCheckboxChange2}
                name="option4"
              />
            }
            label=" 5 Places"
          />
        </FormGroup>
      </div>
      <h1 className={styles.h1Text}>Ajouter Tarifications et Dimensions</h1>

          <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
          <FieldArray name="prices">
        {({ insert, remove, push }) => (
          <div>
            {values.prices.length > 0 &&
              values.prices.map((price, index) => (
                <div key={index}>
                  <TextField
                    fullWidth
                    name={`prices.${index}`}
                    label={`Prix pour T${index + 1}`}  
                    type="number"
                    value={price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prices?.[index] && !!errors.prices?.[index]}
                    helperText={touched.prices?.[index] && errors.prices?.[index]}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    color="secondary"
                    variant="outlined"
                  >
                    Retirer
                  </Button>
                </div>
              ))}
            <Button
              type="button"
              onClick={() => push("")}
              color="primary"
              variant="contained"
            >
              Ajouter 
            </Button>
          </div>
        )}
        
      </FieldArray>
          </div>
          <div style={{ width: '50%' }}>
            
    <FieldArray name="sizes">
      {({ insert, remove, push }) => (
        <div>
          {values.sizes.length > 0 &&
            values.sizes.map((size, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <TextField
                  fullWidth
                  name={`sizes.${index}.longueur`}
                  label={`Longeur dimension ${index + 1}`}  
                  type="number"
                  value={size.longueur}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.sizes?.[index]?.longueur && !!errors.sizes?.[index]?.longueur}
                  helperText={touched.sizes?.[index]?.longueur && errors.sizes?.[index]?.longueur}
                />
                <TextField
                  fullWidth
                  name={`sizes.${index}.largeur`}
                  label={`Largeur dimension ${index + 1}`}  
                  type="number"
                  value={size.largeur}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.sizes?.[index]?.largeur && !!errors.sizes?.[index]?.largeur}
                  helperText={touched.sizes?.[index]?.largeur && errors.sizes?.[index]?.largeur}
                />
                <TextField
                  fullWidth
                  name={`sizes.${index}.prix_option`}
                  label={`Prix dimension ${index + 1}`}  
                  type="number"
                  value={size.prix_option}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.sizes?.[index]?.prix_option && !!errors.sizes?.[index]?.prix_option}
                  helperText={touched.sizes?.[index]?.prix_option && errors.sizes?.[index]?.prix_option}
                />
                {selectedOptions.option2 && (<TextField
                  fullWidth
                  name={`sizes.${index}.prix_coffre`}
                  label={`Prix coffre ${index + 1}`}  
                  type="number"
                  value={size.prix_coffre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.sizes?.[index]?.prix_coffre && !!errors.sizes?.[index]?.prix_coffre}
                  helperText={touched.sizes?.[index]?.prix_coffre && errors.sizes?.[index]?.prix_coffre}
                />)}

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  color="secondary"
                  variant="outlined"
                >
                  Retirer
                </Button>
              </div>
            ))}
          <Button
            type="button"
            onClick={() => push({ longueur: '', largeur: '', prix_option: '', prix_coffre: '' })}
            color="primary"
            variant="contained"
          >
            Ajouter
          </Button>
        </div>
      )}
    </FieldArray>
  </div>
          </div>
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained"
              sx={{ fontWeight: "600", letterSpacing :".05em", fontSize : "18px", backgroundColor: "rgba(0, 8, 238, .5)",
                ":hover":{color:"white",backgroundColor: "rgba(0, 8, 238, .8)"}
              }}>Ajouter au stock
              </Button>
              <Button 
                type="button"
                color="rgba(0, 8, 238, .5)"
                variant="outlined"
                sx={{ marginLeft: "20px",fontWeight: "600",color:"rgba(0, 8, 238, .5)",
                      letterSpacing :".05em",fontSize : "18px", 
                      ":hover":{color:"white" ,backgroundColor: "rgba(0, 8, 238, .8)"}}}
              onClick={() => {resetForm();setImagePreviews([]); }}>
                Réinitialiser
              </Button>
            </Box>
          </form>

        )}
      </Formik>
    </div>
  );
};
const checkoutSchema = yup.object().shape({
  idproduit: yup.string().required("Le champ 'id produit' est obligatoire."),
  nomproduit: yup.string().required("Le champ 'Nom produit' est obligatoire."),
  typeproduit: yup.string().required("Le champ 'Type produit' est obligatoire."),
  description: yup.string().required("Le champ 'description' est obligatoire."),
  largeur: yup.string().required("Le champ 'Largeur' est obligatoire."),
  longeur: yup.string().required("Le champ 'Longueur' est obligatoire."),
  hauteur: yup.string().required("Le champ 'Hauteur' est obligatoire."),
  profondeur: yup.string().required("Le champ 'Profondeur' est obligatoire."),

  prixmax: yup.string().required("Le champ 'Prix max' est obligatoire."),
  prixmin: yup.string().required("Le champ 'Prix min' est obligatoire."),
  quantity: yup.string().required("Le champ 'Nombre de pieces' est obligatoire."),
  
});
const initialValues = {
  typeproduit:"",
  disponibilite:"",
  idproduit: "",
  nomproduit: "",
  largeur: "",
  longeur: "",
  prixmin: "",
  prixmax: "",
  quantity: "",
  hauteur: "",
  profondeur: "",
  description: "",
  images: [],
  prices: [""],
  sizes: [
    {
      longueur: "",
      largeur: "",
      prix_option: "",
      prix_coffre: ""
    }
  ],
  mousse: [
    {
      mousse_name: "",
      mousse_prix: "",

    },
    { mousse_name: "", mousse_prix: "" }
  ],
};
export default FormikProduits;