import { Box, Button, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Maps from './Maps'
import Track from './Track'
import ListDetails from './ListDetails'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deliverygetOneAction } from '../../../ReduxB/slices/delivery/deliverysSlices'

export default function DetailsDelivery() {

  
  return (

<Paper sx={{ width: '100%',p:"1rem",m:"2rem" }}>
  
       <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} >
     
              <Maps />
            </Grid>
        <Grid item xs={6}>
            <Track/>
          {/*   <Grid>
              <ListDetails/>
            </Grid> */}
        </Grid>
        
        
      </Grid> 
    </Paper>
    


   
        
   
  )
}
