import {
  Card,
  CardContent,
  CardMedia,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rightside from "./Rightside";


const steps = ["New", "Transit", "Delivered"];
export default function Track() {
  const [step, setStep] = useState();

  const detail = useSelector((state) => state?.delivery);
  console.log(detail.getOne);
  useEffect(() => {
    if (detail.getOne?.state === "New") {
      setStep(0);
    } else if (detail.getOne?.state === "Transit") {
      setStep(1);
    } else if (detail.getOne?.state === "Delivered") {
      setStep(2);
    }
  }, [detail]);

  return (

    <Card sx={{height:"100vh" , pt:"5rem"}} >
        <Box
        sx={{
          display: "flex",
      
        }}
      >
      <Box
        sx={{
          display: "flex",
          
  
          flexDirection: "column",
       
          p:"2rem"
        }}
      >
        <img
          src={detail.getOne?.post.postPicture}
          alt="photoofthpost"
          style={{
            height: "200px",
            width: "300px",
            borderRadius: "30px",
          }}
        />

          <CardContent sx={{  display: "flex",
    
          flexDirection: "column",gap:"1rem" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Owner name
              </Typography>
              <Typography variant="caption">
                {detail.getOne?.post.userId.firstName}{" "}
                {detail.getOne?.post.userId.lastName}
              </Typography>
            </Box>

            <Typography variant="caption" >Delivery Men Informations : </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography variant="caption">
                {detail.getOne?.deliveryMen.firstName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Phone
              </Typography>
              <Typography variant="caption">
                {detail.getOne?.deliveryMen.phone}
              </Typography>
            </Box>
          
          </CardContent>

      </Box>
    
      <Rightside date={detail.getOne?.dateLivraison.substring(0, 10)}/>
      </Box>
      <Stepper activeStep={step} alternativeLabel sx={{mt:"11rem"}} >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
    </Card>

 
  );
}
