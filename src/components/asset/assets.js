import "./assetstyles.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AssetDisplay from './assetdisplay.js'
import BitcoinImg from './1.png';
import EthereumImg from './2.png';
import LitecoinImg from './3.png';
import UsdtImg from './6.png';
import BinanceImg from './10.png';
import PolkadotImg from './12.png';
import CronosImg from './15.png';
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
        <Box sx={{ flexGrow: 1 }} style={{paddingTop:'3vh', paddingBottom: '10vh', paddingLeft:32, paddingRight:16, backgroundColor: '#222'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Item ><h1>View our available digital currencies.</h1></Item>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '1' item='Bitcoin' img={BitcoinImg} description='Buy Bitcoin' price='$30,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '3' item='Litecoin' img={LitecoinImg} description='Buy Litecoin' price='$400'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '4' item='USD Tether' img={UsdtImg} description='Buy USD Tether' price='$1'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '5' item='Binance Coin' img={BinanceImg} description='Buy Binance Coin' price='$250'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '6' item='Polkadot' img={PolkadotImg} description='Buy Polkadot' price='$50'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '7' item='Cronos' img={CronosImg} description='Buy Cronos' price='$23'/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <AssetDisplay id = '2' item='Ethereum' img={EthereumImg} description='Buy Ethereum' price='$5,000'/>
                </Grid>
            </Grid>
        </Box>
    </div>
    </>
    );
}

export default Assets;