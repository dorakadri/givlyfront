import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import SwipeRightOutlinedIcon from '@mui/icons-material/SwipeRightOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>

      {/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Posts" {...a11yProps(0)} icon={<PostAddOutlinedIcon/>} iconPosition="start"/>
          <Tab label="Gifts" {...a11yProps(1)} icon={<CardGiftcardOutlinedIcon/>} iconPosition="start"/>
          <Tab label="Taken" {...a11yProps(2)} icon={<SwipeRightOutlinedIcon/>} iconPosition="start"/>
          <Tab label="Wishlist" {...a11yProps(3)} icon={<StarBorderPurple500OutlinedIcon />} iconPosition="start" />
          <Tab label="Delivery" {...a11yProps(4)} icon={<DeliveryDiningOutlinedIcon />} iconPosition="start"/>
        </Tabs>
      </Box>*/}


    </Box>
  );
}