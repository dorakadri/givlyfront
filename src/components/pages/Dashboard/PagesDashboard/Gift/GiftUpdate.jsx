import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PagesHeaders from '../../componentsDashboard/PagesHeaders';
import myService from '../../servicedash/Service';
import FormGift from './FormGift';

export default function GiftUpdate() {

    const { id } = useParams();

    const [data,setData]=useState({});

    useEffect(() => {
      myService.getGiftbyID(id).then((response) => {
    
        setData(response.data);
        console.log(response.data)
      });
    }, []);
  

    
  return (
    <Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box', }}>
    <PagesHeaders title="UPDATE GIFT" subtitle="Register a New Gift Product" />
   <FormGift data={data} update={true}/>
   </Card>
  )
}
