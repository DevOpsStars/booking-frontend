import { Rating, Typography, Box, Grid, Card } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

export const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1976d2',
  },
  '& .MuiRating-iconHover': {
    color: '#1976d2',
  },
});

export default function AverageRating({ averageRate }) {
  // const labels = {
  //   0.5: 'Useless',
  //   1: 'Useless+',
  //   1.5: 'Poor',
  //   2: 'Poor+',
  //   2.5: 'Ok',
  //   3: 'Ok+',
  //   3.5: 'Good',
  //   4: 'Good+',
  //   4.5: 'Excellent',
  //   5: 'Excellent+',
  // };

  // border: 1, borderColor: 'primary.main', borderRadius: 1,
  
  return (
    <Grid container justifyContent="flex-start" sx={{gap: 2}} >
      <Typography color='primary' variant='h6'>Average</Typography>
      <StyledRating size="large" name="average" value={averageRate} precision={0.5} readOnly />
      <Typography color='primary' variant='h6'>({Math.round(averageRate * 10) / 10})</Typography>
    </Grid>
  )
}
