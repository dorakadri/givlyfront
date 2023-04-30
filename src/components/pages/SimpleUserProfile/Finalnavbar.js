import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { FiHome, FiMessageSquare } from "react-icons/fi";
import { FaForumbee } from "react-icons/fa";

import FlexBetween from "../../common/FlexBetween";
import logo from "../../../assets/images/logogivly.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { setMode } from "../../../ReduxB/slices/Themeglobal";
import { logoutAction } from "../../../ReduxB/slices/users/usersSlices";

export default function Finalnavbar(data) {
  const [anchorEl, setAnchorEl] = useState(null);
  const messages = useSelector((state) => state.users.newMessages);
  const [count, setcount] = useState(0);

  useEffect(() => {
    const count = Object.values(messages).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setcount(count);
  }, [messages]);

  const theme = useTheme();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handelLogout() {
    dispatch(logoutAction());
    navigate("/");
  }
  return (
    <AppBar
      sx={{
        position: "sticky",
        top: 0,

        background: "#fff",
        boxShadow: "none",
        backgroundColor: "#fff",

        // backdropFilter: "blur( 3.5px )",
        //  border: "1px solid rgba( 255, 255, 255, 0.18 )",
        // WebkitBackdropFilter: "blur( 3.5px )",
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <img src={logo} alt="Logo" style={{ width: "50px" }} />
          <FlexBetween
            backgroundColor="#ece9e6"
            borderRadius="20px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />

            <Search sx={{ color: "#b9b7b4" }} />
          </FlexBetween>
        </FlexBetween>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <FastfoodIcon sx={{ fontSize: "25px" }} color="primary" />
          ) : (
            <EmojiObjectsIcon sx={{ fontSize: "25px" }} color="primary" />
          )}
        </IconButton>
        <FlexBetween sx={{ gap: "8px" }}>
          <IconButton component={Link} to="/user/home">
            <FiHome color="#9fa1a2" />
          </IconButton>
          <IconButton onClick={() => navigate(`./forum`)}>
            <FaForumbee color="#9fa1a2" />
          </IconButton>
          <IconButton onClick={() => navigate(`./chat`)}>
            <Badge badgeContent={count} color="success">
              <FiMessageSquare color="#9fa1a2" />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar src={data?.profileurl} color="#9fa1a2" />
              </IconButton>
            </Tooltip>
            <Menu
              disableScrollLock={true}
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => navigate(`./profile`)}>
                {" "}
                Profile
              </MenuItem>
              <MenuItem onClick={handelLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
