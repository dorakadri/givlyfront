import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Loginform from "./Loginform";
import imagebg from "./hd.jpg";
import RegisterDesign from "./RegisterDesign";
import { Link } from "react-router-dom";

export default function Signup() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        background: `url(${imagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        px="2rem"
        borderRadius="1.5rem"
        textAlign="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          boxShadow:
            "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="body1" style={{ fontWeight: "bold", py: "1rem" }}>
          Ready to join us !
        </Typography>
        
        <RegisterDesign/>
        
        <Typography py="1rem">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
 
      </Box>
    </Box>
  );
}