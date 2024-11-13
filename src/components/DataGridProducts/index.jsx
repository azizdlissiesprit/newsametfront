import React, { useState, useEffect }  from 'react';
import { DataGrid, GridToolbarContainer, GridToolbar, GridToolbarDensitySelector } from "@mui/x-data-grid";
import { Box, Button,Typography,TextField, IconButton,Select, MenuItem,List, ListItem, Paper,Autocomplete } from "@mui/material";
import styles from './style.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";

import { GetCategories,GetMainCategories,GetSubCategories } from '../../Api/Categories';
import {Formik} from 'formik';
function Index() {
  const [stockData, setStockData] = useState([]);
  const [displayingcurrently, setdisplayingcurrently] = useState("tab");
  const [selectedRow, setSelectedRow] = useState(null);
  const [datatoedit, setdatatoedit] = useState({});



  const [options, setoptions] = useState([]);
  const [options2, setoptions2] = useState([]);
  const [options3, setoptions3] = useState([]);
  const [valuesforselect, setvaluesforselect] = useState("");
  const [valuesforselect2, setvaluesforselect2] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  var [inputValue, setInputValue] = useState('');
  const handleFormulaireSubmit = async (values, { resetForm },setFieldValue) => {
    try {
      console.log("you pressed on submit!",values);  // Check if this logs
      values = { ...values, categories: options3 };
      console.log("xxx",values);
      resetForm();


      setImagePreviews([]);

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
  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    console.log("aaa",imagePreviews);
    setFieldValue('images', files);
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







    // Fetch stock data from API endpoint
    useEffect(() => {
        const fetchStockData = async () => {
            try {
              const categories = await GetMainCategories();
              const subcategories = await GetSubCategories();
              setoptions(categories);
              setoptions2(subcategories);
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
    const handleButtonClick = () => {
      if (selectedRow) {
        // Pass the selected row data to your function
        console.log('Selected Row Data:', selectedRow);
        // You can call another function here with the selectedRow data
      } else {
        console.log('No row selected');
      }
    };
  const columns = [
    { field: "idProd", headerName: "ID", flex: 0.4, headerClassName: 'super-app-theme--header' },
    { field: "nom", headerName: "Nom Produit", flex: 0.6, headerClassName: 'super-app-theme--header' },
    { field: "typeProd", headerName: "Type Produit", flex: 0.6, headerClassName: 'super-app-theme--header' },
    { field: "quantite", headerName: "Quantité", flex: 0.6, headerClassName: 'super-app-theme--header' },
    
  ];

 

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      
  <Button type="button" color="secondary" variant="contained" onClick={(event) => {
    // Your logic here
    setdisplayingcurrently("edit");
    setoptions3(selectedRow.categorie);
    const imageNames = selectedRow.images.map(imageObj => {
      // Extract the part after "images/" from the image path
      const imagePath = imageObj.img;
      return imagePath.split('/images/')[1]; // Get the part after "images/"
    });
    console.log(imageNames);
    

    const imagePaths = imageNames.map(imageName => {
      try {
        // Dynamically require the image path
        return require(`./images/${imageName}`);
      } catch (error) {
        console.error(`Image ${imageName} not found.`);
        return null;
      }
    });


    setImagePreviews(prevPreviews => [
      ...prevPreviews,
      ...imagePaths.filter(path => path !== null)
    ]);


    

    // You can also use event.preventDefault() if needed
  }}
              sx={{ fontWeight: "600", letterSpacing :".05em", fontSize : "18px", backgroundColor: "rgba(0, 8, 238, .5)",
                ":hover":{color:"white",backgroundColor: "rgba(0, 8, 238, .8)"}
              }}>Ajouter au stock
              </Button>
    {(displayingcurrently==="tab") &&(<div className={styles.Container}>
      <DataGrid
            rows={stockData}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row._id}
            slots={{ toolbar: GridToolbar }}
            components={{ toolbar: CustomToolbar }}
            sx={{
              '& .super-app-theme--header': { backgroundColor: 'rgba(0, 8, 238, .4)', fontSize: "24px", fontWeight: "600", fontFamily: "cormorant, serif" },
              fontSize: "21px", fontWeight: "600", color: "rgba(0, 0, 0, .9)",
              '& .MuiDataGrid-footerContainer': { backgroundColor: 'rgba(0, 8, 238, .4)' },
            }}
            onRowSelectionModelChange={(newSelection) => {
              // Use newSelection to update selectedRow state
              
              const selectedIDs = newSelection;
              
              const selectedRowData = stockData.find(row => row._id === selectedIDs[0]);

              setSelectedRow(selectedRowData);
            }}
            
          />
    </div>)}
    {(displayingcurrently==="edit")&&( <div>
     
      

      <Formik onSubmit={handleFormulaireSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue,resetForm}) => (
          <form onSubmit={handleSubmit}>
            <Box  className={styles.BoxGrid}>
              {/* Id Produit */}
              <div className={styles.BoxContent}>
                <h1 className={styles.h1Text}>Id Produit</h1>
                <TextField autoComplete='off' fullWidth type="text"
                  label="ID Produit" defaultValue={selectedRow.idProd} name="idproduit"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    // Directly handle state update here
                    setSelectedRow(prevData => ({
                      ...prevData,
                      idProd: event.target.value // Update only the age field
                    }));
                    console.log(selectedRow);
                  }}
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
                   name="nomproduit"
                  onBlur={handleBlur}
                  defaultValue={selectedRow.nom}
                  onChange={(event) => {
                    // Directly handle state update here
                    setSelectedRow(prevData => ({
                      ...prevData,
                      nom: event.target.value // Update only the age field
                    }));
                    console.log(selectedRow);
                  }}
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
                  defaultValue={selectedRow.typeProd} name="typeproduit"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    // Directly handle state update here
                    setSelectedRow(prevData => ({
                      ...prevData,
                      typeProd: event.target.value // Update only the age field
                    }));

                  }}
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
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  style={{
                    gridColumn: 'span 4',
                    marginBottom: '10px',
                  }}
                />
              {/* Image Preview Section */}
              <Box className={styles.imagePreviewContainer}>
                {imagePreviews.length === 0 ? (
                  <p className={styles.noImagesText}>No images yet</p> // Display message if no images
                ) : (
                  imagePreviews.map((src, index) => (
                    <div key={index} className={styles.imagePreviewWrapper}>
                      <img src={src} alt={`preview-${index}`} className={styles.imagePreview} />
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
                  defaultValue={selectedRow.description} name="description"
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    // Directly handle state update here
                    setSelectedRow(prevData => ({
                      ...prevData,
                      description: event.target.value // Update only the age field
                    }));                  }}
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
                      defaultValue  ={selectedRow.minPrice} name="prixmin"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        // Directly handle state update here
                        setSelectedRow(prevData => ({
                          ...prevData,
                          minPrice: event.target.value // Update only the age field
                        }));

                      }}
                      error={!!touched.prixmin && !!errors.prixmin}
                      helperText={touched.prixmin && errors.prixmin}
                      sx={{ '& .MuiInputBase-input': { fontSize: '1.6rem' },
                        '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                        '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                      }}
                    />
                    <TextField autoComplete='off' fullWidth
                      variant="filled" type="text" label="Prix max"
                      defaultValue={selectedRow.maxPrice} name="prixmax"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        // Directly handle state update here
                        setSelectedRow(prevData => ({
                          ...prevData,
                          maxPrice: event.target.value // Update only the age field
                        }));

                      }}
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
                    name="largeur" defaultValue={selectedRow.largeur}
                    onChange={(event) => {
                      // Directly handle state update here
                      setSelectedRow(prevData => ({
                        ...prevData,
                        largeur: event.target.value // Update only the age field
                      }));

                    }}
                    error={!!touched.largeur && !!errors.largeur}
                    helperText={touched.largeur && errors.largeur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />
                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Longeur (cm)"
                    defaultValue={selectedRow.longueur} name="longeur"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      // Directly handle state update here
                      setSelectedRow(prevData => ({
                        ...prevData,
                        longueur: event.target.value // Update only the age field
                      }));

                    }}
                    error={!!touched.longeur && !!errors.longeur}
                    helperText={touched.longeur && errors.longeur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />

                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Hauteur (cm)"
                    defaultValue={selectedRow.hauteur} name="hauteur"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      // Directly handle state update here
                      setSelectedRow(prevData => ({
                        ...prevData,
                        hauteur: event.target.value // Update only the age field
                      }));

                    }}
                    error={!!touched.hauteur && !!errors.hauteur}
                    helperText={touched.hauteur && errors.hauteur}
                    sx={{'& .MuiInputBase-input': { fontSize: '1.6rem' },
                      '& .MuiInputLabel-root': {fontSize: '1.6rem',color: 'secondary',},
                      '& .MuiInputLabel-root.Mui-focused': {fontSize: '1.6rem',color: 'rgba(0, 8, 238, 1)',}
                    }}
                  />
                  
                  <TextField autoComplete='off' fullWidth variant="filled"
                    type="text" label="Profondeur (cm)"
                    defaultValue={selectedRow.profondeur_assise} name="profondeur"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      // Directly handle state update here
                      setSelectedRow(prevData => ({
                        ...prevData,
                        profondeur_assise: event.target.value // Update only the age field
                      }));

                    }}
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
                  defaultValue={selectedRow.quantite} name="quantity"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    // Directly handle state update here
                    setSelectedRow(prevData => ({
                      ...prevData,
                      quantite: event.target.value // Update only the age field
                    }));

                  }}
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
              defaultValue={selectedRow.disponibilite}
              name="disponibilite"
              onBlur={handleBlur}
              onChange={(event) => {
                // Directly handle state update here
                setSelectedRow(prevData => ({
                  ...prevData,
                  disponibilite: event.target.value // Update only the age field
                }));

              }}
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
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={(event) => {console.log(selectedRow)}}
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





    </div>)}
    </div>
  );
}
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

};

export default Index;
