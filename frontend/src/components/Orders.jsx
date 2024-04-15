import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Container, TextField, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import containerBackground from '../assets/container_background.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  orderContents: {
    height: '70vh',
    overflowY: 'auto',
    padding: theme.spacing(2), 
  },
  paper:{
    padding: theme.spacing(4),
    marginTop: theme.spacing(24),
    backgroundImage: `url(${containerBackground})`, // Set background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: theme.spacing(2),
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#EBDEF0',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9',
    },
  },
  
}));

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [isAddOrderFormOpen, setIsAddOrderFormOpen] = useState(false);
  const [isUpdateOrderFormOpen, setIsUpdateOrderFormOpen] = useState(false);
  const [isDeleteOrderFormOpen, setIsDeleteOrderFormOpen] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [name, setName]= useState('');
  const [description, setDescription]= useState('');
  const [price, setPrice]= useState('');
  const [stock, setStock]= useState('');
  const [imageId, setImageId]= useState('');
  const [id, setId]= useState('');
  const [orderId, setOrderId]= useState('');

  useEffect(() => {
    // Fetch orders from backend when component mounts
    axios.get('http://localhost:8080/admin-orders')
      .then(response => {
        // Set the fetched orders in state
        setOrders(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching orders:', error);
      });
  }, []); // Empty dependency array to run effect only once on component mount

  const handleAddOrderClick = () => {
    setIsAddOrderFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      orderDate,
      totalPrice,
      products,
    };

    try {
      const response = await axios.post('http://localhost:8080/admin-orders', newOrder);
      console.log('Order added successfully:', response.data);
      setIsAddOrderFormOpen(false);
      // Optionally, reset form fields or perform other actions after successful submission
    } catch (error) {
      console.error('Error adding order:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleAddProduct = () => {
    // Create a new product object with default values
    const newProduct = {
      id: products.length + 1, // Generate a unique ID for the new product
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageId: ''
    };
  
    // Add the new product to the products array
    setProducts([...products, newProduct]);
  };

  const handleUpdateOrderClick = () => {
    setIsUpdateOrderFormOpen(true);
  };

  const handleProductChange = (index, fieldName, value) => {
    // Create a copy of the products array
    const updatedProducts = [...products];
  
    // Ensure that the index is within the bounds of the products array
    if (index >= 0 && index < updatedProducts.length) {
      // Find the product at the specified index
      const productToUpdate = updatedProducts[index];
  
      // Update the field value of the product
      productToUpdate[fieldName] = value;
  
      // Update the state with the modified products array
      setProducts(updatedProducts);
    } else {
      console.error(`Invalid index ${index} provided for product change.`);
    }
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      orderDate,
      totalPrice,
      products,
    };

    try {
      // Make an API call to update the order
      await axios.put(`http://localhost:8080/admin-orders/${orderId}`, updatedOrder);
      console.log('Order updated successfully');
      setIsUpdateOrderFormOpen(false);
      // Optionally, reset form fields or perform other actions after successful update
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleDeleteOrderClick = () => {
    setIsDeleteOrderFormOpen(true);
  };

  const handleDeleteFormSubmit = (event) => {
    
    event.preventDefault(); // Prevent default form submission behavior
  
    const id = orderId;
    // Extract form data from state or form fields
    const formData = {
      id
    };

   console.log("formData >>>>"+formData);
    // Make POST request to backend
    axios.delete(`http://localhost:8080/admin-orders/${id}`, formData)
      .then(response => {
        // Handle success response
        console.log('Order Deleted successfully:', response.data);
        setIsDeleteOrderFormOpen(false); // Close the form after successful submission
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
    
    setIsAddOrderFormOpen(false);
    setIsUpdateOrderFormOpen(false);
    setIsDeleteOrderFormOpen(false);
  };

  return (
    <div className={classes.orderContents}>
    
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleAddOrderClick}>
          Add Order
        </Button>
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleUpdateOrderClick}>
          Update Order
        </Button>
        <Button variant="contained" color="primary" style={{ color: 'white' , marginLeft:'30px' }} onClick={handleDeleteOrderClick}>
          Delete Order
        </Button>
      </div>
      <br/>
       
      <div className="formcontainer">
             {/* Conditional rendering of the form */}
             {isAddOrderFormOpen && (
                <Container maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                  Add Order Form
                </Typography>
                <form onSubmit={handleFormSubmit}>
                {/* Input fields for order details */}
                <TextField className={classes.textfield} value={orderDate}  type="datetime-local" onChange={(e) => setOrderDate(e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} value={totalPrice} label="Total Price" type="number" onChange={(e) => setTotalPrice(e.target.value)} />
                <br/><br/>
                {/* Input fields for product details */}
                <Typography variant="h6" gutterBottom>
                Products
                </Typography>
                {products.map((product, index) => (
                <div key={index}>
                <TextField className={classes.textfield} label={`Product Id ${index + 1}`} style={{ color: 'black' }} value={product.id} onChange={(e) => handleProductChange(index, 'id', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Product Name ${index + 1}`} value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Description ${index + 1}`} value={product.description} onChange={(e) => handleProductChange(index, 'description', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Price ${index + 1}`} value={product.price} type="number" onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Stock ${index + 1}`} value={product.stock} type="number" onChange={(e) => handleProductChange(index, 'stock', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Image ID ${index + 1}`} value={product.imageId} onChange={(e) => handleProductChange(index, 'imageId', e.target.value)} />
                <br/><br/>
                </div>
                ))}

                <Button type="button" variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
                <br/><br/>
                {/* Submit and close buttons */}
                <Button type="submit" variant="contained" color="primary">Add Order</Button>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                </form>
                </Paper>
                </Container>
            )} 

            {isUpdateOrderFormOpen && (
               <Container maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
               <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                    Update Order Form
               </Typography>
               <form onSubmit={handleUpdateFormSubmit}>
               {/* Input fields for order details */}
               <TextField className={classes.textfield} value={orderId} label="Order Id" style={{ color: 'black' }} onChange={(e) => setOrderId(e.target.value)} />
               <br/><br/>
               <TextField className={classes.textfield} value={orderDate}  type="datetime-local" onChange={(e) => setOrderDate(e.target.value)} />
               <br/><br/>
               <TextField className={classes.textfield} value={totalPrice} label="Total Price" type="number" onChange={(e) => setTotalPrice(e.target.value)} />
               <br/><br/>
               {/* Input fields for product details */}
               <Typography variant="h6" gutterBottom>
                   Products
               </Typography>
                {products.map((product, index) => (
                <div key={index}>
                <TextField className={classes.textfield} label={`Product Id ${index + 1}`} style={{ color: 'black' }} value={product.id} onChange={(e) => handleProductChange(index, 'id', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Product Name ${index + 1}`} value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Description ${index + 1}`} value={product.description} onChange={(e) => handleProductChange(index, 'description', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Price ${index + 1}`} value={product.price} type="number" onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Stock ${index + 1}`} value={product.stock} type="number" onChange={(e) => handleProductChange(index, 'stock', e.target.value)} />
                <br/><br/>
                <TextField className={classes.textfield} label={`Image ID ${index + 1}`} value={product.imageId} onChange={(e) => handleProductChange(index, 'imageId', e.target.value)} />
                <br/><br/>
                </div>
                ))}

                <Button type="button" variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
                <br/><br/>
                {/* Submit and close buttons */}
                <Button type="submit" variant="contained" color="primary">Update Order</Button>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                </form>
                </Paper>
                </Container>
           )}       

           {isDeleteOrderFormOpen && (

               <Container maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
               <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                   Delete Order Form
               </Typography>
              <form onSubmit={handleDeleteFormSubmit}>
               {/* Input fields for product details */}
              <TextField className={classes.textfield} value={orderId} label="Order Id" style={{ color: 'black' }} onChange={(e) => setOrderId(e.target.value)} />
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
      <h1>Orders</h1>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id} className={classes.tableRow}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <ul>
                    {order.products.map(product => (
                      <li key={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Orders;
