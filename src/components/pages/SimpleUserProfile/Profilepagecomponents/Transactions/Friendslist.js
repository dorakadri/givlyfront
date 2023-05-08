import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getmatchesuser } from '../../../../../ReduxB/slices/posts/mainPostsSlice';
import { Avatar, CardHeader, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material';

export default function Friendslist(props) {
    const [matches, setMatches] = useState([]);
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] =useState(0);
    useEffect(() => {
        dispatch(getmatchesuser());
    }, [])


    const store = useSelector((state) => state?.mainpost) 
    const { friendsmatch } = store 

        
useEffect(()=>{

    setMatches(friendsmatch);
    
    },[friendsmatch])




    const handleListItemClick = (event, index,m) => {
   
        props.match(...m)
      setSelectedIndex(index);
    };
  return (
    <div>  
          <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
   
      }}
    >
      {matches?.map((el, i) => {

        return (
          <ListItem
            key={i}
    
            disablePadding
          >
            <ListItemButton      onClick={(event) => handleListItemClick(event, i+1,matches)} selected={selectedIndex === i+1}>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${i + 1}`}
                  src={el?.profilePhoto
                  }
                />
              </ListItemAvatar>
              <ListItemText id={i} primary={`${el?.firstName} ${el?.lastName} `} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
      
      </div>
  )
}
