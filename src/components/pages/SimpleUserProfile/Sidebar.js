import React, { useEffect, useState } from "react";


import {
  

  HomeOutlined,

} from "@mui/icons-material";

import {
  Avatar,
  Box,

  ListItemButton,
 
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaForumbee } from "react-icons/fa";
import { motion } from "framer-motion";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import PeopleIcon from '@mui/icons-material/People';
import {GiWaterRecycling} from 'react-icons/gi';

const Options = [
  {
    text: "your Shortcut ",
    icon: null,
  },
  {
    text: "Home",
    icon: <HomeOutlined />,
  },
  {
    text: "Add Post",
    icon: <PostAddRoundedIcon />,
  },
  {
    text: "Forum",
    icon: <FaForumbee  />,
  },
  {
    text: "Delivery",
    icon: <DeliveryDiningOutlinedIcon />,
  },

  {
    text: " Object Related features ",
    icon: null,
  },
  {
    text: "Diy Generation",
    icon: <ExtensionOutlinedIcon />,
  },
  {
    text: " Recommandations ",
    icon: null,
  },
  {
    text: "Association",
    icon: <PeopleIcon  />,
  },
  
  {
    text: " Food Related features ",
    icon: null,
  },
  {
    text: "Composting",
    icon: <GiWaterRecycling  size={22}/>,
  },
  {
    text: "Recipe generation",
    icon: <DinnerDiningOutlinedIcon />,
  },
  
];
const Sidebar = () => {
  const store = useSelector((state) => state?.users);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
 
  const handleToggle = () => {
    setOpen(!open);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(store.profile);
  }, [store]);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  const sideCountainerVariant = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };
  const sidebarVariants = {
    true: {},
    false: {
      width: "5rem",
    },
  };

  const profileVariant = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },

    false: {
      alignSelf: "flex-start",
      marginTop: "1rem",
      width: "3rem",
    },
  };
  const subheading ={
    true: {
    opacity:1
    },

    false: {
   opacity:0,
   display:"none"

    },

  }
  return (
    <motion.div 
    data-open={open}

    
      initial={`${open}`}
      animate={`${open}`}
      variants={sideCountainerVariant}
      style={{
        position:"sticky",
        top:0,
        color: "black",
        marginTop:"2rem",
        height: "90%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarVariants}
        style={{
          width: "14rem",
          height: "100%",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          padding: "15px",
       
         
          display: "flex",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
          // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
           backdropFilter: "blur( 3.5px )",
           WebkitBackdropFilter: "blur( 3.5px )",
           borderRadius: "10px 10px 10px 10px",
           border: "1px solid rgba( 255, 255, 255, 0.3 )",
        }}
      >
        <Box
        
          sx={{ display: "flex",
          alignSelf: open ? "flex-end" : "center" }}
          onClick={handleToggle}
        >
        {open ?  <ArrowForwardIosRoundedIcon/> : <ArrowBackIosRoundedIcon />}
        </Box>
        <motion.div
          layout
          initial={`${open}`}
          animate={`${open}`}
          variants={profileVariant}
          style={{ display: "flex" }}
          transition={{ duration: 0 }}
        >
          <Avatar
            sx={{
              width: open ? "4rem" : "3rem",
              height: open ? "4rem" : "3rem",
              mb:'1rem'
            }}
            alt="your photo"
            src={store.profile?.profilePhoto}
          />
         
        </motion.div>
     
        <Box
  
       
          style={{ display: "flex", flexDirection: "column", width: "100%",gap:"1rem" }}
        >
          {Options.map(({ text, icon } ,i ) => {
            if (!icon) {
              return (
                <Typography
                key={i}
                  sx={{ display: open ? "" : "none" }}
                  variant="body2"
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.includes(" ")
            ? text.toLowerCase().replace(/\s+/g, "")
            : text.toLowerCase();

            return (
              <div   key={text}>
                <ListItemButton
               
                   onClick={() => {
                    console.log(lcText);
                    navigate(`./${lcText}`);
                    setActive(lcText);
                  }}
                  
                  sx={{
                    display: "flex",
                    padding: open? "6px 6px 6px 6px":"12px",
                    alignItems: "center",
                    borderRadius: "10px",
              
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#ffffff4d",
                  
                      backdropFilter: "blur( 5.5px )",
                      WebkitBackdropFilter: "blur( 5.5px )",
               
                      cursor: "pointer",
                    },
                    "&.active": {
                      backgroundColor: "#ffffff4d",
                      boxShadow: "0 10px 32px 0 rgba( 31, 38, 135, 0.37 )",
                      backdropFilter: "blur( 5.5px )",
                      WebkitBackdropFilter: "blur( 5.5px )",
                      border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    },
                  }}

                  className={active.includes(lcText) ? "active" : ""}

                >
                  <div  style={{  margin : open? "4px":"auto" ,display:"flex" }}>{icon}</div>
                  <Typography variant="caption" sx={{marginLeft:"1rem",    display: open ?   "block" :"none", }} >{text}</Typography>
                </ListItemButton>
              </div>
            );
          })}
        </Box>
      </motion.div>
      
    </motion.div>
  );
};

export default Sidebar;
