import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';

import React from 'react'
import MapChart from './MapChart';
const StyledBox = styled(Box)({
  height: '100vh',

scrollSnapAlign:"center"
});
const Left = styled(Box)({
  flex: 0.68,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
 " @media only screen and (max-width: 768px)": {
    justifyContent: "center",
  }
});
const Right = styled(Box)({
  flex: 1,
  "@media only screen and (max-width: 768px)": {
    display:" none"
  }
});
const Form = styled(Box)({
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  " @media only screen and (max-width: 768px)": {
    width:" 300px",
  }

})
export default function Contactus() {
  return (
    <StyledBox>
      <Box sx={{
       width: "100%",
       height: "100%",
       display: "flex",
       justifyContent: "space-between",
       gap:" 50px",
    }}>
      <Left>
      <Form>
       <Typography
     variant="h5" gutterBottom>
    Contact Us
  </Typography>
  <TextField

    label="Name"
    variant="filled"
  />
  <TextField
    label="Email"
    variant="filled"
  />
  <TextField
    label="Message"
    variant="filled"
    multiline
    rows={4}
  />

  <Button sx={{ backgroundColor: "#06A696",
  color:" white",
  border: "none",
  fontWeight:" bold",
  cursor: "pointer",
  borderRadius: "5px",
  padding: "20px",}} type="submit">Send</Button>
  </Form>
  </Left>
  <Right>
  <MapChart/>
        </Right>

  </Box>
  
  </StyledBox>
  )
}
