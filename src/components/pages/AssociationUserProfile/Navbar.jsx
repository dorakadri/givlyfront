import { Home, Mail, Notifications, Pets, PlusOneRounded } from "@mui/icons-material";
import ForumIcon from "@mui/icons-material/Forum";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../../ReduxB/slices/users/usersSlices";
import { useDispatch } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "20%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
export default function Navbar(data) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  console.log(data);

  function handelLogout() {

    dispatch(logoutAction());
    navigate("/");
  }
  return (
    <AppBar position="sticky" style={{ background: "#008B8B" }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Givly
        </Typography>
  
        <Icons>
        <IconButton component={Link} to="./forum">
            <Home  color="white"/>
          </IconButton>
          <IconButton component={Link} to="./createpost">
            <AddBoxIcon  />
          </IconButton>
          <IconButton component={Link} to="./chat">
            <Mail color="white" />
          </IconButton>
     
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={data?.profileurl}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(`./profile`)}>Profile</MenuItem>
     
        <MenuItem onClick={handelLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
