import React from "react";
import { Container, Grid } from "@mui/material";
import Sidebar from "../components/shared/Sidebar";
import MessageForm from "../components/shared/MessageForm";

function Chat() {
  return (
 
      <Grid container spacing={2} sx={{  p:"1rem"}} >
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          
          <MessageForm />
        </Grid>
      </Grid>
  
  );
}

export default Chat;
