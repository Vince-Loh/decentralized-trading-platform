import "./assetstyles.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AssetDisplay from './assetdisplay.js'
import * as images from '../images/images';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#64646434',
    boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
    color: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));
  

function Assets() {
    return (<>
    <div className = 'asset-container'>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <div className="assetsPage-title">
                        <h2>
                            Assets
                            <Divider />
                            <Typography
                            sx={{ mt: 0.2, ml: 1 }}
                            color="text.secondary"
                            display="block"
                            variant="caption"
                            >
                            </Typography>     
                        </h2>
                    </div>     
             </Grid>
            </Grid>
        <Box sx={{ flexGrow: 1 }} style={{height: 'auto', overflowY: 'auto', paddingTop:'6vh', paddingBottom: '10vh', paddingLeft:32, paddingRight:16, backgroundColor: '#222'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{marginBottom: '2rem'}}>
                    <Item ><h1>View our available items.</h1></Item>
                </Grid>
                <Grid item xs={12} sm={12} lg={3} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '1' category='Fiction' title='Sword of Destiny' img={images.TW_SOD} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} lg={3} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '2' category='Fiction'title='The Last Wish' img={images.TW_TLW} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '3' category='Fiction' title='Blood of Elves' img={images.TW_BOE} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '4' category='Fiction' title='Time of Contempt' img={images.TW_TOC} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '5' category='Fiction' title='Baptism of Fire' img={images.TW_BOF} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '6' category='Fiction' title='The Tower of the Swallow' img={images.TW_TTOTS} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '7' category='Fiction' title='The Lady of the Lake' img={images.TW_TLOTL} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                    <AssetDisplay isbn = '8' category='Fiction' title='Season of Storms' img={images.TW_SOS} author='Andrzej Sapkowski' price='$20'/>
                </Grid>
            </Grid>
        </Box>
    </div>
    </>
    );
}

export default Assets;