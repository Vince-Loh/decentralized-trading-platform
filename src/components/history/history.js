/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import "./historystyles.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as images from '../images/images';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HistoryDisplay from './historydisplay.js';
import { fetchHistory } from './fetchhistory';
import { useEffect, useState } from 'react';

// Item styling for the assets page
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#64646434',
    boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
    color: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));
  

  

function History() {

    const [assets, setAssets] = useState([]);

    useEffect(() => {
    // Fetch assets when the component mounts
        fetchHistory()
        .then((data) => {
            setAssets(data); // Update the assets state when data is fetched
        })
        .catch((error) => {
            console.error('Error fetching assets:', error);
        });
    }, []);

    return (<>
    <div className = 'history-container'>
        {/* Grid for the title */}
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <div className="historyPage-title">
                        <h2>
                            Transaction History
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
            <Grid container spacing={0}>
                {assets.map((asset, index) => (
                            <Grid item xs={12} md={12} lg={12} xl={12} style={{marginBottom: '2rem', paddingTop:'1vh'}}>
                            <HistoryDisplay key={index} {...asset} />
                        </Grid>
                        ))}
            </Grid>
        </Box>
    </div>
    </>
    );
}

export default History;