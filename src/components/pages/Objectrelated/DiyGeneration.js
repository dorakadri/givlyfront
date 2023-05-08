import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, CardActions, Typography, CardActionArea, CardMedia, Grid, Box } from '@mui/material';

import { diyGenerationAction } from '../../../ReduxB/slices/IA/diySlice';

export default function DiyGeneration() {
const [object,setObject] =useState();
  const dispatch = useDispatch();

function handlechange (e){

setObject(e.target.value)

}

function handleclick() {
  dispatch(diyGenerationAction(object))

}



  const diys = useSelector((state) => state.diy);
  const { diylist, loading, appErr, serverErr } = diys;
 
  return (
    <Box p={"3rem"} >
      <Box display={"flex"} pb={"1rem"} justifyContent={"center"}>
    <TextField
      id="diy"
      label="diy"
      onChange={handlechange}
      
    />
    <Button onClick={handleclick}>generate</Button>
    </Box>
<Grid container spacing={2}>
      {diylist && diylist.map((d,i) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
           image={d.imgUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {d.title}
          </Typography>
 
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={d.link} target="_blank" rel='noreferrer'>
          take a look
        </Button>
      </CardActions>
    </Card>
          
  </Grid>
      ))}
        </Grid>
    </Box>
  )
}
