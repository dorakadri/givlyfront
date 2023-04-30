import { Grid, Typography, Container, CssBaseline } from '@mui/material';
import React from 'react';


import two from './images/logo1-removebg-preview.png';
import three from './images/logo2-removebg-preview.png';
import four from './images/logo1.png';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

const StyledBox = styled(Box)({
  height: "100vh",
  scrollSnapAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent:"center",
 paddingLeft:"24px",
  alignItems: "center",


});

const partners = [

  { name: 'Partner 2', logo: two },
  { name: 'Partner 3', logo: three },
  { name: 'Partner 4', logo: four },

];

const Ourpartner = () => (
  
  <StyledBox>

    <Typography variant="h4" align="center" gutterBottom>
      OUR ECO-FRIENDLY PARTNERS
    </Typography>
  
    <Grid   container

 spacing={4}>
      {partners.map((partner) => (
      
        <Grid item sm={4}   key={partner.name}>
          <img src={partner.logo} style={{height:"100%",width:"100%"}} alt={partner.name} />
        </Grid>
      ))}
    </Grid>
  </StyledBox>
);

export default Ourpartner;
