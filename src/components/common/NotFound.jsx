import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import img from './notfound.jpg'
const useStyles = makeStyles({
  root: {

    backgroundRepeat: 'no-repeat',
 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   padding: '0 16px',
   background:  `url(${img})`,
   backgroundSize: "cover",
   backgroundPosition: "center",
   height: "100vh",
  

  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textShadow: '2px 2px 4px #000000',
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 20,
    padding: '12px 24px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
});

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Are you lost?
      </Typography>
      <Button component={Link} to="/user/home" variant="contained" className={classes.button}>
        Go to Home
      </Button>
    </div>
  );
}
