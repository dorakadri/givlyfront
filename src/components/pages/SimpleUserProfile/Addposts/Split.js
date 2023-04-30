import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AddPost from './AddPost';

const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'Food',
    width: '50%',
  },
  {
    url: '/static/images/buttons/burgers.jpg',
    title: 'Object',
    width: '50%',
  },

];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: "100%",
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
  
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function Split() {
    const [display,Setdisplay]=React.useState(false);
   
    const [ displayfood,Setdisplayfood]=React.useState(false);
    const [widthfood,Setwidthfood]=React.useState('50%');
    const [widthobject,Setwidthobject]=React.useState('50%');
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
   {  !display &&   
    <ImageButton
        onClick={()=>{
            Setdisplay(true)
          Setwidthfood('40%')
            Setdisplayfood(false)
        }}
          focusRipple
          key='Object'
          style={{
            width: widthobject,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(https://images.pexels.com/photos/4203100/pexels-photo-4203100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image> 
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              Object
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>}
        { display && <AddPost type={'object'}  />}

     { !displayfood &&  <ImageButton
        onClick={()=>{
            Setdisplay(false)
          Setwidthobject('40%')
            Setdisplayfood(true)
        }}
          focusRipple
          key='Food'
          style={{
            width: widthfood,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image> 
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
             Food
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>}
        { displayfood && <AddPost type={'food'} />}
 
    </Box>
  );
}