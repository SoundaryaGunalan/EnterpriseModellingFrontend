import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Paper, TextField, Typography, Button, Grid } from '@mui/material';
import containerBackground from '../assets/container_background.jpg';

import Orders from './Orders.jsx'


const useStyles = makeStyles((theme) => ({
  welcomeMessage:{
    textAlign: 'right',
    color:'#590d33',
  },
  middlepane:{
    backgroundColor: 'white',
    
  },
  fileContainer: {    
    height: '70vh',
    overflowY: 'auto',
    padding: theme.spacing(2), // Add padding as needed
  },
  footer: {
    backgroundColor: 'black',
    fontFamily :'sans-serif',
    fontSize:'12px',
    color:'white',
    // Set width to 100%
    height: '10vh',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  cardContainer: {
    margin: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px 8px 0 0',
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  paper:{
    padding: theme.spacing(4),
    marginTop: theme.spacing(24),
    backgroundImage: `url(${containerBackground})`, // Set background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: theme.spacing(2),
},
form:{
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
},
textfield:{
  marginTop: theme.spacing(2),
},
submit:{
    marginTop: theme.spacing(2),
},
grid:{
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2), 
},
link: {
    textDecoration: 'none',
    color: 'red',
    fontWeight: 'bold', 
    fontSize: '1.2em',
},
title: {
    marginBottom: theme.spacing(4),
},
logo:{
    width:100,
    height:100,
    marginBottom: theme.spacing(2),
},
err_msg:{
    width:'370px',
    padding:'15px',
    margin:'5px 0',
    fontSize: '14px',
    backgroundColor:'#f34646',
    color:'white',
    borderRadius:'5px',
    textAlign:'center',
},
success_msg:{
    width:'370px',
    padding:'15px',
    margin:'5px 0',
    fontSize: '14px',
    backgroundColor:'#38761d',
    color:'white',
    borderRadius:'5px',
    textAlign:'center',
},
}));

export default function Homepage({ selectedComponent }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [name, setName]= useState('');
  const [description, setDescription]= useState('');
  const [price, setPrice]= useState('');
  const [stock, setStock]= useState('');
  const [imageId, setImageId]= useState('');
  const [id, setId]= useState('');
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [isUpdateProductFormOpen, setIsUpdateProductFormOpen] = useState(false);
  const [isDeleteProductFormOpen, setIsDeleteProductFormOpen] = useState(false);
  const navigate = useNavigate();





  useEffect(() => {
    // Fetch products from backend when component mounts
    axios.get('http://localhost:8080/admin-products')
      .then(response => {
        // Set the fetched products in state
        setProducts(response.data);
        console.log("response.data  >>>>>>>"+response .data);
               
        
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array to run effect only once on component mount

  const getImageSource = (imageId) => {
    return `./src/assets/images/${imageId}`;
  };

  const handleAddProductClick = () => {
    setIsAddProductFormOpen(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Extract form data from state or form fields
    const formData = {
      name,
      description,
      price,
      stock,
      imageId
    };

   console.log("formData >>>>"+formData);
    // Make POST request to backend
    axios.post('http://localhost:8080/admin-products', formData)
      .then(response => {
        // Handle success response
        console.log('Product added successfully:', response.data);
        setIsAddProductFormOpen(false); // Close the form after successful submission
      })
      .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  const handleClose = () => {
    
    setIsAddProductFormOpen(false);
    setIsUpdateProductFormOpen(false);
    setIsDeleteProductFormOpen(false);
  };

  const handleUpdateProductClick = () => {
    setIsUpdateProductFormOpen(true);
  };

  const handleUpdateFormSubmit = (event) => {
    
    event.preventDefault(); // Prevent default form submission behavior
  
    // Extract form data from state or form fields
    const formData = {
      id,
      name,
      description,
      price,
      stock,
      imageId
    };

   console.log("formData >>>>"+formData);
    // Make POST request to backend
    axios.put(`http://localhost:8080/admin-products/${id}`, formData)
      .then(response => {
        // Handle success response
        console.log('Product updated successfully:', response.data);
        setIsUpdateProductFormOpen(false); // Close the form after successful submission
      })
      .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      });

  };
  

  const handleDeleteProductClick = () => {
    setIsDeleteProductFormOpen(true);
  };

  const handleDeleteFormSubmit = (event) => {
    
    event.preventDefault(); // Prevent default form submission behavior
  
    // Extract form data from state or form fields
    const formData = {
      id
    };

   console.log("formData >>>>"+formData);
    // Make POST request to backend
    axios.delete(`http://localhost:8080/admin-products/${id}`, formData)
      .then(response => {
        // Handle success response
        console.log('Product Deleted successfully:', response.data);
        setIsDeleteProductFormOpen(false); // Close the form after successful submission
      })
      .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      });

  };
  

  return (
    <div>
      
      
      <div className={classes.middlepane} >
      {selectedComponent === 'products' && (
        <div className={classes.fileContainer}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleAddProductClick} >
          Add Product
        </Button>
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleUpdateProductClick}>
          Update Product
        </Button>
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleDeleteProductClick}>
          Delete Product
        </Button>
      </div>
          <div className="formcontainer">
             {/* Conditional rendering of the form */}
          {isAddProductFormOpen && (

            <Container maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
              <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                       Add Product Form
              </Typography>
              <form onSubmit={handleFormSubmit}>
              {/* Input fields for product details */}
              <TextField className={classes.textfield} value={name} label="Product Name" style={{ color: 'black' }} onChange={(e) => setName(e.target.value)} />
                 <br/><br/>
              <TextField className={classes.textfield} value={description} label="Description" style={{ color: 'black' }} onChange={(e) => setDescription(e.target.value)} />
                 <br/><br/>
              <TextField className={classes.textfield} value={price} label="Price" style={{ color: 'black' }} onChange={(e) => setPrice(e.target.value)} />
                 <br/><br/>
              <TextField className={classes.textfield} value={stock} label="Stock" style={{ color: 'black' }} onChange={(e) => setStock(e.target.value)} />
                  <br/><br/>
              <TextField className={classes.textfield} value={imageId} label="ImageId" style={{ color: 'black' }} onChange={(e) => setImageId(e.target.value)} />
              {/* Submit button */}
              <br/><br/>
              <Button type="submit" variant="contained" color="primary">Add</Button>
               <br/><br/>
               <Button variant="contained" color="primary" onClick={handleClose}>CLOSE</Button>
              </form>
               </Paper>
            </Container>
              
          )}
          {isUpdateProductFormOpen && (

              <Container maxWidth="xs">
              <Paper className={classes.paper} elevation={3}>
              <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                 Update Product Form
              </Typography>
              <form onSubmit={handleUpdateFormSubmit}>
              {/* Input fields for product details */}
              <TextField className={classes.textfield} value={id} label="Product Id" style={{ color: 'black' }} onChange={(e) => setId(e.target.value)} />
              <br/><br/>
              <TextField className={classes.textfield} value={name} label="Product Name" style={{ color: 'black' }} onChange={(e) => setName(e.target.value)} />
              <br/><br/>
              <TextField className={classes.textfield} value={description} label="Description" style={{ color: 'black' }} onChange={(e) => setDescription(e.target.value)} />
              <br/><br/>
              <TextField className={classes.textfield} value={price} label="Price" style={{ color: 'black' }} onChange={(e) => setPrice(e.target.value)} />
              <br/><br/>
              <TextField className={classes.textfield} value={stock} label="Stock" style={{ color: 'black' }} onChange={(e) => setStock(e.target.value)} />
              <br/><br/>
              <TextField className={classes.textfield} value={imageId} label="ImageId" style={{ color: 'black' }} onChange={(e) => setImageId(e.target.value)} />
               {/* Submit button */}
              <br/><br/>
              <Button type="submit" variant="contained" color="primary">Update</Button>
              <br/><br/>
              <Button variant="contained" color="primary" onClick={handleClose}>CLOSE</Button>
              </form>
              </Paper>
              </Container>
  
          )}

          {isDeleteProductFormOpen && (

              <Container maxWidth="xs">
              <Paper className={classes.paper} elevation={3}>
              <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                  Delete Product Form
              </Typography>
              <form onSubmit={handleDeleteFormSubmit}>
              {/* Input fields for product details */}
              <TextField className={classes.textfield} value={id} label="Product Id" style={{ color: 'black' }} onChange={(e) => setId(e.target.value)} />
              <br/><br/>
              {/* Submit button */}
              <br/><br/>
              <Button type="submit" variant="contained" color="primary">Delete</Button>
              <br/><br/>
              <Button variant="contained" color="primary" onClick={handleClose}>CLOSE</Button>
              </form>
              </Paper>
              </Container>

           )}
          </div>
          <br/>
          <div>
            <h2 style={{ textAlign: 'left', fontSize: '24px', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Products</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {products.map((product, index) => (
              <div key={product.id} className={classes.cardContainer} onClick={() => handleCardClick(product.id)}>                
                <img src={getImageSource(product.imageId)} alt={product.imageId} className={classes.cardImg} />
                <div className={classes.cardContent}>
                  <h3 className={classes.cardTitle}>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
       )}
       {selectedComponent === 'orders' && <Orders />}
        <div className={classes.footer}>
          <p>© 2024 Versa Store. All rights reserved.</p>
          <p>The content and images of this website are protected by copyright law. Unauthorized reproduction or distribution of any material without express permission from Versa Store is strictly prohibited. All trademarks, logo and servicemarks displayed on this site are properties of their respective owners. For enquiries regarding the use of our content, please contact us at [versastore@gmail.com].</p>
          <p></p>
        </div>
      </div>
      
    </div>
  );
}
