

import * as React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import logo from "./images/logo.png" ;
import { useMediaQuery } from "@mui/material";

function NavbarLandingpage() {
  const [anchorElNav, setAnchorElNav] = React.useState(
    null
  );

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const isSmallScreen = useMediaQuery("(max-width: 896px)");
  return (
    <Toolbar
      component="nav"
      sx={{
        background: "none",
        boxShadow: "none",
        pt: "1rem",
        position: "sticky",
      }}
    >
      {!isSmallScreen && (
        <img src={logo} alt="Logo" style={{ width: "50px" }} />
      )}

      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 500,

          color: "inherit",
          textDecoration: "none",
        }}
      >
        Givly
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem>
            <Typography textAlign="center">About Us</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">contact us</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">our partner</Typography>
          </MenuItem>
        </Menu>
      </Box>
  

      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Givly
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          gap: 2,
          pl: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          About Us
        </Button>
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          Our Partners
        </Button>
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          Contact Us
        </Button>
      </Box>
    </Toolbar>
  );
}
export default NavbarLandingpage;
