import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { Typography } from '@mui/material';

export default function Rightside(props) {
  const selectedDate = dayjs(props.date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
      
        <Grid item>
        
            <Typography variant="caption" sx={{pl:"1rem"}} >     Delivery date  : </Typography>
          <DateCalendar value={selectedDate} disableFuture />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
