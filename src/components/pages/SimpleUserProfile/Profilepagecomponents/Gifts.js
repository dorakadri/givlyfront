import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getgifts } from '../../../../ReduxB/slices/posts/mainPostsSlice';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function Gifts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getgifts());
  }, []);


  const gifts = useSelector((state) => state?.mainpost.giftowned);



 
  return (
    <div>
      {gifts &&
        gifts.map((gift) => (
          <Card key={gift._id} sx={{ maxWidth: 345, marginBottom: 16 }}>
            <CardMedia component="img" height="140" image={gift.giftPhoto} alt={gift.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {gift.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Company: {gift.company}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
