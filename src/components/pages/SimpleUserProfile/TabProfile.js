import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SwipeRightOutlinedIcon from "@mui/icons-material/SwipeRightOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import styled from "@emotion/styled";
import WishlistList from "./Profilepagecomponents/WishlistList";
import PostsList from "./Profilepagecomponents/PostsList";
import MatchedList from "./Profilepagecomponents/MatchedList";
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",

    backgroundColor: "#01A28F",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: "none",
  fontSize: "16px",

  marginRight: "30px",
  color: "#424344",
  "&.Mui-selected": {
    color: "#01A28F",
  },
}));

export default function TabProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab
            label="Posts"
            {...a11yProps(0)}
            icon={<PostAddOutlinedIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Matched"
            {...a11yProps(2)}
            icon={<SwipeRightOutlinedIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Gifts"
            {...a11yProps(1)}
            icon={<CardGiftcardOutlinedIcon />}
            iconPosition="start"
          />

          <StyledTab
            label="Wishlist"
            {...a11yProps(3)}
            icon={<StarBorderPurple500OutlinedIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="taken"
            {...a11yProps(4)}
            icon={<AssistantOutlinedIcon />}
            iconPosition="start"
          />
        </StyledTabs>
      </Box>
      <TabPanel  value={value} index={0}>
        <PostsList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchedList/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Gifts
      </TabPanel>
      <TabPanel value={value} index={3}>
        <WishlistList />
      </TabPanel>
      <TabPanel value={value} index={4}>
      Taken
      </TabPanel>
    </Box>
  );
}
