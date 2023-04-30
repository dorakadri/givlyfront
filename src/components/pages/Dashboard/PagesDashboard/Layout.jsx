import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../componentsDashboard/Navbar'
import Sidebar from "../componentsDashboard/Sidebar"
export default function Layout() {

    const Desktop =useMediaQuery("(min-width: 600px)");
    const [sidebaropen,setSidebarOpen]=useState(true);
  
    return (
   <Box display={Desktop ? "flex" : "block"} width="100%" height="100%">
   <Sidebar Desktop={Desktop}
    sidebarWidth="260px" 
    sidebaropen={sidebaropen}
     setSidebarOpen={setSidebarOpen}/>
   <Box flexGrow={1}>
        <Navbar    
    sidebaropen={sidebaropen}
     setSidebarOpen={setSidebarOpen}/>
        <Outlet/>
    </Box>
   </Box>
  )
}
