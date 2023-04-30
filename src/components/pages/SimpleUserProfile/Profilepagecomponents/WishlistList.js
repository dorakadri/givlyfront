import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Stack, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletewishlistAction, getpostbyid } from '../../../../ReduxB/slices/posts/mainPostsSlice';

export default function WishlistList() {
  const store = useSelector((state) => state?.users) 
  const { profile } = store 
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPosts = async () => {
      const postIds = profile?.wishlist;
      for (const id of postIds) {
        await dispatch(getpostbyid(id));
      }
    };
    fetchPosts();
  }, [profile?.wishlist, dispatch]);
  
  const { onepost } = useSelector((state) => state?.mainpost);
  useEffect(() => {

    if (onepost && !posts.some(post => post._id === onepost._id)) {
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts.push(onepost);
        return newPosts;
      });
    }
  }, [onepost]);

  
 
  function handleremove(params) {

    dispatch(deletewishlistAction(params));
    setPosts(prevPosts => prevPosts.filter(post => post._id !== params));
  }
  
  
  
  return (
    <Card variant="elevation"  sx={{pr:0}} >
      <CardContent sx={{p:"2rem"}}>
        <Typography sx={{pl:"0.5rem"}}>
          Wishlist
        </Typography>
      </CardContent>
      <Divider />
      <Grid container sx={{padding:"1rem  1rem",m:"0px"}}>
        {posts.map((el,i) => (
          <Grid key={i} item xs={12} md={4} xl={4} style={{padding:"1rem  1rem"}}>
            <Card sx={{pl:0, pt:0}} variant="outlined">
              <CardHeader
                avatar={<Avatar alt="logo" src={el.userId.profilePhoto} />}
                title={`${el.userId.firstName} ${el.userId.lastName}`}
              />
              <CardMedia
                component="img"
                height="194"
                src={el.postPicture}
                alt="Google"
              />
              <CardContent>
                <Stack justifyContent={"flex-end"}>
                <Typography variant="h3" sx={{mb:"1rem"}}>
                    {el.title}
                  </Typography>
                  <Typography variant="body2" sx={{mb:"1rem"}}>
                    {el.description}
                  </Typography>
                  <Stack direction={"row"} sx={{mb:"1rem"}} justifyContent="space-between">
                    <Typography variant="overline" color="text.secondary" >
                      {el.location}
                    </Typography>
                  </Stack>

<Button variant='outlined' color='error' onClick={ ()=> handleremove(el._id)}  >
  remove
</Button>
                </Stack>
              </CardContent>
             
             
         
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  )
}
