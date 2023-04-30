import { Box, Typography, useMediaQuery } from "@mui/material";

import React from "react";
import Loginform from "./Loginform";
import imagebg from "./hd.jpg";
import { Link } from "react-router-dom";


export default function LoginDesign() {
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
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "2rem" }}
        >
          Welcome back!
        </Typography>
        <Loginform />
        <Typography>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Sign Up here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
