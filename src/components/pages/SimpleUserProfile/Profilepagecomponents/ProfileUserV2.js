import {
    Avatar,
    
    Badge,
    
    Button,
    
    CardContent,
    Container,
    Grid,
   
    IconButton,
   
    Link,
   
   
    Paper,
    Stack,
    Typography,
  } from "@mui/material";


  import React, { useState } from "react";
  import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
  import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
  import styled from "@emotion/styled";
  import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
  export const ProfileUserV2 = ({ data }) => {
   
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    const SmallIcon = styled(IconButton)(({ theme }) => ({
      backgroundColor: "#EDEDED",
      marginTop:"-22px",
      "&:hover": {
        backgroundColor: "#EDEDED"
      }
     
    }));
   
  
    return (
      <Container disableGutters={true}>
    
           <Avatar
      alt="Profile pic"
      src={data?.profilePhoto}
      sx={{
        mt: "-7rem",
        width: "12rem",
        height: "12rem",
        borderRadius: "104.667px",
        alignSelf: "center",
      }}
    />
   
     
    
      <Box
        sx={{ p:0, position: "relative", top: "2rem",border:"white" }}
        variant="elevation"
      >
           <Stack  gap={3} >
          <Typography variant="subtitle1" sx={{fontSize: "22px"}} > {data?.firstName} {data?.lastName}</Typography>
        
      
     
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent="left"
            gap={1}
          >
            <    EmailOutlinedIcon  fontSize="small" />
            <Typography
         
              sx={{ color: "rgba(58, 53, 65, 0.87)" }}
            >
               {data?.email}
            </Typography>
          </Stack>
     
          <Typography
            gutterBottom
            sx={{  fontSize: "13", fontWeight: "600" }}
          >
            Highlights
          </Typography>
       
       
         
        <Grid  container direction="row"
             justifyContent="space-between"
           gap={1}
    >      
        
         {Hightlightdata.map((el,i)=>  
         <Grid  key={i} item xl={2} lg={2} xs={12} md={4} sm={3} >
          <Stack spacing={2}>
         <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
           {el.value}
         </Typography>
         <Typography sx={{ fontSize: "0.75rem" }}>{el.name}</Typography>
         </Stack>
       </Grid>
         
         )} 
        </Grid> 
        <CardContent sx={{  p: 0 }}>
          <Typography
            gutterBottom
            sx={{  fontSize: "13", fontWeight: "600" }}
          >
            About me
          </Typography>
  
        
          <Typography variant="body2"  sx={{textAlign: "justify"}}  color="text.primary">
          {data?.bio}
          </Typography> 

        
        </CardContent>
        
    
        <Button
              variant="outlined"
              color="success"
              sx={{ height: "100%", width: "100%" }}
              onClick={() => navigate(`./update/${data?._id}`)}
            >
              Edit Profile
            </Button> 
        </Stack>
  
     
      </Box>
      </Container>
    );
  };
  

  export const Hightlightdata=[
   
    {
        name:"Level" , value:15
    },
    {
        name:"Rating" , value:4.9
    },
    {
        name:"Posts" , value:"2.5K"
    },
    {
        name:"Taken" , value:23
    },
    
    
    ]