/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

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
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// Item styling for the assets page
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#64646434',
    boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
    color: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

function Assets() {

// Search and filter states
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedAuthor, setSelectedAuthor] = useState('');

// Array for the assets data
const assets = [
  { isbn: '1', category: 'Fiction', title: 'Season of Storms', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_SOS]},
  { isbn : '2', category: 'Fiction', title: 'The Last Wish', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_TLW]},
    { isbn : '3', category: 'Fiction', title: 'Blood of Elves', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_BOE]},
    { isbn : '4', category: 'Fiction', title: 'Time of Contempt', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_TOC]},
    { isbn : '5', category: 'Fiction', title: 'Baptism of Fire', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_BOF]},
    { isbn : '6', category: 'Fiction', title: 'The Tower of the Swallow', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_TTOTS]},
    { isbn : '7', category: 'Fiction', title: 'The Lady of the Lake', author: 'Andrzej Sapkowski', price: '$20', img: [images.TW_TLOTL]},
    { isbn : '8', category: 'Fiction', title: 'Season of Storms', author: 'Andrzej Sapkowski', price: '$20', img:  [images.TW_SOD]},
];

const filteredAssets = assets.filter(asset => {
  return (
    asset.title.toLowerCase().includes(searchTerm.toLowerCase()) && // Search by title
    (selectedCategory === '' || asset.category === selectedCategory) // Filter by category
  );
});

// Search and filter bar
<div className="search-filter">
  <input type="text" placeholder="Search by Title" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
    <option value="">All Categories</option>
    <option value="Fiction">Fiction</option>
    <option value="Non-Fiction">Non-Fiction</option>
    <option value="Non-Fiction">Technology</option>
  </select>
</div>

return (<>
    <div className = 'asset-container'>
        {/* Grid for the title */}
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
            <Grid container spacing={0} className="items-title">
                <Grid item xs={12} md={12}>
                    <Item className="items-title"><h1>View our available items.</h1></Item>
                </Grid>
                </Grid>
                {/* Search and filter bar */}
                <div className="search-filter-container">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg ={12} >
                        <input
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        </Grid>
                    
                <Grid container spacing={2}>
                        <Grid item xs={6} md={6} >
                        <FormControl fullWidth className="form-assets">
                            <InputLabel className="white-text-center">Category</InputLabel>
                            <Select
                            value={selectedCategory}
                            className="white-text-center"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Fiction">Fiction</MenuItem>
                            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6} md ={6} style={{marginBottom: '2rem'}}>
                        <FormControl fullWidth className="form-assets">
                            <InputLabel className="white-text-center">Author</InputLabel>
                            <Select
                            value={selectedAuthor}
                            className="white-text-center"
                            onChange={(e) => setSelectedAuthor(e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Andrzej Sapkowski">Andrzej Sapkowski</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        {/* Display Assets */}
                        {filteredAssets.map((asset, index) => (
                            <Grid item xs={12} sm={12} lg={3} xl={3} style={{marginBottom: '2rem', paddingTop:'6vh'}}>
                            <AssetDisplay key={index} {...asset} />
                        </Grid>
                        ))}
                        </Grid>
                </Grid>
                </div>
        </Box>
        
    </div>
    </>
    );
}

export default Assets;