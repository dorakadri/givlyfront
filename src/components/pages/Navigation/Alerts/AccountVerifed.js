import { Box, Button, Typography, useMediaQuery } from '@mui/material'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { verifyAccountAction } from '../../../../ReduxB/slices/accountVerification/accVerificationSlices';
import imagebg from "../../UserInterface/LoginAndRegister/hd.jpg";



export default function AccountVerifed() {
  const isnonMobile = useMediaQuery("(min-width :600px)");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  
const token = useParams();
    const dispatch = useDispatch();
    //verify account
    useEffect(() => {
  
      dispatch(verifyAccountAction(token.token));
    }, [dispatch, token]);



    //store
    const accountVerification = useSelector(state => state.accountVerification);
    const { loading, appErr, serverErr, isVerified, verified} =  accountVerification;
   
   
    const navigate = useNavigate();
  if (isVerified){
    setTimeout(()=>{
return navigate('/login');
    },300)

  }
  return (
    <Box  sx={{
      background: `url(${imagebg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
         <Box
        p="2rem"
        borderRadius="1.5rem"
        width={isNonMobileScreen ? "30%" : "80%"}
        textAlign="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          boxShadow:
            "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2)",
        }}
      >

  <Typography>Account Verified successfully Please Logout and login again to see changes</Typography>
        
    <Link to="/login">
    <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#06A696",
              color: " white",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              mt:"0",
              mb:"2rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
          >
        Go to Profile
      </Button>
    </Link>


    </Box>
    </Box>
    
  );
}
