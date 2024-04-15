import { AppBar, Button, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../assets/logo.png';
import userProfile from '../assets/user_profile.png';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'black', // Set background color to black
  },
  toolBar: {
    backgroundColor: 'black', // Set background color to black
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  textContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  logo: {
    width: 60, // Adjust width as needed
    height: 'auto', // Maintain aspect ratio
    border: '2px solid white', // Add border directly to the image
    borderRadius: '8px', // Set mild rounded corners
  },
  userProfile: {
    width: 35, // Adjust width as needed
    height: 'auto', // Maintain aspect ratio
  },
  userProfileContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2), // Adjust margin as needed
  },
  navigationBar: {
    backgroundColor: 'green', // Add your desired background color
    padding: theme.spacing(0), // Add padding as needed
    display: 'flex',
    justifyContent: 'left', // Center the items horizontally
  },
}))

export default function Header({ handleComponentChange }) {
  const classes = useStyles()

  const location = useLocation();
  
  const navigate = useNavigate();
  

  
  
  return (
    <div>
     <AppBar position='static' className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.imageContainer}>
          <img src={logo} alt='Logo' className={classes.logo} />
        </div>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>VERSASTORE</h1>
        </div>
        <div className={classes.userProfileContainer}>
          <img src={userProfile} alt='Logo' className={classes.userProfile} />
        </div>
      </Toolbar>
     </AppBar>
     
      <div className={classes.navigationBar}>
        <Button color='inherit'   style={{ color: 'white' , marginLeft:'30px' }} onClick={() => handleComponentChange('products')}>
              PRODUCTS
        </Button>
        <Button color='inherit'  style={{ color: 'white', marginLeft:'30px'  }} onClick={() => handleComponentChange('orders')}>
              ORDERS
        </Button>
        
      </div>    

    </div>
  )
}
