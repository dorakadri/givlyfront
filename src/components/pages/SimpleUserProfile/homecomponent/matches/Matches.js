import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { getmatchesuser } from "../../../../../ReduxB/slices/posts/mainPostsSlice";
import { useNavigate } from "react-router";
import { AppContext } from "../../../../../context/appContext";
export default function Matches() {

  const [matches, setMatches] = useState([]);
  const dispatch = useDispatch();
 const { socket } =
    useContext(AppContext);
  const navigate =useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
   
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
 
  useEffect(() => {
    dispatch(getmatchesuser());
    socket.on("msg", () => {
      dispatch(getmatchesuser());
    });
    return () => {
      socket.off("msg");
    };
  }, [dispatch, socket]);
 const store = useSelector((state) => state?.mainpost) 
 const { friendsmatch } = store 

useEffect(()=>{

setMatches(friendsmatch);

},[friendsmatch])

  return (
   
      <Card
        sx={{ 
          backgroundColor: "rgba(255, 255, 255, 54.3)",
          // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
           backdropFilter: "blur( 3.5px )",
           WebkitBackdropFilter: "blur( 3.5px )",
           borderRadius: "10px 10px 10px 10px",
           border: "1px solid rgba( 255, 255, 255, 0.18 )",
          
          pl: 0, pt: "1rem" , borderColor: "transparent" 
       ,height: "800px" }}
        variant="outlined"
        
      >
        <CardContent sx={{ pl: "2rem", pr: "2rem" }}>
          <Typography sx={{ pb: "1rem" }} variant="h4">
            Matches
          </Typography>
          <TextField
            sx={{ width: "100%", pb: "1rem" }}
            id="textfieldsearchcontact"
            placeholder="Search"
            InputProps={{
              style: { fontSize: 16, fontWeight: 400 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CloseIcon color="disabled" fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          {matches?.map((el, i) => (
            <CardHeader
              key={i}
              sx={{ pl: 0, pr: 0 }}
              avatar={
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"

                >
                  <Avatar alt="ownerphoto" src={el?.profilePhoto
} />
                </StyledBadge>
              }
              action={
                <IconButton onClick={()=>navigate("../chat")}  >
                  <ChatBubbleOutlineIcon color="disabled" />
                </IconButton>
              }
              title={<Typography variant="subtitle1">{el?.firstName} {el?.lastName} </Typography>}
            />
          ))}
        </CardContent>
      </Card>

  );
}
