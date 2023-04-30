import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

import React from 'react'
import Table from './Table'

export default function Leftside() {
  return (
    <Box sx={{  pl:"60px",pr:"60px",pt:"26px",pb:"26px"}}>
    <Card variant="outlined" sx={{border:0}}>
    <CardContent sx={{p:"2rem",bgcolor:"#333434",borderRadius:"10px",border:"1px solid #9CA0AC"
        }}>
    <Stack direction={"row"}   alignItems="center" justifyContent={"space-between"} gap={1} 
  >         
  <Stack direction={"row"}  >
          
        <Typography variant="h4" sx={{  
        color:" #9CA0AC",
        fontWeight:"bold",
      
        }} >
          DELIVERIES
        </Typography>
        </Stack>
     
        </Stack>
      
  </CardContent>
  <Stack  alignItems="center" gap={1}>
  
  <Table/>
  </Stack>
 
 
    
  
    </Card>
    </Box>
  )
}
