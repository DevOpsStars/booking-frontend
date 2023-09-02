import React from 'react'
import Navbar from '../components/navbar';
import Stack from '@mui/material/Stack';


export default function BaseLayout() {
  return (
    <Stack spacing={2}>
      <Navbar/>
    </Stack>
  )
}

