import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import "./historystyles.css"


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function HistoryDisplay(props) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#64646434',
        boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
        color: '#fff'
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 96, height: 96 }}>
            <Img alt="Asset Image" src={props.img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Author: {props.author}
              </Typography>
              <Typography variant="body2" gutterBottom>
                ISBN: {props.isbn}
              </Typography>
              <Typography variant="body2" gutterBottom className='purchasedDetails'>
                Purchased by: {props.user}
              </Typography>
              <Typography variant="body2" className='purchasedDetails'>
                Purchased for: {props.purchasePrice}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div" className='purchasedDetails'>
              {props.timeStamp}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
