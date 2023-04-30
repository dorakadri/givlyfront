import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import FlexBetween from "../../../common/FlexBetween";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";

const Options = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Users",
    icon: null,
  },
  {
    text: "Users List",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
  {
    text: "Deliverer Management",
    icon: null,
  },
  {
    text: "Deliverer List ",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    text: "Add Deliverer ",
    icon: <PersonAddAlt1OutlinedIcon />,
  },
  {
    text: "Gift Management",
    icon: null,
  },
  {
    text: "Gift List  ",
    icon: <CardGiftcardOutlinedIcon />,
  },
  {
    text: "Add Gift  ",
    icon: <AddBoxOutlinedIcon />,
  },
];

export default function Sidebar({
  Desktop,
  sidebarWidth,
  sidebaropen,
  setSidebarOpen,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {sidebaropen && (
        <Drawer
          open={sidebaropen}
          onClose={() => setSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: sidebarWidth,

            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.Text,

              background: theme.palette.background.nav,
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",

              boxSizing: "border-box",
              borderWidth: Desktop ? 0 : "2px",
              width: sidebarWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color="red">
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography pl="2rem" variant="h4">
                    Givly Admin
                  </Typography>
                </Box>
                {!Desktop && (
                  <IconButton onClick={() => setSidebarOpen(!sidebaropen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {Options.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 2rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.includes(" ")
                  ? text.toLowerCase().replace(/\s+/g, "")
                  : text.toLowerCase();

                return (
                  <ListItem key={text}>
                    <ListItemButton
                      onClick={() => {
                        console.log(lcText);
                        navigate(`./${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: "transparent",
                        color: theme.palette.secondary.Title,
                        border: "none",
                        borderRadius: "30px",
                        "&.active": {
                          background:
                            " linear-gradient(to bottom, #0c8da4, #2b4fd1)",
                          color: "white",

                          borderRadius: "8px",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                      className={active.includes(lcText) ? "active" : ""}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0rem",
                          color: active.includes(lcText) ? "white" : "grey",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active.includes(lcText) && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
