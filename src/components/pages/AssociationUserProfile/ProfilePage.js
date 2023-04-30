import React, { useEffect } from 'react'
import ProfileCrad from './ProfileCrad'

import TabProfile from './TabProfile'
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from '../../../ReduxB/slices/users/usersSlices';

import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import AccountVerifed from '../Navigation/Alerts/AccountVerifed';



const Item = styled(Paper)(() => ({
 
  padding: "1rem",
  textAlign: 'center',
  color: 'black',
}));
export default function ProfilePage() {

  const store = useSelector((state) => state?.users) 
  console.log(store.userAuth._id)
  const dispatch = useDispatch()

  useEffect( () => {
  dispatch(userProfileAction(store.userAuth._id))
  },
  [store.userAuth._id,dispatch]
  )
const { profile } = store 
console.log(profile);
 
  
  return (
    <Box  sx={{ mx:"2rem" }}>
    <Grid container spacing={2} sx={{ mt:"2rem" }} >

 
  <Grid item xs={4}>
    <ProfileCrad data={profile}/>
        </Grid>
        <Grid item xs={8}>
          <Item>  <TabProfile/></Item>
        </Grid>
      </Grid>
    </Box>

  )
}
