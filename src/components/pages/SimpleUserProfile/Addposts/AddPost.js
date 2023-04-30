import React from 'react'
import Objectdetection from '../../Objectrelated/Objectdetection'
import { Box } from '@mui/material'


export default function AddPost(props ) {

  return (
    <Box  sx={{margin:"auto"}}>
      <Objectdetection  type={props.type} />
    </Box>
  )
}
