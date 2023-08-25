import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import EthImg from './images/ethereum.png';
import BtcImg from './images/bitcoin.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
        <Paper
        sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            elevation: 3,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
        <Grid container spacing={2}>
            <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="ethereum" src={EthImg} />
            </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                    Ethereum
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Purchase 1 Ethereum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ID: 1030114
                </Typography>
                </Grid>
                <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    Purchase
                </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" component="div">
                $5,000
                </Typography>
            </Grid>
            </Grid>
        </Grid>
        </Paper>
        <Paper
        sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            elevation: 3,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
        <Grid container spacing={2}>
            <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="bitcoin" src={BtcImg} />
            </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                    Bitcoin
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Purchase 1 Bitcoin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ID: 1030229
                </Typography>
                </Grid>
                <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    Purchase
                </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" component="div">
                $35,000
                </Typography>
            </Grid>
            </Grid>
        </Grid>
        </Paper>
    </Grid>
  );
}
