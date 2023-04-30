import { Card } from '@mui/material'
import React from 'react'
import PagesHeaders from '../../componentsDashboard/PagesHeaders'
import FormGift from './FormGift'


export default function AddGift() {
  return (
    <Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box', }}>
    <PagesHeaders title="ADD GIFT" subtitle="Register a New Gift Product" />
       <FormGift/>
  </Card>
  )
}
